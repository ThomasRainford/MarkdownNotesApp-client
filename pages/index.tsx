import NavBar from "../components/home/navbar/NavBar";
import PrimaryLayout from "../components/layouts/PrimaryLayout";
import { NextPageWithLayout } from "./page";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <NavBar />
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
