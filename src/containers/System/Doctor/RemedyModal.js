import React, { Component } from "react";
import { connect } from "react-redux";

import "./RemedyModal.scss";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import _ from "lodash";
import * as actions from "../../../store/actions";

import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import localization from "moment/locale/vi";
import { CommonUtils } from "../../../utils";

export class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        imgBase64: ''
    };
  }

  async componentDidMount() {
    if(this.props.dataModal) {
        this.setState({
            email: this.props.dataModal.email
        })
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.dataModal !== this.props.dataModal) {
        this.setState({
            email: this.props.dataModal.email
        })
    }
  }

  handleOnChangeEmail = (event) => {
    this.setState({
        email: event.target.value
    })
  }

  // e.preventDefault() => Ngăn Load lại trang
  handleOnChangeImage = async (event) => {
    let uploadFile = event.target.files;
    let file = uploadFile[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // console.log("Check Base64 Image: ", base64)   => Tham khảo bên trang UserRedux.
      this.setState({
        imgBase64: base64
      });
    }
  };
  handleSendRemedy = () => {
    // Gọi ngược lại lên thằng cha
    this.props.sendRemedy(this.state)
  }

  render() {
    let { isOpenModal, dataModal, closeRemedyModal, sendRemedy } = this.props;

    return (
      <>
        <Modal
          isOpen={isOpenModal}
          className={"booking-modal-container"}
          size="lg"
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title">Gửi hóa đơn khám bệnh thành công</h5>
            <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal} >
              <span aria-hidden="true">x</span>
            </button>
          </div>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label className="text-danger">Email bệnh nhân</label>
                <input
                  className="form-control"
                  type="email"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeEmail(event)}
                />
              </div>

              <div className="col-6 form-group">
                <div>
                  <label className="text-danger">Chọn file đơn thuốc</label>
                  <input className="form-control" type="file" onChange={(event) => this.handleOnChangeImage(event)} />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSendRemedy()}>
              Send
            </Button>{" "}
            <Button color="secondary" onClick={closeRemedyModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
