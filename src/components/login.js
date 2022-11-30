import { useState } from "react"
import { useDispatch } from 'react-redux';

const Login = () => {
    const [userEmail, setUserEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault()
        if(userEmail && userName){
            dispatch({ type: "AUTH_SUCCESS", payload: {userEmail, userName} });
            setError(false)
        }
        else{
            setError(true)
        }
    }
    return (
        <div className="bg-gray-50 grid place-items-center h-screen">
            <form className="bg-white rounded-lg w-72 p-6 shadow-md" onSubmit={(e) => handleLogin(e)}>
                <h1 className="mb-4 font-medium text-lg text-slate-400">Login</h1>
                <div>
                    <div className="mb-2">
                        <input placeholder="Id" type={"email"} value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full mb-1 bg-slate-50 px-3 py-1 text-sm rounded" required/>
                    </div>
                    <div className="mb-2">
                        <input placeholder="Name" type={"text"} value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full mb-1 bg-slate-50 px-3 py-1 text-sm rounded" required/>
                        {
                            error ? 
                            <p className="text-xs text-red-500" >Please enter a user info</p>:
                            null
                        }
                    </div>
                </div>
                <button className="rounded bg-blue-400 text-white text-sm w-full py-1" type="submit">Login</button>
            </form>
        </div>
      )
}

export default Login