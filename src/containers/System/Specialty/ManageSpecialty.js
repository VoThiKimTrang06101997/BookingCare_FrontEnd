import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

export class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkDown: ''
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnChangeInput = (event, id) => {
    let stateCopy = {...this.state}
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy
    })
  }

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

  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialty(this.state);

    if(res && res.errorCode === 0) {
      toast.success("Add new specialty successfully !!")
      this.setState({
        name: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkDown: ''
      })
    } else {
      toast.error("Something wrongs...Please try again!!")
      console.log(">> Check res: ", res)
    }
    // console.log(">>>Check State: ", this.state)
  }

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="manage-specialty-title text-danger">Quản lý chuyên khoa</div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label className="text-danger">Tên chuyên khoa</label>
            <input className="form-control" type="text" value={this.state.name} 
            onChange={(event) => {this.handleOnChangeInput(event, 'name')}}
            />
          </div>

          <div className="col-6 form-group">
            <label>Ảnh chuyên khoa</label>
            <input className="form-control" type="file"
            onChange={(event) => {this.handleOnChangeImage(event)}}
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

          <div className="col-12 btn-save-specialty">
            <button onClick={() => this.handleSaveNewSpecialty()}>Save</button>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
