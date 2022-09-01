import { useEffect, useState } from "react";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../src/firebasecfg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";


const SignIn = ({ setLogIn, setShowSingUp }) => {
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
    const [per, setPerc] = useState(null);

    useEffect(() => {
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
                        setData((prev) => ({ ...prev, img: downloadURL }));

                    });
                }
            );
        };
        file && uploadFile();
    }, [file]);


    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value });
        console.log(data)
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            console.log("here")
            await setDoc(doc(db, "users", res.user.uid), {
                ...data,
                timeStamp: serverTimestamp(),
            });
        } catch (err) {
            console.log("user already exist");
        }
    };

    return (
        <div className='flex justify-center items-center absolute z-20 top-0 right-0 bottom-0 left-0 h-[100%] bg-black bg-opacity-20'>
            <div className='flex flex-row relative bg-white w-[700px] pb-20 rounded-lg '>
                <img src={file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} className="w-28 h-28 rounded-full m-10" />

                <div className="flex-1 flex-col">
                    <h1 className="text-3xl mt-10 font-bold">Sing Up</h1>

                    <div className="flex  mt-10">
                        <label htmlFor="file" className="flex">
                            Profile-picture: <ArrowUpTrayIcon className="w-6 h-6 cursor-pointer ml-3" />
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </label>
                    </div>

                    <div>
                        <form onSubmit={handleAdd} >
                            <div className="lg:grid lg:grid-cols-2 flex flex-col">
                                <input
                                    id={"email"}
                                    placeholder={"Email"}
                                    type={"email"}
                                    onChange={handleInput}
                                    className="bg-slate-300 mt-10 mr-3 h-10 border-slate-500 rounded-lg pl-4 outline-none"
                                />

                                <input
                                    id={"Username"}
                                    placeholder={"name"}
                                    type={"Username"}
                                    onChange={handleInput}
                                    className="bg-slate-300 mt-10 mr-3 h-10 border-slate-500 rounded-lg pl-4 outline-none"
                                />

                                <input
                                    id={"Full name"}
                                    placeholder={"Full name"}
                                    onChange={handleInput}
                                    className="bg-slate-300 mt-10 mr-3 h-10 border-slate-500 rounded-lg pl-4 outline-none"
                                />

                                <input
                                    id={"Country"}
                                    placeholder={"Country"}
                                    onChange={handleInput}
                                    className="bg-slate-300 mt-10 mr-3 h-10 border-slate-500 rounded-lg pl-4 outline-none"
                                />

                                <input
                                    id={"password"}
                                    placeholder={"password"}
                                    type={"password"}
                                    onChange={handleInput}
                                    className="bg-slate-300 mt-10 mr-3 h-10 border-slate-500 rounded-lg pl-4 outline-none"
                                />

                            </div>
                            <div className="flex justify-center mt-10">
                                <button disabled={per !== null && per < 100} type="submit" className="border border-blue-600 w-60 h-10 justify-center rounded-full ml-3 bg-blue-600 text-white">
                                    Sing Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <XMarkIcon className='absolute w-10 right-10 top-10 cursor-pointer' onClick={() => setShowSingUp(false)} />
            </div>
        </div >
    );
};

export default SignIn;