import { Box } from "@chakra-ui/react";
import "allotment/dist/style.css";
import { withUrqlClient } from "next-urql";
import SelectedDataProvider from "../../../components/helper/SelectedDataProvider";
import PrimaryLayout from "../../../components/layouts/PrimaryLayout";
import NavBar from "../../../components/navbar/NavBar";
import NotesContent from "../../../components/notes/notes-content/NotesContent";
import { MyNotesSmallDesktopViewPaneVisibleProvider } from "../../../contexts/MyNotesSmallDesktopViewPaneVisibleContext";
import { useMeQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useIsAuth } from "../../../utils/hooks/useIsAuth";
import { NextPageWithLayout } from "../../page";

const MyNotes: NextPageWithLayout = () => {
  const [meResult] = useMeQuery();

  useIsAuth(meResult);

  return (
    <Box className="my-notes-page" h={"100%"}>
      <SelectedDataProvider>
        <NavBar user={meResult} />
        {!meResult.fetching && meResult.data ? (
          <MyNotesSmallDesktopViewPaneVisibleProvider>
            <NotesContent />
          </MyNotesSmallDesktopViewPaneVisibleProvider>
        ) : null}
      </SelectedDataProvider>
    </Box>
  );
};

MyNotes.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default withUrqlClient(createUrqlClient)(MyNotes);
