import { Drink } from "../types"
import { useAppStore } from "../store/useAppStore"

type DrinkCardProps = {
    drink: Drink
}

export default function DrinkCard({ drink }: DrinkCardProps) {
    const selectRecipe = useAppStore((state) => state.selectRecipe)

    return (
        <div className="border shadow-lg">
            <div className="overflow-hidden">
                <img
                    className="hover:scale-110 hover:transition-transform hover:rotate-2"
                    src={drink.strDrinkThumb}
                    alt={`image ${drink.strDrink}`}
                />
            </div>
            <div className="p-5">
                <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
                <button
                    className="bg-orange-400 hover:bg-orange-500 text-white mt-5 w-full p-3 font-bold text-lg"
                    onClick={() => selectRecipe(drink.idDrink)}
                >
                    View Recipe
                </button>
            </div>
        </div>
    )
}
