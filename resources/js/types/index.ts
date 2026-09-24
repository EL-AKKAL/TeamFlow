export type * from "./auth";
export type * from "./navigation";
export type * from "./ui";

export type Workspace = {
    id: number;
    name: string;
    members_count?: number;
    members?: Member[];
};

export interface Member {
    id: number;
    name: string;
    email: string;
    role: string;
    joined_at: string;
    avatar_url: string;
}
