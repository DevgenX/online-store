import CategoryItem from "../category-item/category-item";
import "./categories.syles.scss";

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
