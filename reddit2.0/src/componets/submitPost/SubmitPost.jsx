import { MicrophoneIcon, PhotoIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { Bars3Icon, LinkIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import logo from "./../../assets/Reddit-Emblem.png"
import SubmitImage from './SubmitImage';
import SubmitPostLink from './SubmitPostLink';
import SubmitPostPost from './SubmitPostPost';



const values = [
    { id: 1, text: "Post", icon: Bars3Icon },
    { id: 2, text: "Images & video", icon: PhotoIcon },
    { id: 3, text: "Link", icon: LinkIcon },
    { id: 4, text: "Poll", icon: ChartBarIcon },
    { id: 5, text: "Talk", icon: MicrophoneIcon }
];


const SubmitPost = () => {

    const [activeId, setActiveId] = useState(1);
    const [titleLength, setTitleLength] = useState(0);

    return (
        <div className='flex flex-row justify-center'>

            <div className='lg:w-[740px] mt-10 sm: w-full'>

                <div className='flex flex-row justify-between'>
                    <h1>Create a post</h1>
                    <strong className='text-blue-600'>DRAFTS</strong>
                </div>
                <hr className='mt-3' />
                <div className='w-full bg-white rounded-md'>
                    <div className='flex justify-between'>

                        <div className='flex justify-between w-full'>
                            {values.map((val) => (
                                <div className={activeId === val.id ? 'flex flex-row items-center justify-center h-14 border-b-2 border-blue-600 flex-1 cursor-pointer text-blue-600 hover:bg-slate-300' :
                                    'flex flex-row items-center justify-center h-14 flex-1 cursor-pointer hover:bg-slate-300'
                                }
                                    onClick={() => {
                                        if (val.id < 4) {
                                            setActiveId(val.id)
                                        }
                                    }}>
                                    <div className={val.id > 3 ?
                                        "flex flex-row text-gray-300 cursor-not-allowed hover:bg-white w-full h-full justify-center items-center" :
                                        "flex flex-row"}>

                                        <val.icon className="w-5" />
                                        <a> {val.text}</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {activeId === 1 &&
                        <SubmitPostPost />
                    }
                    {activeId === 2 &&
                        <SubmitImage />
                    }
                    {activeId === 3 &&
                        <SubmitPostLink />
                    }
                </div>
            </div>


            <div className='m-7'>
                <div className='bg-white mt-10 w-72 rounded-md shadow-sm'>
                    <div className='flex flex-row items-center'>
                        <img src={logo} className="w-16 mt-3" />
                        <h2 className='font-medium mt-5'>Posting to Reddit</h2>
                    </div>
                    <div className='px-3 mt-2 pb-5 text-sm space-y-2'>
                        <hr />
                        <h2>1. Remember the human</h2>
                        <hr />
                        <h2>2. Behave like you would in real life</h2>
                        <hr />
                        <h2>3. Look for the original source of content</h2>
                        <hr />
                        <h2>4. Search for duplicates before posting</h2>
                        <hr />
                        <h2>3. Look for the original source of content</h2>
                        <hr />
                        <h2>4. Search for duplicates before posting</h2>
                        <hr />
                        <h2>5. Read the community’s rules</h2>
                        <hr />
                    </div>
                </div>
                <div className='text-xs mt-6 font-normal'>
                    <h3>Please be mindful of reddit's <a className='text-blue-500'>content policy</a><br />
                        and practice good <a className='text-blue-500'> reddiquette.</a></h3>
                </div>

            </div>
        </div>
    )
}

export default SubmitPost