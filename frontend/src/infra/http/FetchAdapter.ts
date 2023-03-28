import HttpClient from "./HttpClient";

export default class FetchAdapter implements HttpClient {
    async get(url: string): Promise<any> {
        const response = await fetch(url);
        return response.json();
    }
    async post(url: string, data: any): Promise<any> {
        let options = { headers: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(data)
        }
        const response = await fetch(url, options);
        return response.json();
    }
}