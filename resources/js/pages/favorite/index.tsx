import Row from '@/components/row';
import { csrf } from '@/lib/csrf';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import WorkModal from '@/components/work-modal';

type Idea = {
    task_id: number;
    tag_ids: number[];
    tags: string[];
};

type Props = {
    ideas: Idea[];
};

export default function FavoriteIndex({ ideas: initialIdeas }: Props) {
    const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);
    const [modalTask, setModalTask] = useState<Idea | null>(null);

    const toggleLike = async (idea: Idea) => {
        await fetch(`/favorites/${idea.task_id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': csrf(),
                Accept: 'application/json',
            },
        });

        setIdeas((current) =>
            current.filter((other) => other.task_id !== idea.task_id),
        );

        router.reload({ only: ['likesCount'] });
    };

    return (
        <>
            <Head title="Избранное" />

            <main className="mx-auto max-w-6xl px-4 py-6">
                <h1 className="mb-3 text-lg">
                    Ваши избранные идеи:
                </h1>

                <div className="space-y-3">
                    {ideas.map((idea) => (
                        <Row
                            key={idea.task_id}
                            tags={idea.tags}
                            liked={true}
                            onToggleLike={() => toggleLike(idea)}
                            in_fav_page={true}
                            //???
                            addPicture={() => setModalTask(idea)}
                        />
                    ))}
                </div>
            </main>
        </>
    );
}