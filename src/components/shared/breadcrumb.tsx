import { ChevronRight, ChevronsUpDown, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbProps {
  segments: {
    title: string;
    href: string;
    active?: boolean;
    hasDropdown?: boolean;
  }[];
}

export function Breadcrumb({ segments }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
        <li className="inline-flex items-center gap-1.5">
          <Link 
            href="/" 
            className="transition-colors hover:text-foreground"
          >
            <div className="flex items-center gap-1">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </div>
          </Link>
        </li>
        
        {segments.map((segment, index) => (
          <li key={segment.href} className="inline-flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            {segment.active ? (
              <span 
                role="link" 
                aria-disabled="true" 
                aria-current="page" 
                className="text-foreground font-medium"
              >
                {segment.title}
              </span>
            ) : (
              <div className="flex items-center gap-1">
                <Link
                  href={segment.href}
                  className="transition-colors hover:text-foreground"
                >
                  <span>{segment.title}</span>
                </Link>
                {segment.hasDropdown && (
                  <ChevronsUpDown className="w-4 h-4" />
                )}
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 