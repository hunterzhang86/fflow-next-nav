import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BarChart3, ExternalLink, Hash } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface CardsProps extends React.HTMLAttributes<HTMLDivElement> {}

interface Website {
  id: number;
  title: string;
  icon: string;
  categories: string[];
  description: string;
  featured?: boolean;
  discount?: string;
  hot?: boolean;
  tags: string[];
  metrics: {
    monthlyVisits: string;
    dr: number;
    as: number;
  };
}

export default function Cards({ className, ...props }: CardsProps) {
  const t = useTranslations("Navigation.Cards");

  const websites: Website[] = [
    {
      id: 1,
      title: "AI Best Tools",
      icon: "/placeholder.svg",
      categories: ["AI", "Productivity"],
      description: "AIBest.Tools is a curated list of the best AI tools that are currently trending and profitable.",
      featured: true,
      hot: true,
      discount: "30% off",
      tags: ["Freemium"],
      metrics: {
        monthlyVisits: "4k",
        dr: 11,
        as: 2
      }
    },
    {
      id: 2,
      title: "开发工具集",
      icon: "/placeholder.svg",
      categories: ["开发", "工具"],
      description: "为开发者提供的全套开发工具集合，包括代码编辑器、调试工具等。",
      featured: false,
      tags: ["开发者工具"],
      metrics: {
        monthlyVisits: "2k",
        dr: 8,
        as: 1
      }
    },
    {
      id: 3,
      title: "设计资源库",
      icon: "/placeholder.svg",
      categories: ["设计", "资源"],
      description: "海量设计资源，包括UI组件、图标、插画等设计素材。",
      featured: true,
      discount: "20% off",
      tags: ["设计资源"],
      metrics: {
        monthlyVisits: "3k",
        dr: 9,
        as: 2
      }
    },
    {
        id: 4,
        title: "设计资源库",
        icon: "/placeholder.svg",
        categories: ["设计", "资源"],
        description: "海量设计资源，包括UI组件、图标、插画等设计素材。",
        featured: true,
        discount: "20% off",
        tags: ["设计资源"],
        metrics: {
          monthlyVisits: "3k",
          dr: 9,
          as: 2
        }
      },
      {
        id: 1,
        title: "AI Best Tools",
        icon: "/placeholder.svg",
        categories: ["AI", "Productivity"],
        description: "AIBest.Tools is a curated list of the best AI tools that are currently trending and profitable.",
        featured: true,
        discount: "30% off",
        tags: ["Freemium"],
        metrics: {
          monthlyVisits: "4k",
          dr: 11,
          as: 2
        }
      },
      {
        id: 2,
        title: "开发工具集",
        icon: "/placeholder.svg",
        categories: ["开发", "工具"],
        description: "为开发者提供的全套开发工具集合，包括代码编辑器、调试工具等。",
        featured: false,
        tags: ["开发者工具"],
        metrics: {
          monthlyVisits: "2k",
          dr: 8,
          as: 1
        }
      },
      {
        id: 3,
        title: "设计资源库",
        icon: "/placeholder.svg",
        categories: ["设计", "资源"],
        description: "海量设计资源，包括UI组件、图标、插画等设计素材。",
        featured: true,
        discount: "20% off",
        tags: ["设计资源"],
        metrics: {
          monthlyVisits: "3k",
          dr: 9,
          as: 2
        }
      },
      {
          id: 4,
          title: "设计资源库",
          icon: "/placeholder.svg",
          categories: ["设计", "资源"],
          description: "海量设计资源，包括UI组件、图标、插画等设计素材。",
          featured: true,
          discount: "20% off",
          tags: ["设计资源"],
          metrics: {
            monthlyVisits: "3k",
            dr: 9,
            as: 2
          }
        }
  ];

  // 对网站列表进行排序，hot 的排在前面
  const sortedWebsites = [...websites].sort((a, b) => {
    if (a.hot && !b.hot) return -1;
    if (!a.hot && b.hot) return 1;
    return 0;
  });

  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 lg:gap-x-8",
      className
    )} {...props}>
      {sortedWebsites.map((site) => (
        <Card 
          key={site.id} 
          className={cn(
            "flex flex-col justify-between gap-2 relative p-4 shadow-sm hover:shadow-md transition-shadow duration-300 h-[160px] sm:h-[180px]",
            site.hot 
              ? "border-orange-300 dark:border-orange-400/50 bg-orange-50/50 dark:bg-orange-950/10"
              : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
          )}
        >
          <div className="flex flex-col gap-2 group">
            <div className="flex flex-row items-center justify-between gap-2 min-h-[3.5rem]">
              <div className="shrink-0">
                <Image
                  src={site.icon}
                  alt={site.title}
                  width={44}
                  height={44}
                  className="rounded-full w-9 h-9 sm:w-11 sm:h-11"
                />
              </div>
              <div className="flex flex-col flex-1 gap-1 min-w-0">
                <Link href="#" className="flex items-center gap-2 font-bold">
                  <h3 className="w-fit flex-1 text-xs sm:text-sm font-semibold line-clamp-1 flex items-center gap-2 ml-1 hover:text-primary transition-all duration-200">
                    {site.title}
                    <ExternalLink className="hidden group-hover:block h-3 w-3 sm:h-4 sm:w-4" />
                  </h3>
                </Link>
                <div className="flex flex-col gap-1 sm:gap-2">
                  <div className="flex flex-wrap gap-1">
                    {site.categories.map((category, index) => (
                      <Link href={`/category/${category.toLowerCase()}`} key={index}>
                        <span className="tracking-tight text-[10px] sm:text-xs bg-muted px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm border border-transparent hover:border-primary transition-all duration-200">
                          {category}
                        </span>
                      </Link>
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

            <Link href="#">
              <p className="text-xs sm:text-sm line-clamp-2 leading-relaxed hover:cursor-pointer hover:font-bold transition-all duration-200">
                {site.description}
              </p>
            </Link>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex-1">
              <div className="flex flex-wrap gap-1 sm:gap-2 items-center">
                {site.tags.map((tag, index) => (
                  <Link href={`/tag/${tag.toLowerCase()}`} key={index} className="flex items-center justify-center space-x-0.5 group">
                    <Hash className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
                    <span className="text-xs sm:text-sm text-muted-foreground tracking-tight">{tag}</span>
                  </Link>
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