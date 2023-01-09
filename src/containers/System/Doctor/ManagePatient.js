import React, { Component } from "react";
import { connect } from "react-redux";

import DatePicker from "./../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import moment from "moment";

import "./ManagePatient.scss";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

export class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();

    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });

    if (res && res.errorCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
    // console.log("Check res: ", res)
  };

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
        // => Callback Function: Hàm check state là hàm bất đồng bộ nên mún lấy giá trị chính xác, ta sẽ viết sau khi gán giá trị.
      }
    );
  };

  hanldeBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
    console.log("Check button confirm: ", item);
    // console.log("Check data: ", data);
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;

    this.setState({
      isShowLoading: true
    })

    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });

    if (res && res.errorCode === 0) {
      this.setState({
        isShowLoading: false
      })
      toast.success("Send remedy successfully !!");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false
      })
      toast.error("Something wrongs...");
    }

    console.log("Check res sendRemedy: ", res);
  };

  render() {
    // console.log("Check props: ", this.props)
    // console.log("Check state: ", this.state);
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;

    return (
      <>
        <div className="manage-patient-container">
          <div className="manage-patient-title">
            Quản lý bệnh nhân khám bệnh
          </div>

          <div className="manage-patient-body row">
            <div className="col-4 form-group">
              <label className="text-danger">Chọn ngày khám</label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
                minDate={new Date().setHours(0, 0, 0, 0)}
              />
            </div>
          </div>

          <div className="col-12 table-manage-patient m-3 mx-1">
            <table id="customers">
              <tbody>
                <tr>
                  <th>Số thứ tự</th>
                  <th>Thời gian</th>
                  <th>Họ và tên</th>
                  <th>Giới tính</th>
                  <th>Địa chỉ</th>
                  <th>Action</th>
                </tr>

                {dataPatient && dataPatient.length > 0 ? (
                  dataPatient.map((item, index) => {
                    let time =
                      language === LANGUAGES.VI
                        ? item.timeTypeDataPatient.value_vi
                        : item.timeTypeDataPatient.value_en;
                    let gender =
                      language === LANGUAGES.VI
                        ? item.patientData.genderData.value_vi
                        : item.patientData.genderData.value_en;

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{time}</td>
                        <td>{item.patientData.firstName}</td>
                        <td>{gender}</td>
                        <td>{item.patientData.address}</td>

                        <td>
                          <button
                            className="btn-confirm"
                            style={{
                              marginRight: "10px",
                              height: "30px",
                              borderRadius: "3px",
                              background: "orange",
                            }}
                            onClick={() => {
                              this.hanldeBtnConfirm(item);
                            }}
                          >
                            Xác nhận
                          </button>
                          <button
                            className="btn-remedy"
                            style={{
                              height: "30px",
                              borderRadius: "3px",
                              background: "#39dca0",
                            }}
                            onClick={() => {
                              this.hanldeBtnRemedy();
                            }}
                          >
                            Gửi hóa đơn
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={"6"} style={{ textAlign: "center" }}>
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading content..."
        />

        <RemedyModal
          isOpenModal={isOpenRemedyModal}
          dataModal={dataModal}
          closeRemedyModal={this.closeRemedyModal}
          sendRemedy={this.sendRemedy}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
