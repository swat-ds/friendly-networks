import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import { FaBars } from "react-icons/fa";
import { menuData } from "../assets/data/MenuData";
import { Button } from "./Button";
const Header = (props) => {
  return (
    // <Div>
    //   <div className="nav-page">
    //     <ul>
    //       <li>
    //         <Link to="/" className="link">
    //           home
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/about" className="link">
    //           about
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/contact" className="link">
    //           contact
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="query">
    //     <input
    //       type="text"
    //       className="search-bar"
    //       placeholder="Type to Search..."
    //     />
    //     <button className="search-btn">Search</button>
    //   </div>
    //   {props.children}
    // </Div>
    <Nav>
      <NavLink to="/">OBF</NavLink>
      <Bars />
      <NavMenu>
        {menuData.map((item, index) => (
          <NavLink to={item.link} key={index}>
            {item.title}
          </NavLink>
        ))}
      </NavMenu>
      <NavBtn>
        <Button primary="true" round="true" to="/trips">
          Espanol
        </Button>
      </NavBtn>
    </Nav>
  );
};

//TODO: Style this component
// const Div = styled.header`
//   display: flex;
//   flex-wrap: wrap;
//   border: medium solid #2596be;
//   text-align: center;
//   justify-content: center;
//   background: rebeccapurple;
//   color: white;
//   height: 6rem;

//   .query {
//     position: absolute;
//     height: fit-content;
//     width: fit-content;
//     left: 70%;
//     top: 6%;
//     border: medium solid #2596be;
//   }

//   .search-bar {
//     height: 40px;
//     width: 15rem;
//   }
//   .search-btn {
//     height: 40px;
//   }

//   .nav-page {
//     position: absolute;
//     border: medium solid #2596be;
//     height: 3%;
//     width: 20%;
//     left: 70%;
//     top: 1%;
//   }

//   .nav-page ul {
//     margin: 0;
//     padding: 0;
//     display: flex;
//     flex-flow: row nowrap;
//     justify-content: space-around;
//   }

//   .nav-page li {
//     margin: 0;
//     padding: 0;
//     display: block;
//   }
//   .link{
//       color: white;
//       text-decoration: none;
//   }
// `;
const Nav = styled.nav`
  background: rebeccapurple;
  height: 80px;
  display: flex;

  justify-content: space-between;
  padding: 0.5rem calc((100vw -1300vw) / 2);
  z-index: 100;
  position: relative;
`;

const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`;
const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -48px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export default Header;
