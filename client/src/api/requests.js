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

// ********************************


export const getAllSliders = async(title)=>{
    let URL
    let globalData

    if(!title){
        URL = BASE_URL+ "/sliders"
    }
    else{
        URL = BASE_URL + "/sliders/"+`?title=${title}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getSliderById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/sliders/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deleteSlider = async(id)=>{
   let deletedSlider
    await axios.delete(`${BASE_URL}/sliders/${id}`).then((res)=>{
        deletedSlider=res.data
    })
    return deletedSlider
}

export const editSlider = (id,updatedSlider)=>{
   axios.put(`${BASE_URL}/sliders/${id}`,updatedSlider)
}

export const postSlider = (newSlider)=>{
    axios.post(`${BASE_URL}/sliders`,newSlider)
}

//************************************************** */

//services
export const getAllServices = async(title)=>{
    let URL
    let globalData

    if(!title){
        URL = BASE_URL+ "/services"
    }
    else{
        URL = BASE_URL + "/services/"+`?title=${title}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getServiceById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/services/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deleteService = async(id)=>{
   let deletedService
    await axios.delete(`${BASE_URL}/services/${id}`).then((res)=>{
        deletedService=res.data
    })
    return deletedService
}

export const editService = (id,updatedService)=>{
   axios.put(`${BASE_URL}/services/${id}`,updatedService)
}

export const postService = (newService)=>{
    axios.post(`${BASE_URL}/services`,newService)
}

/******************************************* */
//categories
export const getAllCategories = async(name)=>{
    let URL
    let globalData

    if(!name){
        URL = BASE_URL+ "/categories"
    }
    else{
        URL = BASE_URL + "/categories/"+`?name=${name}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getCategoryById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/categories/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deleteCategory = async(id)=>{
   let deletedCategory
    await axios.delete(`${BASE_URL}/categories/${id}`).then((res)=>{
        deletedCategory=res.data
    })
    return deletedCategory
}

export const editCategory = (id,updatedCategory)=>{
   axios.put(`${BASE_URL}/categories/${id}`,updatedCategory)
}

export const postCategory = (newCategory)=>{
    axios.post(`${BASE_URL}/categories`,newCategory)
}


/******************************************* */
//categories
export const getAllWorks = async(title)=>{
    let URL
    let globalData

    if(!title){
        URL = BASE_URL+ "/works"
    }
    else{
        URL = BASE_URL + "/works/"+`?title=${title}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getWorkById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/works/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deleteWork = async(id)=>{
   let deletedWork
    await axios.delete(`${BASE_URL}/works/${id}`).then((res)=>{
        deletedWork=res.data
    })
    return deletedWork
}

export const editWork = (id,updatedWork)=>{
   axios.put(`${BASE_URL}/works/${id}`,updatedWork)
}

export const postWork = (newWork)=>{
    axios.post(`${BASE_URL}/works`,newWork)
}

/******************************************* */
//prices
export const getAllPrices = async(name)=>{
    let URL
    let globalData

    if(!name){
        URL = BASE_URL+ "/prices"
    }
    else{
        URL = BASE_URL + "/prices/"+`?name=${name}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getPriceById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/prices/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deletePrice = async(id)=>{
   let deletedPrice
    await axios.delete(`${BASE_URL}/prices/${id}`).then((res)=>{
        deletedPrice=res.data
    })
    return deletedPrice
}

export const editPrice = (id,updatedPrice)=>{
   axios.put(`${BASE_URL}/prices/${id}`,updatedPrice)
}

export const postPrice = (newPrice)=>{
    axios.post(`${BASE_URL}/prices`,newPrice)
}


/******************************************* */
//team
export const getAllTeam = async(fullname)=>{
    let URL
    let globalData

    if(!fullname){
        URL = BASE_URL+ "/team"
    }
    else{
        URL = BASE_URL + "/team/"+`?fullname=${fullname}`
    }

    await axios.get(URL).then((res)=>{
        globalData=res.data
    })

    return globalData
}


export const getPersonById = async(id)=>{
    let globalData;
    await axios.get(`${BASE_URL}/team/${id}`).then((res)=>{
        globalData=res.data
        })
        return globalData
}

export const deletePerson = async(id)=>{
   let deletedPerson
    await axios.delete(`${BASE_URL}/team/${id}`).then((res)=>{
        deletedPerson=res.data
    })
    return deletedPerson
}

export const editPerson = (id,updatedPerson)=>{
   axios.put(`${BASE_URL}/team/${id}`,updatedPerson)
}

export const postPerson = (newPerson)=>{
    axios.post(`${BASE_URL}/team`,newPerson)
}
