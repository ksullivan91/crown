import { Typography } from "base-ui-react";
import "./category-item.styles.scss";

const CategoryItem = ({ category }) => {
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
        <Typography variant="h5">{title}</Typography>
        <Typography variant="small">SHOP NOW</Typography>
      </div>
    </div>
  );
};

export default CategoryItem;
