import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {WorkCard} from '@/components/work-card';
import type { card } from '@/types/card';

type Props = {
    cards: card[];
    filters: { animal?: string; action?: string; material?: string };
    options: { animals: string[]; actions: string[]; materials: string[] };
};

export default function cardsIndex(){
    return (
        <>
            <Head title="Избранное" />

            <div className="min-h-screen bg-white">

                <main className="mx-auto max-w-6xl px-4 py-6">
                    <h1 className="mb-3 text-lg">Ваши избранные идеи:</h1>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        
                    </div>
                </main>
            </div>
        </>
    );
}