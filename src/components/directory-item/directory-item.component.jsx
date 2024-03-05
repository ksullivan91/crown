import { Typography } from "base-ui-react";
import { Link } from "react-router-dom/dist";

import "./directory-item.styles.scss";

const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <Link
      to={`/shop/${title.toLowerCase()}`}
      className="directory-item-container"
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="directory-item-body-container">
        <Typography variant="h5">{title}</Typography>
        <Typography variant="small">SHOP NOW</Typography>
      </div>
    </Link>
  );
};

export default CategoryItem;
