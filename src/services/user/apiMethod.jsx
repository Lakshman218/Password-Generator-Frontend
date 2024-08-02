import { userUrls } from "../endPoints";
import { apiCall } from "./apiCall";

export const postRegister = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.register, userData)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  })
}

export const login = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.login, userData)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  })
}

export const savePassword = (passwordData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.savePassword, passwordData)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  })
}

export const getAllPassword = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.getPassword, userData)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  })
}

export const deletePassword = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.deletePassword, userData)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  })
}