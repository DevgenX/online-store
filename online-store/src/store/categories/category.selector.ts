import { createSelector } from "reselect";

import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

import { RootState } from "../store";

const selectCategoryReducer = (state: RootState): CategoriesState =>
  state.categories;

// memoize selector, will only run if categoriesSlice has different values
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// memoize selector, if the selectCategories Array has the same value
// don't re-render
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;

      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
