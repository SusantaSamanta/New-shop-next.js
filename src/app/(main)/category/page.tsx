
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='mt-20 flex flex-col'>



            <Link href="/category/fruits">
                Fruits
            </Link>

            <Link href="/category/vegetables">
                Vegetables
            </Link>

            <Link href="/category/bakery">
                Bakery
            </Link>



        </div>
    )
}

export default page