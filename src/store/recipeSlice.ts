import { StateCreator } from "zustand"
import { getCategories, getRecipes, getRecipeById } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"

export type RecipesSlideType = {
    categories: Categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: Boolean,
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecipesSlice: StateCreator<RecipesSlideType> = (set) => ({
    categories: {
        drinks: [],
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,

    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (searchFilter) => {
        const drinks = await getRecipes(searchFilter)
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})