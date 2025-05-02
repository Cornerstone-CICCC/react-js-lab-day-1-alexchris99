import type User from "../types/user"

type Props={
    user: User
}

const UserProfile = (props: Props) => {
  
  return (
        <li>
            {props.user.fullname}, is {props.user.age} years old. His/Her education is {props.user.education}. {props.user.gender}. His skils are {props.user.skills.map((skill)=>(
                // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                <span>{skill}   </span>
            ))}. Bio: {props.user.bio}
        </li>
    )
}

export default UserProfile