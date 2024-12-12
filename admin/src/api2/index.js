import axios from "axios"
import { store } from "../redux/store"
import { toast } from "react-toastify"


const errorHandler = (error) => {
    console.log('error: ', JSON.stringify(error, null, 2))
    toast.error(error?.message || 'Something Went Wrong!')
}

const apiRequest = async (method, endpoint, data, isMultipart) => {
    try {
        const headers = {
            'accept': 'application/json',
            'content-type': isMultipart ? 'multipart/form-data' : 'application/json',
        }
        const token = store.getState()?.user?.currentUser?.accessToken
        if (token)
            headers.token = `Bearer ${token}`
        return await axios({
            method,
            url: `${process.env.REACT_APP_BASE_URL}api/${endpoint}`,
            data,
            headers
        })
    } catch (error) {
        errorHandler(error)
    }
}

export default apiRequest