import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import Slider from "react-slick";

import "./OutStandingDoctor.scss";

class OutStandingDoctor extends Component {
  render() {
    return (
      <Fragment>
        <div className="section-outstanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section text-danger">
                <b>Bác sĩ nổi bật tuần qua</b>
              </span>
              <button className="btn-section">Xem thêm</button>
            </div>

            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="outstanding-doctor-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image" />
                    </div>

                    <div className="outstanding-doctor-content">
                      <div className="title">Giáo sư, Tiến sĩ</div>
                      <div className="text-center">Cơ xương khớp</div>
                    </div>
                  </div>
                </div>

                <div className="outstanding-doctor-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image" />
                    </div>

                    <div className="outstanding-doctor-content">
                      <div className="title">Giáo sư, Tiến sĩ</div>
                      <div className="text-center">Cơ xương khớp</div>
                    </div>
                  </div>
                </div>

                <div className="outstanding-doctor-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image" />
                    </div>

                    <div className="outstanding-doctor-content">
                      <div className="title">Giáo sư, Tiến sĩ</div>
                      <div className="text-center">Cơ xương khớp</div>
                    </div>
                  </div>
                </div>

                <div className="outstanding-doctor-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image" />
                    </div>

                    <div className="outstanding-doctor-content">
                      <div className="title">Giáo sư, Tiến sĩ</div>
                      <div className="text-center">Cơ xương khớp</div>
                    </div>
                  </div>
                </div>

                <div className="outstanding-doctor-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image" />
                    </div>

                    <div className="outstanding-doctor-content">
                      <div className="title">Giáo sư, Tiến sĩ</div>
                      <div className="text-center">Cơ xương khớp</div>
                    </div>
                  </div>
                </div>

                <div className="outstanding-doctor-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image" />
                    </div>

                    <div className="outstanding-doctor-content">
                      <div className="title">Giáo sư, Tiến sĩ</div>
                      <div className="text-center">Cơ xương khớp</div>
                    </div>
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
