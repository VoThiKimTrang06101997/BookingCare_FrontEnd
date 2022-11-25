import {
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getAllUsers,
} from "../../services/userService";
import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

export const adminLoginSuccess = (adminInfo) => ({
  type: actionTypes.ADMIN_LOGIN_SUCCESS,
  adminInfo: adminInfo,
});

export const adminLoginFail = () => ({
  type: actionTypes.ADMIN_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

// Start, Doing, End
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errorCode === 0) {
        // console.log("Check getState: ", getState)
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log("FetchGenderStart Error: ", error);
    }
  };

  //type: actionTypes.FETCH_GENDER_START
};

// Gender
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

// Position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_POSITION_START});
      let res = await getAllCodeService("POSITION");
      if (res && res.errorCode === 0) {
        // console.log("Check getState: ", getState)
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log("FetchPositionFailed Error: ", error);
    }
  };

  //type: actionTypes.FETCH_GENDER_START
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

// Role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_POSITION_START});
      let res = await getAllCodeService("ROLE");
      if (res && res.errorCode === 0) {
        // console.log("Check getState: ", getState)
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log("FetchRoleFailed Error: ", error);
    }
  };

  //type: actionTypes.FETCH_GENDER_START
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log("Check Create User Redux: ", data);
      if (res && res.errorCode === 0) {
        dispatch(saveUserSuccess());
        dispatch((fetchAllUsersStart()))
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
      console.log("saveUserFailed Error: ", error);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

// Fetch All Users Start
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_POSITION_START});
      let res = await getAllUsers("ALL");
      if (res && res.errorCode === 0) {
        toast.success("Create a new user Successfully !")
        // let users = res.users.reverse()
        // console.log("Check getState: ", getState)
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error('Fetch All Users Error')
        dispatch(fetchAllUsersFailed());
      }
    } catch (error) {
      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersFailed Error: ", error);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

// Delete User
export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_POSITION_START});
      let res = await deleteUserService(userId);
      if (res && res.errorCode === 0) {
        toast.success("Delete a user Successfully !")
        // let users = res.users.reverse()
        // console.log("Check getState: ", getState)
        dispatch(deleteUserSuccess);
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      dispatch(deleteUserFailed());
      console.log("deleteUserFailed Error: ", error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USERS_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USERS_FAILED,
});

// Edit User
export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_POSITION_START});
      let res = await editUserService(data);
      if (res && res.errorCode === 0) {
        toast.success("Update a user Successfully !")
        // let users = res.users.reverse()
        // console.log("Check getState: ", getState)
        dispatch(editUserSuccess);
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(editUserFailed());
      }
    } catch (error) {
      dispatch(editUserFailed());
      console.log("EditUserFailed Error: ", error);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});