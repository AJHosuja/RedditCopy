import React from 'react'
import { BeakerIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { ArrowUpRightIcon, BookmarkIcon, ChatBubbleLeftIcon, ChevronUpIcon, EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const data = {
    id: 1,
    title: "Miksi teitä pidetään outona normaalin asian takia?",
    text: "Mua pidetään outona duunissa ku syön vaan hernekeittoa. Aloitin hernekeiton syömisen keväällä, ku totesin että se on halvin ja ravitsevin helposti mukana kulkeva ruoka. Syön vapaaajallani kyll monipuolisesti. Mut mut tunnetaan duunissa nykyään hernerokkarina. Vai onko tää oikeesti outoa?",
    comments: 120,
    subreddit: "Suomi",
    username: "TaikuriGorgoGorgo",
    upVotes: 120,
}

const Post = () => {
    return (
        <div className='bg-white 
        mx-4
        lg:w-8/12 mt-5 rounded
        border 
        lg:max-w-[700px]
        border-gray-300
        hover:border-gray-700'>
            <div className='flex'>
                <div className='text-sm ml-3 mt-2'>
                    <ChevronUpIcon />
                    {data.upVotes}
                    <ChevronDownIcon />
                </div>
                <div>
                    <div>
                        <div className='text-xs mt-2 pl-3'>
                            <p><strong>r/{data.subreddit}</strong> posted by u/{data.username}</p>
                        </div>
                        <div className='mt-2 pl-3'>
                            <strong>{data.title}</strong>
                        </div>
                        <div className='mt-2 pl-3 text-gray-600 text-[14px]'>
                            <p>{data.text}</p>
                        </div>
                        <div className='flex my-3 ml-3 items-center text-gray-500 text-sm'>
                            <ChatBubbleLeftIcon className='h-5' />
                            <strong>{data.comments} Comments</strong>
                            <ArrowUpRightIcon className='h-5 ml-5' />
                            <strong>Share</strong>
                            <BookmarkIcon className='h-5 ml-5' />
                            <strong>Save</strong>
                            <EllipsisHorizontalIcon className='h-5 ml-5' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post