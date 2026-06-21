"use client";

import {
    createContext,
    useContext,
    useMemo,
    useState,
    ReactNode,
} from "react";

interface CartItem {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    isCartOpen: boolean;
    setIsCartOpen: (value: boolean) => void;

    addToCart: (product: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: string) => void;

    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;

    clearCart: () => void;

    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children, }: { children: ReactNode; }) => {
    
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product: Omit<CartItem, "quantity">) => {
        setCartItems((prev) => {
            const existingItem = prev.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    const increaseQuantity = (id: string) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };

    const decreaseQuantity = (id: string) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = useMemo(() => {
        return cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }, [cartItems]);

    const totalPrice = useMemo(() => {
        return cartItems.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isCartOpen,
                setIsCartOpen,

                addToCart,
                removeFromCart,

                increaseQuantity,
                decreaseQuantity,

                clearCart,

                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
};