import React, { Component } from "react";

import { connect } from "react-redux";

import "./UserManage.scss";

import {
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllUsers,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "./../../utils/emitter";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  /* Life Cycle
    Run Component
    1. Run Construct => Init State
    2. Did mount (Set State): born => Die = UnMount
    3. Render
    */

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errorCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
    console.log("Get User from NodeJS: ", response);
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errorCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
          isOpenModalEditUser: false,
        });

        // emitter.emit("EVENT_CLEAR_MODAL_DATA", {"id": "your id"})
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (user) => {
    console.log("Click Delete: ", user);
    try {
      let response = await deleteUserService(user.id);
      console.log(response);
      if (response && response.errorCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(response.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleEditUser = (user) => {
    console.log("Check Edit User: ", user);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      let response = await editUserService(user);
      if(response && response.errorCode === 0) {
        this.setState({
          isOpenModalEditUser: false
        })

        this.getAllUsersFromReact()
        //console.log("Click Edit User: ", response)
      } else {
        alert(response.errorCode)
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;

    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />

        {/* ComponentDidUpdate */}
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}

        <div className="title text-center">Manage Users</div>

        <div className="mx-1">
          <button
            onClick={() => {
              this.handleAddNewUser();
            }}
            className="btn btn-primary px-3"
          >
            <i className="fas fa-plus"></i> Add new User
          </button>
        </div>

        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>

              {arrUsers &&
                arrUsers.map((item, index) => {
                  console.log("Check Map: ", item, index);
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>{item.phoneNumber}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => {
                            this.handleEditUser(item);
                          }}
                        >
                          <i className="fas fa-pencil-alt"></i> Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
