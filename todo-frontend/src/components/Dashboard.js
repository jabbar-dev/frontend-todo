import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';





export  function Dashboard() {

    
    const [auth, setAuth] = React.useState(false);
    const [isDeleted, setIsDeleted] = React.useState(false);
    const [usersData, setusersData] = React.useState([]);


    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem("userInfo");
        navigate("/login");
        
    }
    //update button
    const upButton = (id) => {
        navigate(`/update/${id}`);}

    const delButton = (id) => { 
    
        const token = ((JSON.parse(localStorage.getItem("userInfo"))).accessToken);
            const config = {
                headers: { Authorization : "Bearer " + token },
                method: "DELETE"
                
            }

        fetch(`http://localhost:3002/api/users/${id}`,config).then(response =>{response.json().then(
                
            
            () =>{
                
                loadData();
            
            
            })})
       
    
    
    }

    const loadData = () => {
        if(localStorage.getItem("userInfo") === null){
            setAuth(false);
 
         }
         else{
             setAuth(true);
             const token = ((JSON.parse(localStorage.getItem("userInfo"))).accessToken);
             const config = {
                 headers: { Authorization : "Bearer " + token },
                 
             }
             fetch('http://localhost:3002/api/users',config).then(response =>{response.json().then(
                 
             
             data =>{
                 
                 setusersData(data.users);
             
             
             }
             
             
             
             )})
         }
    }

    useEffect(() => {
        loadData();

     }, [])
     


     if(auth){
        return <div>
            <div className='d-flex align-items-end flex-column'>
            <button className="btn btn-danger" onClick={logOut}>Logout</button>
            </div>

            <h1>Authorized</h1>

            <div className="container">
            <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Password</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    
      {
            usersData.map(user =>{ 
                return <tr><td>{user.username}</td>
                <td>{user.password}</td>
                <td>
                <button className='btn btn-danger' onClick={()=>delButton(user._id)}>Delete</button>
                <button className='btn btn-primary' onClick={()=>upButton(user._id)}>Update</button>
                </td>
                </tr>
            })
      }
    

  </tbody>
</table>
        </div>

        
        </div>
     }
     else{
        return <><h1>Not Authorized</h1></>
     }
}
