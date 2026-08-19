import { ReactNode } from 'react';
import { getHueFromString } from '@/components/get-hue';

//рисует карточку идеи, которая содержит теги и кнопку лайка

type Props = {
    tags: string[];
    liked: boolean;
    onToggleLike: () => void;
    dimmed?: boolean;
    children?: ReactNode;
    in_fav_page?: boolean;
    addPicture?: () => void;
};

export default function Row({ tags, liked, onToggleLike, dimmed, children, in_fav_page, addPicture}: Props) {
    return (
        <div
            className={`flex items-center gap-3 rounded border border-neutral-200 p-4 ${
                dimmed ? 'opacity-50' : ''
            }`}
        >
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className={`rounded px-2 py-1 text-2xl font-medium text-white h-10`}
                        style={{
                            backgroundColor: `hsl(${getHueFromString(tag)}, 70%, 60%)`
                        }}
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="ml-auto flex items-center gap-3">
                {children}

                {in_fav_page ? (
                    <button onClick={addPicture} className="text-2xl h-10 justify-center w-58 flex items-center gap-2 
                                rounded-lg border border-neutral-300 bg-white px-4 py-2 font-medium text-neutral-700 shadow-sm 
                                hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Добавить работу
                    </button>
                ) : null}

                <button onClick={onToggleLike} className="text-2xl h-10 justify-center w-12 flex items-center gap-2 
                                rounded-lg border border-neutral-300 bg-white px-4 py-2 font-medium text-neutral-700 shadow-sm 
                                hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    {liked ? (
                        <span className="text-red-500">♥️</span>
                    ) : (
                        <span className="text-neutral-300">🤍</span>
                    )}
                </button>
            </div>
        </div>
    );
}