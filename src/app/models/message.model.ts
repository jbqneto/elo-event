export interface SocketMessage {
    message: string;
    user?: number;
    type?: 'ADMIN' | 'ALL'
}