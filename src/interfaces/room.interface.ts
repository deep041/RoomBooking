export interface Room {
    _id: string,
    capacity: number,
    name: string,
    facilities: Facilities,
    availability: string,
    bookings: Bookings[]
}

interface Facilities {
    _id: string,
    roomId: string,
    isSound: boolean,
    isProjector: boolean,
    isLargeScreen: boolean
}

export interface Bookings {
    _id: string,
    sessionId: string,
    roomId: string,
    date: Date,
    from: string,
    to: string
}

export interface RoomListResponse {
    message: string,
    status: number,
    data: Room[]
}

export interface RoomListPayload {
    searchText?: string,
    isSound?: boolean,
    isLargeScreen?: boolean,
    isProjector?: boolean,
    capacity?: number
}

export interface BookRoomResponse {
    data: Bookings[],
    isShowMessage: boolean,
    message: string,
    status: number
}

export interface BookRoomPayload {
    date?: Date,
    from?: string,
    to?: string,
    roomId?: string,
    sessionId?: string | null
}