import {Button} from "@chakra-ui/react";
import {useState} from "react";
import {UserList} from "./UserList";
import {SaloonList} from "./SaloonList";
import './Dashboard.css';
import {Messages} from "./Messages";
import {Client, TokenProvider} from "@pusher/push-notifications-web";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {showRoomMessage} from "../../app/userSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPeopleArrows, faUsersBetweenLines} from "@fortawesome/free-solid-svg-icons";



export const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [showUsers, setShowUsers] = useState<boolean>(true);
    const {externalId, token} = useSelector((state: RootState) => state.user);

    return (
        <>
            <div className="dashboard">

                <div className="dashboard-left">
                    <div className="dashboard-navbar-header">
                            <Button className={showUsers ? 'active' : ''} variant="ghost" colorScheme="white" mx="3" size="md" letterSpacing="0.5px" onClick={() => {setShowUsers(true); dispatch(showRoomMessage(false))}}>
                                <FontAwesomeIcon icon={faPeopleArrows} />Users
                            </Button>
                            <Button className={!showUsers ? 'active' : ''} variant="ghost" colorScheme="white" mx="3" size="md" letterSpacing="0.5px" onClick={() => {setShowUsers(false); dispatch(showRoomMessage(true))}}>
                                <FontAwesomeIcon icon={faUsersBetweenLines} /> Saloons
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
                    <Messages></Messages>
                </div>
            </div>
        </>
    )
        ;
}