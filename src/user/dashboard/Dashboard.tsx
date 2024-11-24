import {Button} from "@chakra-ui/react";
import {useState} from "react";
import {UserList} from "./UserList";
import {SaloonList} from "./SaloonList";
import './Dashboard.css';
import {Messages} from "./Messages";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {showRoomMessage} from "../../app/userSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPeopleArrows, faUsersBetweenLines} from "@fortawesome/free-solid-svg-icons";
import {Client, TokenProvider} from "@pusher/push-notifications-web";



export const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [showUsers, setShowUsers] = useState<boolean>(true);
    const {externalId, token} = useSelector((state: RootState) => state.user);

    const beamsClient = new Client({
        instanceId: 'a31f2055-ce9d-4e3a-8b45-53092db14832',
    });
    const beamsTokenProvider = new TokenProvider({
        url: "/api/beams",
        headers: {
            Authentication: `Bearer ${token}`
        },
    });
    beamsClient.start()
        .then(() => beamsClient.addDeviceInterest('global'))
        .then(() => beamsClient.setUserId(externalId, beamsTokenProvider))
        .then(() => {
            beamsClient.getDeviceId().then(deviceId => console.log("Push id : " + deviceId));
        })
        .catch(console.error);

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