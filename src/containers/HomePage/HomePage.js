import React, { Component } from "react";

import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import MedicalFacility from "./Section/MedicalFacility";
import Specialty from "./Section/Specialty";

import "./HomePage.scss"

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      //   nextArrow: <SampleNextArrow />,
      //   prevArrow: <SamplePrevArrow />,
    }
    return (
        <div>
            <HomeHeader/>
            <Specialty settings = {settings} />
            <MedicalFacility settings = {settings} />
            <OutStandingDoctor settings = {settings} />
            <HandBook settings = {settings} />
            <About/>
            <HomeFooter/>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
