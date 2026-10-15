import VmSetupArticle from "@/components/labs/VmSetupArticle";
import { getLabArticle } from "../labArticles";

export default function Page() {
  const data = getLabArticle("windows-server-2022-vmware-setup");
  if (!data) return null;
  return <VmSetupArticle data={data} />;
}
