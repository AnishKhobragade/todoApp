export enum Role {
    customer = "customer",
    admin = "admin"
}

export enum Permission {
    CreateUpdateCard,
    DeleteCard,
    GetCard,
    GetAllCard,
    GetAllUser,
    All
};

export const RolePermission : any = {
    "customer": [Permission.GetAllCard, Permission.CreateUpdateCard, Permission.GetCard],
    "admin": [Permission.All]
};