import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { csrf } from '@/lib/csrf';
import { getHueFromString } from '@/components/get-hue';
import { Link, usePage } from '@inertiajs/react';
import confetti from "@hiseb/confetti";
import EditModal from '@/components/edit-modal';

type Props = {
    picture: {
        id: number;
        name: string;
        description: string;
        image: string;
        author: string;
        author_id:number;
        userpic: string | null;
        tags: string[];
        tag_ids: number[];
        favorite_task_id: number | null;
        is_completed:boolean;
    };
};

export default function PicView({ picture }: Props) {
    const [liked, setLiked] = useState(picture.favorite_task_id !== null);
    const [favoriteTaskId, setFavoriteTaskId] = useState<number | null>(picture.favorite_task_id);
    const [editPicture, setEditPicture] = useState<Props['picture'] | null>(null);    

    const onToggleLike = async () => {
        if (favoriteTaskId !== null) {
            await fetch(`/favorites/${favoriteTaskId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrf(),
                    Accept: 'application/json',
                },
            });

            setLiked(false);
            setFavoriteTaskId(null);
        } else {
            const response = await fetch('/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf(),
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    tag_ids: picture.tag_ids,
                }),
            });

            const data = await response.json();

            setLiked(true);
            setFavoriteTaskId(data.task_id);
        }

        router.reload({ only: ['likesCount'] });
    };

    const ClickClick = picture.is_completed ? () => confetti() : onToggleLike;
    const { auth } = usePage().props;

    return (
        <>
            <Head title={picture.name} />

            <div className="min-h-screen bg-white">
                <main className="mx-auto max-w-6xl px-6 py-6">
                    <div className="grid gap-8 md:grid-cols-2">
                        
                        {/* Левая часть — изображение */}
                        <div>
                            <div className="flex items-center justify-center overflow-hidden rounded border border-neutral-200 bg-neutral-400">
                                {picture.image ? (
                                    <img
                                        src={picture.image}
                                        alt={picture.name}
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <span className="text-center text-sm text-white">
                                        Миниатюра картинки
                                        <br />
                                        (thumbnail)
                                    </span>
                                )}
                            </div>

                            <Link href={`/profile/${picture.author_id}`}>
                                <div className="mt-5 flex items-center gap-3">

                                    {picture.userpic ? (
                                        <img
                                            src={`/storage/${picture.userpic}`}
                                            alt="Аватар"
                                            className="h-8 rounded object-cover w-8"
                                        />
                                    ) : (
                                        <div className="h-8 w-8 rounde bg-neutral-500" />
                                    )}
                                    <div>
                                        <div className="text-sm text-neutral-500">
                                            Автор:
                                        </div>

                                        <div className="font-medium text-blue-600">
                                            {picture.author}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>


                        {/* Правая часть */}
                        <div>
                            {/* Название */}
                            <h1 className="mb-2 text-3xl font-semibold text-center">
                                {picture.name}
                            </h1>

                            {/* Описание */}
                            <div className="flex min-h-[200px] items-center justify-center rounded-[30px] border border-dashed border-neutral-300 p-6 text-center">
                                <p className="text-sm text-neutral-700">
                                    {picture.description || 'Описание отсутствует'}
                                </p>
                            </div>

                            {/* Теги */}
                            <div className="mt-4 flex flex-wrap gap-2 justify-center items-center">
                                {picture.tags.map((tag, index) => (
                                    <span
                                        key={tag}
                                        className={`rounded px-2 py-1 text-xs font-medium text-white`}
                                        style={{
                                            backgroundColor: `hsl(${getHueFromString(tag)}, 70%, 60%)`
                                        }}
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {auth.user.id !== picture.author_id && (
                                <button onClick={ClickClick} className="mx-auto text-2xl mt-4 h-12 justify-center w-16 flex items-center gap-2 
                                rounded-lg border border-neutral-300 bg-white px-4 py-2 font-medium text-neutral-700 shadow-sm 
                                hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                {liked ? (
                                    <span className="text-red-500">♥️</span>
                                ) : (
                                    <span className="text-neutral-300">🤍</span>
                                )}
                            </button>
                            )}

                            {auth.user.id === picture.author_id && (
                                <button
                                    onClick={() => setEditPicture(picture)}
                                    className="mx-auto mt-4 flex h-12 w-16 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-2xl font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    🖊️
                                </button>
                            )}
                            
                        </div>

                    </div>

                    {editPicture && (
                        <EditModal
                            picture={editPicture}
                            onClose={() => setEditPicture(null)}
                        />
                    )}
                </main>
            </div>
        </>
    );
}