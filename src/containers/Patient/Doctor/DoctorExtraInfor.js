import React, { Component } from "react";
import { connect } from "react-redux";
import { getExtraInforDoctorById } from "../../../services/userService";

import "./DoctocExtraInfor.scss";

import { NumericFormat } from "react-number-format";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";

export class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    if(this.props.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errorCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }  
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }

    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errorCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
      // console.log("Get Data: ", data)
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;
    // console.log("Check State: ", this.state)

    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-infor-doctor.text-address" />{" "}
          </div>
          <div className="name-clinic">
            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfor && extraInfor.addressClinic
              ? extraInfor.addressClinic
              : ""}
          </div>
        </div>

        <div className="content-down">
          {isShowDetailInfor === false && (
            <div className="short-infor">
              <FormattedMessage id="patient.extra-infor-doctor.price" />:
              {/* {extraInfor && extraInfor.priceTypeData ? extraInfor.priceTypeData.value_vi: ''} */}
              {extraInfor &&
                extraInfor.priceTypeData &&
                language === LANGUAGES.VI && (
                  <NumericFormat
                    className="currency"
                    value={extraInfor.priceTypeData.value_vi}
                    suffix={"VNĐ"}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                )}
              {extraInfor &&
                extraInfor.priceTypeData &&
                language === LANGUAGES.EN && (
                  <NumericFormat
                    className="currency"
                    value={extraInfor.priceTypeData.value_en}
                    suffix={"USĐ"}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                )}
              <span
                className="detail"
                onClick={() => this.showHideDetailInfor(true)}
              >
                {" "}
                <FormattedMessage id="patient.extra-infor-doctor.detail" />
              </span>
            </div>
          )}

          {isShowDetailInfor === true && (
            <>
              <div className="title-price">
                <FormattedMessage id="patient.extra-infor-doctor.price" />:{" "}
              </div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left text-danger">
                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                  </span>
                  <span className="right">
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumericFormat
                          className="currency"
                          value={extraInfor.priceTypeData.value_vi}
                          suffix={"VNĐ"}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      )}

                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumericFormat
                          className="currency"
                          value={extraInfor.priceTypeData.value_en}
                          suffix={"USĐ"}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      )}
                  </span>
                </div>

                <div className="note">
                  <div>
                    {extraInfor && extraInfor.note ? extraInfor.note : ""}
                  </div>
                </div>
              </div>

              <div className="payment">
                <FormattedMessage id="patient.extra-infor-doctor.payment" />:{" "}
                {extraInfor &&
                extraInfor.paymentTypeData &&
                language === LANGUAGES.VI
                  ? extraInfor.paymentTypeData.value_vi
                  : ""}
                {extraInfor &&
                extraInfor.paymentTypeData &&
                language === LANGUAGES.EN
                  ? extraInfor.paymentTypeData.value_en
                  : ""}
              </div>

              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
