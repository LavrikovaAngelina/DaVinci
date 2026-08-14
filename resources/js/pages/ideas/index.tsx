import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

type idea = {
    id: number;
    description: string;
    thumbnail: string | null;
    tags: string[];
    author: string;
    likes: number;
    dislikes: number;
    created_at: string;
};

type Props = {
    ideas: idea[];
    filters: { animal?: string; action?: string; material?: string };
    options: { animals: string[]; actions: string[]; materials: string[] };
};

export default function ideasIndex({ ideas, filters, options }: Props) {
    const [form, setForm] = useState({
        animal: filters.animal ?? '',
        action: filters.action ?? '',
        material: filters.material ?? '',
    });

    const search = () => {
        router.get('/ideas', form, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Работы" />

            <div className="min-h-screen bg-white">

                <main className="mx-auto max-w-6xl px-4 py-6">
                    <h1 className="mb-3 text-lg">Поиск работ</h1>

                    <div className="mb-8 flex flex-wrap gap-3">
                        <Select
                            value={form.animal}
                            onChange={(v) => setForm({ ...form, animal: v })}
                            placeholder="Животное"
                            items={options.animals}
                        />
                        <Select
                            value={form.action}
                            onChange={(v) => setForm({ ...form, action: v })}
                            placeholder="Действие"
                            items={options.actions}
                        />
                        <Select
                            value={form.material}
                            onChange={(v) => setForm({ ...form, material: v })}
                            placeholder="Материал"
                            items={options.materials}
                        />
                        <button
                            onClick={search}
                            className="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                        >
                            Вперед!
                        </button>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {ideas.map((idea) => (
                            <WorkCard key={idea.id} idea={idea} />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
function Select({
    value,
    onChange,
    placeholder,
    items,
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    items: string[];
}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-w-44 rounded border border-neutral-300 px-3 py-2"
        >
            <option value="">{placeholder}</option>
            {items.map((item) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
}

function WorkCard({ idea }: { idea: idea }) {
    return (
        <article className="overflow-hidden rounded border border-neutral-200">
            <div className="relative flex h-56 items-center justify-center bg-neutral-400 text-center text-sm text-white">
                {idea.thumbnail ? (
                    <img src={idea.thumbnail} alt="" className="h-full w-full object-cover" />
                ) : (
                    <span>Миниатюра картинки<br />(thumbnail)</span>
                )}

                <div className="absolute bottom-2 left-2 flex gap-1">
                    {idea.tags.map((tag, i) => (
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
                <p className="mb-3 text-sm text-neutral-600">"{idea.description}"</p>

                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 shrink-0 rounded bg-neutral-300" />
                    <div className="text-xs">
                        <div className="text-neutral-500">Автор:</div>
                        <div className="font-medium text-blue-600">{idea.author}</div>
                    </div>
                    <div className="ml-auto text-right text-xs text-neutral-500">
                        <div className="mb-1 flex gap-2">
                            <span>👍 {idea.likes}</span>
                            <span>👎 {idea.dislikes}</span>
                        </div>
                        <div>{idea.created_at}</div>
                    </div>
                </div>
            </div>
        </article>
    );
}
