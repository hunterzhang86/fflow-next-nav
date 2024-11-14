import { cn } from "@/lib/utils";

interface NavigationLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function NavigationLayout({
  className,
  children,
  ...props
}: NavigationLayoutProps) {
  return (
    <div
      className={cn(
        "grid md:grid-cols-[250px_1fr] gap-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}