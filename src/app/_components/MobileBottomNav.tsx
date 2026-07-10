"use client"
import { CircleUser, Home, LayoutGrid } from 'lucide-react'
import CartList from './CartList'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useApp } from '@/context/AppContext'

const MobileBottomNav = () => {
    const { isCartOpen } = useCart();
    const pathname = usePathname();
    const { isScrollDown } = useApp();
    const activeStyle = " p-2 bg-blue-600 text-white rounded-lg  transition-all duration-500";
    const InActiveStyle = "p-2 rounded-lg  transition-all duration-300";

    return (
        <>
            {/* mobile nav bottom bar */}
            <section className={` w-full fixed ${isScrollDown ? "-bottom-14" : "bottom-0"}  z-50 flex justify-center border-t md:hidden backdrop-blur-sm bg-[#ffffffb3] dark:bg-[#000000b9] transition-all duration-300`}>
                <div className="w-full max-w-sm h-auto px-8 p-0 flex items-center justify-between">
                    <Link href={'/'} className={pathname === '/' ? activeStyle : InActiveStyle} >
                        <Home size={20} />
                    </Link>
                    <Link href={'/category'} className={pathname.includes('/category') ? activeStyle : InActiveStyle} >
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