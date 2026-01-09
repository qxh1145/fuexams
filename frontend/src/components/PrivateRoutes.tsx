import type { UserRole } from "@/constants/roles";
import { usePermission } from "@/hooks/usePermission";
import { Navigate, Outlet } from "react-router";

interface PrivateRouteprops {
    allowedRoles: UserRole[];
}

const PrivateRoles = ({allowedRoles} : PrivateRouteprops) => {
    const {role} = usePermission();
    
    if(!role) {
        return <Navigate to='/signin' replace/>
    }

    if(allowedRoles.includes(role as UserRole)) {
        return <Outlet/>
    }

    return <Navigate to='/upgrade' replace/>
};

export default PrivateRoles;

