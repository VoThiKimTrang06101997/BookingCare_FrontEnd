import {
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllClinic,
  getAllCodeService,
  getAllDoctors,
  getAllSpecialty,
  getAllUsers,
  getTopDoctorHomeService,
  saveDetailDoctorService,
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

// Fetch Position
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

// Fetch Role
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
        dispatch(fetchAllUsersStart());
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
      // let res1 = await getTopDoctorHomeService("3")
      // console.log("Check Get top Doctor: ", res1);

      if (res && res.errorCode === 0) {
        toast.success("Create a new user Successfully !");
        // let users = res.users.reverse()
        // console.log("Check getState: ", getState)
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch All Users Error");
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
  users: data,
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
        toast.success("Delete a user Successfully !");
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
        toast.success("Update a user Successfully !");
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

// Fetch Top Doctor
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      console.log("getTopDoctor: ", res)

      if (res && res.errorCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
        });
      }
      // console.log("Check response: ", res)
    } catch (error) {
      console.log("FETCH_TOP_DOCTOR_FAILED", error);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchTopDoctorSuccess = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
});

export const fetchTopDoctorFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
});

// Fetch All Doctor
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      console.log("getAllDoctors: ", res)

      if (res && res.errorCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
      // console.log("Check response: ", res)
    } catch (error) {
      console.log("FETCH_ALL_DOCTORS_FAILED", error);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};

// Save Detail Doctor
export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      console.log("saveDetailDoctor: ", res)

      if (res && res.errorCode === 0) {
        toast.success("Save Information Detail Doctor Successfully !")

        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
          dataDr: res.data,
        });
      } else {
        console.log("Error res: ", res)
        toast.error("Save Information Detail Doctor Error !")
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
      // console.log("Check response: ", res)
    } catch (error) {
      toast.error("Save Information Detail Doctor Error !")
      console.log("SAVE_DETAIL_DOCTOR_FAILED", error);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

// Fetch All Schedule Time
export const fetchAllScheduleTime = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      console.log("fetchAllScheduleTime: ", res)

      if (res && res.errorCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
      // console.log("Check response: ", res)
    } catch (error) {
      console.log("FETCH_ALLCODE_SCHEDULE_TIME_FAILED", error);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

// Fetch get Required Doctor Infor
export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START});

      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();

      if (resPrice && resPrice.errorCode === 0
          && resPayment && resPayment.errorCode === 0
          && resProvince && resProvince.errorCode === 0
          && resSpecialty && resSpecialty.errorCode === 0
          && resClinic && resClinic.errorCode === 0
          ) {
            let data = {
              resPrice: resPrice.data,
              resPayment: resPayment.data,
              resProvince: resProvince.data,
              resSpecialty: resSpecialty.data,
              resClinic: resClinic.data
            }
        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInforFailed());
      }
    } catch (error) {
      dispatch(fetchRequiredDoctorInforFailed());
      console.log("fetchRequiredDoctorInforFailed Error: ", error);
    }
  };
};

// Gender
export const  fetchRequiredDoctorInforSuccess= (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: allRequiredData,
});

export const fetchRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});
