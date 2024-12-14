import axios from "axios";
import { BaseUrl } from "./config";

export const Action=axios.create({
    baseURL:BaseUrl,
    headers:{
        'Content-Type': 'application/json', // Default content type for requests
    }
});
