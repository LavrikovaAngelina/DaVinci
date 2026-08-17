import { ReactNode } from 'react';

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
            <div className="font-medium">
                {tags.map((tag) => `#${tag}`).join(', ')}
            </div>

            <div className="ml-auto flex items-center gap-3">
                {children}

                {in_fav_page ? (
                    <button onClick={addPicture} className="text-2xl leading-none">
                        Добавить работу
                    </button>
                ) : null}

                

                <button onClick={onToggleLike} className="text-2xl leading-none">
                    {liked ? (
                        <span className="text-red-500">♥️</span>
                    ) : (
                        <span className="text-neutral-300">♡</span>
                    )}
                </button>
            </div>
        </div>
    );
}