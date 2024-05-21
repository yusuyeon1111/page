import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import {Routes, Route} from "react-router-dom";
import { createContext, useContext, useEffect, useState } from 'react';
import Calender from './components/Calender';
import moment from 'moment';
import Main from './components/Main';
import UserContext from './UserContext';
function App() {
  const [todayFull, setTodayFull] = useState("");
  const [chgDay, setChgDay] = useState("");
  const [clkCal, setClkCal] = useState(false);
  useEffect(()=>{
    const moment = require('moment');
    const date = moment().format('YYYY/MM/DD');
    setTodayFull(date)
  },[])

  return (
    <div className="App">
    <div className="App">
    <UserContext.Provider value={{chgDay, setChgDay, clkCal, setClkCal, todayFull, setTodayFull}}>
    <Header/>
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/cal' element={<Calender/>}/>
    </Routes>
    </UserContext.Provider>
</div>
    </div>
  );
}

export default App;
