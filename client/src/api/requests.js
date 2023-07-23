import { BASE_URL } from "./base_url";
import axios from 'axios'

//register
export const signUp = (payload)=>{
    axios.post(`${BASE_URL}/register`,payload)
}

//login
export const signIn = async(payload)=>{
    const response =  await axios.post(`${BASE_URL}/login`,payload);
    return response.data;
}

//users
export const getUsers = async(token)=>{
    let users;
    await axios.get(`${BASE_URL}/users`,{
        headers: {
            'x-access-token': token
        }
    }).then((res)=>{
        users = res.data;
    })
    return users;
}

//************************************************************************ */

//logo
export const getAllLogo = async(title)=>{
    let URL
    let globalData

    if(!title){
        URL = BASE_URL+ "/logo"
    }
    else{
        URL = BASE_URL + "/logo/"+`?logo=${title}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}

export const getLogoById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/logo/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deleteLogo = async(id)=>{
   let deletedLogo
    await axios.delete(`${BASE_URL}/logo/${id}`).then((res)=>{
        deletedLogo=res.data
    })
    return deletedLogo
}

export const editLogo = (id,updatedLogo)=>{
   axios.put(`${BASE_URL}/logo/${id}`,updatedLogo)
}

export const postLogo = (newLogo)=>{
    axios.post(`${BASE_URL}/logo`,newLogo)
}