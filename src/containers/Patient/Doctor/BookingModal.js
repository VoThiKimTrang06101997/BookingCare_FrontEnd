import React, { Component } from "react";
import { connect } from "react-redux";

import "./BookingModal.scss";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ProfileDoctor } from "./ProfileDoctor";
import _ from "lodash";
import * as actions from "../../../store/actions";

import DatePicker from "../../../components/Input/DatePicker";
import { LANGUAGES } from "../../../utils";
import Select from "react-select";
import { postPatientBookingAppointment } from "../../../services/userService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import moment  from 'moment';
import localization from "moment/locale/vi";

export class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",
      genders: "",
      timeType: ""
    };
  }

  async componentDidMount() {
    this.props.fetchGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let { language } = this.props;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label =
          language === LANGUAGES.VI ? item.value_vi : item.value_en;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genderRedux),
      });
    }

    if (prevProps.genderRedux !== this.props.genderRedux) {
      if (this.props.genderRedux.length > 0) {
        this.setState({
          genders: this.buildDataGender(this.props.genderRedux),
        });
      }
    }

    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;

        this.setState({
          doctorId: doctorId,
          timeType: timeType
        });
      }
    }
  }

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput; // Bằng với cách code: stateCopy.id = valueInput

    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };

  buildTimeBooking = (dataTime) => {
    // console.log("Check inside renderTimeBooking: ", dataTime);
    let {language} = this.props;

    let time = language === LANGUAGES.VI ? dataTime.timeTypeData.value_vi : dataTime.timeTypeData.value_en;
    
    if (dataTime && !_.isEmpty(dataTime)) {
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).locale("vi").format('dddd - DD/MM/YYYY')
          : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
          return `${time} - ${date}`
      return "" ;
    }
  };

  buildDoctorName = (dataTime) => {
    let {language} = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let name = language === LANGUAGES.VI ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}` : 
      `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
      return name ; 
  }
  return ''
}

  handleConfirmBooking = async () => {
    // Validate Input
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime)
    let doctorName = this.buildDoctorName(this.props.dataTime)

    let res = await postPatientBookingAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      selectedGender: this.state.selectedGender.value,     // Là 1 Object gồm value vs label
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName
    })

    if(res && res.errorCode === 0) {
      toast.success('Booking a new appoinment successfully!')
      this.props.closeBookingModal()
    } else {
      toast.error('Booking a new appoinment error!')
    }
    console.log("Check Confirm Button: ", this.state);
  };

  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;

    /**
     * Viết Cách khác:
     *  let doctorId = '';
    if(dataTime && !_.isEmpty(dataTime)) {
        doctorId = dataTime.doctorId
    }
     */

    let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";

    // console.log("Data Props from Modal: ", this.props)

    // console.log("check state inside bookingModal: ", this.state);

    return (
      <>
        <Modal
          isOpen={isOpenModal}
          className={"booking-modal-container"}
          size="lg"
          centered
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">
                <FormattedMessage id="patient.booking-modal.title" />
              </span>
              <span className="right" onClick={closeBookingModal}>
                <i className="fas fa-times"></i>
              </span>
            </div>

            <div className="booking-modal-body">
              {/* {JSON.stringify(dataTime)}    => Convert kiểu Object sang kiểu String */}
              <div className="doctor-infor">
                <ProfileDoctor
                  doctorId={doctorId}
                  isShowDescriptionDoctor={false}
                  dataTime={dataTime}
                  isShowLinkDetail = {false}
                  isShowPrice = {true}
                />
              </div>

              <div className="row">
                <div className="col-6 form-group">
                  <label>
                  <FormattedMessage id="patient.booking-modal.fullname" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.fullName}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "fullName")
                    }
                  />
                </div>

                <div className="col-6 form-group">
                  <label>
                  <FormattedMessage id="patient.booking-modal.phoneNumber" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.phoneNumber}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "phoneNumber")
                    }
                  />
                </div>

                <div className="col-6 form-group">
                  <label>
                  <FormattedMessage id="patient.booking-modal.email" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.email}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "email")
                    }
                  />
                </div>

                <div className="col-6 form-group">
                  <label>
                  <FormattedMessage id="patient.booking-modal.address" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "address")
                    }
                  />
                </div>

                <div className="col-12 form-group">
                  <label>
                  <FormattedMessage id="patient.booking-modal.reason" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.reason}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "reason")
                    }
                  />
                </div>

                <div className="col-6 form-group">
                  <label>
                  <FormattedMessage id="patient.booking-modal.birthday" />
                  </label>
                  <DatePicker
                    onChange={this.handleOnChangeDatePicker}
                    className="form-control"
                    value={this.state.birthday}
                  />
                </div>

                <div className="col-6 form-group">
                  <label>
                  <FormattedMessage id="patient.booking-modal.gender" />
                  </label>
                  <Select
                    value={this.state.selectedGender}
                    onChange={this.handleChangeSelect}
                    options={this.state.genders}
                  />
                </div>
              </div>
            </div>

            <div className="booking-modal-footer">
              <button
                className="btn-booking-confirm"
                onClick={() => this.handleConfirmBooking()}        // Nó gọi hàm xử lý event ngay tại chính nó.
              >
                <FormattedMessage id="patient.booking-modal.btnConfirm" />
              </button>
              <button
                className="btn-booking-cancel"
                onClick={closeBookingModal}       // Nó gọi hàm xử lý event từ thằng cha truyền xuống cho thằng con.
              >
                <FormattedMessage id="patient.booking-modal.btnCancel" />
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  genderRedux: state.admin.genders,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
