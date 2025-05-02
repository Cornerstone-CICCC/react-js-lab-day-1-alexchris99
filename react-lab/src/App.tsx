import UserList from './Components/UserList'
import UserForm from './Components/UserForm'
import UserProfile from './Components/UserProfile'
import { useState } from "react"
import type User from './types/user'
import {v4 as uuidv4} from "uuid"
import './App.css'


const App = () => {
  // Array
  const [users, setUsers] = useState<User[]>([
  ])
  // States
  const [userEdit, setUser] = useState<User | null>(null)
  const [viewUser, setViewUser] = useState <User>({
    id: "",
    fullname: "",
    age: 0,
    education:"",
    gender:"",
    skills: [],
    bio:"",
  })

  //const [key, setKey] = useState<string>("")
  
  // Handdlers
  const handdleAddUser= (user: Omit<User, "id">) =>{
      setUsers(prevState =>[
          ...prevState,{
              ...user,
              id: uuidv4()
          }]
      )
      // toast for adding an user
  }

  const handleDeleteUser = (id: string) =>{
      setUsers(prevState=>
          prevState.filter(user => user.id !== id)
      )
      // toast
  }

  const handleUpdateUser = (userEdit: User) =>{
      setUsers(prevState=>
          prevState.map(user=>
              user.id === userEdit.id ? {...userEdit} : user
          )
      )
      setUser(null)
      // toast
  }

  const handleEditUser = (id: string) => {
      const found = users.find(user => user.id === id)
      if(found){
          setUser(found)
      }else{
          setUser(null)
      }
  }

  const handleViewUser = (id: string)=>{
    const found = users.find(user => user.id === id)
    if(found){
      setViewUser({
        id: found.id,
        fullname: found.fullname,
        age: found.age,
        education: found.education,
        gender: found.gender,
        skills: found.skills,
        bio: found.bio
      })
    }
  }

  return (
    <div>
        <ul>
            {users.map(user =>(
                <UserList
                key={user.id}
                user={user}
                onDelete={handleDeleteUser}
                editUser={handleEditUser}
                viewUser={handleViewUser}
                />
            ))}
        </ul>
        <ul>
          <UserForm
          onAdd={handdleAddUser}
          edithUser={userEdit}
          updateUser={handleUpdateUser}
          />
        </ul>
        <h3>User Profile</h3>
        <ul>
          {viewUser.fullname !== "" ? <UserProfile user={viewUser}  
          /> : ""}
        </ul>
    </div>
  )
}

export default App
