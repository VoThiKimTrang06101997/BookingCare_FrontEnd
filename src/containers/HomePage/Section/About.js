import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import "./About.scss";

class About extends Component {
  render() {
    return (
      <Fragment>
        <div className="section-about">
          <div className="section-about-header text-danger">
            Truyền thông nói về Booking Care
          </div>

          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="450px"
                src="https://www.youtube.com/embed/FyDQljKtWnI"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>

            <div className="content-right">
              <p>
                Tải ứng dụng BookingCare <br />
                Đặt khám nhanh hơn <br />
                Nhận thông báo từ hệ thống <br />
                Nhận hướng dẫn đi khám chi tiết
              </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
