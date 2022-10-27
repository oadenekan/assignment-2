import React from "react";
import { Outlet } from "react-router-dom";

const About = () => {
  return (
    <React.Fragment>
      <div>This is About page</div>
      <Outlet/>
    </React.Fragment>
  )
}
export default About;