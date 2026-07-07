'use client'

import React, { useState } from 'react'
import { Trash2, ShoppingCart, ArrowLeft } from 'lucide-react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'

const cartItems = [
    {
        id: 1,
        name: 'Fresh Orange',
        quantity: 2,
        price: 10,
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-nut-dry-fruit/g/m/q/250-premium-mix-dry-fruits-healthy-nutmixed-mix-dry-fruits-1-original-imahkge8zfsawuya.jpeg?q=70"
    },
    {
        id: 2,
        name: 'Mango Juice',
        quantity: 1,
        price: 20.97,
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-nut-dry-fruit/g/m/q/250-premium-mix-dry-fruits-healthy-nutmixed-mix-dry-fruits-1-original-imahkge8zfsawuya.jpeg?q=70"
    },
    {
        id: 4,
        name: 'Mango Juice',
        quantity: 1,
        price: 20.97,
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-nut-dry-fruit/g/m/q/250-premium-mix-dry-fruits-healthy-nutmixed-mix-dry-fruits-1-original-imahkge8zfsawuya.jpeg?q=70"
    },
    {
        id: 6,
        name: 'Mango Juice',
        quantity: 1,
        price: 20.97,
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-nut-dry-fruit/g/m/q/250-premium-mix-dry-fruits-healthy-nutmixed-mix-dry-fruits-1-original-imahkge8zfsawuya.jpeg?q=70"
    },
    {
        id: 67,
        name: 'Fresh Mango',
        quantity: 1,
        price: 17.98,
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-nut-dry-fruit/g/m/q/250-premium-mix-dry-fruits-healthy-nutmixed-mix-dry-fruits-1-original-imahkge8zfsawuya.jpeg?q=70"
    },
    {
        id: 657,
        name: 'Fresh Mango',
        quantity: 1,
        price: 17.98,
        image: "https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-nut-dry-fruit/g/m/q/250-premium-mix-dry-fruits-healthy-nutmixed-mix-dry-fruits-1-original-imahkge8zfsawuya.jpeg?q=70"
    }
]

const CartList = () => {
    const { isCartOpen, setIsCartOpen } = useCart();

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price,
        0
    )

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            {/* Trigger */}
            <SheetTrigger asChild>
                <button className="relative cursor-pointer">
                    <ShoppingCart className=" mt-1 md:mt-1" />
                    <span className="absolute -top-1 md:-top-1 -right-2 bg-green-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                        {cartItems.length}
                    </span>
                </button>
            </SheetTrigger>

            {/* Drawer */}
            <SheetContent
                side="right"
                className="w-full md:min-w-120 p-0  [&>button]:hidden"
            >
                {/* Header */}
                <SheetHeader className="bg-green-700 px-4 py-3">
                    <SheetTitle className="flex gap-4 text-white">
                        {/* Custom Close Button */}
                        <div className='border-2 dark:border-white p-[2] rounded-full cursor-pointer'
                            onClick={() => setIsCartOpen(false)}>
                            <ArrowLeft size={18} />
                        </div>
                        My Cart
                    </SheetTitle>
                </SheetHeader>
                <SheetDescription className='hidden'>Not need</SheetDescription>
                {/* Items */}
                <div className="flex flex-col h-full overflow-y-hidden ">
                    <div className="flex-1 overflow-y-scroll p-4 space-y-4">

                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 border p-2 rounded-md"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    width={60}
                                    height={60}
                                    className="rounded-md"
                                />

                                <div className="flex-1">
                                    <h3 className="font-medium text-sm">
                                        {item.name}
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        Quantity {item.quantity}
                                    </p>

                                    <p className="font-semibold">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>

                                <Trash2 className="h-4 w-4 cursor-pointer text-gray-500 hover:text-red-500" />
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t p-4 space-y-3">
                        <div className="flex justify-between font-semibold">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <Button className="w-full bg-green-700 hover:bg-green-800">
                            Checkout
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CartList