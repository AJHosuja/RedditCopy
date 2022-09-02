import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthReducer';
import { db } from '../../firebasecfg';

const SubmitPostPost = () => {
    const [titleLength, setTitleLength] = useState(0);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
    }, [currentUser])


    const addPost = async (e) => {
        e.preventDefault();
        if (currentUser) {
            const data = {
                text: text,
                title: title,
                subredditID: "3WOhjgCbalfuvJQT8jLi",
                type: "textWithUrl",
                userID: currentUser.uid,
                imageurl: "",
                timestamp: serverTimestamp(),
            };


            const request = await addDoc(collection(db, "posts"), data)

            console.log(request)
        }

    }

    return (
        <form onSubmit={addPost}>
            <div className='flex m-4 border rounded h-10 justify-center items-center hover:border-black focus-within:border-black '>
                <input
                    className='p-4 w-full h-full rounded focus:outline-none focus:border-black '
                    placeholder='Title'
                    maxLength={300} onChange={(e) => setTitle(e.target.value)} />
                <span className='pr-4 text-xs'>{title.length}{"/300"}</span>
            </div>

            <div className='m-4'>
                <textarea
                    rows={"7"}
                    className='w-full border rounded focus:outline-none focus:border-black p-2'
                    placeholder='Text (optional)'
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
            </div>

            <div className='flex flex-row-reverse mr-4
                        pb-4'>
                <button type="submit" className='bg-blue-600 text-white h-8 w-16 rounded-full font-medium'>Post</button>
            </div>
        </form>
    )
}

export default SubmitPostPost