import { create } from "zustand";
import { createRecipesSlice, RecipesSlideType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { FavoritesSliceType, createFavoritesSlice } from "./favoritesSlice";
import { NotificationSliceType, createNotificationSlice } from "./noticeSlice";
import { createAISlice, AISliceType } from "./aiSlice";

export const useAppStore = create<RecipesSlideType & FavoritesSliceType & NotificationSliceType & AISliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a)
})))
