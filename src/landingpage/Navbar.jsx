import './Navbar.css';
import { Box, Flex, Button, Spacer, Heading } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {disconnect} from "../app/userSlice";

export function Navbar() {
    const { token, username } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(disconnect());
    }
    return (
        <Box bg="blue.600" color="white" py="4" px="8" className="Navbar">
            <Flex>
                <Heading size="lg">UBO Relay Chat App</Heading>
                <Spacer />
                {
                    token ?
                        <>
                            <Heading size="lg">Bienvenue {username}</Heading>
                            <Link to="/">
                                <Button variant="ghost" colorScheme="white" mx="3" size="md" letterSpacing="0.5px" onClick={handleLogout}>
                                    Log out
                                </Button>
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/login">
                                <Button variant="ghost" colorScheme="white" mx="3" size="md" letterSpacing="0.5px">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="ghost" colorScheme="white" mx="3" size="md" letterSpacing="0.5px">
                                    Register
                                </Button>
                            </Link>
                        </>

                }
            </Flex>
        </Box>
    );
}
