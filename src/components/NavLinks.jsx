import Link from 'next/link';
import React from 'react';

const NavLinks = async() => {
    const res = await fetch ("https://openapi.programming-hero.com/api/bazardor/categories")
    const data = await res.json();
    console.log(data)
    return (
        <div className='flex gap-5'>
           {data.map((i, ind) => (
            <Link key={ind} href={i.id}>{i.nameBn}</Link>
            
           ))}
          
        </div>
    );
};

export default NavLinks;