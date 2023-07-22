import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ProfilePageContainerLayout = ({ children }: Props) => {
  return (
    <Box id="profile-page-container" display={"flex"} h={"calc(100% - 64px)"}>
      <Box display={"flex"} h={"100%"} w={"100%"}>
        {children}
      </Box>
    </Box>
  );
};

export default ProfilePageContainerLayout;
