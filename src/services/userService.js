import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`)     // Template String
}

const createNewUserService = (data) => {
  // console.log("Check Data from Service: ", data)
  return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) =>{
  // return axios.delete("/api/delete-user", {id: userId})

  return axios.delete('/api/delete-user', {
    // headers: {
    //   Authorization: authorizationToken
    // }, 
    data: {
      id: userId
    }
  })
}

const editUserService = (inputData) => {
  return axios.put('/api/edit-user', inputData)
}

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`) 
}

export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, getAllCodeService };