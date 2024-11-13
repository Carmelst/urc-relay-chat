import {
  Box,
  Heading,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";

export const RegisterPage = () => {
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
        maxWidth="600px"
        p="12"
        borderRadius="md"
        boxShadow="md"
      >
        <Heading mb="8" textAlign="center" fontSize="2xl" color={importantTextColor}>
          Create an account
        </Heading>
        <VStack spacing="4">
          {/* Login Form */}
          <form>
            <FormControl mt="4">
              <FormLabel>Email</FormLabel>
              <Input id="email" placeholder="Email" type="text" />
              <FormErrorMessage>Email is required</FormErrorMessage>
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Password</FormLabel>
              <Input id="password1" type="text" placeholder="Password" />
              <FormErrorMessage>Password is required</FormErrorMessage>
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Password</FormLabel>
              <Input id="password2" type="text" placeholder="Password" />
              <FormErrorMessage>Confirm your password</FormErrorMessage>
            </FormControl>


            <Button mt="6" width="full" colorScheme="blue" type="submit">
              Register
            </Button>
          </form>
        </VStack>
      </Box>
    </Box>
  );
};
