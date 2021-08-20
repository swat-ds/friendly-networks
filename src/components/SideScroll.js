import React from 'react'
import { AnchorLink } from "gatsby-plugin-anchor-links";
import "../assets/styles/background.scss";

const SideScroll = ({links}) => {
    return (
      <div className="scroll-links">
       {links.map(link =>{
           return (
             <AnchorLink className="g-link2" to={link.link}>
               {link.title}
             </AnchorLink>
           );
       })}
      </div>
    );
}

export default SideScroll
