import Row from '@/components/row';
import GeneratorForm, { Category, IdeaPart } from '@/components/generator-form';
import { csrf } from '@/lib/csrf';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

type Idea = { id: number; parts: IdeaPart[]; task_id: number | null };
type Props = { categories: Category[] };

const ideaKey = (parts: IdeaPart[]) =>
    parts.map((p) => p.tag_id).sort((a, b) => a - b).join('-');

export default function GeneratorIndex({ categories }: Props) {
    const [ideas, setIdeas] = useState<Idea[]>([]);

    const addIdea = (parts: IdeaPart[], taskId: number | null) => {
        setIdeas((current) => [{ id: Date.now(), parts, task_id: taskId }, ...current]);
    };

    const applyToTwins = (idea: Idea, taskId: number | null) => {
        const key = ideaKey(idea.parts);

        setIdeas((current) =>
            current.map((other) =>
                ideaKey(other.parts) === key ? { ...other, task_id: taskId } : other,
            ),
        );
    };

    const toggleLike = async (idea: Idea) => {
        if (idea.task_id) {
            await fetch(`/favorites/${idea.task_id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrf(),
                    Accept: 'application/json'
                },
            });

            applyToTwins(idea, null);
        } else {
            const response = await fetch('/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf(),
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    tag_ids: idea.parts.map((part) => part.tag_id),
                }),
            });

            const data = await response.json();
            applyToTwins(idea, data.task_id);
        }

        router.reload({ only: ['likesCount'] });
    };

    return (
        <>
            <Head title="Генератор идей" />

            <main className="mx-auto max-w-6xl px-4 py-6">
                <h1 className="mb-3 text-lg">Выберите до трех категорий для Ваших идей</h1>

                <GeneratorForm categories={categories} onGenerated={addIdea} />
                {ideas.length > 0 && (
                    <h2 className="mb-3 text-neutral-600">Идеи, которые нашли для Вас</h2>
                )}
                <div className="space-y-3">
                    {ideas.map((idea) => (
                        <Row
                            key={idea.id}
                            tags={idea.parts.map((part) => part.tag_name)}
                            liked={idea.task_id !== null}
                            onToggleLike={() => toggleLike(idea)}
                            in_fav_page={false}
                        />
                    ))}
                </div>
            </main>
        </>
    );
}
