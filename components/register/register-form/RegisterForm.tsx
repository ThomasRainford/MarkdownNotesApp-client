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
import { useRegisterMutation } from "../../../generated/graphql";

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Props {}

const RegisterForm = (): JSX.Element => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  const toast = useToast();

  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .test("passwords-match", "Passwords must match", function (value) {
          return this.parent.password === value;
        })
        .required("Required"),
    }),
    onSubmit: async (values, actions) => {
      const { username, email, password } = values;
      const response = await register({
        registerInput: { username, email, password },
      });
      if (response.data?.register.user && !toast.isActive("register")) {
        router.push("/");
        toast({
          id: "register",
          title: "Registered Successfull",
          status: "success",
          position: "top",
          duration: 2000,
        });
      }
      if (response.data?.register.errors && !toast.isActive("register")) {
        toast({
          id: "register",
          title: "Register Failed",
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
          <Heading fontSize={"4xl"}>Welcome</Heading>
          <Text fontSize={"lg"} color={"gray.400"}>
            Register to get started 😃
          </Text>
          <Box display={"flex"}>
            <Text
              as={Link}
              fontSize={"md"}
              color={"gray.500"}
              onClick={() => router.push("/account/login")}
            >
              Already signed up? Click here to login!
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
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username && formik.touched.username ? (
                <Text
                  id="username123"
                  fontSize="sm"
                  fontStyle={"italic"}
                  color={"red.300"}
                >
                  {formik.errors.username}
                </Text>
              ) : null}
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email ? (
                <Text
                  id="email123"
                  fontSize="sm"
                  fontStyle={"italic"}
                  color={"red.300"}
                >
                  {formik.errors.email}
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
                <Text
                  id="password123"
                  fontSize="sm"
                  fontStyle={"italic"}
                  color={"red.300"}
                >
                  {formik.errors.password}
                </Text>
              ) : null}
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              {formik.errors.confirmPassword &&
              formik.touched.confirmPassword ? (
                <Text
                  id="confirmpassword123"
                  fontSize="sm"
                  fontStyle={"italic"}
                  color={"red.300"}
                >
                  {formik.errors.confirmPassword}
                </Text>
              ) : null}
            </FormControl>
            <Stack spacing={10}>
              <Button
                type="submit"
                bg={"blue.400"}
                mt={"1em"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterForm;
