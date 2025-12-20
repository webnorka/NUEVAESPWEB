export type Nucleus = {
    id: string;
    created_at: string;
    name: string;
    description: string | null;
    city: string;
    region: string | null;
    lat: number;
    lng: number;
    created_by: string | null;
    is_active: boolean;
    member_count: number;
};

export type NucleusMember = {
    id: string;
    created_at: string;
    nucleus_id: string;
    user_id: string;
    role: "member" | "moderator" | "admin";
};
