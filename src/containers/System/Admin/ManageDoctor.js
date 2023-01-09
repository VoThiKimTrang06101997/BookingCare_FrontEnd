import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import "./ManageDoctor.scss";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

import Select from "react-select";
import { LANGUAGES } from "../../../utils";

import { getDetailInforDoctor } from "../../../services/userService";
import { CRUD_ACTIONS } from "./../../../utils/constant";
import { FormattedMessage } from "react-intl";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Save to Markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      // Save to Doctor_Infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;

    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.firstName} ${item.lastName}`;
          let labelEn = `${item.lastName} ${item.firstName}`;

          // let labelVi = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.value_vi;
          // let labelEn = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.value_en;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;

          // object.label = labelVi;
          // object.label = labelEn;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.value_vi} VND`;
          let labelEn = `${item.value_en} USD`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;

          object.value = item.keyMap;
          result.push(object);
        });
        // console.log("Check Input Price: ", inputData)
      }

      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.value_vi}`;
          let labelEn = `${item.value_en}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;

          object.value = item.keyMap;
          result.push(object);
        });
      }

      if(type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {}

          object.label = item.name;
          object.value = item.id;
          result.push(object)
        })
      }

      if(type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {}

          object.label = item.name;
          object.value = item.id;
          result.push(object)
        })
      }
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );

      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }

    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPrice, resPayment, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince,"PROVINCE");
      let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY");
      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC")

      console.log(
        "Data new: ",
        dataSelectPrice,
        dataSelectPayment,
        dataSelectProvince,
        dataSelectClinic
      );

      // console.log("Get Data From Redux: allRequiredDoctorInfor", this.props.allRequiredDoctorInfor)

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic
      });
    }
  }

  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: text,
      contentMarkdown: html,
    });
    // console.log("handleEditorChange", html, text);
  };

  handleSaveContentMarkDown = () => {
    let { hasOldData } = this.state;
    console.log(">> Check State: ", this.state)

    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : "",
      specialtyId: this.state.selectedSpecialty.value
    });
    console.log("Check state: ", this.state);
  };

  handleChangeSelected = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince, listSpecialty , listClinic} = this.state;

    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errorCode === 0 && res.data && res.data.MarkDown) {
      let markdown = res.data.MarkDown;

      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        specialtyId = "",
        clinicId = "",

        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        selectedSpecialty = "",
        selectedClinic = ""

      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;

        paymentId = res.data.Doctor_Infor.paymentId;
        priceId = res.data.Doctor_Infor.priceId;
        provinceId = res.data.Doctor_Infor.provinceId;
        specialtyId = res.data.Doctor_Infor.specialtyId;
        clinicId = res.data.Doctor_Infor.clinicId;

        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });

        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });

        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });

        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        })

        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        })

        // console.log("Find array: ", selectedPayment, listPayment, paymentId)
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,

        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",

        selectedPayment: "",
        selectedPrice: "",
        selectedProvince: "",
        selectedSpecialty: "",
        selectedClinic: ""
      });
    }
    // console.log(`Option selected:`, this.state.selectedOption)
    console.log("Check getDetailInforDoctor SelectedOption: ", res);
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    // Lấy name thuộc tính của React-Select chấm tới property name => lấy ra name là selectedPrice, selectedPayment vs selectedProvince;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption; // bằng với cách viết: this.state.stateName = selectedOption;

    this.setState({
      ...stateCopy,
    });

    console.log("Check new select On Change: ", selectedOption, stateName);
  };

  handleOnChangeDescription = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;

    this.setState({
      // description: event.target.value,
      ...stateCopy,
    });
  };

  render() {
    console.log("Check State: ", this.state);
    let { hasOldData, listSpecialty } = this.state;

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title text-danger">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>

        <div className="more-infor">
          <div className="content-left form-group">
            <label className="text-success">
              <FormattedMessage id="admin.manage-doctor.select-doctor" />:
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelected}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
            />
          </div>

          <div className="content-right">
            <label className="text-success">
              <FormattedMessage id="admin.manage-doctor.introduction" />:
            </label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) =>
                this.handleOnChangeDescription(event, "description")
              }
              value={this.state.description}
            ></textarea>
          </div>
        </div>

        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label className="text-success">
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
              name="selectedPrice"
            />
          </div>

          <div className="col-4 form-group">
            <label className="text-success">
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.payment" />
              }
              name="selectedPayment"
            />
          </div>

          <div className="col-4 form-group">
            <label className="text-success">
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.province" />
              }
              name="selectedProvince"
            />
          </div>

          <div className="col-4 form-group mt-2">
            <label className="text-success">
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              className="form-control"
              // value={this.state.selectedOption}
              onChange={(event) =>
                this.handleOnChangeDescription(event, "nameClinic")
              }
              value={this.state.nameClinic}
            />
          </div>

          <div className="col-4 form-group mt-2">
            <label className="text-success">
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeDescription(event, "addressClinic")
              }
              value={this.state.addressClinic}
            />
          </div>

          <div className="col-4 form-group mt-2">
            <label className="text-success">
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              // value={this.state.selectedOption}
              onChange={(event) =>
                this.handleOnChangeDescription(event, "note")
              }
              value={this.state.note}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-4 fomr-group">
            <label className="text-success"><FormattedMessage id="admin.manage-doctor.specialty" /></label>
            <Select
              value={this.state.selectedSpecialty}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listSpecialty}
              name="selectedSpecialty"
              placeholder={
                <FormattedMessage id="admin.manage-doctor.specialty" />
              }
            />
          </div>

          <div className="col-4 fomr-group">
            <label className="text-success"><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
            <Select
              value={this.state.selectedClinic}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listClinic}
              name="selectedClinic"
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-clinic" />
              }
            />
          </div>
        </div>

        <div className="manage-doctor-editor mt-3">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentHTML}
          />
        </div>

        <button
          onClick={() => {
            this.handleSaveContentMarkDown();
          }}
          className={
            hasOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.save-infor" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.create-infor" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: (id) => dispatch(actions.fetchAllDoctors()),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),

    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
