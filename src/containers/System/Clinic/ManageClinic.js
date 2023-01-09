import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils } from "../../../utils";
import { createNewClinic, createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

export class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkDown: "",
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkDown: text,
    });
    // console.log("handleEditorChange", html, text);
  };

  handleOnChangeImage = async (event) => {
    let uploadFile = event.target.files;
    let file = uploadFile[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // console.log("Check Base64 Image: ", base64)
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        imageBase64: base64,
      });
      // console.log("Check File 0: ", objectUrl)
    }
  };

  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if(res && res.errorCode === 0) {
      toast.success("Add new clinic successfully !!")
      this.setState({
        name: '',
        address: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkDown: ''
      })
    } else {
      toast.error("Something wrongs...Please try again!!")
      console.log(">> Check res: ", res)
    }
    // console.log(">>>Check State: ", this.state)
  };

  render() {
    console.log("Check state: ", this.state)
    return (
      <div className="manage-clinic-container">
        <div className="manage-clinic-title text-danger">
          Quản lý Phòng khám
        </div>

        <div className="add-new-clinic row">
          <div className="col-6 form-group">
            <label className="text-danger">Tên phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => {
                this.handleOnChangeInput(event, "name");
              }}
            />
          </div>

          <div className="col-6 form-group">
            <label className="text-danger">Ảnh phòng khám</label>
            <input
              className="form-control"
              type="file"
              onChange={(event) => {
                this.handleOnChangeImage(event);
              }}
            />
          </div>

          <div className="col-6 form-group">
            <label className="text-danger">Địa chỉ phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => {
                this.handleOnChangeInput(event, "address");
              }}
            />
          </div>

          <div className="col-12 mt-3">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkDown}
            />
          </div>

          <div className="col-12 btn-save-clinic">
            <button onClick={() => this.handleSaveNewClinic()}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
