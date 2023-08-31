import axios from 'axios'
import jwt_decode from 'jwt-decode'

//axios.defaults.baseURL = 'http://localhost:9000'
axios.defaults.baseURL = 'https://storygenuis.onrender.com'



/**Make API Request */

/**Get user name from token */
export async function getEmail(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token")
    let decode = jwt_decode(token)

    return decode
}

/**Authenticate function */
export async function authenticate(email){
    try {
        return await axios.post('/api/authenticate', {email} )
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/**Get user details */
export async function getUser({ email }){
    try {
        const {data} = await axios.get(`/api/user/${email}`)
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match"}
    }
}


/**Register User function */
export async function registerUser(credentials){
    try {
        const {data:{ msg }, status }= await axios.post(`api/register`, credentials)
        
        let {username, email} = credentials;

        /**Send email */
        if(status === 201){
            await axios.post('/api/registerMail', {username, userEmail : email, text: msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/**Login function */
export async function verifyPassword({ email, password }){
    try {
        if(email){
            const {data} =  await axios.post('/api/login', {email, password})
            return Promise.resolve({ data })
        }
    } catch (error) {
        return Promise.reject({ error: 'Password do not match'})
    }
}

/**Update user function */
export async function updateUser(response){
    try {
        
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateUser', response, {headers: { "Authorization" : `Bearer ${token}`}})

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error: "Couldn't update Profile"})
    }
}

/**Generate OTP */
export async function generateOTP(email){
    try {
        const {data: { code }, status} =  await axios.get('/api/generateOTP', { params: { email }})
        if(status === 201){
           let{ data : { username }} = await getUser({ email })
           let text = `Your Password Recovey OTP is ${code}. Verify and recover yur password`
           await axios.post('/api/registerMail', { username, userEmail: email, text, subject: 'Password Recovery OTP'})
        }
        return Promise.resolve(code)
    } catch (error) {
        return Promise.reject({ error});
    }
}

/** Verify OTP*/
export async function verifyOTP({ email, code}){
    try {
        const {data, status} = await axios.get('/api/verifyOTP', { params : {email, code}})
        return {data, status}
    } catch (error) {
        return Promise.reject(error)
    }
}

/**Reset password */
export async function resetPassword({ email, password }){
    try {
        const {data, status}  = await axios.put('/api/resetPassword', { email, password })
        return Promise.resolve({data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}

export async function generateStory({selectedCard, plot, language, readersAge, genre, writingPattern, chapters,userEmail}){
    try {
        //console.log(selectedCard, plot, language, readersAge, genre, writingPattern, chapters, 'FROM API')
        const token = await localStorage.getItem('token')
        if(token){
            const createStory = await axios.post('/api/createStory', {selectedCard, plot, language, readersAge, genre, writingPattern, chapters, userEmail}, {headers: {Authorization: `Bearer ${token}`}})
            //const stt = createStory.data
            //console.log(stt)
            return createStory.data
        }
    } catch (error) {
        
    }
}