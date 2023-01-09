import CategoryItem from "../category-item/category-item";
import "./categories.syles.scss";

// categories is equal to { categories } = this.props
// map through the array of objects then call CategoryItem

const HandleCategories = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default HandleCategories;
