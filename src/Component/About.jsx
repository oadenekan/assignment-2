import React from "react";
import { Outlet, Link } from "react-router-dom";
import Governance from "./Governance";
import Corporate from "./Corporate";

const About = () => {
  return (
    <React.Fragment>
      <div>This is About page</div>
      <li className="about-nested-wrapper">
        <Link to="governance">Governance</Link >
      </li>
      <li className="about-nested-wrapper">
        <Link to="corporate">Corporate</Link >
      </li>
      <Outlet/>
    </React.Fragment>
  )
}
export default About;