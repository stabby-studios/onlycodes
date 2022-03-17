import { Button } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase"

const Kill = () => { 

    const auth = getAuth(app);
    const nav = useNavigate()

    const handleLogout =() => {
        signOut(auth).then(() => {
            return <>{nav('/login')}</>
        }).catch((E) => {
            console.log(E)
        })
    }

    return (
        <Button onClick={handleLogout} style={{position: 'relative', top: '75px'}}>
            FORCE LOGOUT
        </Button>
    )

}

export default Kill