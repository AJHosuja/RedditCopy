import React, { useContext, useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebasecfg';
import { AuthContext } from '../context/AuthReducer';
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebasecfg';
import bgPicture from '../assets/loginBG.png'

const LogIn = ({ setShowLogIn }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")

    const { dispatch } = useContext(AuthContext)

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setErrorText("")

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                const query = doc(db, "users", user.uid);
                const requestData = await getDoc(query);
                const filteredRequestData = requestData.data()

                const payload = {
                    ...user,
                    userImg: filteredRequestData.img,
                    userName: filteredRequestData.Username
                }

                console.log(payload)

                dispatch({ type: "LOGIN", payload: payload })
                setShowLogIn(false)
            })
            .catch((error) => {
                setErrorText("Wrong password or email...")
            })
    }
    return (
        <div className='flex justify-center items-center absolute z-20 top-0 right-0 bottom-0 left-0 h-[100%] bg-black bg-opacity-20'>
            <div className='flex flex-row relative bg-white w-[650px] h-[650px] rounded-lg  items-center'>
                <div>
                    <img src={bgPicture} />
                </div>
                <div className='ml-10 flex flex-col space-y-10'>
                    <h1 className='text-2xl font-semibold'>Log in</h1>
                    <form onSubmit={handleLogin} className='flex flex-col space-y-6'>
                        <input
                            placeholder='Email'
                            name='email'
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className='bg-white h-10 outline-none border border-gray-300 rounded pl-3 hover:items' />
                        <input
                            placeholder='Password'
                            name='password'
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className='bg-white h-10 outline-none border border-gray-300 rounded pl-3' />
                        <p className='text-red-600'>{errorText}</p>
                        <button type='submit' className='bg-blue-500 h-10 rounded-full text-white text-xl'>Log In</button>
                    </form>
                </div>

                <XMarkIcon className='absolute w-10 right-10 top-10 cursor-pointer' onClick={() => setShowLogIn(false)} />
            </div>
        </div>
    )
}

export default LogIn