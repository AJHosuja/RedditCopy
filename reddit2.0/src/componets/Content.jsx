import React, { useEffect, useState, useContext } from 'react'
import { db } from '../firebasecfg';
import Post from './posts/Post'
import { collection, doc, getDocs, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import AddPost from './AddPost';
import { auth } from '../firebasecfg';
import { AuthContext } from '../context/AuthReducer';
import { data } from 'autoprefixer';
import PostWithUrl from './posts/PostWithUrl';
import PostWithImage from './posts/PostWithImage';

const Content = () => {
    const [posts, setPosts] = useState([]);
    const [isLogged, setIslogged] = useState(false)
    const { currentUser } = useContext(AuthContext)
    //const userscCollectionRef = 

    const { dispatch } = useContext(AuthContext)

    useState(() => {
        if (currentUser) {
            setIslogged(true)
        }
    }, [currentUser, AuthContext])

    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))


        const data = onSnapshot(q, (snapshot) => {

            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            console.log(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })

        return data;
    }, [])

    /*const createUser = async () => {
        console.log(name + age)
        await addDoc(userscCollectionRef, { name: name, age: age })
    }*/

    const logOut = async () => {
        dispatch({ type: "LOGOUT" })
    }

    return (
        <div className='flex-col flex items-center'>
            <button onClick={logOut}>Logout</button>
            {isLogged && <AddPost />}
            {posts.map((postData, index) => {
                console.log(postData)
                if (postData.type === "urlWithTitle") {
                    return (
                        <PostWithUrl key={index} postData={postData} />
                    )
                }
                if (postData.type === "imageWithTitle") {
                    return (
                        <PostWithImage key={index} postData={postData} />
                    )
                }
                if (postData.type === "textWithTitle") {
                    return (
                        <Post key={index} postData={postData} />
                    )
                }

            })}
        </div>
    )
}

export default Content