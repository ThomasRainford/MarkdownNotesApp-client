import PrimaryLayout from "../../components/layouts/PrimaryLayout";
import NavBar from "../../components/navbar/NavBar";
import { useMeQuery } from "../../generated/graphql";
import { useIsAuth } from "../../utils/useIsAuth";
import { NextPageWithLayout } from "../page";

const MyNotes: NextPageWithLayout = () => {
  const [meResult] = useMeQuery();

  useIsAuth(meResult);

  return (
    <>
      <NavBar user={meResult} />
    </>
  );
};

export default MyNotes;

MyNotes.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
