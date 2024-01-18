export default function checkAuthorization(response,navigate){
    if(response.status === 401 || response.status === 403){
        return navigate("/login")
    }
}