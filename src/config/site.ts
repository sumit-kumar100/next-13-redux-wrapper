interface SiteConfig {
  name: string;
  description: string;
  mainNav: {
    title: string;
    href: string;
    disables?: boolean;
  }[];
  links: {};
}

export const siteConfig: SiteConfig = {
  name: "Next.js",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Products",
      href: "/products",
    },
    {
      title: "Todos",
      href: "/todos",
    },
  ],
  links: {},
};
