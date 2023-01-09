import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";

import { DoctorSchedule } from "../Doctor/DoctorSchedule";
import { DoctorExtraInfor } from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getAllCodeService,
  getAllDetailClinicById,
  getDetailInforDoctor,
} from "../../../services/userService";
import _ from "lodash";
import DOMPurify from "dompurify";
import { LANGUAGES } from "../../../utils";

export class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getAllDetailClinicById({
        id: id,
      });

      if (res && res.errorCode === 0) {
        let data = res.data;
        let arrDoctorId = [];

        if (data && !_.isEmpty(res.data)) {
          let array = data.doctorClinic;
          if (array && array.length > 0) {
            array.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { arrDoctorId, dataDetailClinic, listProvince } = this.state;
    let { language } = this.props;

    // console.log("Check state: ", this.state);

    return (
      <div className="detail-clinic-container">
        <HomeHeader />

        <div className="detail-clinic-body">
          <div className="description-clinic">
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <>
                <div className="clinic-name">{dataDetailClinic.name}</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      dataDetailClinic.descriptionHTML
                    ),
                  }}
                />
              </>
            )}
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
                        isShowLinkDetail={true}
                        isShowPrice={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
