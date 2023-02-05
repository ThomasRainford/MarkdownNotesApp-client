import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import SelectedDataProvider from "../../components/helper/SelectedDataProvider";
import PrimaryLayout from "../../components/layouts/PrimaryLayout";
import MyNotesContent from "../../components/my-notes/my-notes-content/MyNotesContent";
import NavBar from "../../components/navbar/NavBar";
import { useMeQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { NextPageWithLayout } from "../page";

const MyNotes: NextPageWithLayout = () => {
  const [meResult] = useMeQuery();

  useIsAuth(meResult);

  return (
    <Box className="my-notes-page" h={"100%"}>
      <NavBar user={meResult} />
      {!meResult.fetching && meResult.data ? (
        <SelectedDataProvider>
          <MyNotesContent />
        </SelectedDataProvider>
      ) : null}
    </Box>
  );
};

MyNotes.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default withUrqlClient(createUrqlClient)(MyNotes);
