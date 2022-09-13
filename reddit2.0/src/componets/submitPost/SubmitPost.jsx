import { MicrophoneIcon, PhotoIcon, ChartBarIcon, ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import { ArrowDownIcon, ArrowDownTrayIcon, Bars3Icon, ChevronDownIcon, LinkIcon } from '@heroicons/react/24/solid'
import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import logo from "./../../assets/Reddit-Emblem.png"
import SubmitImage from './SubmitImage';
import SubmitPostLink from './SubmitPostLink';
import SubmitPostPost from './SubmitPostPost';
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebasecfg';
import searchIcon from '../../assets/search-icon.png'

const values = [
    { id: 1, text: "Post", icon: Bars3Icon },
    { id: 2, text: "Images & video", icon: PhotoIcon },
    { id: 3, text: "Link", icon: LinkIcon },
    { id: 4, text: "Poll", icon: ChartBarIcon },
    { id: 5, text: "Talk", icon: MicrophoneIcon }
];


const SubmitPost = () => {
    const ref = useRef(null);
    const [activeId, setActiveId] = useState(1);
    const [dropDownMenu, setDropDownMenu] = useState(false);
    const [subredditData, setSubredditData] = useState([]);
    const [filteredSubredditData, setFilteredSubredditData] = useState([]);
    const [wordGot, setWordGot] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [subRedditID, setSubRedditID] = useState("");


    const getSubredditNames = async () => {
        const q = query(collection(db, "subreddits"));
        const request = onSnapshot(q, (snapshot) => {
            setSubredditData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })

        return request;
    }

    useEffect(() => {
        getSubredditNames()
    }, [])


    useEffect(() => {
        if (dropDownMenu) {
            ref.current.focus();
        }
    }, [dropDownMenu])

    const filteredData = (e) => {
        setDropDownMenu(true)
        const searchWord = e.target.value;
        setWordGot(searchWord);
        const newFilter = subredditData.filter((val) => {
            return val.subredditName.toLowerCase().includes(searchWord.toLowerCase());
        })

        console.log(newFilter);

        const uniqueArray = newFilter.filter((value, index) => {
            const _value = JSON.stringify(value);
            return index === newFilter.findIndex(obj => {
                return JSON.stringify(obj) === _value;
            });
        });

        console.log(uniqueArray);

        if (searchWord === "") {
            setFilteredSubredditData(subredditData);
        } else {
            setFilteredSubredditData(uniqueArray);
        }
    }
    useEffect(() => {
        if (wordGot === "") {
            setFilteredSubredditData(subredditData);
        }
    }, [filteredSubredditData, subredditData])

    return (
        <div className='flex flex-row justify-center m-7'>
            <div className='lg:w-[740px] mt-10 sm: w-full'>
                <div className='flex flex-row justify-between'>
                    <h1 className='font-semibold'>Create a post</h1>
                    <strong className='text-blue-600'>DRAFTS</strong>
                </div>
                <hr className='my-3 ' />
                <div className='relative'>

                    <div className='bg-white h-10 my-3 w-72 flex p-1 items-center rounded'>
                        <img src={imgURL.length > 2 ? imgURL : searchIcon} className='w-6 h-6 rounded-full mr-2' />
                        <input
                            placeholder={'Choose a community'}
                            onFocus={(e) => e.target.placeholder = "Search communities"}
                            onBlur={(e) => e.target.placeholder = "Choose a community"}
                            className='placeholder:text-black flex-1 h-full outline-none'
                            value={wordGot}
                            onClick={() => setDropDownMenu(!dropDownMenu)}
                            onChange={filteredData}
                            ref={ref}
                        />
                        <ChevronDownIcon className='w-4 h-4 cursor-pointer mr-1' onClick={() => setDropDownMenu(!dropDownMenu)} />
                    </div>
                    {dropDownMenu &&
                        <div className='bg-white w-72 rounded-b absolute top-10 shadow-xl pb-2 pl-2'>
                            {filteredSubredditData.map((mappedData) => {
                                return (
                                    <div className='flex space-x-2 '>
                                        <img src={mappedData.imageUrl} className=' w-7 h-7 rounded-full mt-2' />
                                        <p className='mt-2 cursor-pointer'
                                            onClick={() => {
                                                setWordGot(mappedData.subredditName)
                                                setDropDownMenu(false)
                                                setImgURL(mappedData.imageUrl)
                                                setSubRedditID(mappedData.id)
                                            }}
                                        >{"r/"}{mappedData.subredditName}</p>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
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
                        <SubmitPostPost subredditID={subRedditID} />
                    }
                    {activeId === 2 &&
                        <SubmitImage subredditID={subRedditID} />
                    }
                    {activeId === 3 &&
                        <SubmitPostLink subredditID={subRedditID} />
                    }
                </div>
            </div>


            <div className='m-7 hidden lg:inline-block'>
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