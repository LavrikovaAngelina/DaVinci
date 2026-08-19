import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import type { AppLayoutProps } from '@/types';
import { Link } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { logout } from '@/routes';
import { router } from '@inertiajs/react';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';



export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
            cleanup();
            router.flushAll();
        };
    return (
        <>
        <header className="bg-neutral-800 text-white">
                    <div className="mx-auto flex max-w-6xl items-center gap-8 px-4 py-3">
                        <span className="text-xl font-bold">Da Vinci</span>
                        <nav className="flex gap-6 text-sm">
                            <Link href="/">Главная</Link>
                            <Link href="/generator">Идеи</Link>
                            <Link href="/about">О проекте</Link>
                        </nav>
                        <div className="ml-auto flex items-center gap-3">
                            <Link href="/favorites">♥️</Link>
                            <Link href="/settings">⚙️</Link>
                            <Link
                                className="block w-full cursor-pointer h-10 w-20"
                                href={logout()}
                                as="button"
                                onClick={handleLogout}
                                data-test="logout-button"
                            >
                                <LogOut className="mr-2" />
                            </Link>
                            <Link href="/profile">
                                <div className="h-8 w-8 rounded bg-neutral-500" />
                            </Link>
                        </div>
                    </div>
                </header>
            
                <main>{children}</main>
            </>
    );
}

