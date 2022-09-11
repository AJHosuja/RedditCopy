import React from 'react'
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { collection, doc, getDocs, addDoc, query, orderBy, onSnapshot, where, getDoc, toDate } from 'firebase/firestore'
import { db } from '../../firebasecfg';
import { useState } from 'react';
import PostScreen from './PostScreen';

const PostWithComments = () => {
    var { postID } = useParams();
    const [postData, setPostData] = useState({});

    const getPostData = async () => {
        const postData = await getDoc(doc(db, "posts", postID));
        setPostData({ ...postData.data(), id: postData.id });
    }

    useEffect(() => {
        getPostData();
    }, [])

    return (
        <>
            {postData &&
                <PostScreen postData={postData} />
            }
        </>
    )
}

export default PostWithComments