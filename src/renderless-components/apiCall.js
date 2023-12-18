import axios from "axios";
const API_URL = "http://localhost:8000";

async function apiCall({method, url, data}){
	let result;

	try{	
		result = await axios({
			method,
			url: `${API_URL}${url}`,
			data,
			withCredentials: true
		});
	}
	catch(err){
		console.log(err);
		return {success: false, message: "Connection to the server failed. Please try again later"}
	}
	
	return result.data
}


export default apiCall;
