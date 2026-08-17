import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import type { AppLayoutProps } from '@/types';
import { Link } from '@inertiajs/react';


export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    return (
        <>
        <header className="bg-neutral-800 text-white">
                    <div className="mx-auto flex max-w-6xl items-center gap-8 px-4 py-3">
                        <span className="text-xl font-bold">Da Vinci</span>
                        <nav className="flex gap-6 text-sm">
                            <Link href="/">Главная</Link>
                            <Link href="/generator">Идеи</Link>
                            <Link href="/ideas/test">Тест</Link>
                            <Link href="/about">О проекте</Link>
                        </nav>
                        <div className="ml-auto flex items-center gap-3">
                            <Link href="/favorites">♥️</Link>
                            <div className="h-8 w-8 rounded bg-neutral-500" />
                        </div>
                    </div>
                </header>
            
                <main>{children}</main>
            </>
    );
}

