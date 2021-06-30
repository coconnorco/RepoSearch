import {Link} from "react-router-dom";
import React from "react";

export const Header = () => {
    return (
        <header className='u-fixed u-top-0 u-w-full u-bg-white u-h-16 u-z-10 u-flex u-shadow-lg u-border-b u-border-gray-200 u-p-4 u-justify-items-start u-items-center'>
            <Link to='/'>
                <span className='u-type-h5'>RepoSearch</span>
            </Link>
        </header>
    )
}