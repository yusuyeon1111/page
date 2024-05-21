import React, { useContext, useEffect, useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Info from './Info';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import '../css/custom.css'
import axios from 'axios';
import UserContext from '../UserContext';
import { BsFillInfoSquareFill } from "react-icons/bs";
import img from '../info.png'
const Calender = () => {
  const curDate = new Date();
  const [value, onChange] = useState(curDate);
  const [mark, setMark] = useState([]);
  const nav = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [title,setTitle] = useState("");
  const [endDay, setEndDay] = useState("");
  const [noticeData, setNoticeData] = useState([])
  const [clk, setClk] = useState(false);
  const [info, setInfo] = useState("");
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get('/apiInfo/info');
        const date = response.data.map((item)=>item.작성일)
        const title = response.data.map((item)=>item.제목)
        const end = response.data.map((item)=>item.완료일)
        setTitle(title)
        setMark(date)
        setEndDay(end)
        setNoticeData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 60 * 60 * 1000);
    return () => clearInterval(interval);
  },[])

  
  return (
    <div className='calendar-container' >
      <IoArrowBack style={{fontSize:'50px'}} onClick={()=>nav("/")}/>
      <div className='test'>
      <div className='calendar' style={clk ? {width:'70%'} : {width : '100%'}}>
      <Calendar
        locale='en' 
        onChange={(date)=> {
          setSelectedDate(moment(date).format("YYYY/MM/DD"));
          console.log("클릭",selectedDate)
        }} 
        value={value}
        formatDay={(locale, date)=>moment(date).format('D')}
        showNeighboringMonth={false}
        calendarType='hebrew'
        tileDisabled={({ date }) =>
          !moment(date, "YYYY/MM/DD").isSame(moment(), 'day') && !mark.find(x => moment(x).isSame(date, 'day'))
        }
        
        tileContent={({date, view}) => {
          const formattedDate = moment(date).format("YYYY/MM/DD");
          const eventIndices = mark.reduce((acc, cur, index) => {
            if (cur === formattedDate) {
              acc.push(index);
            }
            return acc;
          }, []);
          
          if (eventIndices.length > 0) {
            return (
              <div className="event-container">
                {eventIndices.map((index) => (
                  <div key={index} className="event-title" onClick={()=>{setClk(true); setInfo(title[index])}}>{title[index]}</div>
                ))}
              </div>
            );
          } else {
            return null;
          }
        }}
        />
      </div>
      {clk ?
      <div className='clk-info'>
      <p>공지사항</p>
      <span>{info}</span>
      <img src={img} style={{width:'100%', marginTop:'10px'}}/>
      </div>
      : ""}
      
      </div>
      <div className='info-container'> 
         <div className='null'>
        {noticeData.length < 1? null: <p style={{marginTop:"320px"}}></p>}
        </div>
        <p>{noticeData.length == 0 ? "공지사항없음":""}</p>
        {noticeData.map((item, index) => (
        <div className='notice' key={index}>
           <BsFillInfoSquareFill style={{color:"#4974FF", fontSize:'30px',backgroundColor:'white',padding:'10px', borderRadius:'10px', margin:'10px'}} />
          <div>
             <p>공지사항</p>
            <p>{item.제목}</p>
            <p>{item.작성자}</p>
            <span>{item.작성일} ~ </span>
             <span>{item.완료일}</span>
          </div>
        </div>
          ))}
          <p className='top'>{noticeData.length == 1 ? "":null}</p>
          </div>
    </div>
  )
}

export default Calender