import { useContext } from "react"
import AuthContext from "./auth";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;