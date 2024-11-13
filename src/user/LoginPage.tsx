import React from "react";
import {
  Box,
  Heading,
  VStack,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  FormErrorMessage,
  HStack,
  Checkbox,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const importantTextColor = useColorModeValue("blue.500", "blue.200");

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Box 
        bg="chakra-body-bg"
        borderWidth="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        backgroundColor={useColorModeValue("white", "gray.800")}
        maxWidth="400px"
        p="8"
        borderRadius="md"
        boxShadow="md"
      >
        <Heading mb="8" textAlign="center" fontSize="2xl" color={importantTextColor}>
          Sign in to your account
        </Heading>

        <VStack spacing="6">
          {/* Login Form */}
          <form>
            <FormControl mt="4">
              <FormLabel>Email</FormLabel>
              <Input id="email" placeholder="Email" type="text" />
              <FormErrorMessage>Email is required</FormErrorMessage>
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Password</FormLabel>
              <Input id="password" type="password" placeholder="Password" />
              <FormErrorMessage>Password is required</FormErrorMessage>
            </FormControl>

            <Checkbox mt="4">Remember me</Checkbox>

            <Button mt="6" width="full" colorScheme="blue" type="submit">
              Sign in
            </Button>
          </form>

          {/* Additional Links */}
          <HStack justifyContent="space-between" fontSize="sm" mt="4">
            <ChakraLink color={importantTextColor} as={Link} to="/forgot-password">
              Forgot password?
            </ChakraLink>
            <Box>
              Don’t have an account?
              <ChakraLink ml="1" color={importantTextColor} as={Link} to="/register">
                Sign up
              </ChakraLink>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
