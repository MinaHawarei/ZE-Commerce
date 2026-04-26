import { Link } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard , home } from '@/routes';
import type { NavItem } from '@/types';
import { usePage } from '@inertiajs/react';
import support from '@/routes/admin/support';



export function AppSidebar() {
    const { auth } = usePage<any>().props;

const isAdmin = auth?.user?.role === 'admin';

const mainNavItems: NavItem[] = isAdmin
    ? [
        {
            title: 'Overview',
            href: '/admin',
            icon: LayoutGrid,
        },
        {
            title: 'Manage Orders',
            href: '/admin/orders',
            icon: FolderGit2,
        },
        {
            title: 'Service Catalog',
            href: '/admin/services',
            icon: FolderGit2,
        },
        {
            title: 'User Management',
            href: '#',
            icon: FolderGit2,
        },
        {
            title: 'Tech Support',
            href: support.index.url(),
            icon: FolderGit2,
        },
      ]
    : [
        {
            title: 'My Services',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'My Orders',
            href: '/orders',
            icon: FolderGit2,
        },
        {
            title: 'Support Tickets',
            href: '/support',
            icon: FolderGit2,
        },
    ];

const footerNavItems: NavItem[] = [
    {
        title: 'Back to Store',
        href: home(),
        icon: BookOpen,
    },
];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
