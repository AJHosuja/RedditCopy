import { PhotoIcon } from '@heroicons/react/24/outline'
import React, { useState, useContext } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { AuthContext } from '../context/AuthReducer';

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]

const AddPost = () => {

    const [editor] = useState(() => withReact(createEditor()))
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        console.log(currentUser.userImg)
    }, [])

    return (
        <div className='flex px-4 lg:px-0 w-full justify-center'>
            <div className='bg-white items-center
            flex py-2
            w-full
            mt-5 rounded border
            lg:w-8/12 
            lg:max-w-[700px]
            border-gray-300'>
                <div className="h-10 w-10 rounded-lg ml-2">
                    <img src={currentUser.userImg} className="shadow rounded-full w-10 h-10 align-middle border-none" />
                </div>
                <div className='flex-1 ml-4 items-center'>
                    <Link to={"/submit"}>

                        <input className='w-full h-10 pl-4 border rounded text-l hover:border-blue-300'
                            placeholder='Create Post'
                        />

                    </Link>
                </div>
                <div className='mx-4 cursor-pointer rounded hover:bg-slate-200 p-2'>
                    <PhotoIcon className='w-6' />
                </div>

            </div>
        </div>
    )
}

export default AddPost