import { useEffect, useState } from 'react';
import UserList from '../components/UserList';
const Users =() =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();
   useEffect(() => {
       const sendRequest = async ()=> {
           setIsLoading(true);
            try {
                const res = await fetch('http://localhost:5000/api/users');
                const responseData = await res.json();
                setLoadedUsers(responseData.users);
                if(!res.ok){
                    throw new Error(responseData.message)
                }
                
            } catch (err) {
                setIsLoading(false);
                setError(err.message);
            }

            setIsLoading(true);
       }
       sendRequest();
   }, [])
    return (<UserList items={USERS}/>
    ) 
}

export default Users;