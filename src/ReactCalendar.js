import moment from "moment";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ReactCalendar() {
    const curDate = new Date();
    const [value, onChange] = useState(curDate);
    const activeDate = moment(value).format('YYYY/MM/DD')
    
    const monthOfActiveDate = moment(value).format('YYYY-MM')
    const [activeMonth, setActiveMonth] = useState(monthOfActiveDate)
}