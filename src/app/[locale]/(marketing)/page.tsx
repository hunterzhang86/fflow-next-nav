import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import HeroLanding from "@/components/sections/hero-landing";
import NavigationSection from "@/components/sections/navigation-section";
import NavHeroLanding from "@/components/sections/nav-hero-landing";

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("HomePage");

  return (
    <main>
      <NavHeroLanding locale={locale} />
      <NavigationSection locale={locale} />
    </main>
  );
}
