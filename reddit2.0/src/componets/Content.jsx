import React, { useEffect, useState, useContext } from 'react'
import { db } from '../firebasecfg';
import Post from './content/Post'
import { collection, doc, getDocs, addDoc } from 'firebase/firestore'
import AddPost from './AddPost';
import { auth } from '../firebasecfg';
import { AuthContext } from '../context/AuthReducer';
import SingIn from './SingIn';

const Content = () => {
    const [user, setData] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const userscCollectionRef = collection(db, "users")

    const { dispatch } = useContext(AuthContext)

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userscCollectionRef);
            setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getUsers()
    }, [])

    const createUser = async () => {
        console.log(name + age)
        await addDoc(userscCollectionRef, { name: name, age: age })
    }

    const logOut = async () => {
        dispatch({ type: "LOGOUT" })
    }

    return (
        <div className='flex-col flex items-center'>
            <button onClick={logOut}>Logout</button>
            <AddPost />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default Content