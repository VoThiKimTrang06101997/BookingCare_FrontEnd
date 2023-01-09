import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

// User
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

// allCode
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`) 
}

// Doctor
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
  return axios.get('/api/get-all-doctors')
}

const saveDetailDoctorService = (data) => {
  return axios.post('/api/save-infor-doctors', data)
}

const getDetailInforDoctor = (inputId) => { 
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

// Patient
const postPatientBookingAppointment = (data) => {
  return axios.post('api/patient-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
  return axios.post('api/verify-book-appointment', data)
}

// Specialty
const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data)
}

const getAllSpecialty = () => {
  return axios.get("/api/get-specialty")
}

const getAllDetailSpecialtyById = (data) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

// Clinic
const createNewClinic = (data) => {
  return axios.post('/api/create-new-clinic', data)
}

const getAllClinic = () => {
  return axios.get('/api/get-clinic')
}

const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

// getAllPatientForDoctor
const getAllPatientForDoctor = (data) => {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedy = (data) => {
  return axios.post('/api/send-remedy', data)
}

export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, getAllCodeService, getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService, getDetailInforDoctor, saveBulkScheduleDoctor, getScheduleDoctorByDate, getExtraInforDoctorById, getProfileDoctorById, postPatientBookingAppointment, postVerifyBookAppointment, createNewSpecialty, getAllSpecialty, getAllDetailSpecialtyById, createNewClinic, getAllClinic, getAllDetailClinicById, getAllPatientForDoctor, postSendRemedy};
