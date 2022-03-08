# Backend Routes

Backend Routes documentation.
<br />

## Authentication

---

### 1. Get User Data

> `GET localhost:PORT/auth?code=`

## Playlists

---

### 1. Get Playlist By Id

> `GET localhost:PORT/playlists/:playlistId`

### 2. Get Random Playlist

> `GET localhost:PORT/playlists/`

### 3. Create Playlist

> `POST localhost:PORT/playlists`

### 4. Delete Playlist By Id

> `DELETE localhost:PORT/playlists/:playlistId`

### 5. Get Song From Playlist

> `GET localhost:PORT/playlists/:playlistId/songs/:songId`

### 6. Add Song Into Playlist

> `POST localhost:PORT/playlists/:playlistId/songs`

### 7. Remove Song From Playlist

> `DELETE localhost:PORT/playlists/:playlistId/songs/:songId`

### 8. Change Song Queue Number

> `PUT localhost:PORT/playlists/:playlistId/songs/:songId/queue`

## Songs

---

### 1. Get Song Info By URL

> `GET localhost:PORT/playlists/:playlistId/songs?URL=`
