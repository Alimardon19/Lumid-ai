/**
 * userMe permissions type
 */
export type permissionsType = {
    can_create: boolean;
    can_delete: boolean;
    can_read: boolean;
    can_update: boolean;
    codename: string;
    name: string;
    permission: number;
};

export interface IUserMe {
    id: number,
    full_name: string,
    phone: string,
    avatar: string | undefined,
    username: string,
    email: string,
    birth_date: string,
    gender: string,
    user_type: number,
    permissions: permissionsType[] | [],
}