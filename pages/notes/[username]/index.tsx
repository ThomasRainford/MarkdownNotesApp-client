import { Box } from "@chakra-ui/react";
import "allotment/dist/style.css";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SelectedDataProvider from "../../../components/helper/SelectedDataProvider";
import PrimaryLayout from "../../../components/layouts/PrimaryLayout";
import NavBar from "../../../components/navbar/NavBar";
import NotesContainer from "../../../components/notes/notes-container/NotesContainer";
import { useMeQuery, useUserQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useIsAuth } from "../../../utils/hooks/useIsAuth";
import { NextPageWithLayout } from "../../page";

const Notes: NextPageWithLayout = () => {
  const router = useRouter();
  const { username } = router.query as { username: string };
  const [meResult] = useMeQuery();
  const [userResult] = useUserQuery({
    variables: {
      username: username || "",
    },
  });

  useIsAuth(meResult);

  useEffect(() => {
    if (meResult.fetching) return;
    const selectedUserName = localStorage.getItem("selectedUser");
    if (selectedUserName !== username) {
      localStorage.setItem("selectedCollection", JSON.stringify(""));
      localStorage.setItem("selectedList", JSON.stringify(""));
      localStorage.setItem("selectedNote", JSON.stringify(""));
    }
    if (!selectedUserName) {
      localStorage.setItem("selectedUser", username);
    }
  }, [meResult.fetching, username]);

  return (
    <Box className="my-notes-page" h={"100%"}>
      <SelectedDataProvider>
        <NavBar user={meResult} />
        {!meResult.fetching && meResult.data ? (
          <NotesContainer user={userResult} me={meResult} />
        ) : null}
      </SelectedDataProvider>
    </Box>
  );
};

Notes.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default withUrqlClient(createUrqlClient as any)(Notes);
