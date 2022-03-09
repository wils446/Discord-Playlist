export interface SongModel {
	id: number;
	URL: string;
	title: string;
	duration: number;
	thumbnailURL: string;
}

export interface ICreateSongDTO {
	title: string;
	URL: string;
	duration: number;
	thumbnailURL: string;
}
