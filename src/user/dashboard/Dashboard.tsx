import {Button} from "@chakra-ui/react";
import {useState} from "react";
import {UserList} from "./UserList";
import {SaloonList} from "./SaloonList";
import './Dashboard.css';
import {Message} from "./Message";


export const Dashboard = () => {
    const [showUsers, setShowUsers] = useState<boolean>(true);

    return (
        <>
            <div className="dashboard">

                <div className="dashboard-left">
                    <div className="dashboard-navbar-header">
                            <Button className={showUsers ? 'active' : ''} variant="ghost" colorScheme="white" mx="3" size="md" letterSpacing="0.5px" onClick={() => setShowUsers(true)}>
                                Users
                            </Button>
                            <Button className={!showUsers ? 'active' : ''} variant="ghost" colorScheme="white" mx="3" size="md" letterSpacing="0.5px" onClick={() => setShowUsers(false)}>
                                Saloons
                            </Button>
                    </div>
                    <div className="dashboard-navbar-main">
                        {
                            showUsers ?
                                <UserList></UserList>
                                :
                                <SaloonList></SaloonList>
                        }
                    </div>
                </div>
                <div className="dashboard-main">
                    <Message></Message>
                </div>
            </div>
        </>
    )
        ;
}