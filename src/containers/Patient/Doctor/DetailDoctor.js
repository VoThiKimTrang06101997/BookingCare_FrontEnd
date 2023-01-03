import React, { Component } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";

import DOMPurify from "dompurify";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";


export class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id
      })

      let res = await getDetailInforDoctor(id);
      if (res && res.errorCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
      console.log("getDetailInforDoctor", res);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    
  }

  render() {
    // console.log("Check Detail Doctor: ", this.props.match.params.id);
    console.log("Check state: ", this.state);
    let { detailDoctor } = this.state;


    let {language} = this.props;
    let name = '';
    if(detailDoctor && detailDoctor.positionId) {
      name = `${detailDoctor.positionId}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }


    /** Cách code cho chức năng chuyển đổi ngôn ngữ
     *  let {language} = this.props;
        let nameVi = '', let nameEn = '' ;
    if(detailDoctor && detailDoctor.positionData) {
      let nameVi = `${detailDoctor.positionData.value_vi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      let nameEn = `${detailDoctor.positionData.value_en}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
    }
    */

    return (
      <Fragment>
        <HomeHeader isShowBanner={false} />

        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>

            <div className="content-right">
              <div className="up">
                {/* {language === LANGUAGES.VI ? nameVi : nameEn} */}
                {name}
              </div>

              <div className="down">
                {detailDoctor.MarkDown && detailDoctor.MarkDown.description && (
                  <span>{detailDoctor.MarkDown.description}</span>
                )}
              </div>
            </div>
          </div>

          

          <div className="schedule-doctor">
            <div className="content-left">
                  {/* <DoctorSchedule doctorIdFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id: -1} />  
                  => Code bằng cách khác */}
                  <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
            </div>

            <div className="content-right">
                  <DoctorExtraInfor doctorIdFromParent={this.state.currentDoctorId} />
            </div>
          </div>

          <div className="detail-infor-doctor">
            {detailDoctor && detailDoctor.MarkDown && detailDoctor.MarkDown.contentMarkDown &&             
              <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize (detailDoctor.MarkDown.contentMarkDown)}} />                              
            }

          </div>

          <div className="comment-doctor"></div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language
  }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
