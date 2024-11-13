import {
  Button,
  Image,
  Card,
  ButtonGroup,
  Divider,
  CardBody,
  Heading,
  Stack,
  Text,
  CardFooter,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import './Landing.css';

export function Landing() {
  return (
    <div className="landing">
      <Card maxW="md" align='center'>
        <CardBody>
          <Image
            src=""
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="lg" textAlign='center'>UBO Relay Chat App</Heading>
            <Text>
              UBO Relay Chat Une messagerie sécurisée, intelligente et facile à utiliser.
              Gérez votre boîte de réception plus rapidement, chez vous et partout où vous allez. 
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="3">
            <Link to="/login">
              <Button variant="solid" colorScheme="blue"  size='md' height='48px' width='125px' border='2px'>
              Login
              </Button> 
            </Link>
            <Link to="/register">
              <Button variant="ghost" colorScheme="blue"  size='md' height='48px' width='125px' border='2px'>
              Register
              </Button>              
            </Link>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}
