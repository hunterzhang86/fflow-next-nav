import { useTranslations } from "next-intl";

import { env } from "@/env.mjs";
import { cn, nFormatter } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "@/components/link/link";
import { Icons } from "@/components/shared/icons";
import { siteConfig } from "@/config/site";

interface NavHeroLandingProps {
  locale: string;
}

export default async function NavHeroLanding({ locale }: NavHeroLandingProps) {
  const t = useTranslations("HeroLanding");

  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <Link
          locale={false}
          href="https://twitter.com/hunterzhang86"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm", rounded: "full" }),
            "px-4",
          )}
          target="_blank"
        >
          <span className="mr-3">🎉</span>
          <span className="hidden md:flex">&nbsp;</span> {t("introducing")}{" "}
        </Link>

        <h1 className="whitespace-nowrap font-urban text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
          {t("kickoff")}{" "}
          <span className="text-gradient_indigo-purple font-extrabold">
            {t("saasStarter")}
          </span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          {t("description")}
        </p>
      </div>
    </section>
  );
}
