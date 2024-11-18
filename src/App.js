import './App.css';
import {LoginPage} from "./user/login/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from './landingpage/Landing';
import { RegisterPage } from './user/register/Register';
import {Navbar} from "./landingpage/Navbar";
import {Dashboard} from "./user/dashboard/Dashboard";
import {useSelector} from "react-redux";
function App() {
    const { token } = useSelector((state) => state.user);
  return (
      <>
          <Router>
              <div className="App">
                  <Navbar/>
                  <Routes>
                      <Route path='/' element={ token ?  <Dashboard/> : <Landing/>}></Route>
                      <Route path='/login' element={ token ?  <Dashboard/> : <LoginPage/>} />
                      <Route path='/register' element={ token ?  <Dashboard/> : <RegisterPage/>}></Route>
                      <Route path="/dashboard" element={ token ?  <Dashboard/> : <Landing />} />
                  </Routes>
              </div>
          </Router>
      </>
  );
}

export default App;
