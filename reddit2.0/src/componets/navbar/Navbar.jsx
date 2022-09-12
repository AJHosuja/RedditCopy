import React, { useContext, useState } from 'react'
import { ChevronDownIcon, HomeIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon, BellIcon, PlusIcon, SparklesIcon, VideoCameraIcon, GlobeAltIcon, ChatBubbleOvalLeftEllipsisIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import logo from "../../assets/reddit-logo.png"
import LogIn from '../LogIn'
import { AuthContext } from '../../context/AuthReducer'
import SignIn from '../SignIn'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [showLogIn, setShowLogIn] = useState(false)
    const [showSingUp, setShowSingUp] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const [isLogged, setIslogged] = useState(false)
    const { dispatch } = useContext(AuthContext)

    useState(() => {
        if (currentUser) {
            setIslogged(true)
        }
    }, [currentUser])

    const logOut = () => {
        dispatch({ type: "LOGOUT" })
    }


    return (
        <>
            <div className='sticky top-0 z-10 flex px-4 py-2 shadow-lg bg-white'>
                <div className='relative h-10 w-24 flex-shrink-0 cursor-pointer mr-4 lg:mr-20 '>
                    <Link to={"/"}>
                        <img src={logo} />
                    </Link>
                </div>

                <form className='flex items-center flex-1 space-x-2 border
            border-gray-200 rounded-md
            bg-gray-200
            pl-2
            hover:border-blue-600
            '>
                    <MagnifyingGlassIcon className='w-5 h-5' />
                    <input type="text" placeholder='Search Reddit' className='flex-1 bg-gray-200 outline-none' />
                    <button type="submit" hidden />
                </form>
                {currentUser ?
                    <div className='items-center text-gray-600 space-x-2
                        mx-5 hidden lg:inline-flex
                        cursor-pointer '
                        onClick={logOut}
                    >
                        <ArrowLeftOnRectangleIcon className='w-4 text-black' />
                        <p>Log Out</p>
                    </div>
                    :
                    <>
                        <div className='flex items-center border border-blue-700 w-24 justify-center rounded-full ml-5' onClick={() => setShowLogIn(!showLogIn)}>
                            <button><strong className='text-blue-600'>Log In</strong></button>
                        </div>
                        <div className='flex items-center border border-blue-600 w-24 justify-center rounded-full ml-3 bg-blue-600' onClick={() => setShowSingUp(!showSingUp)}>
                            <button><strong className='text-white'>Sign Up</strong></button>
                        </div>
                    </>

                }
                <div>
                </div>
            </div>
            {showLogIn &&
                <LogIn setShowLogIn={setShowLogIn} />
            }
            {showSingUp &&
                <SignIn setShowSingUp={setShowSingUp} />
            }
        </>
    )
}

export default Navbar