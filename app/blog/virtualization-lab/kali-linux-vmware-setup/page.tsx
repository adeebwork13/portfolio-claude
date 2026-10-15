import VmSetupArticle from "@/components/labs/VmSetupArticle";
import { getLabArticle } from "../labArticles";

export default function Page() {
  const data = getLabArticle("kali-linux-vmware-setup");
  if (!data) return null;
  return <VmSetupArticle data={data} />;
}
