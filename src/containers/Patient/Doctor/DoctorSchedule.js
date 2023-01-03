import React, { Component } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";

import { LANGUAGES } from "../../../utils";
import "./DoctorSchedule.scss";

import Select from "react-select";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./BookingModal";

export class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {}
    };
  }

  async componentDidMount() {
    let { language } = this.props;

    /** 
     *  console.log(
      "Moment Vi: ",
      moment(new Date()).locale("vi").format("dddd - DD/MM")
    );
    console.log(
      "Moment En: ",
      moment(new Date()).locale("en").format("ddd - DD/MM")
    );
    */
   
    let arrDate = this.getArrDays(language);
    
    if(this.props.doctorIdFromParent) {
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        arrDate[0]?.value
      );
  
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
  
    }
   
    this.setState({
      allDays: arrDate,
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrDays = (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).add(i, "days").format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).add(i, "days").format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("dddd - DD/MM");
        }
      }

      object.value = moment(new Date())
        .add(i, "days")
        .startOf("days")
        .valueOf();

      arrDate.push(object);
    }

    // console.log("arrDate: ", arrDate)

    return arrDate;

    // this.setState({
    //   allDays: arrDate,
    // });
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let arrDate = this.getArrDays(this.props.language);
      console.log("arrDate: ", arrDate);
      this.setState({
        allDays: arrDate,
      });
    }

    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let arrDate = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        arrDate[0]?.value
      );

      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  handleOnChangeSelect = async (event) => {
    // console.log("Check Detail Doctor Id: ", this.props.detailDoctor.id)
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;

      // let allTime = [];
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errorCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
      console.log("Check Schedule from ReactJS: ", res);
    }
    // console.log("Event onChange Data Value: ", event)
  };

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time
    })
    console.log("Time: ", time)
  }

  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false
    })
  }

  render() {
    /**
     *  Dùng thư viện React-Select
    let options = [
        {label: 'Thứ 2', value: '2'},
        {label: 'Thứ 3', value: '3'},
        {label: 'Thứ 4', value: '4'}
    ]
     */
    let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
    let { language } = this.props;

    return (
      <Fragment>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            {/* Dùng thư viện React-Select
            <Select options={options} /> */}
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span className="text-danger">
                  <FormattedMessage id="patient.detail-doctor.schedule" />
                </span>
              </i>
            </div>

            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <>
                  <div className="time-content-btns">
                    {allAvailableTime.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.value_vi
                          : item.timeTypeData.value_en;
                      return (
                        <button
                          key={index}
                          className={
                            language === LANGUAGES.VI ? "btn-vi" : "btn-en"                          
                          }
                          onClick = {() => this.handleClickScheduleTime(item)}
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>

                  <div className="book-free">
                    <span>
                      <FormattedMessage id="patient.detail-doctor.choose" />
                      <i className="far fa-hand-point-up"></i>
                      <FormattedMessage id="patient.detail-doctor.book-free" />
                    </span>
                  </div>
                </>
              ) : (
                <div className="no-schedule text-success">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>

        <BookingModal isOpenModal = {isOpenModalBooking} 
        closeBookingModal = {this.closeBookingModal}
        dataTime = {dataScheduleTimeModal}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
