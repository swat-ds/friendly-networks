import React from "react";
import { Row } from "react-bootstrap";
import '../assets/styles/timeline.scss'

  const monthNames = [
    { name: "January", abbr: "Jan" },
    { name: "Febuary", abbr: "Feb" },
    { name: "March", abbr: "Mar" },
    { name: "April", abbr: "Apr" },
    { name: "May", abbr: "May" },
    { name: "June", abbr: "Jun" },
    { name: "July", abbr: "Jul" },
    { name: "August", abbr: "Aug" },
    { name: "September", abbr: "Sep" },
    { name: "October", abbr: "Oct" },
    { name: "November", abbr: "Nov" },
    { name: "December", abbr: "Dec" },
  ];
/**
 *
 * @returns
 */
const Timeline = (props) => {
    const {timelineData}  = props;
    console.log(typeof timelineData);

    const renderEvent = (moment, index)=>{
  
       let dateParts = moment.Date.split("-");
       //Not assumed if any of the date parts exists.
       let year = dateParts.length > 0 ? dateParts[0] : "";
       let month = dateParts.length > 1 ? dateParts[1] : "";
       let day = dateParts.length > 2 ? dateParts[2] : "";
       let event = moment.Event ? moment.Event : "";
       let tentativeComma = month && day? ',': ''
       let monthIndex = null;
       if(month !==""){
         monthIndex = month.charAt(0) == '0'? month.charAt(1): month;
       }
       return (
         <div class="timeline">
           <div class="icon"></div>
           <div class="date-content">
             <div class="date-outer">
               <span class="date">
                 <span class="index">{index + 1}</span>
                 {monthIndex !== null ? (
                   <span class="month">{`${
                     monthNames[monthIndex - 1].abbr
                   } ${day} ${tentativeComma} `}</span>
                 ) : (
                   ""
                 )}
                 <span class="year">{year}</span>
               </span>
             </div>
           </div>
           <div class="timeline-content">
             <p class="description">{event}</p>
           </div>
         </div>
       );
    }
    const renderTimeline = () =>{
       return (
         <div class="main-timeline">{timelineData.map(renderEvent)}</div>
       );
    }
  return (
    <Row id="timeline-row">
      {renderTimeline()}
    </Row>
  );
};

export default Timeline;
