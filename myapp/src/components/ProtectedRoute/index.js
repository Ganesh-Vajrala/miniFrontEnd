import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = Cookies.get('token');
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

  if (token && user && allowedRoles.includes(user.role)) {
    return <Outlet />; // Render the protected component
  } else {
    return <Navigate to="/login" replace={true}/>; // Redirect to login if unauthorized
  }
};

export default ProtectedRoute;
