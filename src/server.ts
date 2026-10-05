import app from "./app";
import config from "./app/config";

const startServer = async() =>{
    try{
        const PORT = config.PORT
        app.listen(PORT, () => {
            console.log(`Server is running on port:- http://localhost:${PORT}`);
        })
    } 
    catch (error) {
        console.log("Server Error:- ",error)
    }
} 

(async()=>{
    await startServer()
})()