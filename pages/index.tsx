import NavBar from "../components/home/navbar/NavBar";
import PrimaryLayout from "../components/layouts/PrimaryLayout";
import { useMeQuery } from "../generated/graphql";
import { NextPageWithLayout } from "./page";

const Home: NextPageWithLayout = () => {
  const [meResult] = useMeQuery();

  return (
    <>
      <NavBar user={meResult} />
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
