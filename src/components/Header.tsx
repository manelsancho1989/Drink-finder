import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../store/useAppStore";

export default function Header() {

    const [searchFilters, setSearchfilters] = useState({
        ingredient: '',
        category: ''
    })
    const { pathname } = useLocation();
    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)



    useEffect(() => {
        fetchCategories()
    }, [])


    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchfilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(searchFilters).includes('')) {
            showNotification({
                text: 'All fields are required',
                error: true
            })
            return
        }
        searchRecipes(searchFilters)
    }
    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16 ">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="" />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink
                            className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}
                            to={"/"}>
                            Home
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}
                            to={"favorites"}>
                            Favorites
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}
                            to={"generate"}>
                            Generate AI
                        </NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form
                        onSubmit={handleSubmit}
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                    >
                        <div className="space-y-4">
                            <label
                                className="block text-white uppercase font-extrabold text-lg"
                                htmlFor="ingredient">
                                Name or Ingredients
                            </label>
                            <input
                                id="ingredient"
                                type="text"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Name or Ingredient"
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>

                        <div className="space-y-4">
                            <label
                                className="block text-white uppercase font-extrabold text-lg"
                                htmlFor="ingredient">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                value={searchFilters.category}
                                onChange={handleChange}
                            >
                                <option value="">-- Select --</option>
                                {categories.drinks.map((category, index) => (
                                    <option
                                        key={category.strCategory || index}
                                        value={category.strCategory}
                                    >
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="submit"
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                        />
                    </form>
                )}
            </div>
        </header >
    )
}
