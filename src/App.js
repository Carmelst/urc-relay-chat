import './App.css';
import {LoginPage} from "./user/login/LoginPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Landing } from './landingpage/Landing';
import { RegisterPage } from './user/register/Register';
import {Navbar} from "./landingpage/Navbar";
import {Dashboard} from "./user/dashboard/Dashboard";
import {useSelector} from "react-redux";
function App() {
    const connected = useSelector((state) => state.user.token);
    //console.log('token from appjs', token);
  return (
      <>
          <Router>
              <div className="App">
                  <Navbar/>
                  <Routes>
                      <Route path='/' element={ connected ?  <Dashboard/> : <Landing/>}>
                      </Route>
                      <Route path='/login' element={ connected ?  <Dashboard/> : <LoginPage/>} />
                      <Route path='/register' element={ connected ?  <Dashboard/> : <RegisterPage/>}></Route>
                      <Route path="/messages/user/" element={ connected ?  <Dashboard/> : <Landing />} />
                      <Route path="/messages/user/:user_id" element={ connected ?  <Dashboard/> : <Landing />} />
                      <Route path="/messages/room/" element={ connected ?  <Dashboard/> : <Landing />} />
                      <Route path="/messages/room/:room_id" element={ connected ?  <Dashboard/> : <Landing />} />
                  </Routes>
              </div>
          </Router>
      </>
  );
}

export default App;
