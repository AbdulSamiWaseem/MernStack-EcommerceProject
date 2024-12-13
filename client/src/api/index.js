import axios from "axios"
import { store } from "../redux/store"
import { toast } from 'react-toastify';
import { Troubleshoot } from "@mui/icons-material";

const errorHandler = (error,show) => {
    if(show){
    console.log('error: ', error)
    toast.error(error?.response?.data?.message || error?.message || 'Something Went Wrong!')
    }
    
}

const apiRequest = async (method, endpoint, data,isMultipart,signal,showError=Troubleshoot) => {
    try {
        const headers = {
            'accept': 'application/json',
            'content-type': isMultipart ? 'multipart/form-data' : 'application/json',
        }
        const token = store.getState()?.user?.currentUser?.accessToken
        if (token)
            headers.token = `Bearer ${token}`
        // console.log('headersssss', headers)
        return await axios({
            method,
            url: `${process.env.REACT_APP_BASE_URL}api/${endpoint}`,
            data,
            headers,
            signal
        })
    } catch (error) {
        errorHandler(error,showError)
    }
}

export default apiRequest