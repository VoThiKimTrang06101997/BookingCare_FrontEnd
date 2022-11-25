import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import Slider from "react-slick";

import "./MedicalFacility.scss";

class MedicalFacility extends Component {
  render() {
    return (
      <Fragment>
        <div className="section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section text-danger">
                <b>Cơ sở y tế nổi bật</b>
              </span>
              <button className="btn-section">Xem thêm</button>
            </div>

            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="facility-customize">
                  <div className="bg-image" />
                  <div className="title">Bệnh viện Đại học Y Dược</div>
                </div>

                <div className="facility-customize">
                  <div className="bg-image" />
                  <div className="title">Bệnh viện Đại học Y Dược</div>
                </div>

                <div className="facility-customize">
                  <div className="bg-image" />
                  <div className="title">Bệnh viện Đại học Y Dược</div>
                </div>

                <div className="facility-customize">
                  <div className="bg-image" />
                  <div className="title">Bệnh viện Đại học Y Dược</div>
                </div>

                <div className="facility-customize">
                  <div className="bg-image" />
                  <div className="title">Bệnh viện Đại học Y Dược</div>
                </div>

                <div className="facility-customize">
                  <div className="bg-image" />
                  <div className="title">Bệnh viện Đại học Y Dược</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
