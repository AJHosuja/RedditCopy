import React, { useState } from 'react'

const SubmitPostLink = () => {
    const [titleLength, setTitleLength] = useState(0);

    return (
        <form>
            <div className='flex m-4 border rounded h-10 justify-center items-center hover:border-black focus-within:border-black '>
                <input required className='p-4 w-full h-full rounded focus:outline-none focus:border-black ' placeholder='Title' maxLength={300} onChange={(e) => setTitleLength(e.target.value.length)} />
                <span className='pr-4 text-xs'>{titleLength}{"/300"}</span>
            </div>

            <div className='m-4'>
                <input type="url" required className='w-full rounded h-10 pl-4 border hover:border-black focus:border-black'
                    placeholder='URL'
                />
            </div>

            <div className='flex flex-row-reverse mr-4 pb-4'>
                <button className='bg-blue-600 text-white h-8 w-16 rounded-full font-medium '>Post</button>
            </div>
        </form>
    )
}

export default SubmitPostLink