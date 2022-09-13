import React from 'react'
import { BeakerIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { ArrowUpRightIcon, BookmarkIcon, ChatBubbleLeftIcon, ChevronUpIcon, EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useEffect, useState, useContext } from 'react'
import { collection, doc, getDocs, addDoc, query, orderBy, onSnapshot, where, getDoc, toDate, get, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebasecfg';
import { Link } from 'react-router-dom'
import moment from 'moment';
import { async } from '@firebase/util'
import { AuthContext } from '../../context/AuthReducer';

const Post = ({ postData, withComments }) => {

    const [subRedditData, setSubRedditData] = useState([]);
    const [userName, setUserName] = useState("");
    const [timeAgo, setTimeAgo] = useState("");
    const [comments, setComments] = useState(withComments)
    const [likesCount, setLikesCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0)

    const [downlikesCount, setDownLikesCount] = useState(0);
    const { currentUser } = useContext(AuthContext)
    const [liked, setLiked] = useState(false);
    const [downLiked, setDownLiked] = useState(false);


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
            snapshot.forEach(data => {
                if (data._document.data.value.mapValue.fields.userID.stringValue == currentUser.uid) {
                    setLiked(true);
                    setDownLiked(false);
                }
            })
        })

        return data;
    }

    const downLikes = async () => {
        const data = onSnapshot(query(collection(db, "downLike"), where("postID", "==", postData.id)), (snapshot) => {
            setDownLikesCount(snapshot.size);
            snapshot.forEach(data => {
                if (data._document.data.value.mapValue.fields.userID.stringValue == currentUser.uid) {
                    setLiked(false);
                    setDownLiked(true);
                }
            })
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

    const likePost = async () => {

        unDownLike();
        const data = {
            postID: postData.id,
            userID: currentUser.uid,
        };
        const request = await addDoc(collection(db, "likes"), data)

        if (request) {
            setLiked(true);
            setDownLiked(false);
        }
        return request;

    }

    const unlike = async () => {
        const q = query(collection(db, "likes"), where("postID", "==", postData.id), where("userID", "==", currentUser.uid));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async (likeData) => {
            deleteDoc(doc(db, "likes", likeData.id))
            return;
        });
    }

    const unLikePost = () => {
        setDownLiked(false);
        setLiked(false);
        unlike();
    }

    const downLikePost = async () => {
        unlike();
        const data = {
            postID: postData.id,
            userID: currentUser.uid,
        };
        const request = await addDoc(collection(db, "downLike"), data)
        if (request) {
            setLiked(false);
            setDownLiked(true);
        }
        return request;
    }

    const unDownLike = async () => {
        const q = query(collection(db, "downLike"), where("postID", "==", postData.id), where("userID", "==", currentUser.uid));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async (likeData) => {
            deleteDoc(doc(db, "downLike", likeData.id))
            return;
        });
    }

    const unDownLikePost = () => {
        setDownLiked(false);
        setLiked(false);
        unDownLike();
    }

    return (
        <div className={!comments ? "bg-white mx-4 lg:w-8/12 mt-5 roundedborder lg:max-w-[700px] border-gray-300 hover:border-gray-700" :
            "bg-white max-h-[280px] w-[700px] mx-4 mt-5 roundedborder lg:max-w-[700px] border-gray-300 hover:border-gray-700"
        }>
            <div className='flex'>
                <div className='flex flex-col items-center text-sm ml-3 mt-2'>
                    <ChevronUpIcon className={liked ? 'text-orange-500 h-6 rounded cursor-pointer hover:bg-gray-400' : 'h-6 rounded cursor-pointer hover:bg-gray-400'} onClick={liked ? unLikePost : likePost} />
                    <p className='select-none'>{likesCount - downlikesCount}</p>
                    <ChevronDownIcon className={downLiked ? 'text-blue-500 h-6 rounded cursor-pointer hover:bg-gray-400' : 'h-6 rounded cursor-pointer hover:bg-gray-400'} onClick={downLiked ? unDownLikePost : downLikePost} />
                </div>
                <Link to={!comments && "/post/" + postData.id} className={comments ? "cursor-default w-full" : "cursor-pointer w-full"}>
                    <div>
                        <div>
                            <div className='flex text-xs mt-2 pl-3 space-x-2 items-center'>
                                <img src={subRedditData.imgUrl} className='w-6 rounded-full' />
                                <p><strong>r/{subRedditData.name}</strong> posted by u/{userName}</p>
                                <p>{timeAgo}</p>
                            </div>
                            <div className='mt-2 pl-3'>
                                <strong>{postData.title}</strong>
                            </div>
                            <div className='mt-2 pl-3 max-h-40 text-gray-600 text-[14px] overflow-clip'>
                                <p>{postData.text}</p>
                            </div>
                            <div className='flex flex-1 my-3 ml-3 items-center text-gray-500 text-sm'>
                                <ChatBubbleLeftIcon className='h-5 mr-2' />
                                <strong>{commentCount} Comments</strong>
                                <ArrowUpRightIcon className='h-5 ml-5 mr-2' />
                                <strong>Share</strong>
                                <BookmarkIcon className='h-5 ml-5 mr-2' />
                                <strong>Save</strong>
                                <EllipsisHorizontalIcon className='h-5 ml-5' />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Post