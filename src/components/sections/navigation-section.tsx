import { useTranslations } from "next-intl";
import NavigationLayout from "@/components/navigation/navigation-layout";
import Menu from "@/components/navigation/menu";
import Cards from "@/components/navigation/cards";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function NavigationSection({ locale }: { locale: string }) {
  const t = useTranslations("Navigation");

  return (
    <section className="py-0">
      <MaxWidthWrapper>
        <div className="mt-0">
          <NavigationLayout>
            <Menu className="w-full md:w-1/4" />
            <Cards className="w-full md:w-3/4" />
          </NavigationLayout>
        </div>
      </MaxWidthWrapper>
    </section>
  );
} 