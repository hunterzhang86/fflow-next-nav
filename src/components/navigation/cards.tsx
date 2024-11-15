import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { allItems } from "contentlayer/generated";
import { BarChart3, ExternalLink, Hash } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface CardsProps extends React.HTMLAttributes<HTMLDivElement> {
  categoryId?: string;
  subCategoryId?: string;
}

interface Website {
  id: number;
  title: string;
  icon: string;
  website: string;
  categories: string[];
  subCategories: string[];
  description: string;
  featured?: boolean;
  discount?: string;
  hot?: boolean;
  tags: string[];
  metrics: {
    monthlyVisits: number;
    dr: number;
    as: number;
  };
  slug: string;
}

export default function Cards({ className, categoryId, subCategoryId, ...props }: CardsProps) {
  const t = useTranslations("Navigation.Cards");

  let websites: Website[] = allItems.map((item) => ({
    id: item.id,
    title: item.title,
    website: item.website,
    description: item.description || '',
    icon: item.icon,
    categories: item.categories,
    subCategories: item.subCategories,
    featured: item.featured,
    hot: item.hot,
    discount: item.discount,
    tags: item.tags || [],
    metrics: {
        monthlyVisits: item.monthlyVisits,
        dr: item.domainRating,
        as: item.authorityScore
    },
    slug: item.slug
  })) as Website[];

  console.log("websites", websites);

  // Filter websites based on locale
  const locale = useLocale();
  websites = websites.filter((website) => website.slug.includes(`/${locale}/`));

  // 修改筛选逻辑
  const filteredWebsites = categoryId && subCategoryId
    ? websites.filter(site => 
        site.categories.includes(categoryId) && 
        site.subCategories.includes(subCategoryId)
      )
    : websites;

  // 对筛选后的网站列表进行排序，hot 的排在前面
  const sortedWebsites = [...filteredWebsites].sort((a, b) => {
    if (a.hot && !b.hot) return -1;
    if (!a.hot && b.hot) return 1;
    return 0;
  });

  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] gap-6",
      className
    )} {...props}>
      {sortedWebsites.map((site) => (
        <Card 
          key={`site-${site.id}`}
          className={cn(
            "flex flex-col justify-between relative p-4 shadow-sm hover:shadow-md transition-shadow duration-300 h-[200px]",
            site.hot 
              ? "border-orange-300 dark:border-orange-400/50 bg-orange-50/50 dark:bg-orange-950/10"
              : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
          )}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="shrink-0">
                <Image
                  src={site.icon}
                  alt={site.title}
                  width={44}
                  height={44}
                  className="rounded-full w-11 h-11"
                />
              </div>
              <div className="flex flex-col flex-1 gap-1 min-w-0">
                <Link href={site.website} target="_blank" className="flex items-center gap-2 font-bold">
                  <h3 className="w-fit flex-1 text-xs sm:text-sm font-semibold line-clamp-1 flex items-center gap-2 ml-1 hover:text-primary transition-all duration-200">
                    {site.title}
                    <ExternalLink className="hidden group-hover:block h-3 w-3 sm:h-4 sm:w-4" />
                  </h3>
                </Link>
                <div className="flex flex-col gap-1 sm:gap-2">
                  <div className="flex flex-wrap gap-1">
                    {site.categories.map((category, index) => (
                        <span 
                            key={`${site.id}-category-${index}`}
                            className="tracking-tight text-[10px] sm:text-xs bg-muted px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm border border-transparent hover:border-primary transition-all duration-200"
                        >
                            {category}
                        </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col h-full gap-1.5 sm:gap-2 items-end justify-start">
                {site.featured && (
                  <div className="flex flex-row bg-orange-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm">
                    <span className="text-[10px] sm:text-xs text-white font-semibold">Featured</span>
                  </div>
                )}
                {site.discount && (
                  <div className="flex flex-row border border-blue-400/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm w-fit">
                    <span className="text-[10px] sm:text-xs font-semibold text-blue-500">{site.discount}</span>
                  </div>
                )}
              </div>
            </div>

            <Link href={site.slug.replace(`/${locale}/`, '/')} className="group">
              <p className="text-sm line-clamp-2 leading-relaxed hover:cursor-pointer hover:font-bold transition-all duration-200">
                {site.description}
              </p>
            </Link>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex-1">
              <div className="flex flex-wrap gap-1 sm:gap-2 items-center">
                {site.tags.map((tag, index) => (
                    <span 
                        key={`${site.id}-tag-${index}`}
                        className="text-xs sm:text-sm text-muted-foreground tracking-tight"
                    >
                        {tag}
                    </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="flex flex-row justify-center items-center gap-1 text-[10px] sm:text-xs tracking-tight">
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only">Month Visit</span>
                <span>{site.metrics.monthlyVisits}</span>
                <span>DR: {site.metrics.dr}</span>
                <span>AS: {site.metrics.as}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}