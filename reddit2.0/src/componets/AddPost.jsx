import React from 'react'
import testProfilepic from '../assets/testprofile.png'

const AddPost = () => {
    return (
        <div className='bg-white items-center
        mx-4 flex py-2
        lg:w-8/12 mt-5 rounded border 
        lg:max-w-[700px]
        border-gray-300'>
            <div className="h-10 w-10 rounded-lg ml-2">
                <img src={testProfilepic} className="shadow rounded-full max-w-full h-auto align-middle border-none" />
            </div>
        </div>
    )
}

export default AddPost