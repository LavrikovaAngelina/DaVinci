import { Head , router} from '@inertiajs/react';
import { useState } from 'react';

import Row from './row';

type Category = { tag_id: number; tag_name: string };
type IdeaPart = { tag_id: number; tag_name: string; category: string };
type Idea = { id: number; parts: IdeaPart[] };

type Props = {
    categories: Category[];
};

const csrf = () =>
    document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';

export default function GeneratorIndex({ categories }: Props) {
    const [slots, setSlots] = useState(['', '', '']);
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState<Record<number, number>>({});

    const changeSlot = (index: number, value: string) => {
        setSlots(slots.map((slot, i) => (i === index ? value : slot)));
    };

    const chosen = slots.filter(Boolean);

    const generate = async () => {
        if (chosen.length === 0) return;

        setLoading(true);

        const params = new URLSearchParams();
        chosen.forEach((id) => params.append('categories[]', id));

        const response = await fetch(`/generator/generate?${params}`, {
            headers: { Accept: 'application/json' },
        });
        const data = await response.json();

        setIdeas([{ id: Date.now(), parts: data.parts }, ...ideas]);
        setLoading(false);
    };

        const toggleLike = async (idea: Idea) => {
        const taskId = liked[idea.id];

        if (taskId) {
            await fetch(`/favorites/${taskId}`, {
                method: 'DELETE',
                headers: { 'X-CSRF-TOKEN': csrf(), Accept: 'application/json' },
            });
            const next = Object.fromEntries(
                Object.entries(liked).filter(([, id]) => id !== taskId),
            );
            setLiked(next);
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
            setLiked({ ...liked, [idea.id]: data.task_id });
        }

        router.reload({ only: ['likesCount'] });
    };

    return (
        <>
            <Head title="Генератор идей" />

            <main className="mx-auto max-w-6xl px-4 py-6">
                <h1 className="mb-3 text-lg">Выберите до трех категорий для Ваших идей</h1>

                <div className="mb-6 flex flex-wrap gap-3">
                    {slots.map((slot, index) => (
                        <select
                            key={index}
                            value={slot}
                            onChange={(e) => changeSlot(index, e.target.value)}
                            className="min-w-44 rounded border border-neutral-300 px-3 py-2"
                        >
                            <option value="">Категория</option>
                            {categories.map((category) => (
                                <option key={category.tag_id} value={category.tag_id}>
                                    {category.tag_name}
                                </option>
                            ))}
                        </select>
                    ))}

                    <button
                        onClick={generate}
                        disabled={chosen.length === 0 || loading}
                        className="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:opacity-40"
                    >
                        {loading ? '...' : 'Вперёд!'}
                    </button>
                </div>

                {ideas.length === 0 && (
                    <p className="text-neutral-500">
                        Выберите хотя бы одну категорию и нажмите «Вперёд!»
                    </p>
                )}
                    {/*<p className="text-neutral-500">
                         Идеи, которые нашли для Вас
                    </p>*/}
                <div className="space-y-3">
                    {ideas.map((idea) => (
                        <>
                            <Row key={idea.id} idea={idea} toggleLike={toggleLike} />
                        </>
                    ))}
                </div>
            </main>
        </>
    );
}

