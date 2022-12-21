import { withUrqlClient } from "next-urql";
import PrimaryLayout from "../../components/layouts/PrimaryLayout";
import CollectionView from "../../components/my-notes/collection-view/CollectionView";
import NavBar from "../../components/navbar/NavBar";
import { LocalStorageProvider } from "../../contexts/LocalStorageContext";
import { useMeQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { NextPageWithLayout } from "../page";

const MyNotes: NextPageWithLayout = () => {
  const [meResult] = useMeQuery();

  useIsAuth(meResult);

  return (
    <>
      <NavBar user={meResult} />
      <LocalStorageProvider storageKey="selectedCollection">
        <CollectionView />
      </LocalStorageProvider>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(MyNotes);

MyNotes.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
