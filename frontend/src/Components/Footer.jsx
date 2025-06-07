import React from 'react'
import { Facebook } from 'lucide-react';
import { Link } from "react-router-dom";
import { Instagram } from 'lucide-react';
import { Mail } from 'lucide-react';

function Footer() {
    return (
        <div className='flex flex-col gap-20 ml-80'>
            <div flex flex-col>
                <p className='font-extrabold text-4xl mb-10'>About Daily Diary: </p>
                <p className='text-2xl font-medium'>
                    Daily Diary is a simple, elegant daily journal app built using the MERN stack. It lets users securely write, edit, and reflect on their thoughts and memories anytime, anywhere. With features like cloud image storage, search and filter, and a clean, intuitive UI, Memoir helps you stay consistent with your journaling. Whether it's capturing moments, tracking mood, or setting personal goals, Memoir is your private digital space to grow. Designed for speed, privacy, and ease of use, it’s the perfect tool to make self-reflection a daily habit. Your stories, your way—secure and always accessible.
                </p>
            </div>
            <ul className='text-3xl font-semibold flex gap-20'>
                <li className='w-[40%]'>✅ Unlimited entries</li>
                <li className='w-[40%]'>✅ Save upto 5 images</li>
                <li className='w-[40%]'>✅ Saves as you go</li>
                <li className='w-[40%]'>✅ So much more...</li>
            </ul>
            <div className='flex gap-20'>
                <div>
                    <span className='font-medium text-2xl'>&#169; All copyright reserved. 2025</span>
                </div>
                <div className='flex gap-4'>
                    <a href="https://www.facebook.com/share/1GcGCgeiRq/"><Facebook /></a>

                    <a href="https://www.instagram.com/kanhaiya_sharma76?igsh=d3A5MmJyNXd5OGdz"><Instagram /></a>
                    <a href="mailto:kk7160464@gmail.com"><Mail /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer