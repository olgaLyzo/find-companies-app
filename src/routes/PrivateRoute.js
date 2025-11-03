import { isAuthenticated } from "../utils/auth";
const PrivateRoute = () => {
    return isAuthenticated() ? /> : <Navigate to="/auth : ;
    " replace />;;
};
export default PrivateRoute;
