import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";

import { dateFormat, LANGUAGES } from "../../../utils";
import _, { range } from "lodash";

import { toast } from "react-toastify";
import { saveBulkScheduleDoctor } from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    // const currentDate = new Date();
    // currentDate.setHours(0,0,0,0);

    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleTime();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      // console.log("Check range time: ", this.props.allScheduleTime)
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        /*
         data = data.map(item => {
            item.isSelected = false;
            return item;
        })
        */
        data = data.map((item) => ({ ...item, isSelected: false }));
      }

      this.setState({
        // rangeTime: this.props.allScheduleTime,
        rangeTime: data,
      });
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.firstName} ${item.lastName}`;
        let labelEn = `${item.lastName} ${item.firstName}`;

        // object.label = language === LANGUAGES.VI ? labelVi : labelEn;

        object.label = labelVi;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleChangeSelected = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    // console.log("Check rangeTime Before: ", rangeTime)

    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected; // = item.isSelected = true;
        return item;
      });

      this.setState({
        rangeTime: rangeTime,
      });
      // console.log("Check rangeTime After: ", rangeTime)
    }

    // console.log("Check time click: ", time)
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];

    if (!currentDate) {
      toast.error("Invalid Date!");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid Doctor!");
      return;
    }

    // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    // let formatedDate = moment(currentDate).unix();
    let formatedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          console.log("Check Schedule: ", schedule, index, selectedDoctor)
          let object = {};
          object.doctorId = selectedDoctor.value;   // Thư viện DropDown trả 2 giá trị là value vs label
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          result.push(object)
        })
      } else {
        toast.error("Invalid Selected Time!");
        return;
      }

      let res = await saveBulkScheduleDoctor({
        arrSchedule: result,
        doctorId: selectedDoctor.value,
        formatedDate: '' + formatedDate    // Chuyển đổi từ kiểu integer sang string
      })
      // console.log("saveBulkScheduleDoctor: ", res)
      // console.log("SelectedTime: ", selectedTime)

      if(res && res.errorCode === 0) {
        toast.success("Save Infor Successfully !");
        return;
      } else {
        toast.error("Error saveBulkScheduleDoctor!");
        console.log("Error saveBulkScheduleDoctor >>> res: ", res)
      }
    }

    // console.log("Check State: ", this.state)
    // console.log("Check State CurrentDate: ", moment(currentDate).format("DD/MM/YYYY"))
    console.log("Check Result: ", result);
  };

  render() {
    // console.log("Check State: ", this.state)
    // console.log("Check Props: ", this.props)
    let { rangeTime } = this.state;
    let { language } = this.props;

    let yesterday = new Date(new Date().setDate(new Date().getDate()-1))
    // console.log("Check Time: ", rangeTime);

    return (
      <Fragment>
        <div className="manage-schedule-container">
          <div className="manage-schedule-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>

          <div className="container">
            <div className="row">
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-schedule.choose-doctor" />{" "}
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChangeSelected}
                  options={this.state.listDoctors}
                />
              </div>

              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                  minDate ={yesterday}
                  // minDate={new Date().setHours(0,0,0,0)}    : Code bằng cách khác
                />
              </div>

              <div className="col-12 pick-hour-container">
                {/* <FormattedDate value={this.state.currentDate} />  */}
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        className={
                          item.isSelected === true
                            ? "btn btn-schedule active"
                            : "btn btn-schedule"
                        }
                        key={index}
                        onClick={() => this.handleClickBtnTime(item)}
                      >
                        {language === LANGUAGES.VI
                          ? item.value_vi
                          : item.value_en}
                      </button>
                    );
                  })}
              </div>

              <div className="col-12">
                <button
                  className="btn btn-primary btn-save-schedule"
                  onClick={() => this.handleSaveSchedule()}
                >
                  <FormattedMessage id="manage-schedule.save-information" />                 
                </button>
              </div>
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
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
