import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import moment from 'moment'
import '../css/week.css'
import { MdCircle } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

const Week = () => {
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [first, setFirst] = useState("");
  const [today, setToday] = useState("");
  const {todayFull, setTodayFull} = useContext(UserContext);
  const nav = useNavigate();
  // 월요일
  const [Monday, setModay] = useState("");
  // 화요일
  const [Tuesday, setTuesday] = useState("");
  // 수요일
  const [Wednesday, setWednesday] = useState("");
  // 목요일
  const [Thursday, setThursday] = useState("");
  // 금요일
  const [Friday, setFriday] = useState("");
  // 토요일
  const [Saturday, setSaturday] = useState("");

  const [clk, setClk] = useState(false);
  const [clkDay, setClkDay] = useState("");
  const {clkCal, setClkCal} = useContext(UserContext);

  useEffect(()=>{
    setFirst(parseInt(moment().clone().startOf("week").format('DD')))
    setModay(parseInt(moment().clone().startOf("week").add(1, "days").format('DD')))
    setTuesday(parseInt(moment().clone().startOf("week").add(2, "days").format('DD')))
    setWednesday(parseInt(moment().clone().startOf("week").add(3, "days").format('DD')))
    setThursday(parseInt(moment().clone().startOf("week").add(4, "days").format('DD')))
    setFriday(parseInt(moment().clone().startOf("week").add(5, "days").format('DD')))
    setSaturday(parseInt(moment().clone().startOf("week").add(6, "days").format('DD')))
    
    setToday(moment().day())
    setMonth(moment().clone().format('MM'))
    setDate(moment().clone().format('D'))
    setTodayFull(moment().format("YYYY/MM/DD"))
    console.log(today)
    if(today===0){
      setDay("일요일")
    }
    else if(today===1){
      setDay("월요일")
    }
    else if(today===2){
      setDay("화요일")
    }
    else if(today===3){
      setDay("수요일")
    }
    else if(today===4){
      setDay("목요일")
    }
    else if(today===5){
      setDay("금요일")
    }
    else if(today===6){
      setDay("토요일")
    }
  },[today])
  
  useEffect(() => {
    if (clk) {
      console.log("클릭됨");
      console.log(clkDay);
    }
  }, [clk, clkDay]);

  return (
    <div className='today-container'>
      <p style={{fontSize : '25px', marginLeft : '80px'}} className='today'>오늘은 {month}월 {date}일 {day} 입니다!</p>
      <div className='border-act'>
      <p style={{border:'px solid black'}}></p>
      </div>
      <div className='week-icon'>
      <FaPlusSquare
        style={{ fontSize: '35px', color: "#4974FF" }}
        onClick={() => nav("/cal")}
        />
      </div>
      <div className='week-container'>
      <div className='week-Sunday' style={today === 0 && !clk ? { backgroundColor: '#4974FF', color:'white' } : first == clkDay && clk ? {backgroundColor: '#4974FF', color:'white' }:null} 
      onClick={()=>{setClk(true); setClkDay(first); setTodayFull(moment().clone().startOf("week").format('YYYY/MM/DD'))}}>
        <p className='day'>S</p>
        <p>{first}</p>
        <p><MdCircle style={today === 0 ? { color: 'white' } : {color:'white'}}/></p>
      </div>
      <div className='week-Monday' style={today === 1  && !clk ? { backgroundColor: '#4974FF' , color:'white'} : Monday == clkDay && clk ? {backgroundColor: '#4974FF', color:'white' }:null} 
      onClick={()=>{setClk(true); setClkDay(Monday); setTodayFull(moment().clone().startOf("week").add(1, "days").format('YYYY/MM/DD'))}}>
        <p className='day'>M</p>
        <p>{Monday}</p>
        <p><MdCircle style={today === 1 ? { color: 'white' } : {color:'white'}}/></p>
      </div>
      <div className='week-Tuesday' style={today === 2  && !clk ? { backgroundColor: '#4974FF' , color:'white'} : Tuesday == clkDay &&  clk ? {backgroundColor: '#4974FF', color:'white' }:null} 
      onClick={()=>{setClk(true); setClkDay(Tuesday); setTodayFull(moment().clone().startOf("week").add(2, "days").format('YYYY/MM/DD'))}}>
        <p className='day'>T</p>
        <p>{Tuesday}</p>
        <p><MdCircle style={today === 2 ? { color: 'white' } : {color:'white'}}/></p>
      </div>
      <div className='week-Wednesday' style={today === 3 && !clk ? { backgroundColor: '#4974FF' , color:'white'} : Wednesday == clkDay && clk ? {backgroundColor: '#4974FF', color:'white' }:null} 
      onClick={()=>{setClk(true); setClkDay(Wednesday); setTodayFull(moment().clone().startOf("week").add(3, "days").format('YYYY/MM/DD'))}}>
        <p className='day'>W</p>
        <p>{Wednesday}</p>
        <p><MdCircle style={today === 3 ? { color: 'white' } : {color:'white'}}/></p>
      </div>
      <div className='week-Thursday' style={today === 4 && !clk ? { backgroundColor: '#4974FF' , color:'white'} :Thursday == clkDay  && clk ? {backgroundColor: '#4974FF', color:'white' }:null} 
      onClick={()=>{setClk(true); setClkDay(Thursday); setTodayFull(moment().clone().startOf("week").add(4, "days").format('YYYY/MM/DD'))}}>
      <p className='day'>T</p>
        <p>{Thursday}</p>
        <p><MdCircle style={today === 4 ? { color: 'white' } : {color:'white'}}/></p>
      </div>
      <div className='week-Friday' style={today === 5 && !clk ? { backgroundColor: '#4974FF' , color:'white'} :Friday == clkDay && clk ? {backgroundColor: '#4974FF', color:'white' }:null} 
      onClick={()=>{setClk(true); setClkDay(Friday); setTodayFull(moment().clone().startOf("week").add(5, "days").format('YYYY/MM/DD'))}}>
      <p className='day'>F</p>
        <p>{Friday}</p>
        <p><MdCircle style={today === 5 ? { color: 'white' } : {color:'white'}}/></p>
      </div>
      <div className='week-Saturday' style={today === 6 && !clk ? { backgroundColor: '#4974FF' , color:'white'} : Saturday == clkDay && clk ? {backgroundColor: '#4974FF', color:'white' }:null} 
      onClick={()=>{setClk(true); setClkDay(Saturday); setTodayFull(moment().clone().startOf("week").add(6, "days").format('YYYY/MM/DD'))}}>
      <p className='day'>S</p>
        <p>{Saturday}</p>
        <p><MdCircle style={today === 6 && !clk ? { color: 'white' } : {color:'white'}}/></p>
      </div>
      </div>
    </div>
  )
}

export default Week