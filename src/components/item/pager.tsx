import Link from "@/components/link/link";
import { Item } from "contentlayer/generated";

import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { getDocsConfig as getItemsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { ItemsConfig } from "@/types";
import { useTranslations } from "next-intl";

interface ItemsPagerProps {
  item: Item
}

export function ItemsPager({ item: item }: ItemsPagerProps) {
  const t = useTranslations();
  const itemsConfig = getItemsConfig(t);
  const pager = getPagerForDoc(item, itemsConfig)

  if (!pager) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev && (
        <Link
          href={pager.prev.href}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Icons.chevronLeft className="mr-2 size-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: "outline" }), "ml-auto")}
        >
          {pager.next.title}
          <Icons.chevronRight className="ml-2 size-4" />
        </Link>
      )}
    </div>
  )
}
export function getPagerForDoc(item: Item, itemsConfig: ItemsConfig) {
  const flattenedLinks = [null, ...flatten(itemsConfig.sidebarNav), null]
  const activeIndex = flattenedLinks.findIndex(
    (link) => item.slug === link?.href
  )
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null
  return {
    prev,
    next,
  }
}

export function flatten(links: { items?}[]) {
  return links.reduce((flat, link) => {
    return flat.concat(link.items ? flatten(link.items) : link)
  }, [])
}
