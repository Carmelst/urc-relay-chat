import './App.css';
import {LoginPage} from "./user/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Button} from "@chakra-ui/react";
import { Landing } from './landingpage/Landing';
import { RegisterPage } from './user/Register';
function App() {

  return (
      <Router >
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={ <RegisterPage/>}></Route>
        </Routes>
     </Router>
         
  );
}

export default App;
