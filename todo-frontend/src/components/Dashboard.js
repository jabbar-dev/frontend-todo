import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';




export  function Dashboard() {

    const [auth, setAuth] = React.useState(false);

    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem("userInfo");
        navigate("/login");
        
    }

    useEffect(() => {
        console.log("Auth Val" , auth);
        console.log(localStorage.getItem("userInfo"));
        if(localStorage.getItem("userInfo") === null){
           setAuth(false);
        }
        else{
            setAuth(true);
        }

     }, [])
     


     if(auth){
        return <div>
            <div className='d-flex align-items-end flex-column'>
            <button className="btn btn-danger" onClick={logOut}>Logout</button>
            </div>

            <h1>Authorized</h1>
        

        
        </div>
     }
     else{
        return <><h1>Not Authorized</h1></>
     }
}
