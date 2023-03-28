import axios from "axios";
import HttpClient from "./HttpClient";

export default class AxiosAdapter implements HttpClient {
    async get(url: string): Promise<any> {
        const response = await axios.get(url);
        const responseData = response.data;
        return responseData;
    }
    async post(url: string, data: any): Promise<any> {
        const response = await axios.post(url, data);
        const responseData = response.data;
        return responseData;
    }

}