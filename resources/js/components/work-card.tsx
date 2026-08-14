import type { card } from '@/types/card';

export function WorkCard({ card }: { card: card }) {
    return (
        <article className="overflow-hidden rounded border border-neutral-200">
            <div className="relative flex h-56 items-center justify-center bg-neutral-400 text-center text-sm text-white">
                {card.thumbnail ? (
                    <img src={card.thumbnail} alt="" className="h-full w-full object-cover" />
                ) : (
                    <span>Миниатюра картинки<br />(thumbnail)</span>
                )}

                <div className="absolute bottom-2 left-2 flex gap-1">
                    {card.tags.map((tag, i) => (
                        <span
                            key={tag}
                            className={`rounded px-2 py-0.5 text-xs text-white ${
                                i === 0 ? 'bg-green-600' : 'bg-red-600'
                            }`}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="p-3">
                <p className="mb-3 text-sm text-neutral-600">"{card.description}"</p>

                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 shrink-0 rounded bg-neutral-300" />
                    <div className="text-xs">
                        <div className="text-neutral-500">Автор:</div>
                        <div className="font-medium text-blue-600">{card.author}</div>
                    </div>
                    <div className="ml-auto text-right text-xs text-neutral-500">
                        <div className="mb-1 flex gap-2">
                            <span> {card.likes}</span>
                            <span> {card.dislikes}</span>
                        </div>
                        <div>{card.created_at}</div>
                    </div>
                </div>
            </div>
        </article>
    );
}