import React from 'react'
import { BeakerIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { ArrowUpRightIcon, BookmarkIcon, ChatBubbleLeftIcon, ChevronUpIcon, EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useState } from 'react'
import { collection, doc, getDocs, addDoc, query, orderBy, onSnapshot, where, getDoc } from 'firebase/firestore'
import { db } from '../../firebasecfg';
import { Link } from 'react-router-dom'
import moment from 'moment';

const data = {
    id: 1,
    title: "Miksi teitä pidetään outona normaalin asian takia?",
    text: "Mua pidetään outona duunissa ku syön vaan hernekeittoa. Aloitin hernekeiton syömisen keväällä, ku totesin että se on halvin ja ravitsevin helposti mukana kulkeva ruoka. Syön vapaaajallani kyll monipuolisesti. Mut mut tunnetaan duunissa nykyään hernerokkarina. Vai onko tää oikeesti outoa?",
    comments: 120,
    subreddit: "Suomi",
    username: "TaikuriGorgoGorgo",
    upVotes: 120,
}

const PostWithImage = ({ postData }) => {
    const [subRedditData, setSubRedditData] = useState([]);
    const [userName, setUserName] = useState("");
    const [timeAgo, setTimeAgo] = useState("");
    const [likesCount, setLikesCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0)


    const getSubRedditName = async () => {
        const data = await getDoc(doc(db, "subreddits", postData.subredditID));
        setSubRedditData({
            imgUrl: data._document.data.value.mapValue.fields.imageUrl.stringValue,
            name: data._document.data.value.mapValue.fields.subredditName.stringValue
        })

        return data;
    }

    const getUserName = async () => {

        const data = await getDoc(doc(db, "users", postData.userID));
        setUserName(data._document.data.value.mapValue.fields.Username.stringValue)

        return data;
    }

    const likes = async () => {
        const data = onSnapshot(query(collection(db, "likes"), where("postID", "==", postData.id)), (snapshot) => {
            setLikesCount(snapshot.size);
        })

        return data;
    }

    const downLikes = async () => {
        const data = onSnapshot(query(collection(db, "downLike"), where("postID", "==", postData.id)), (snapshot) => {

        })
        return data;
    }

    const howManyComments = async () => {
        const data = onSnapshot(query(collection(db, "comments"), where("postID", "==", postData.id)), (snapshot) => {
            setCommentCount(snapshot.size);
        })

        return data;
    }



    useEffect(() => {
        getSubRedditName()
        getUserName()
        likes()
        downLikes()
        howManyComments()
        setTimeAgo(moment(postData.timestamp.toDate()).fromNow())
    }, [])

    return (
        <div className='bg-white 
        mx-4
        lg:w-8/12 mt-5 rounded
        border 
        lg:max-w-[700px]
        border-gray-300
        hover:border-gray-700'>
            <div className='flex'>
                <div className='flex flex-col items-center text-sm ml-3 mt-2'>
                    <ChevronUpIcon className='h-6' />
                    {likesCount}
                    <ChevronDownIcon className='h-6' />
                </div>
                <div>
                    <Link to={"/post/" + postData.id}>
                        <div>
                            <div className='flex text-xs mt-2 pl-3 space-x-2 items-center'>
                                <img src={subRedditData.imgUrl} className='w-6 rounded-full' />
                                <p><strong>r/{subRedditData.name}</strong> posted by u/{userName}</p>
                                <p>{timeAgo}</p>
                            </div>
                            <div className='mt-2 pl-3'>
                                <strong>{postData.title}</strong>
                            </div>
                            <div className='mt-2 pl-3 text-gray-600 text-[14px]'>
                                <img src={postData.imageurl} />
                            </div>
                            <div className='flex my-3 ml-3 items-center text-gray-500 text-sm'>
                                <ChatBubbleLeftIcon className='h-5  mr-2' />
                                <strong>{commentCount} Comments</strong>
                                <ArrowUpRightIcon className='h-5 ml-5  mr-2' />
                                <strong>Share</strong>
                                <BookmarkIcon className='h-5 ml-5 mr-2' />
                                <strong>Save</strong>
                                <EllipsisHorizontalIcon className='h-5 ml-5' />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default PostWithImage