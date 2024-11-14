import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardsProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Cards({ className, ...props }: CardsProps) {
  const t = useTranslations("Navigation.Cards");

  const websites = [
    {
      id: 1,
      title: "网站名称 1",
      description: "这是一个示例网站描述",
      icon: "🌐",
    },
    {
      id: 2,
      title: "网站名称 2",
      description: "另一个示例网站描述",
      icon: "🔗",
    },
    // 添加更多网站...
  ];

  return (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}
      {...props}
    >
      {websites.map((site) => (
        <Card key={site.id} className="cursor-pointer hover:bg-accent">
          <CardHeader className="flex flex-row items-center gap-2">
            <span className="text-2xl">{site.icon}</span>
            <CardTitle className="text-lg">{site.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{site.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}