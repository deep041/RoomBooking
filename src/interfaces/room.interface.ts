export interface Room {
    _id: String,
    capacity: Number,
    name: String,
    facilities: Facilities,
    availability: string,
    bookings: Bookings[]
}

interface Facilities {
    _id: String,
    roomId: String,
    isSound: Boolean,
    isProjector: Boolean,
    isLargeScreen: Boolean
}

export interface Bookings {
    _id: String,
    sessionId: String,
    roomId: String,
    date: Date,
    from: String,
    to: String
}

export interface RoomListResponse {
    message: String,
    status: Number,
    data: Room[]
}

export interface RoomListPayload {
    searchText?: string,
    isSound?: boolean,
    isLargeScreen?: boolean,
    isProjector?: boolean,
    capacity?: number
}