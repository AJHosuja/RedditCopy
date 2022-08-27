import React from 'react'
import { BeakerIcon, ChevronDownIcon, HomeIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon, BellIcon, PlusIcon, SparklesIcon, VideoCameraIcon, GlobeAltIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import logo from "../../assets/reddit-logo.png"

const Navbar = () => {
    return (
        <div className='sticky top-0 z-50 flex px-4 py-2 shadow-lg bg-white'>
            <div className='relative h-10 w-24 flex-shrink-0 cursor-pointer '>
                <img src={logo}
                />
            </div>

            <div className='mx-7 flex items-center xl:min-w-[300px]'>
                <HomeIcon className='w-5 h-5' />
                <p className='flex-1 ml-2 hidden lg:inline'>Home</p>
                <ChevronDownIcon className='w-5 h-5' />
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
            <div className='items-center text-gray-600 space-x-2
            mx-5 hidden lg:inline-flex
            '>
                <SparklesIcon className='h-7 w-5 lg:w-8 cursor-pointer rounded-sm lg lg:hover:bg-gray-300' />
                <GlobeAltIcon className='h-7 w-5 lg:w-8 cursor-pointer rounded-sm lg lg:hover:bg-gray-300' />
                <BellIcon className='h-7 w-5 lg:w-8 cursor-pointer rounded-sm lg lg:hover:bg-gray-300' />
                <hr className='h-10 border border-gray-100' />
                <ChatBubbleOvalLeftEllipsisIcon className='h-7 w-5 lg:w-8 cursor-pointer rounded-sm lg lg:hover:bg-gray-300' />
                <BellIcon className='h-7 w-5 lg:w-8 cursor-pointer rounded-sm lg lg:hover:bg-gray-300' />
                <PlusIcon className='h-7 w-5 lg:w-8 cursor-pointer rounded-sm lg lg:hover:bg-gray-300' />
            </div>
            <div>

            </div>
        </div>
    )
}

export default Navbar