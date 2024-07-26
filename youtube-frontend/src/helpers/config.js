import axois from "axios"
export const jwt = localStorage.getItem("jwt")
export const API_BASE_URL = "http://localhost:3000"
// export const api = axois.create({
//     baseURL: API_BASE_URL,
//     headers:{
//         "Authorization": `Bearer ${jwt}`,
//         'Content-Type':'application/json'
//     }
// })
export const config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }