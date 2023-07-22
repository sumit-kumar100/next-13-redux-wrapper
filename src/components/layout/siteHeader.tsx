import Link from "next/link";
import { ThemeToggle } from "@/components/layout/themeToggle";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

export function SiteHeader() {
  const items: NavItem[] = siteConfig.mainNav;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
          {items?.length ? (
            <nav className="flex gap-6">
              {items?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      prefetch={true}
                      href={item.href}
                      className={cn(
                        "flex items-center text-sm font-medium text-muted-foreground",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

