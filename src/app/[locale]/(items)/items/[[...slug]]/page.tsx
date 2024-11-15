import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";

import { Mdx } from "@/components/content/mdx-components";
import { DocsPager } from "@/components/docs/pager";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { getTableOfContents } from "@/lib/toc";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { constructMetadata, getBlurDataURL } from "@/lib/utils";
import "@/styles/mdx.css";
import { BarChartIcon, ExternalLinkIcon, GlobeIcon, InfoCircledIcon, StackIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams(params) {
  const slug = params.slug
    ? params.locale + "/" + params.slug.join("/")
    : params.locale;
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);
  if (!doc) return null;
  return doc;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params);
  if (!doc) return {};
  return constructMetadata({
    title: `${doc.title} – FFlow Next`,
    description: doc.description,
  });
}

export async function generateStaticParams(): Promise<DocPageProps["params"][]> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);
  const images = await Promise.all(
    doc.images.map(async (src: string) => ({
      src,
      blurDataURL: await getBlurDataURL(src),
    }))
  );

  const breadcrumbSegments = [
    { title: "Items", href: "/items" },
    ...(params.slug?.map((segment, index) => ({
      title: segment,
      href: `/items/${params.slug.slice(0, index + 1).join("/")}`,
      hasDropdown: index === params.slug.length - 1
    })) || []),
    { title: doc.title, href: "#", active: true }
  ];

  return (
    <MaxWidthWrapper>
      <div className="container max-w-7xl mt-8">
        <div className="flex flex-col gap-8">
          <Breadcrumb segments={breadcrumbSegments} />

          {/* 改进的标题和描述区域 */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GlobeIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
              </div>
              {doc.website && (
                <a
                  href={doc.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <span>Visit Website</span>
                  <ExternalLinkIcon className="w-4 h-4" />
                </a>
              )}
            </div>
            {doc.description && (
              <p className="text-lg text-muted-foreground">{doc.description}</p>
            )}
          </div>

          {/* 主要内容区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
            {/* 左侧主要内容 */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="border shadow-md rounded-lg p-6 mr-0 lg:mr-8">
                <article className="prose dark:prose-invert max-w-none">
                  <Mdx code={doc.body.raw} images={images} />
                </article>
              </div>
              <div className="flex items-center justify-start mt-16">
                <DocsPager doc={doc} />
              </div>
            </div>

            {/* 右侧信息卡片 */}
            <div className="lg:col-span-3">
              <div className="flex flex-col space-y-8">
                {/* 基本信息卡片 */}
                <div className="bg-muted/50 rounded-lg p-6">
                  <div className="flex flex-row items-center justify-start gap-2 mb-4">
                    <InfoCircledIcon className="w-5 h-5" />
                    <h2 className="text-lg font-semibold">Information</h2>
                  </div>
                  <ul className="space-y-4 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Website</span>
                      <a href={doc.website} target="_blank" className="font-medium link-underline">
                        {doc.website}
                      </a>
                    </li>
                    {doc.email && (
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span className="font-medium">{doc.email}</span>
                      </li>
                    )}
                    {/* 社交媒体链接 */}
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Social Media</span>
                      <div className="flex items-center gap-2">
                        {doc.twitter && (
                          <a href={doc.twitter} target="_blank" className="hover:scale-110 transition-transform">
                            <TwitterIcon className="w-4 h-4" />
                          </a>
                        )}
                        {/* 其他社交媒体图标... */}
                      </div>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Published date</span>
                      <span className="font-medium">{doc.publishDate}</span>
                    </li>
                  </ul>
                </div>

                {/* 数据统计卡片 */}
                <div className="bg-muted/50 rounded-lg p-6">
                  <div className="flex flex-row items-center justify-start gap-2 mb-4">
                    <BarChartIcon className="w-5 h-5" />
                    <h2 className="text-lg font-semibold">Data</h2>
                  </div>
                  <ul className="space-y-4 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Visitors</span>
                      <span className="font-medium">{doc.monthlyVisits}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Domain Rating</span>
                      <span className="font-medium">{doc.domainRating}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Authority Score</span>
                      <span className="font-medium">{doc.authorityScore}</span>
                    </li>
                  </ul>
                </div>

                {/* 分类标签卡片 */}
                <div className="bg-muted/50 rounded-lg p-6">
                  <div className="flex flex-row items-center justify-start gap-2 mb-4">
                    <StackIcon className="w-5 h-5" />
                    <h2 className="text-lg font-semibold">Categories & Tags</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {doc.categories?.map((category) => (
                      <span key={category} className="text-sm px-2 py-1 bg-primary/10 rounded-md">
                        {category}
                      </span>
                    ))}
                    {doc.tags?.map((tag) => (
                      <span key={tag} className="text-sm px-2 py-1 bg-secondary/10 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
