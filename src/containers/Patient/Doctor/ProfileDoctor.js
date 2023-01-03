import React, { Component } from "react";

import { connect } from "react-redux";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";

import { NumericFormat } from "react-number-format";

import "./ProfileDoctor.scss";
import _ from "lodash";
import moment from "moment";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    /**
     * Viết cách khác:
     *  let id = this.props.doctorId;
        if(id) {
        let res = await getProfilerDoctorById(id);
        console.log("Check Profile Doctor: ", res)
    }
     */

    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errorCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }

    if (this.props.doctorId !== prevProps.doctorId) {
      // this.getInforDoctor(this.props.doctorId)
    }
  }

  renderTimeBooking = (dataTime) => {
    // console.log("Check inside renderTimeBooking: ", dataTime);
    let { language } = this.props;

    let time =
      language === LANGUAGES.VI
        ? dataTime.timeTypeData.value_vi
        : dataTime.timeTypeData.value_en;

    if (dataTime && !_.isEmpty(dataTime)) {
      let date =
        language === LANGUAGES.VI
          ? moment
              .unix(+dataTime.date / 1000)
              .locale("vi")
              .format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {time} - {date}{" "}
          </div>
          <div>
            <FormattedMessage id="patient.booking-modal.freeBooking" />
          </div>
        </>
      );
    }
  };

  render() {
    let { dataProfile } = this.state;
    let {
      language,
      isShowDescriptionDoctor,
      dataTime,
      isShowPrice,
      isShowLinkDetail,
      doctorId
    } = this.props;

    let name = "";
    if (dataProfile && dataProfile.positionId) {
      name = `${dataProfile.positionId}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    // console.log("Check state: ", this.state);
    // console.log("Check Props: ", this.props)
    return (
      <>
        <div className="profile-doctor-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  dataProfile.image ? dataProfile.image : ""
                })`,
              }}
            ></div>

            <div className="content-right">
              <div className="up">{name}</div>

              <div className="down">
                {isShowDescriptionDoctor === true ? (
                  <>
                    {dataProfile.MarkDown &&
                      dataProfile.MarkDown.description && (
                        <span>{dataProfile.MarkDown.description}</span>
                      )}
                  </>
                ) : (
                  <> {this.renderTimeBooking(dataTime)}</>
                )}
              </div>
            </div>
          </div>

          {isShowLinkDetail === true && 
          <div className="view-detail-doctor">
            <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
            {/* <a href={`/detail-doctor/${doctorId}`}>Xem thêm</a> */}
          </div>
          }

          {isShowPrice === true && (
            <div className="price">
              {/* Giá khám */}
              <FormattedMessage id="patient.booking-modal.price" />:
              {/* {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI ? dataProfile.Doctor_Infor.priceTypeData.value_vi : ''} */}
              {dataProfile &&
                dataProfile.Doctor_Infor &&
                language === LANGUAGES.VI && (
                  <NumericFormat
                    className="currency"
                    value={dataProfile.Doctor_Infor.priceTypeData.value_vi}
                    suffix={"VNĐ"}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                )}
              {dataProfile &&
                dataProfile.Doctor_Infor &&
                language === LANGUAGES.EN && (
                  <NumericFormat
                    className="currency"
                    value={dataProfile.Doctor_Infor.priceTypeData.value_en}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"USD"}
                  />
                )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
