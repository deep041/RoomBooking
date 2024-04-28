export interface SessionResponse {
    message: string,
    status: Number,
    data: Session
}

export interface Session {
    _id: string,
    session: string
}

export interface SessionPayload {
    session: string
}