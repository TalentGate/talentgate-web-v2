'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  ArrowUpCircleIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  LucideIcon,
  BellIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
  MoonIcon,
  Briefcase,
  BookUser,
  BriefcaseBusiness,
  CalendarIcon,
  SunIcon,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

import { LoginError } from '@/app/(auth)/login/_lib/slice';
import {
  useRetrieveCurrentUserMutation,
  useRetrieveCurrentUserProfileMutation,
} from '@/app/(company)/account/_lib/slice';
import { LogoutError, useLogoutMutation } from '@/app/_lib/slice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroupContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    subItems?: {
      title: string;
      url: string;
    }[];
  }[];
}

export function NavMain({ items }: NavMainProps) {
  const path = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            if (!item.subItems) {
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={
                      path === item.url
                        ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                        : ''
                    }
                    asChild
                  >
                    <a href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            } else {
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {item.subItems.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          href={subItem.url}
                          className={cn([
                            path === subItem.url
                              ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                              : '',
                          ])}
                        >
                          {subItem.title}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              );
            }
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const [
    retrieveCurrentUser,
    {
      data: retrieveCurrentUserData,
      isLoading: isRetrieveCurrentUserLoading,
      isSuccess: isRetrieveCurrentUserSuccess,
    },
  ] = useRetrieveCurrentUserMutation();
  const [
    retrieveCurrentUserProfile,
    {
      data: retrieveCurrentUserProfileData,
      isLoading: isRetrieveCurrentUserProfileLoading,
      isSuccess: isRetrieveCurrentUserProfileSuccess,
    },
  ] = useRetrieveCurrentUserProfileMutation();

  const [profileImage, setProfileImage] = useState(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/me/profile`
  );
  const [logout, { isSuccess: isLogoutSuccess }] = useLogoutMutation();

  const handleLogoutSubmit = async () => {
    try {
      await logout({}).unwrap();
    } catch (err) {
      toast.error('Authentication Failed', {
        description:
          ((err as FetchBaseQueryError)?.data as LogoutError)?.detail ||
          'Something went wrong. Please try again later.',
      });
    }
  };

  React.useEffect(() => {
    try {
      setProfileImage(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/me/profile#${Date.now()}`);
      toast.success('Profile Image Updated', {
        description: 'Your profile image has been successfully updated.',
      });
    } catch (err) {
      toast.error('Retrieve Current User Failed', {
        description:
          ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
          'Something went wrong. Please try again later.',
      });
    }
  }, [setProfileImage, retrieveCurrentUserProfile]);

  React.useEffect(() => {
    try {
      retrieveCurrentUser({}).unwrap();
    } catch (err) {
      toast.error('Retrieve Current User Failed', {
        description:
          ((err as FetchBaseQueryError)?.data as LoginError)?.detail ||
          'Something went wrong. Please try again later.',
      });
    }
  }, [retrieveCurrentUser]);

  React.useEffect(() => {
    if (isLogoutSuccess) {
      signOut({ callbackUrl: '/login' });
    }
  }, [isLogoutSuccess, router]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={profileImage} alt={retrieveCurrentUserData?.username} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{retrieveCurrentUserData?.username}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {retrieveCurrentUserData?.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={profileImage} alt={retrieveCurrentUserData?.username} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{retrieveCurrentUserData?.username}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {retrieveCurrentUserData?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? (
                  <>
                    <SunIcon />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <MoonIcon />
                    <span>Dark Mode</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={'/account'}>
                  <UserCircleIcon />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogoutSubmit}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://github.com/shadcn.png',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboardIcon,
    },
    {
      title: 'Jobs',
      url: '/jobs',
      icon: Briefcase,
    },
    {
      title: 'Applications',
      url: '/applications',
      icon: BookUser,
    },
    {
      title: 'Events',
      url: '/events',
      icon: CalendarIcon,
      subItems: [
        {
          title: 'Event Calendar',
          url: '/events/event-calendar',
        },
        {
          title: 'Event List',
          url: '/events/event-list',
        },
      ],
    },
    {
      title: 'Company Settings',
      url: '/company-settings/company-information',
      icon: SettingsIcon,
      subItems: [
        {
          title: 'Company Information',
          url: '/company-settings/company-information',
        },
        {
          title: 'Employees',
          url: '/company-settings/employees',
        },
        {
          title: 'Billing and Subscription',
          url: '/company-settings/billing-and-subscription',
        },
        {
          title: 'Contact Talentgate',
          url: '/company-settings/contact-talentgate',
        },
      ],
    },
    {
      title: 'Careers Page',
      url: '/careers',
      icon: BriefcaseBusiness,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="/dashboard">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">TalentGate</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
