import { create } from "zustand";
import { createRecipesSlice, RecipesSlideType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { FavoritesSliceType, createFavoritesSlice } from "./favoritesSlice";
import { NotificationSliceType, createNotificationSlice } from "./noticeSlice";

export const useAppStore = create<RecipesSlideType & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)
})))
