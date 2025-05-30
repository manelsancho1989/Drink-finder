import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../store/useAppStore"

export default function FavoritesPage() {
  const favorites = useAppStore((state) => state.favorites)
  const hasFavorites = useMemo(() => favorites.length, [favorites])
  return (
    <>
      <h1 className="font-extrabold text-6xl">Favorites</h1>

      {hasFavorites ? (
        <div className='grid grid-cols-1 md: grid-cols-2 2xl: grid-cols-3 my-10 gap-10'>

          {favorites.map(drink => (
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>

      ) : (
        <p className="my-10 text-center text-2xl">Favorites will be displayed here</p>
      )}
    </>
  )
}
