import React from 'react'
import Image from 'next/image'
import { BsDot } from 'react-icons/bs'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useRouter } from 'next/router'

export default function JobsCardAbout({ job, posted }) {
    const router = useRouter();
    return (
        <div className='w-full cursor-pointer  transition-all duration-1000  md:w-5/12 m-4 border hover:shadow-xl rounded px-4 md:flex md:flex-wrap'>
            <div className='mb-4 flex   items-start justify-center py-2 flex-col'>
                <div className='flex  px-2 py-2 items-center justify-center '>
                    <BsDot className='text-4xl font-extrabold text-indigo-600' />
                    <h1 className='text-lg text-gray-900'>Descripción:</h1>
                </div>
                <p>{job?.about}</p>
            </div>
        </div>
    )
}
