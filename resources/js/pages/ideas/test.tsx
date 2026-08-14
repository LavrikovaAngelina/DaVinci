import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {WorkCard} from '@/components/work-card';
import type { card } from '@/types/card';

type Props = {
    cards: card[];
    filters: { animal?: string; action?: string; material?: string };
    options: { animals: string[]; actions: string[]; materials: string[] };
};

export default function cardsIndex({ cards, filters, options }: Props) {
    const [form, setForm] = useState({
        animal: filters.animal ?? '',
        action: filters.action ?? '',
        material: filters.material ?? '',
    });

    const search = () => {
        router.get('/cards', form, { preserveState: true, replace: true });
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
                        {cards.map((card) => (
                            <WorkCard key={card.id} card={card} />
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
