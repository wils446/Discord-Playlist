import axios from "axios";

export default class DiscordService {
    static axios = axios.create({
        baseURL: "http://localhost:3001",
    });

    static async getJwt(code: string) {
        try {
            const response = await this.axios.get("/auth", { params: code });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
}
