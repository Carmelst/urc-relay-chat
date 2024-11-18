import {
  Box,
  Heading,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useColorModeValue, Alert,
} from "@chakra-ui/react";
import './Register.css';
import React from "react";
import {useNavigate} from "react-router-dom";
import {saveUser} from "../../app/services";


export const RegisterPage = () => {
  const importantTextColor = useColorModeValue("blue.500", "blue.200");
  const navigate = useNavigate();
  const [passwordValid, setPasswordValid] = React.useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if( data.get('password1') === data.get('password2') ) {
      saveUser({email : data.get('email') as string, username: data.get('username') as string, password: data.get('password1') as string })
          .then(()=> navigate("/login"))
          .catch(()=> console.error("Error creating user"));
    }
    else {
      setPasswordValid(false);
    }

  };


  return (
      <div className="register-page">
        <Box className="register-page"
             display="flex"
             alignItems="center"
             justifyContent="center"
             marginTop="100px"
             bg={useColorModeValue("gray.100", "gray.900")}
      >
        <Box
            bg="chakra-body-bg"
            borderWidth="1px"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            backgroundColor={useColorModeValue("white", "gray.800")}
            maxWidth="800px"
            p="12"
            borderRadius="md"
            boxShadow="md"
        >
          <Heading mb="8" textAlign="center" fontSize="2xl" color={importantTextColor}>
            Create an account
          </Heading>
          <VStack spacing="4">
            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <FormControl mt="4" width="400px" isRequired={true}>
                <FormLabel>Email</FormLabel>
                <Input id="email" name="email" placeholder="Email" type="email" />
                <FormErrorMessage>Email is required</FormErrorMessage>
              </FormControl>

              <FormControl mt="4" isRequired={true}>
                <FormLabel>Username</FormLabel>
                <Input id="username" name="username" type="text" placeholder="Username" />
                <FormErrorMessage>Password is required</FormErrorMessage>
              </FormControl>

              <FormControl mt="4" isRequired={true}>
                <FormLabel>Password</FormLabel>
                <Input id="password1" name="password1" type="text" placeholder="Password" />
                <FormErrorMessage>Password is required</FormErrorMessage>
              </FormControl>

              <FormControl mt="4" isRequired={true}>
                <FormLabel>Password</FormLabel>
                <Input id="password2" name="password2" type="text" placeholder="Confirm your Password" />
                <FormErrorMessage>Password is required</FormErrorMessage>
              </FormControl>

              {passwordValid ?
                  null
                  :
                  <Alert title="Wrong passwords" color={"red"}>
                    Make sure your passwords are the same
                  </Alert>
              }



              <Button mt="6" width="full" colorScheme="blue" type="submit">
                Register
              </Button>
            </form>
          </VStack>
        </Box>
      </Box>
      </div>

  );
};
