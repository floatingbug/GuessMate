import axios from "axios";
const API_URL = "http://localhost:3000";

async function apiCall({method, url, data, headers}){
	try{	
		const result = await axios({
			method,
			url: `${API_URL}${url}`,
			headers,
			data,
			withCredentials: true
		});

		return result.data;
	}
	catch(err){
		throw new Error("Connection to the server failed. ERROR:", err);
	}
}


export default apiCall;
