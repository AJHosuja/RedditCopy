import { useEffect, useState, useContext } from "react";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebasecfg";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from '../../context/AuthReducer';

const SubmitImage = () => {
    const [per, setPerc] = useState(null);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [img, setImg] = useState("");
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        console.log("Here")
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            console.log(name);
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPerc(progress);
                    switch (snapshot.state) {
                        case "paused":
                            break;
                        case "running":
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImg(downloadURL);
                        console.log(downloadURL);
                    });
                }
            );
        };
        file && uploadFile();
    }, [file]);


    const addPost = async (e) => {
        e.preventDefault();
        if (currentUser) {
            const data = {
                title: title,
                subredditID: "3WOhjgCbalfuvJQT8jLi",
                type: "imageWithTitle",
                userID: currentUser.uid,
                imageurl: img,
                timestamp: serverTimestamp(),
            };


            const request = await addDoc(collection(db, "posts"), data)

        }

    }



    return (
        <form onSubmit={addPost}>
            <div className='flex m-4 border rounded h-10 justify-center items-center hover:border-black focus-within:border-black '>
                <input className='p-4 w-full h-full rounded focus:outline-none focus:border-black ' placeholder='Title' maxLength={300} onChange={(e) => setTitle(e.target.value)} />
                <span className='pr-4 text-xs'>{title.length}{"/300"}</span>
            </div>

            <div className='m-4'>
                <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>

            <div className='flex flex-row-reverse mr-4 pb-4'>
                <button type="submit" className='bg-blue-600 text-white h-8 w-16 rounded-full font-medium'>Post</button>
            </div>
        </form>
    )
}

export default SubmitImage