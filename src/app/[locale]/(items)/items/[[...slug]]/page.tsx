import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";

import { Mdx } from "@/components/content/mdx-components";
import { DocsPager } from "@/components/docs/pager";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { DashboardTableOfContents } from "@/components/shared/toc";
import { getTableOfContents } from "@/lib/toc";

import { constructMetadata, getBlurDataURL } from "@/lib/utils";
import "@/styles/mdx.css";
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

  return (
    <MaxWidthWrapper>
      <div className="container max-w-7xl mt-8">
        <div className="flex flex-col gap-8">
          {/* 面包屑导航 */}
          <div className="mb-4">
            <nav aria-label="breadcrumb" className="text-base">
              {/* ... 面包屑导航内容 ... */}
            </nav>
          </div>

          {/* 主要内容区域 */}
          <div className="grid grid-cols-1">
            <div className="gap-8 flex flex-col md:flex-row">
              {/* 左侧内容 */}
              <div className="flex flex-1 items-start">
                <div className="flex flex-col gap-8">
                  <h1 className="text-4xl tracking-wider font-bold flex items-center gap-2">
                    {doc.title}
                  </h1>
                  <p className="text-muted-foreground text-balance leading-relaxed">
                    {doc.description}
                  </p>
                </div>
              </div>

              {/* 右侧操作区 */}
              <div className="flex flex-col gap-4 mr-1 justify-start items-end">
                {/* ... 操作按钮等 ... */}
              </div>
            </div>
          </div>

          {/* 内容网格布局 */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
            {/* 主要内容区域 */}
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

            {/* 右侧边栏 */}
            <div className="lg:col-span-3 mt-20">
              <div className="hidden text-sm xl:block">
                <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-8">
                  <DashboardTableOfContents toc={toc} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
