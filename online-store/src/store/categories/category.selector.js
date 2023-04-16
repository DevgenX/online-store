import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

// memoize selector, will only run if categoriesSlice has different values
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// memoize selector, if the selectCategories Array has the same value
// don't re-render
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;

      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);