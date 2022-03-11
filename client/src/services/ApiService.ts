import axios, { AxiosInstance } from "axios";

export interface User {
    id: number;
    name: string;
    discriminator: string;
    avatar: string;
}

export interface Playlist {
    id: number;
    name: string;
    createdAt: Date;
    createdBy: string;
}

export interface Song {
    id: number;
    URL: string;
    title: string;
    duration: number;
    thumbnailURL: string;
}

export interface SongInfo {
    URL: string;
    title: string;
    duration: number;
    thumbnailURL: string;
}

export interface PlaylistData {
    name: string;
    createdAt: Date;
    createdBy: string;
    permission: boolean;
    songs: Song[];
}

export interface IAddSongDTO {
    title: string;
    URL: string;
    duration: number;
    thumbnailURL: string;
}

export default class ApiService {
    private axios: AxiosInstance;

    constructor(jwt: string) {
        this.axios = axios.create({
            baseURL: "http://localhost:3001",
            headers: { Authorization: `Bearer ${jwt}` },
        });
    }

    async getUser(): Promise<User> {
        try {
            const response = await this.axios.get("/users/me");
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    async searchPlaylist(search?: string): Promise<Playlist[]> {
        try {
            const urlPath = search ? `/playlists?search=${search}` : "/playlists";
            const response = await this.axios.get(urlPath);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    async createPlaylist(name: string): Promise<number> {
        try {
            const response = await this.axios.post("/playlists", { name });
            return response.data.newPlaylistId;
        } catch (err) {
            throw err;
        }
    }

    async deletePlaylist(playlistId: string): Promise<number> {
        try {
            const response = await this.axios.delete(`/playlists/${playlistId}`);
            return response.status;
        } catch (err) {
            throw err;
        }
    }

    async getPlaylistById(playlistId: string): Promise<PlaylistData> {
        try {
            const response = await this.axios.get(`/playlists/${playlistId}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    async addSongToPlaylist(playlistId: string, data: IAddSongDTO): Promise<number> {
        try {
            const response = await this.axios.post(`/playlists/${playlistId}/song`, data);
            return response.status;
        } catch (err) {
            throw err;
        }
    }

    async removeSongFromPlaylist(playlistId: string, songId: string): Promise<number> {
        try {
            const response = await this.axios.delete(`/playlists/${playlistId}/song/${songId}`);
            return response.status;
        } catch (err) {
            throw err;
        }
    }

    async updateSongQueue(playlistId: string, songId: string, position: number): Promise<number> {
        try {
            const response = await this.axios.put(`/playlists/${playlistId}/song/${songId}`, { position });
            return response.status;
        } catch (err) {
            throw err;
        }
    }

    async getSongInfoByURL(Url: string): Promise<SongInfo> {
        try {
            const response = await this.axios.get(`/song?URL=${Url}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}
