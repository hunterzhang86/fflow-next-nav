import { useTranslations } from "next-intl";

import { env } from "@/env.mjs";
import { cn, nFormatter } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "@/components/link/link";
import { Icons } from "@/components/shared/icons";
import { siteConfig } from "@/config/site";

interface HeroLandingProps {
  locale: string;
}

export default async function HeroLanding({ locale }: HeroLandingProps) {
  const t = useTranslations("HeroLanding");
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/hunterzhang86/fflow-next",
    {
      ...(env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      // data will revalidate every hour
      next: { revalidate: 3600 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

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
          <Icons.twitter className="ml-2 size-3.5" />
        </Link>

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
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

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href={`/pricing`}
            prefetch={true}
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "gap-2",
            )}
          >
            <span>{t("goPricing")}</span>
            <Icons.arrowRight className="size-4" />
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
                rounded: "full",
              }),
              "px-5",
            )}
          >
            <Icons.gitHub className="mr-2 size-4" />
            <p>
              <span className="hidden sm:inline-block">{t("starOn")}</span> GitHub{" "}
              <span className="font-semibold">{nFormatter(stars)}</span>
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
