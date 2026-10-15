import { notFound } from "next/navigation";

import VmSetupArticle from "@/components/labs/VmSetupArticle";
import { getLabArticle } from "../labArticles";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const article = getLabArticle(slug);

  if (!article) {
    notFound();
  }

  return <VmSetupArticle data={article} />;
}