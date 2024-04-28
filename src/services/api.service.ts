import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BookRoomPayload, BookRoomResponse, RoomListPayload, RoomListResponse } from 'src/interfaces/room.interface';
import { SessionPayload, SessionResponse } from 'src/interfaces/session.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    url: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getRooms(payload: RoomListPayload) {
        return this.http.post<RoomListResponse>(`${this.url}/rooms`, payload)
    }

    setSession(payload: SessionPayload) {
        return this.http.post<SessionResponse>(`${this.url}/sessions`, payload)
    }

    getSessionDetails() {
        return this.http.get<SessionResponse>(`${this.url}/sessions`)
    }

    bookRoom(payload: BookRoomPayload[]) {
        return this.http.post<BookRoomResponse>(`${this.url}/bookings`, payload)
    }
}
