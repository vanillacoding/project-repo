import React from "react";
import PropTypes from "prop-types";

import Table from "./Table";
import LongTree from "./LongTree";
import Closet from "./Closet";

function ChildFurniture({ name, isEditMode }) {
  switch (name) {
    case "Table":
      return <Table isEditMode={isEditMode} />;
    case "LongTree":
      return <LongTree isEditMode={isEditMode} />;
    default:
      return <Closet isEditMode={isEditMode} />;
  }
}

ChildFurniture.propTypes = {
  name: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool,
};

export default ChildFurniture;
