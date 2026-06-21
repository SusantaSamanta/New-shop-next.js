import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

const ThemeChangeBtn = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;

    return (
        <>
            {/* Large button*/}
            <div className="hidden md:flex items-center gap-2 border p-2 rounded-2xl ">
                <Switch
                    className="cursor-pointer"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) =>
                        setTheme(checked ? "dark" : "light")
                    }
                />

                {theme === "dark" ?
                    <Sun className="h-4 w-4 text-yellow-400" />
                    :
                    <Moon className="h-4 w-4" />
                }

            </div>
            {/* Small Button */}
            <div className="flex items-center gap-2 md:hidden">
                <div
                    className="p-1 border-2 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110"
                    onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                >
                    {theme === "dark" ?
                        <Sun className="h-4 w-4 text-yellow-400" />
                        :
                        <Moon className="h-4 w-4" />
                    }
                </div>

            </div>


        </>
    )
}

export default ThemeChangeBtn