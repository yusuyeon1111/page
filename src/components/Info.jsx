import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../css/info.css'
import { BsFillInfoSquareFill } from "react-icons/bs";
import UserContext from '../UserContext';
const Info = () => {
  const { todayFull } = useContext(UserContext);
  const [endDay, setEndDay] = useState("")
  const [noticeData, setNoticeData] = useState([]);
  const nav = useNavigate();
  const [none, setNone] = useState("")
  // 날짜 
  useEffect(() => {
    setNoticeData([])
    const fetchData = async () => {
      try {
        const response = await axios.get('/apiInfo/info');
        const filterdata = response.data.filter(item => {
          if (item['완료일'] && item['작성일']) {
            const completedMonth = parseInt(item['완료일'].split("/")[1], 10);
            const completedDay = parseInt(item['완료일'].split("/")[2], 10);
            const writtenMonth = parseInt(item['작성일'].split("/")[1], 10);
            const writtenDay = parseInt(item['작성일'].split("/")[2], 10);
            const todayMonth = parseInt(todayFull.split("/")[1], 10);
            const todayDay = parseInt(todayFull.split("/")[2], 10);
        
            // 작성일이 오늘보다 이전이고, 완료일이 오늘 이후인 경우에 필터링
            const isFiltered = (writtenMonth < todayMonth || 
                                (writtenMonth === todayMonth && writtenDay <= todayDay)) &&
                               (completedMonth > todayMonth || 
                                (completedMonth === todayMonth && completedDay >= todayDay));
            
            console.log("isFiltered:", isFiltered); // 필터링 결과 로그
        
            return isFiltered;
          }
          return false;
        });
        
        console.log(response.data)
        if (filterdata.length === 0) {
          setNone("공지사항 없음");
        } else {
          setNoticeData(filterdata);
          setNone(""); // 공지사항이 있으면 none을 초기화
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setNone("공지사항 없음");
      }
    };
    // 초기 실행
    fetchData();
    console.log("noticeData",noticeData)
    const interval = setInterval(fetchData, 60 * 60 * 1000);
    
    // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 setInterval을 정리
    return () => clearInterval(interval);
  }, [todayFull])


  return (
    <div className='info-container'>
      <div className='null'>
        {noticeData.length < 1 ? "" : <p style={{ marginTop: "100px" }}></p>}
      </div>
      <p>{noticeData.length === 0 ? "공지사항없음" : ""}</p>
      {noticeData.map((item, index) => (
        <div className='notice' key={index} style={{marginTop: noticeData.length <= 1 ? "-100px" : ""}}>
          <BsFillInfoSquareFill style={{ color: "#4974FF", fontSize: '30px', backgroundColor: 'white', padding: '10px', borderRadius: '10px', margin: '10px' }} />
          <div>
            <p>공지사항</p>
            <p>{item.제목}</p>
            <span>{item.작성일} ~ </span>
            <span>{item.완료일}</span>
          </div>

        </div>
      ))}
      <p className='top'>{noticeData.length == 1 ? null : ""}</p>
    </div>
  )
}

export default Info