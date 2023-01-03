import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import HomeHeader from "./../../HomePage/HomeHeader";

import { DoctorSchedule } from "./../Doctor/DoctorSchedule";
import { DoctorExtraInfor } from "./../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getAllCodeService,
  getAllDetailSpecialtyById,
  getDetailInforDoctor,
} from "../../../services/userService";
import _ from "lodash";
import DOMPurify from "dompurify";
import { LANGUAGES } from "../../../utils";

export class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: []
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: "ALL",
      });

      let resProvince = await getAllCodeService("PROVINCE")

      console.log("Check response: ", res);

      if (res && res.errorCode === 0 && resProvince && resProvince.errorCode === 0) {
        let data = res.data;
        let arrDoctorId = [];

        if (data && !_.isEmpty(res.data)) {
          let array = data.doctorSpecialty;
          if (array && array.length > 0) {
            array.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        let dataProvince = resProvince.data;
        if(dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            keyMap: "ALL",
            type: "PROVINCE",
            value_en: "ALL",
            value_vi: "Toàn quốc",
            createdAt: null
          })
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : []
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnChangeSelect = async (event) => {
    if(this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let location = event.target.value;

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: location,
      });


      if (res && res.errorCode === 0) {
        let data = res.data;
        let arrDoctorId = [];

        if (data && !_.isEmpty(res.data)) {
          let array = data.doctorSpecialty;
          if (array && array.length > 0) {
            array.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
    let {language} = this.props;

    // console.log("Check state: ", this.state);

    return (
      <div className="detail-specialty-container">
        <HomeHeader />

        <div className="detail-specialty-body">
          <div className="description-specialty">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    dataDetailSpecialty.descriptionHTML
                  ),
                }}
              />
            )}
          </div>

          <div className="search-specialty-doctor">
                <select onChange={(event) => this.handleOnChangeSelect(event)}>
                  {listProvince && listProvince.length > 0 && listProvince.map((item, index) => {
                    return <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                    </option>
                  })}               
                </select>
          </div>

          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="detail-content-left">
                    <div className="profile-doctor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        // dataTime = {dataTime}
                        isShowLinkDetail = {true}
                        isShowPrice = {false}
                      />
                    </div>
                  </div>

                  <div className="detail-content-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>

                    <div className="doctor-extra-infor">
                      <DoctorExtraInfor doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
