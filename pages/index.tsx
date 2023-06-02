import EventBanner from "@/components/pages/main/EventBanner";
import Layout from "@/components/layouts/layout";
import LogoMainPage from "@/components/ui/Logo";
import BrandSort from "@/components/pages/main/brandsortSection/BrandSort";
import VehicleRecommendMain from "@/components/pages/main/vehicleRecommendSection/VehicleRecommendMain";
import Separator from "@/components/ui/Separator";
import { brandSortType } from "@/types/brandSortType";
import { RecoilRoot } from "recoil";

function Page(props: { data: brandSortType[]; }) {
  
  return (
    <main>
      <LogoMainPage />
      <BrandSort data={props.data}/>
      <VehicleRecommendMain />
      <Separator gutter={20} />
      <EventBanner />
    </main>
  );
}

Page.getLayout = function getLayout(Page: React.ReactNode) {
  return (
    <Layout>{Page}</Layout>
  );
};

export default Page;

export const getStaticProps = async () => {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/carbrand`);
  if(res.status !== 200) {
    return {
      notFound: true,
    };
  }
  const data = await res.json();

  return {
    props: {
      data : data,
    },
  };
}
