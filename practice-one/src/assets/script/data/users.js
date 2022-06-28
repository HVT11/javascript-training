import axios from 'axios'
import { BASE_URL_API, STATUS_CODE} from '../constants/api'

axios.defaults.baseURL = BASE_URL_API

const fetchUsers = async() => {
    try {
        const res = await axios.get('/users')
        if(res?.status === STATUS_CODE.OK){
            return res.data
        }
        else {
            alert('Error')
        }
    }
    catch {
        alert('Error')
    }
}

export {
    fetchUsers
}