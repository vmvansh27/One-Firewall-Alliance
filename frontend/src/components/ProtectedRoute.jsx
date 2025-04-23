// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole }) {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        // If no user is logged in, send to login page
        return <Navigate to="/" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // If role doesn't match, send to home page (or show unauthorized page)
        return <Navigate to="/home" replace />;
    }

    // If all good, show the requested page
    return children;
}

export default ProtectedRoute;
