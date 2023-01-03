import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import { CRUD_ACTIONS, LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";

// Import LightBox
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { createNewUser } from "./../../../store/actions/adminActions";
import TableMangageUser from "./TableMangageUser";
import CommonUtils from "../../../utils/CommonUtils";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      action: '',
      userEditId: ''
    };
  }

  async componentDidMount() {
    this.props.getGenderStart(); // = Viết cách khác: this.props.dispatch(actions.fetchGenderStart())
    this.props.getPositionStart();
    this.props.getRoleStart();

    // Cách 2
    // try {
    //   let res = await getAllCodeService("gender");
    //   if(res && res.errorCode === 0) {
    //     this.setState({
    //       genderArr: res.data
    //     })
    //   }
    //   console.log("Check Gender: ", res)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /// Render => DidUpdate => Gọi Sau khi hàm render chạy
    // Hiện tại (this) và Quá khứ (previous)
    // Quá khứ của nó là mảng rỗng []  => Hiện tại là sau khi nạp vô 3 phần tử
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;

      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }

    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }

    if(prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE
      }, 
      // () => {
      //   console.log("Callback check state: ", this.state)
      // }
      )
    }
  }

  // e.preventDefault() => Ngăn Load lại trang
  handleOnChangeImage = async (event) => {
    let uploadFile = event.target.files;
    let file = uploadFile[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log("Check Base64 Image: ", base64)
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
      // console.log("Check File 0: ", objectUrl)
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;

    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let {action} = this.state;    // = Cách viết: let action = this.state.action

    if(action === CRUD_ACTIONS.CREATE) {
      // Fire Redux Create User Action
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar
      });
    }

    if(action === CRUD_ACTIONS.EDIT) {
      // Fire Redux Edit User
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar
      })
    }
    
    
    
    // setTimeout(() => {
    //   this.props.fetchUserRedux();
    // }, 1000)
    
    //console.log("Before Submit Check State: ", this.state)
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }

    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state }; // Mutate
    copyState[id] = event.target.value;

    this.setState(
      {
        ...copyState,
      }
      // , () => {
      //   console.log("Check handleInput onChange: ", this.state)
      // }
    );
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = '';
    if(user.image) {
      /** Cách Code 1:
       *  const imageBuffer = Buffer.from(JSON.stringify(user.image));
      imageBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;     
       */

      // Cách Code 2:
      imageBase64 = new Buffer(user.image, 'base64').toString('binary')
     
    }
   

    console.log("Check handle Edit User From Parent: ", user)
    this.setState({
      email: user.email,
      password: "Hash Code",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position:user.positionId,
      role: user.roleId,
      avatar: "",
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id
    }, 
    // () => {
    //   console.log("Check base64: ", this.state)
    // }
    )
  }

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;

    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;

    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;
    // console.log("Check Props from Redux: ", this.props.genderRedux)   //=> Render tới 3 lần
    console.log("Check State Component: ", this.state);

    return (
      <div className="user-redux-container">
        <div className="title">User React-Redux With Võ Thị Kim Trang</div>

        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3 text-success">
                <FormattedMessage id="manage-user.add" />
              </div>

              {/* <div>{isLoadingGender === true ? 'Loading Genders': ''}</div> */}

              <div className="col-3">
                <label className="text-danger">
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                  onChange={(event) => {
                    this.onChangeInput(event, "email");
                  }}
                />
              </div>

              <div className="col-3">
                <label className="text-danger">
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                  onChange={(event) => {
                    this.onChangeInput(event, "password");
                  }}
                />
              </div>

              <div className="col-3">
                <label className="text-danger">
                  <FormattedMessage id="manage-user.firstName" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  values={firstName}
                  onChange={(event) => {
                    this.onChangeInput(event, "firstName");
                  }}
                />
              </div>

              <div className="col-3">
                <label className="text-danger">
                  <FormattedMessage id="manage-user.lastName" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(event) => {
                    this.onChangeInput(event, "lastName");
                  }}
                />
              </div>

              <div className="col-3">
                <label className="text-danger">
                  <FormattedMessage id="manage-user.phoneNumber" />
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "phoneNumber");
                  }}
                />
              </div>

              <div className="col-9">
                <label className="text-danger">
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, "address");
                  }}
                />
              </div>

              <div className="col-3">
                <label className="text-danger">
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  value={gender}
                  // value={gender == null ? '' : gender}
                  onChange={(event) => {
                    this.onChangeInput(event, "gender");
                  }}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.value_vi
                            : item.value_en}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-3">
                <label className="text-danger">
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  id="position"
                  className="form-control"
                  value={position}
                  onChange={(event) => {
                    this.onChangeInput(event, "position");
                  }}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.value_vi
                            : item.value_en}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-3">
                <label className="text-danger">
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(event) => {
                    this.onChangeInput(event, "role");
                  }}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.value_vi
                            : item.value_en}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-3">
                <label className="text-danger">
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    className="form-control"
                    id="previewImg"
                    type="file"
                    htmlFor='image'
                    hidden
                    // value={avatar}
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label htmlFor="previewImg" className="label-upload mt-2">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>

              <div className="col-12 my-3">
                <button
                  className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"} 
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? 
                   <FormattedMessage id="manage-user.edit" /> :  <FormattedMessage id="manage-user.save" />
                  }
                 
                </button>
              </div>

              <div className="col-12 mb-5">
                <TableMangageUser handleEditUserFromParentKey={this.handleEditUserFromParent} 
                                  action={this.state.action}
                />
              </div>
              
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    editUserRedux: (data) => dispatch(actions.editUser(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
