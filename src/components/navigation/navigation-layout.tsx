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
        "flex flex-col gap-4 md:flex-row md:gap-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}