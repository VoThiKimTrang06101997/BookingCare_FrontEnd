import React, { Component } from "react";

import { connect } from "react-redux";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser; // = với cách viết let {currentUser} = this.props;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hashcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
      });
    }

    console.log("Didmount Edit Modal: ", this.props.currentUser);
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    // Bad Code   => Modify State

    /*
    this.state[id] = event.target.value;
    this.setState({
      ...this.state
    }, () => {
      console.log("Check Bad State: ", this.state)
    })

    Cách viết: this.state.email = this.state['email']
    */

    // Good Code
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("Check Good State: ", this.state);
      }
    );

    console.log("Event: ", event.target.value, id);
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      console.log("Check inside Loop: ", this.state[arrInput[i]], arrInput[i]);
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleEditUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      // Call API Edit User Modal
      this.props.editUser(this.state);
    }
  };

  render() {
    // console.log("Check Child Props: ", this.props);
    // console.log("Check Child Open Modal: ", this.props.isOpen);
    // console.log("Check Props From Parents: ", this.props);

    return (
      <Modal
        isOpen={this.props.isOpen}
        fade={false}
        toggle={() => {
          this.toggle();
        }}
        size="lg"
        centered
        className={"modal-user-container"}
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit a new User
        </ModalHeader>

        <ModalBody>
          <div className="form-row">
            <div className="form-group col-md-6 ">
              <label for="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                readOnly
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
                value={this.state.email}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">Password</label>

              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                readOnly
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
                value={this.state.password}
              />
            </div>
          </div>

          <div className="form-group col-md-6">
            <label for="inputAddress">First name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="First name"
              onChange={(event) => {
                this.handleOnChangeInput(event, "firstName");
              }}
              value={this.state.firstName}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputAddress2">Last Name</label>

            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Last Name"
              onChange={(event) => {
                this.handleOnChangeInput(event, "lastName");
              }}
              value={this.state.lastName}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputCity">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Address"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
                value={this.state.address}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputCity">Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "phoneNumber");
                }}
                value={this.state.phoneNumber}
              />
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleEditUser();
            }}
          >
            Save changes
          </Button>
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
