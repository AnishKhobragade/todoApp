import { Role, Permission, RolePermission } from './../dataTransferModel/permission'


export class AuthorizationService {
    public static hasPermission(role: any, permission: any) {
        let userPermission = RolePermission[role];

        if (userPermission.indexOf(permission) >= 0 || userPermission.indexOf(Permission.All) >=0 ) {
            return true;
        }
        return false;
    }

    public static Authorize(req:any, res:any, next:any)
    {
        if  (req.user.role == Role.admin)
        {
            next();
            return;
        }

        return res.status(401).json("Access denied, You dont have permission");
    }
}