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