import React, { Component } from "react";
import { connect } from "react-redux";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "./../HomePage/HomeHeader";
import "./VerifyEmail.scss"

export class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errorCode: 0,
    };
  }
  async componentDidMount() {
    // console.log(">>> Props: ", this.props)
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      // console.log("Check token vs params: ", token, doctorId)

      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });

      if (res && res.errorCode === 0) {
        this.setState({
          statusVerify: true,
          errorCode: res.errorCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errorCode: res && res.errorCode ? res.errorCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { statusVerify, errorCode } = this.state;
    console.log(">>> Check State: ", this.state);

    return (
      <>
        <HomeHeader />
        <div className="verify-email-container">
          {statusVerify === false ? (
            <div>Loading data...</div>
          ) : (
            <div>
              {+errorCode === 0 ? (
                <div className="infor-booking">
                  Xác nhận lịch hẹn thành công !!
                </div>
              ) : (
                <div className="infor-booking">
                  Lịch hẹn không tồn tại hoặc đã được xác nhận !!
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
