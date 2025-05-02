import { useState, type ChangeEvent, type FormEvent, useEffect } from "react"
import type User from "../types/user"

type Props = {
    onAdd: (user: Omit<User,"id">) => void
    edithUser: User | null,
    updateUser: (user: User)=>void
}


const UserForm = ({onAdd, edithUser, updateUser}: Props) => {
    // states
    const [formdata, setFormdata] = useState<User>({
        id: "",
        fullname: "",
        age: 0,
        education:"",
        gender:"",
        skills: [],
        bio:"",
    })

    useEffect(()=>{
        if(edithUser){
            setFormdata({
                id: edithUser.id,
                fullname: edithUser.fullname,
                age: edithUser.age,
                education: edithUser.education,
                gender: edithUser.gender,
                skills: edithUser.skills,
                bio: edithUser.bio
            })
        }
    },[edithUser])
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target
        setFormdata(prevState =>({
            ...prevState,
            [name]: value
        }))
        
    }

    const handdleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>)=>{
        const {value, checked} = e.target
        setFormdata(prevState=>{
            const updateSkills = checked ? [...prevState.skills, value] : prevState.skills.filter(skill => skill !== value && skill !== "")
            return{
                ...prevState,
                skills: updateSkills
            }
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(edithUser){
            updateUser(formdata)
        }else{
            onAdd(formdata)
        }
    }

    const handleClear = ()=>{
        setFormdata({
            id: "",
            fullname: "",
            age: 0,
            education: "",
            gender: "",
            skills: [""],
            bio: ""
        })
    }

    
  return (
    <div>
        <form id="form" onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        gap: ".4em"
    }}>
            <label>
                <input type="text" value={formdata.fullname} id="fullname" name="fullname" placeholder="Fullname" onChange={handleChange}/>
            </label>
            <label>
                <input type="number" value={formdata.age} name="age" placeholder="Age" onChange={handleChange}/>
            </label>
            <select name="education" value={formdata.education} onChange={handleChange}>
                <option value="Grade School">Grade School</option>
                <option value="High School">High School</option>
                <option value="College">College</option>
            </select>
            <p>Gender</p>
            <fieldset>
                <label>
                    Male
                    <input onChange={handleChange} name="gender" value="Male" type="radio"/>
                </label>
                <label>
                    Female
                    <input onChange={handleChange} name="gender" value="Female" type="radio" />
                </label>
                <label>
                    Other
                    <input onChange={handleChange} name="gender" value="Other" type="radio" />
                </label>
            </fieldset>
            <p>Skills</p>
            <fieldset>
                <label>
                    Typescript
                    <input type="checkbox" name="skills" value="Typescript" onChange={handdleChangeCheckbox} checked={formdata.skills.includes("Typescript")}/>
                </label>
                <label>
                    React
                    <input type="checkbox" name="skills" value="React" onChange={handdleChangeCheckbox} checked={formdata.skills.includes("React")}/>
                </label>
                <label>
                    Node
                    <input type="checkbox" name="skills" value="Node" onChange={handdleChangeCheckbox} checked={formdata.skills.includes("Node")}/>
                </label>
                <label>
                    NoSQL
                    <input type="checkbox" name="skills" value="NoSQL" onChange={handdleChangeCheckbox} checked={formdata.skills.includes("NoSQL")}/>
                </label>
            </fieldset>
            <textarea value={formdata.bio} name="bio" onChange={handleChange}/>
            <button type="submit">Add/Save User</button>
            <button type="button" onClick={handleClear}>Clear</button>
        </form>
    </div>
  )
}


export default UserForm