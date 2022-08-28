import { Navigate, Outlet } from 'react-router-dom';
import { useUserAuth } from '../../contexts/AuthContext';

interface IAuth {
    children?: any;
}

function IsAuth({ children }: IAuth) {
    const { user } = useUserAuth();

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    return children ? children : <Outlet />;
}

export default IsAuth;
