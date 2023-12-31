import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { backend } from "../api"


export default function Login() {
    const navigate = useNavigate()



    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const token = localStorage.getItem("token")
        backend.get(`/userData/${token}`)
            .then(res => navigate("/chat"))

    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (password == "" || password.length > 15) {
            setErrorMessage("unvalid password")
        }
        if (userName == "" || userName.length > 15) {
            setErrorMessage("unvalid user name")

        }
        if (userName.length < 15 && userName.length > 0 && password.length > 0 && password.length < 15) {

            setIsLoading(true)
            backend.post("/signin", { userName: userName, password: password })
                .then(res => {
                    setIsLoading(false)
                    const token = res.data.token
                    localStorage.setItem("token", token)
                    navigate("/")

                })
                .catch(err => {
                    setIsLoading(false)
                    if (err.response.data.message = "user was not found") {
                        setErrorMessage("User name or password is wrong")
                    } else {
                        setErrorMessage("Network Error")
                    }
                })
            setErrorMessage("")
        }

    }
    return <>
        <form className="h-[100vh] bg-[rgb(31,31,31)] flex flex-col items-center justify-center">
            {isLoading && <p className="text-white text-xl ">LOADING....</p>}

            <div className="flex w-full gap-5 items-center flex-col">
                <input type="text" placeholder="Enter your name" value={userName} onChange={(e) => setUserName(e.target.value)} className=" w-1/3 h-16 rounded-xl placeholder:text-2xl px-2 text-2xl focus:outline-0" />
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className=" w-1/3 h-16 rounded-xl placeholder:text-2xl px-2 text-2xl focus:outline-0" />
                <button onClick={handleSubmit} className="bg-[#0d6efd] hover:bg-[#467ed8] text-white text-xl font-semibold w-1/3 h-14 rounded-lg ">Login</button>
                {errorMessage && <p className="text-lg italic text-red-500 w-1/3 mt-[-10px] mb-[-10px]">{errorMessage}</p>}
                <p className="text-white w-1/3 text-lg mt-[-5px] italic hover:cursor-pointer underline" onClick={() => navigate("/register")}>Create an account?</p>

            </div>
        </form>
    </>
}