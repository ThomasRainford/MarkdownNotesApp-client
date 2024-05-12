import "allotment/dist/style.css";
import { SSRExchange, withUrqlClient } from "next-urql";
import SelectedDataProvider from "../components/helper/SelectedDataProvider";
import PrimaryLayout from "../components/layouts/PrimaryLayout";
import NavBar from "../components/navbar/NavBar";
import { useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { NextPageWithLayout } from "./page";

const Home: NextPageWithLayout = () => {
  const [meResult] = useMeQuery();

  return (
    <>
      <SelectedDataProvider>
        <NavBar user={meResult} />
      </SelectedDataProvider>
    </>
  );
};

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default withUrqlClient((ssrExchange: SSRExchange) => {
  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId") || "";
  }
  return createUrqlClient(ssrExchange, userId);
})(Home);
