function checkIfIsSignedIn(){
	const isSignedIn = localStorage.getItem("isSignedIn");
	if(isSignedIn === "true" || isSignedIn === true){
		return true;
	}
	else{
		return false;
	}
}


export default checkIfIsSignedIn;
