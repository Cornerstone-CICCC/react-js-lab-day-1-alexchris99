import type User from "../types/user"

type Props = {
    user: User,
    onDelete:(id: string)=> void,
    editUser: (id: string)=> void,
    viewUser: (id: string) => void
}

const UserList = ({user, onDelete, editUser, viewUser}: Props) => {
  return (
    <li style={{
        display: "flex",
        flexDirection: "row",
        gap: ".5em"
    }}>
        <p>ID: {user.id} Full Name:{user.fullname}</p>
        <button type="button" onClick={()=> viewUser(user.id)}>View</button>
        <button type="button" onClick={()=> editUser(user.id)}>Edit</button>
        <button type="button" onClick={()=> onDelete(user.id)}>Delete</button>
    </li>
  )
}

export default UserList