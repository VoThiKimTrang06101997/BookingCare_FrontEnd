import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import "./TableManageUser.scss";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  async componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }

    if(prevProps.listUsers !== this.props.listUsers) {
      this.setState({
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
      })
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
    // console.log("Delete the user: ", user)
  }

  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user)
    //console.log("Edit User: ", user)
  }

  render() {
    console.log("Check All Users: ", this.props.listUsers);
    console.log("Check state: ", this.state.usersRedux);
    let arrUsers = this.state.usersRedux;
    return (
      <table id="TableManageUser">
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
            arrUsers.length > 0 &&
            arrUsers.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.email}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td>{item.phoneNumber}</td>
                  <td>
                    <button className="btn-edit"
                    onClick={() => {this.handleEditUser(item)}}
                    >
                      <i className="fas fa-pencil-alt"></i> Edit
                    </button>
                    <button className="btn-delete"
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
