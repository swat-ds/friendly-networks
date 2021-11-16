import React from "react";
import { Row, Col } from "react-bootstrap";
import '../assets/styles/timeline.scss'
import { months } from "../assets/data/globalVariables";
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
                     months[monthIndex - 1].abbr
                   } ${day} ${tentativeComma} `}</span>
                 ) : (
                   ""
                 )}
                 <span class="year">{year}</span>
               </span>
             </div>
           </div>
           <div class="timeline-content">
             <p class="description general-text">{event}</p>
           </div>
         </div>
       );
    }
    const renderTimeline = () =>{
       return (
         <div class="main-timeline" id="timeline">{timelineData.map(renderEvent)}</div>
       );
    }
  return (
    
    <Row id="timeline-row">
      <Col id="timeline-col">
        <h4 className="general-text">Visualization of the events</h4>
        {renderTimeline()}
        </Col>
    </Row>
  );
};

export default Timeline;
