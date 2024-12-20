import React, {useState} from "react";
import {
  Box,
  Heading,
  VStack,
  Button,
  Link as ChakraLink,
  FormErrorMessage,
  HStack,
  Checkbox,
  useColorModeValue, FormControl, FormLabel, Input, Spinner, Alert, AlertIcon,
} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import './Login.css';
import {useDispatch} from "react-redux";
import {loginUser} from "./loginApi";
import {Session} from "../../model/common";
import {CustomError} from "../../model/CustomError";
import {connect} from "../../app/userSlice";


export const LoginPage = () => {
  const importantTextColor = useColorModeValue("blue.500", "blue.200");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<CustomError>({} as CustomError);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError({} as CustomError);
    setLoading(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    loginUser({user_id: -1, username:  data.get('username') as string, password: data.get('password') as string},
        (result: Session) => {
          dispatch(connect(result));
          //console.log(result);
          form.reset();
          setError(new CustomError(""));
          setLoading(false);
          window.Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              // OK
            }
          });
          navigate("/messages/user/");
        }, (loginError: CustomError) => {
          setLoading(false);
          setError(loginError);
          //console.log(error);
        });
  };

  return (
      <div className="login-page">
        <Box className="login-box"
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
              <form onSubmit={handleSubmit}>
                <FormControl mt="4">
                  <FormLabel>Username</FormLabel>
                  <Input id="username"  name="username" placeholder="Username" type="text" autoComplete="off" />
                  <FormErrorMessage>Username is required</FormErrorMessage>
                </FormControl>

                <FormControl mt="4">
                  <FormLabel>Password</FormLabel>
                  <Input id="password" name="password" type="password" placeholder="Password"/>
                  <FormErrorMessage>Password is required</FormErrorMessage>
                </FormControl>

                { error.message ?
                    <Alert status='error'>
                      <AlertIcon />
                      {error.message}
                    </Alert>
                    : null}

                <Checkbox mt="4">Remember me</Checkbox>

                <Button mt="6" width="full" colorScheme="blue" type="submit">
                  { loading ? <Spinner></Spinner> :  "Sign in" }
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
      </div>

  );
};
