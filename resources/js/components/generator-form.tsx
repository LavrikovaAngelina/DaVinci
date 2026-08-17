
import { useState } from 'react';

export type Category = { tag_id: number; tag_name: string };
export type IdeaPart = { tag_id: number; tag_name: string; category: string };

type Props = {
    categories: Category[];
    onGenerated: (parts: IdeaPart[], taskId: number | null) => void;
};

export default function GeneratorForm({ categories, onGenerated }: Props) {
    const [slots, setSlots] = useState(['', '', '']);
    const [loading, setLoading] = useState(false);

    const chosen = slots.filter(Boolean);

    const changeSlot = (index: number, value: string) => {
        setSlots(slots.map((slot, i) => (i === index ? value : slot)));
    };

    const generate = async () => {
        if (chosen.length === 0) return;

        setLoading(true);

        const params = new URLSearchParams();
        chosen.forEach((id) => params.append('categories[]', id));

        const response = await fetch(`/generator/generate?${params}`, {
            credentials: 'same-origin',
            headers: { Accept: 'application/json' },
        });
        const data = await response.json();

        onGenerated(data.parts, data.task_id ?? null);
        setLoading(false);
    };

    return (
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
    );
}