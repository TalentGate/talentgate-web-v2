"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

function getBreadcrumbs(path: string) {
  const segments = path.split("/").filter(Boolean);
  const breadcrumbs = [];
  let currentPath = "";

  for (let i = 0; i < segments.length; i++) {
    currentPath += "/" + segments[i];
    const label = segments[i]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    breadcrumbs.push({
      href: currentPath,
      label,
      isLast: i === segments.length - 1,
    });
  }
  return breadcrumbs;
}

const AppBreadcrumb = () => {
  const path = usePathname();
  const breadcrumbs = getBreadcrumbs(path);

  if (breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={"/dashboard"}>TalentGate</Link>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        {breadcrumbs.map((crumb, idx) => (
          <BreadcrumbItem key={crumb.href}>
            {crumb.isLast ? (
              <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
