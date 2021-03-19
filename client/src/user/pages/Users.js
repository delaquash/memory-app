import UserList from '../components/UserList';
const Users =() =>{
    const USERS = [{
        id: 'ul',
        name: 'Max Schwars',
        image: "https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8amF2YXNjcmlwdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
        places: 3
    }]
    return (
        <div>
            <UserList items={USERS}/>
        </div>
    )
}

export default Users;