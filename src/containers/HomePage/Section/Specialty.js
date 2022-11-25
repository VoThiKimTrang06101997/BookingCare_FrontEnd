import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import "./Specialty.scss";

// Import React-Slick
import Slider from "react-slick";


class Specialty extends Component {
  render() {
    return (
      <Fragment>
        <div className="section-specialty">
          <div className="specialty-container">
            <div className="specialty-header">
              <span className="title-section text-danger"><b>Chuyên khoa phổ biến</b></span>
              <button className="btn-section">Xem thêm</button>
            </div>

            <div className="specialty-body">
              <Slider {...this.props.settings} >
                <div className="specialty-customize">
                  <div className="bg-image" />
                  <div className="title">Cơ xương khớp 1</div>
                </div>

                <div className="specialty-customize">
                  <div className="bg-image" />
                  <div className="title">Cơ xương khớp 2</div>
                </div>

                <div className="specialty-customize">
                  <div className="bg-image" />
                  <div className="title">Cơ xương khớp 3</div>
                </div>

                <div className="specialty-customize">
                  <div className="bg-image" />
                  <div className="title">Cơ xương khớp 4</div>
                </div>

                <div className="specialty-customize">
                  <div className="bg-image" />
                  <div className="title">Cơ xương khớp 5</div>
                </div>

                <div className="specialty-customize">
                  <div className="bg-image" />
                  <div className="title">Cơ xương khớp 6</div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
