import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createRecipesSlice } from "./recipeSlice";
import { createNotificationSlice, NotificationSliceType } from "./noticeSlice";

export type FavoritesSliceType = {
    favorites: Recipe[],
    handleClickFavorites: (recipe: Recipe) => void,
    favoriteExist: (id: Recipe['idDrink']) => boolean,
    loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorites: (recipe) => {

        if (get().favoriteExist(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set, get, api).showNotification({ text: 'Has Been Deleted Succesfully', error: false })
        } else {
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))
            createNotificationSlice(set, get, api).showNotification({ text: 'Has Been Added Succesfully', error: false })
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },

    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')

        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})