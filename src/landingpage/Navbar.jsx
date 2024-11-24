import './Navbar.css';
import { Box, Flex, Button, Spacer, Heading } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {disconnect} from "../app/userSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket, faRightToBracket, faUserPlus} from "@fortawesome/free-solid-svg-icons";


export function Navbar() {
    const { token, username } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        localStorage.removeItem("token");
        sessionStorage.clear();
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
                            <Heading size="lg">Welcome {username}</Heading>
                            <Spacer/>
                            <Link to="/">
                                <Button variant="ghost" colorScheme="white" mx="3" size="md" letterSpacing="0.5px" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                    Log out
                                </Button>
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/login">
                                <Button variant="ghost" colorScheme="white" mx="3" size="md" letterSpacing="0.5px">
                                    <FontAwesomeIcon icon={faRightToBracket} />
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="ghost" colorScheme="white" mx="3" size="md" letterSpacing="0.5px">
                                    <FontAwesomeIcon icon={faUserPlus} />
                                    Register
                                </Button>
                            </Link>
                        </>

                }
            </Flex>
        </Box>
    );
}
