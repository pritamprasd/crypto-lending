import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);
    console.log("isSignedIn", isSignedIn)
    return isSignedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
