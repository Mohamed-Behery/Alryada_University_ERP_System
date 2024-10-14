import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children, requiredRoles }) => {
  console.log("User role:", user ? user.role : "No user");
  console.log("Required role:", requiredRoles);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const userHasAccess =
    user && requiredRoles && requiredRoles.includes(user.role);

  console.log("User Role:", user.role);
  console.log("Required Roles:", requiredRoles);
  console.log("User Has Access:", userHasAccess);

  if (!userHasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
