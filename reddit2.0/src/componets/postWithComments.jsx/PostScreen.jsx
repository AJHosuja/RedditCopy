import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import PostWithImage from '../posts/PostWithImage'
import PostWithUrl from '../posts/PostWithUrl'
import Post from '../posts/Post'
import PostComment from './PostComment'
import { collection, doc, getDocs, addDoc, query, orderBy, onSnapshot, where, getDoc, querySnapshot } from 'firebase/firestore'
import { db } from '../../firebasecfg';
import Comment from './Comment'

const PostScreen = ({ postData }) => {
    const [commentData, setCommentData] = useState([])


    const getComments = async () => {
        console.log(postData.id)
        const q = query(collection(db, "comments"),
            where("postID", "==", postData.id),
            orderBy("timestamp", "desc"),
        )

        const comments = await getDocs(q);
        setCommentData(comments.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        return comments
    }

    useEffect(() => {
        getComments()
    }, [postData])

    return (
        <div className='flex flex-col items-center'>

            <div className='w-full flex justify-center'>
                {postData.type == "imageWithTitle"
                    &&
                    <PostWithImage postData={postData} withComments={true} />
                }
                {postData.type == "urlWithTitle"
                    &&
                    <PostWithUrl postData={postData} withComments={true} />
                }
                {postData.type == "textWithTitle"
                    &&
                    <Post postData={postData} withComments={true} />
                }
            </div>
            <div className='w-full flex justify-center '>
                <PostComment postData={postData} />
            </div>
            {commentData &&
                <div className='flex
            flex-col
            mb-10
            bg-white 
            lg:w-8/12  rounded-b
            lg:max-w-[700px]
            w-[calc(100%-32px)]'>

                    {commentData.map((comment, index) => {
                        return (
                            <Comment key={index} commentData={comment} className='w-full bg-red-600' />
                        )
                    })}
                </div>
            }

        </div>
    )
}

export default PostScreen