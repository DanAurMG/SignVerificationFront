import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Landing from "./screens/Landing";
import Login from "./screens/Login";
import ResetPass from "./screens/ResetPass";
import ResetingPass from "./screens/ResetingPass";
import Authorized from "./screens/Authorized";
import { useState } from "react";

function App() {

const [user, setUser] = useState([]);
const [emailRec, setEmailRec] = useState([]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signIn">
      {
        !user.length > 0
        ? <Route path="/signIn" element={<Login setUser = {setUser}/>} />
        : <Route path="/signIn" element={<Authorized user={user} setUser = {setUser}/>} />
      }
      </Route>
      {/* <Route path="/authorized" element={<Authorized />} /> */}
      <Route path="/reset" element={<ResetPass setEmailRec = {setEmailRec} setUser = {setUser}/>} />
      <Route path="/reset/authorized" element={<ResetingPass user={user} email={emailRec}/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
