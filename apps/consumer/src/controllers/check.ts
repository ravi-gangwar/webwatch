import axios from "axios";

const check = async (url:string) => {
    const startTime = Date.now();
    try {
        const response = await axios.get(url);
        const responseTime = Date.now() - startTime;
        
        if(response.status === 200) {
            return {
                status: "success",
                responseTime: responseTime,
                responseCode: response.status,
            }
        } else {
            return {
                status: "failed",
                responseTime: responseTime,
                responseCode: response.status
            }
        }
    } catch (error: any) {
        const responseTime = Date.now() - startTime;
        return {
            status: "failed",
            responseTime: responseTime,
            responseCode: error.response?.status || 0
        }
    }
}

export default check;