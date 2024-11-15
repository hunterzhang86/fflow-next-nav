import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Wrench, 
  BookOpen, 
  Database, 
  Brain,
  Code,
  Palette,
  Video,
  BookMarked,
  Bot,
  Cpu,
  MessageSquare,
  Image
} from "lucide-react";

interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  onSubCategorySelect?: (categoryId: string, subCategoryId: string) => void;
}

export default function Menu({ className, onSubCategorySelect, ...props }: MenuProps) {
  const t = useTranslations("Navigation.Menu");

  const categories = [
    { 
      id: "Finance", 
      label: "融资",
      icon: <Wrench className="h-4 w-4" />,
      subCategories: [
        { id: "Supply Chain Finance", label: "供应链融资", icon: <Code className="h-4 w-4" /> },
        { id: "Trade Finance", label: "贸易融资", icon: <Palette className="h-4 w-4" /> }
      ]
    },
    { 
      id: "resources", 
      label: "资源类",
      icon: <Database className="h-4 w-4" />,
      subCategories: [
        { id: "video", label: "视频资源", icon: <Video className="h-4 w-4" /> },
        { id: "books", label: "电子书籍", icon: <BookMarked className="h-4 w-4" /> }
      ]
    },
    { 
      id: "learning", 
      label: "学习类",
      icon: <BookOpen className="h-4 w-4" />,
      subCategories: [
        { id: "courses", label: "在线课程", icon: <BookOpen className="h-4 w-4" /> },
        { id: "tutorials", label: "教程文档", icon: <BookMarked className="h-4 w-4" /> }
      ]
    },
    { 
      id: "ai", 
      label: "AI 相关",
      icon: <Brain className="h-4 w-4" />,
      subCategories: [
        { id: "chatbots", label: "聊天机器人", icon: <MessageSquare className="h-4 w-4" /> },
        { id: "image-ai", label: "AI 绘画", icon: <Image className="h-4 w-4" /> },
        { id: "ai-tools", label: "AI 工具", icon: <Bot className="h-4 w-4" /> }
      ]
    }
  ];

  return (
    <div className={cn("rounded-lg border bg-card", className)} {...props}>
      <Accordion 
        type="multiple" 
        defaultValue={categories.map(cat => cat.id)} 
        className="w-full"
      >
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger className="px-4">
              <div className="flex items-center gap-2">
                {category.icon}
                <span>{category.label}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="flex flex-col space-y-2">
                {category.subCategories.map((sub) => (
                  <button 
                    key={sub.id}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-left hover:bg-accent hover:text-accent-foreground"
                    onClick={() => onSubCategorySelect?.(category.id, sub.id)}
                  >
                    {sub.icon}
                    <span>{sub.label}</span>
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}