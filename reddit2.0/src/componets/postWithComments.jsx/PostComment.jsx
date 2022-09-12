import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthReducer';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebasecfg';


const PostComment = ({ postData }) => {
    const [comment, setComment] = useState("");
    const { currentUser } = useContext(AuthContext)

    const addComment = async (e) => {
        e.preventDefault()
        const commentData = {
            userID: currentUser.uid,
            postID: postData.id,
            comment: comment,
            timestamp: serverTimestamp()
        };

        const addCommentRequest = await addDoc(collection(db, "comments"), commentData)

        if (addCommentRequest) {
            console.log(addCommentRequest)
            window.location.reload(false)
        }

    }


    return (
        <div className='
        bg-white 
        w-full
        mx-4
        lg:w-8/12 mt-5 
        rounded-t
        lg:max-w-[700px]
        border-gray-300'>
            <div className='px-10 py-5'>
                <p>Comment as <strong>AJ</strong></p>
                <div className='flex flex-col p-1 border border-gray-400 rounded focus-within:border-black'>
                    <form onSubmit={addComment}>
                        <textarea className='w-full h-28 p-4 focus:outline-none '
                            placeholder='What are your thoughts'
                            disabled={!currentUser}
                            onChange={(e) => setComment(e.target.value)} />

                        <div className='flex flex-row-reverse'>
                            <button className={comment.length > 0 ?
                                "bg-blue-500 text-white h-8 w-24 rounded-full" :
                                "bg-gray-500 text-white h-8 w-24 rounded-full"}
                                disabled={comment.length == 0}
                                type="submit">Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostComment