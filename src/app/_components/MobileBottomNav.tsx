"use client"
import { CircleUser, Home, LayoutGrid } from 'lucide-react'
import CartList from './CartList'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

const MobileBottomNav = () => {
    const { isCartOpen } = useCart();
    const pathname = usePathname();
    const activeStyle = " p-1 px-3 bg-blue-600 text-white rounded-lg";
    const InActiveStyle = "p-1 px-3 rounded-lg";

    return (
        <>
            {/* mobile nav bottom bar */}
            <section className=" w-full fixed bottom-0 border md:hidden backdrop-blur-sm bg-[#ffffffb3] dark:bg-[#000000b9]">
                <div className="w-full h-auto px-8 py-1 flex items-center justify-between gap-3 ">
                    <Link href={'/'} className={pathname === '/' ? activeStyle : InActiveStyle} >
                        <Home size={20} />
                    </Link>
                    <Link href={'/category'} className={pathname === '/category' ? activeStyle : InActiveStyle} >
                        <LayoutGrid size={20} />
                    </Link>
                    <Link href={'/profile'} className={pathname === '/profile' ? activeStyle : InActiveStyle} >
                        <CircleUser size={20} />
                    </Link>
                    <div className={isCartOpen ? activeStyle : InActiveStyle} >
                        <CartList />
                    </div>
                </div>
            </section>

        </>
    )
}

export default MobileBottomNav;