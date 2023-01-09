import "./category-item.styles.scss";

// destructured the category in the parameters
// it is equal to { category } = this.props
// then imageUrl, title are destructured from category object
const categoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default categoryItem;
