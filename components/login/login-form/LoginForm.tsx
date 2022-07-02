import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { FormEvent } from "react";

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

const LoginForm = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values));
      actions.resetForm();
    },
  });

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        border={"1px"}
        borderColor={"gray.900"}
        boxShadow={"md"}
      >
        <Stack align={"center"}>
          <Heading size="4xl">📘</Heading>
          <Heading fontSize={"4xl"}>Welcome back!</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Login to get started 😃
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack
            as="form"
            onSubmit={(e) =>
              formik.handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
            }
          >
            <FormControl id="usernameOrEmail">
              <FormLabel>Username or Email address</FormLabel>
              <Input
                type="email"
                value={formik.values.usernameOrEmail}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
