import { Center, Grid, GridItem } from "@chakra-ui/react";
import PrimaryLayout from "../../components/layouts/PrimaryLayout";
import { NextPageWithLayout } from "../page";

const Login: NextPageWithLayout = () => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" w="100%" h="100%">
      <GridItem bg="blue.500" w="100%">
        <Center h="100%">Icon here</Center>
      </GridItem>
      <GridItem w="100%">
        <Center h="100%">Login form here</Center>
      </GridItem>
    </Grid>
  );
};

export default Login;

Login.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
