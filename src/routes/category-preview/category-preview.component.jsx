import { Link } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";

import "./category-preview.styles.scss";
import { Typography } from "base-ui-react";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <Typography variant={"h3"}>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </Typography>
      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
