import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";

import "./MedicalFacility.scss";
import { withRouter } from "react-router";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errorCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
    // console.log("Check res: ", res)
  }

  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };

  render() {
    let { dataClinics } = this.state;

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
                {dataClinics &&
                  dataClinics.length > 0 &&
                  dataClinics.map((item, index) => {
                    return (
                      <div
                        className="facility-customize"
                        key={index}
                        onClick={() => this.handleViewDetailClinic(item)}
                      >
                        <div
                          className="bg-image"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <div className="facility-title">{item.name}</div>
                      </div>
                    );
                  })}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
