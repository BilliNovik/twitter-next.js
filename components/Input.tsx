import React from 'react'
import Image from 'next/image'
import { useSession, signOut } from "next-auth/react"
import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline'
import { db, storage } from '../firebase'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

type Props = {}

const Input = (props: Props) => {

    const [inputValue, setInputValue]: any = React.useState('')
    const [selectedFile, setSelectedFile]: any = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const filePickerRef: any = React.useRef(null);
    const { data: session }: any = useSession()

    const sendMessage = async () => {
        if (loading) return
        setLoading(true)

        const docRef = await addDoc(collection(db, 'posts'), {
            id: session.user.uid,
            text: inputValue,
            userImg: session.user.image,
            name: session.user.name,
            username: session.user.username,
            date: new Date().getTime()
        })

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadURL,
                });
            });
        }

        setInputValue('')
        setSelectedFile(null)
        setLoading(false)
    }

    const addImageToPost = (e: any) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent: any) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    const cleanImage = () => {
        setSelectedFile('')
        filePickerRef.current.value = ''
    }

    return (
        <>
            {session &&
                <div className='border-b border-gray-200 p-3 flex space-x-3'>
                    <div>
                        <Image src={session.user.image}
                            width='50' height='50' className='rounded-full cursor-pointer hover:brightness-95' alt='user-img'
                            onClick={(event: React.MouseEvent) => signOut} />
                    </div>
                    <div className="w-full divide-y divide-gray-200">
                        <div className="">
                            <textarea className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide 
                        text-gray-700 resize-none' rows={2} placeholder="What's happening?" value={inputValue} onChange={e => setInputValue(e.target.value)}></textarea>
                        </div>
                        {selectedFile && (
                            <div className='pt-2 pb-1'>
                                <XIcon onClick={cleanImage} className="h-6 p-1 m-2 bg-gray-400 text-blue-100 absolute cursor-pointer rounded-full" />
                                <img src={selectedFile} className={`${loading && "animate-pulse"}`} alt='choosen image' />
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-2.5">
                            <div className="flex">
                                <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" onClick={() => filePickerRef.current.click()} />
                                <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} />
                                <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                            </div>
                            <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95
                            disabled:opacity-50" onClick={sendMessage} disabled={!inputValue.trim()}>Tweet</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Input