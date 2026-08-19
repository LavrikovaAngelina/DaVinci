import type { card } from '@/types/card';
import {Link} from '@inertiajs/react';
import { getHueFromString } from '@/components/get-hue';

export function WorkCard({ card }: { card: card }) {

    return (
        <Link
            href={`/picview/${card.id}`}
            className="block overflow-hidden rounded border border-neutral-200"
        >

        <article className="overflow-hidden rounded border border-neutral-200" onClick={() => {}}>
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
                            className={`rounded px-2 py-0.5 text-xs text-white`}
                            style={{
                                 backgroundColor: `hsl(${getHueFromString(tag)}, 70%, 60%)`
                            }}
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
                </div>
            </div>
        </article>

        </Link>
    );
}