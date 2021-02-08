export interface UserListResponse {
    status: string;
    users: User[];
}

export interface User {
    id: string;
    name: string;
    picture: string;
}

