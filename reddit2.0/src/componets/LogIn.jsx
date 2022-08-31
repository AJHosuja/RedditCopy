import React, { useContext, useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebasecfg';
import { AuthContext } from '../context/AuthReducer';

const LogIn = ({ setLogIn, setShowSingUp }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { dispatch } = useContext(AuthContext)

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setLogIn(true)
                dispatch({ type: "LOGIN", payload: user })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessafe = error.message;
                console.log(error)
            })
    }
    return (
        <div className='flex justify-center items-center absolute z-20 top-0 right-0 bottom-0 left-0 h-[100%] bg-black bg-opacity-20'>
            <div className='flex flex-row relative bg-white w-[700px] h-[700px] rounded-lg justify-center items-center'>
                <form onSubmit={handleLogin} className='flex flex-col space-y-8'>
                    <input
                        placeholder='Email'
                        name='email'
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-gray-300 outline-none border border-gray-500 rounded-lg pl-2' />
                    <input
                        placeholder='Password'
                        name='password'
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-300 outline-none border border-gray-500 rounded-lg pl-2' />
                    <button type='submit' className='bg-blue-500 rounded-lg text-white'>Log In</button>
                </form>

                <XMarkIcon className='absolute w-10 right-10 top-10 cursor-pointer' onClick={() => setLogIn(false)} />
            </div>
        </div>
    )
}

export default LogIn