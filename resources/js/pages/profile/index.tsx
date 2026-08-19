import { Head } from '@inertiajs/react';
import { WorkCard } from '@/components/work-card';
import type { card } from '@/types/card';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';

type Props = {
    username: string;
    description: string | null;
    cards: card[];
    userpic: string | null;
};

export default function ProfileIndex({username, description, cards, userpic}: Props) {
    console.log('userpic:', userpic);
    return (
        <>
            <Head title={username} />

            <div className="min-h-screen bg-white">
                {/* Профиль */}
                <div className="px-5 pt-5">
                    <div className="flex items-center gap-3">
                        {userpic ? (
                            <img
                                src={`/storage/${userpic}`}
                                alt="Аватар пользователя"
                                className="h-[76px] w-[76px] shrink-0 object-cover rounded"
                            />
                        ) : (
                            <div className="flex h-[76px] w-[76px] shrink-0 items-center rounded justify-center border border-neutral-500 bg-white text-center text-xs text-neutral-500">
                                Аватарка!
                            </div>
                        )}

                        <h1 className="text-lg font-semibold">
                            {username || 'Пользователь без имени'}
                        </h1>
                    </div>

                    {/* Описание */}
                    <div className="mt-3 flex h-[130px] items-center justify-center rounded-3xl border border-dashed border-neutral-200 px-5 text-center text-xs text-neutral-600">
                        {description || 'Описание отсутствует'}
                    </div>
                </div>

                {/* Разделитель */}
                <div className="mt-3 border-t border-neutral-200" />

                {/* Работы */}
                <div className="grid gap-5 px-5 py-3 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card) => (
                        <WorkCard key={card.id} card={card} />
                    ))}
                </div>
            </div>
        </>
    );
}