export default async function (req, res) {
    
    const {cookies} = req;

    const jwt = cookies.OursiteJWT;

    console.log(jwt);
    


}