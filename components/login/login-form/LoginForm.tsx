import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import * as Yup from "yup";
import { useLoginMutation } from "../../../generated/graphql";

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

const LoginForm = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  const toast = useToast();

  const formik = useFormik<FormValues>({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      usernameOrEmail: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, actions) => {
      const { usernameOrEmail, password } = values;
      const response = await login({ usernameOrEmail, password });
      if (response.data?.login.user && !toast.isActive("login")) {
        router.push("/");
        toast({
          id: "login",
          title: "Login Successfull",
          status: "success",
          position: "top",
          duration: 2000,
        });
      }
      if (response.data?.login.errors && !toast.isActive("login")) {
        toast({
          id: "login",
          title: "Login Failed",
          status: "error",
          position: "top",
          duration: 2000,
        });
      }
      actions.resetForm();
    },
  });

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={4}
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
          <Text fontSize={"lg"} color={"gray.400"}>
            Login to get started 😃
          </Text>
          <Box display={"flex"}>
            <Text
              as={Link}
              fontSize={"md"}
              color={"gray.500"}
              onClick={() => router.push("/account/register")}
            >
              Not signed up? Click here to register!
            </Text>
          </Box>
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
                type="text"
                value={formik.values.usernameOrEmail}
                onChange={formik.handleChange}
              />
              {formik.errors.usernameOrEmail &&
              formik.touched.usernameOrEmail ? (
                <Text fontSize="sm" fontStyle={"italic"} color={"red.300"}>
                  {formik.errors.usernameOrEmail}
                </Text>
              ) : null}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password ? (
                <Text fontSize="sm" fontStyle={"italic"} color={"red.300"}>
                  {formik.errors.password}
                </Text>
              ) : null}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
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
