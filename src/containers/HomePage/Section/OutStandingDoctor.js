import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import Slider from "react-slick";

import "./OutStandingDoctor.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import { FormattedMessage } from 'react-intl';
import { withRouter } from "react-router";
import { history } from './../../../redux';


class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    console.log("View Infor: ", doctor)
    if(this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    

  }
  render() {
    // console.log("Check topDoctorsRedux: ", this.props.topDoctorsRedux)
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;

    // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
    console.log("Check arrDoctors: ", arrDoctors);

    return (
      <Fragment>
        <div className="section-outstanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section text-danger">
                <b><FormattedMessage id="homepage.out-standing-doctor" /> </b>
              </span>
              <button className="btn-section"><FormattedMessage id="homepage.more-infor" /> </button>
            </div>

            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrDoctors &&
                  arrDoctors.length > 0 &&
                  arrDoctors.map((item, index) => {
                    // if(index === 0) {
                    //   console.log("Check item: ", item)
                    // }

                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }

                    let nameVi = `${item.positionData.value_vi}, ${item.firstName} ${item.lastName}`;
                    let nameEn = `${item.positionData.value_en}, ${item.firstName} ${item.lastName}`

                    // let name = `${item.positionId}, ${item.firstName} ${item.lastName}`;

                    return (
                      <div className="outstanding-doctor-customize" key={index}
                      onClick={()=> this.handleViewDetailDoctor(item)}
                      >
                        <div className="customize-border">
                          <div className="outer-bg">
                            <div
                              className="bg-image mt-2"
                              style={{
                                backgroundImage: `url(${imageBase64})`,
                              }}
                            ></div>
                          </div>

                          <div className="outstanding-doctor-content">                         
                            <div className="title">{language === LANGUAGES.VI ? nameVi: nameEn}</div>
                            {/* <div className="title">{name}</div> */}
                            <div className="text-center">Cơ xương khớp</div>
                          </div>
                        </div>
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
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
