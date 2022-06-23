import React, { Component } from "react";
import "./About.css";
import profile_pic from "../assets/profile_pic.jpg";

export default class About extends Component {
  render() {
    return (
      <div>
        {/* <p>Design your About me page </p> */}
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={profile_pic}
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Ann Li</div>
            <div className="brief_description">
              sMy name is Ann Li and I am a rising third-year 
              at the University of Virginia. I am a double major 
              in computer science and cognitive science. In college,
              I have gotten more involved in theoretical computer
                science. A fun fact about me is that I joined the UVA ballroom
                dance club without any ballroom experience.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
