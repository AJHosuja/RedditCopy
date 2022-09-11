import React from 'react'
import { useEffect, useState } from 'react'
import { collection, doc, getDocs, addDoc, query, orderBy, onSnapshot, where, getDoc, toDate } from 'firebase/firestore'
import { db } from '../../firebasecfg';
import moment from 'moment';

const Comment = ({ commentData }) => {
    const [user, setUser] = useState("");
    const [timeAgo, setTimeAgo] = useState("");

    const getUserName = async () => {
        const data = await getDoc(doc(db, "users", commentData.userID));
        setUser({
            userName: data._document.data.value.mapValue.fields.Username.stringValue,
            img: data._document.data.value.mapValue.fields.img.stringValue
        })
        return data;
    }

    useEffect(() => {
        getUserName()
        setTimeAgo(moment(commentData.timestamp.toDate()).fromNow())
    }, [])

    return (
        <div className='
        flex
        bg-white 
        lg:w-8/12  rounded
        lg:max-w-[700px]
        border-gray-300
        hover:border-gray-700
        pl-4
        pb-2'>
            <div className='flex flex-col items-center'>
                <div className='pb-1'>
                    <img src={user.img} className="rounded-full h-10 w-10 " />
                </div>
                <div className='w-[2px] h-full rounded bg-slate-300' />
            </div>
            <div>
                <div className='flex items-center'>
                    <p className='pl-3 font-normal'><strong>{user.userName}</strong></p>
                    <p className='pl-2 text-[4px] text-gray-500'>{'\u2B24'}</p>
                    <p className='pl-2 text-gray-500'>{timeAgo}</p>
                </div>
                <div className='pl-3 pt-2'>
                    <p>{commentData.comment}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment