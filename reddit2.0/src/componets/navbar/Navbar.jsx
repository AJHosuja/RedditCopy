import React, { useContext, useState } from 'react'
import { ChevronDownIcon, HomeIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon, BellIcon, PlusIcon, SparklesIcon, VideoCameraIcon, GlobeAltIcon, ChatBubbleOvalLeftEllipsisIcon, ArrowLeftOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/outline'
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
    const [showDrawer, setShowDrawer] = useState(false)

    useState(() => {
        if (currentUser) {
            setIslogged(true)
        }
    }, [currentUser])

    const logOut = () => {
        setShowDrawer(false)
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
                    <>
                        <div className='hidden lg:flex'>
                            <div className='items-center text-gray-600 space-x-2
                        mx-5 hidden lg:inline-flex
                        cursor-pointer '
                                onClick={logOut}
                            >
                                <ArrowLeftOnRectangleIcon className='w-4 text-black' />
                                <p>Log Out</p>
                            </div>
                        </div>
                        <div className='flex lg:hidden pl-2'>
                            <Bars3Icon className='w-7 cursor-pointer rounded hover:bg-gray-300'
                                onClick={() => setShowDrawer(!showDrawer)}
                            />
                        </div>
                    </>
                    :
                    <>
                        <div className='hidden lg:flex '>
                            <div className='flex items-center border border-blue-700 w-24 justify-center rounded-full ml-5' onClick={() => setShowLogIn(!showLogIn)}>
                                <button><strong className='text-blue-600'>Log In</strong></button>
                            </div>
                            <div className='flex items-center border border-blue-600 w-24 justify-center rounded-full ml-3 bg-blue-600' onClick={() => setShowSingUp(!showSingUp)}>
                                <button><strong className='text-white'>Sign Up</strong></button>
                            </div>
                        </div>
                        <div className='flex lg:hidden pl-2'>
                            <Bars3Icon className='w-7 cursor-pointer rounded hover:bg-gray-300'
                                onClick={() => setShowDrawer(!showDrawer)}
                            />
                        </div>
                    </>

                }
                <div className={`top-14 right-0 w-[35vw] bg-white pt-3 pl-2 pb-4 space-y-5 fixed z-40  ease-in-out duration-500 shadow-2xl ${showDrawer ? "translate-x-0 " : "translate-x-full"
                    }`
                }>
                    {currentUser ? <>
                        <div className='flex text-gray-600 cursor-pointer text-lg font-medium'
                            onClick={logOut}>
                            <ArrowLeftOnRectangleIcon className='w-6 text-black' />
                            <p>Log Out</p>
                        </div>
                    </> :
                        <>
                            <div className='cursor-pointer' onClick={() => {
                                setShowLogIn(!showLogIn)
                                setShowDrawer(false)
                            }}>
                                <p className='text-blue-600 font-bold text-lg'>Log in</p>
                            </div>
                            <div className='cursor-pointer' onClick={() => {
                                setShowSingUp(!showSingUp)
                                setShowDrawer(false)
                            }}>
                                <p className='text-blue-600 font-bold text-lg'>Sign Up</p>
                            </div>
                        </>
                    }
                </div>
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