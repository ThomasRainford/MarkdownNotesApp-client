import { Box, Center, Grid, Heading, SimpleGrid } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import PrimaryLayout from "../../components/layouts/PrimaryLayout";
import RegisterForm from "../../components/register/register-form/RegisterForm";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { NextPageWithLayout } from "../page";

const Register: NextPageWithLayout = () => {
  return (
    <Grid as={SimpleGrid} columns={{ base: 1, sm: 1, md: 2 }}>
      <Box>
        <RegisterForm />
      </Box>
      <Box bg="blue.500">
        <Center minH={{ base: "5em" }} h="100%">
          <Heading fontSize={{ base: "4xl", md: "5xl" }}>MDN Notes</Heading>
        </Center>
      </Box>
    </Grid>
  );
};

Register.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default withUrqlClient(createUrqlClient as any)(Register);
