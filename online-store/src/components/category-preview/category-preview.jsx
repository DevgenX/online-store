import {
  PreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles.jsx";

import ProductCard from "../product-card/product-card.component";

const CategoryPreview = ({ title, products }) => {
  return (
    <PreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </PreviewContainer>
  );
};

export default CategoryPreview;
