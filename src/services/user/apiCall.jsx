import { toast } from "sonner";
import { api } from "./api";
import { store } from "../../utils/context/store";
import { logout } from "../../utils/context/authSlice";


export const apiCall = async(method, url, data) => {
  return await new Promise(async (resolve, reject) => {
    try {
      let response, error;
      if(method === 'post') {
        console.log("in api call", url, data);
        response = await api.post(url, data).catch((err) => {
          error = err
        }) 
      } else if(method === 'get') {
        response = await api.get(url).catch((err) => {
          error = err
        })
      } else if(method === 'patch') {
        response = await api.patch(url, data).catch((err) => {
          error = err
        })
      } else if(method === 'put') {
        response = await api.put(url, data).catch((err) => {
          error = err
        })
      } else if(method === 'delete') {
        response = await api.delete(url).catch((err) => {
          error = err
        })
      }

      if(response) {
        resolve(response)
        console.log("response", response);
      } else if(error) {  
        console.log("in error");
        if(error?.response?.status == 401) {
          toast.error("user is blocked");
          store.dispatch(logout(null))
          return
        }
        console.log( "error in apical",error.response); 
        reject(error?.response?.data);
      }
    } catch (error) {
      console.log("error in api", error);
      reject(err.response.data);
    }
  })
}