import { useEffect } from 'react';
import UserList from '../components/UserList';
const Users =() =>{
   useEffect(() => {
       return (
        <UserList items={USERS}/>
       ) 
   }, [])

}

export default Users;