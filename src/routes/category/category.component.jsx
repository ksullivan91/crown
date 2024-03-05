import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "base-ui-react";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../contexts/categories.context";

import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category].items);

  useEffect(() => {
    setProducts(categoriesMap[category].items);
  }, [category, categoriesMap]);

  return (
    <div className="category">
      <Typography variant={"h3"}>{category.toUpperCase()}</Typography>
      <div className="category-wrapper">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Category;
