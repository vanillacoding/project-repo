import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "./Button";
import Radio from "./Radio";
import Input from "./Input";

const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 0.3fr;

  img {
    border-radius: 10px;
    margin: 3%;
    width: 400px;
  }

  .name {
    grid-area: 2 / 1 / 3 / 3;
    display: flex;
    justify-content: center;
    align-items: center;

    label {
      color: ${({ theme }) => theme.text.sub};
      font-size: ${({ theme }) => theme.fontSizes.small};
      padding: 10px;
      word-break: keep-all;
    }

    input {
      width: 5rem;
      text-align: center;
    }
  }

  @media screen and (max-width: 850px) {
    img {
      width: 300px;
    }
  }

  @media screen and (max-width: 650px) {
    img {
      width: 200px;
    }

    .name label {
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 450px) {
    img {
      width: 150px;
    }

    .name label {
      font-size: 1rem;
    }
  }
`;

function CreateCategoryForm({ onSubmit }) {
  const [selectedType, setSelectedType] = useState("grid");
  const [category, setCategory] = useState("");

  const handleSubmit = function () {
    onSubmit({ categoryType: selectedType, category });
  };

  const handleSelectType = function (type) {
    setSelectedType(type);
  };

  const handleNameChange = function ({ target }) {
    setCategory(target.value);
  };

  return (
    <Form>
      <div>
        <Radio
          id="customType1"
          value="grid"
          checked={selectedType === "grid"}
          onChange={handleSelectType}
        />
        <img src="/img/grid.png" />
      </div>
      <div>
        <Radio
          id="customType2"
          value="album"
          checked={selectedType === "album"}
          onChange={handleSelectType}
        />
        <img src="/img/album.png" />
      </div>
      <div className="name">
        <label htmlFor="categoryName"><p>새로운 카테고리 이름</p></label>
        <Input type="text" value={category} onChange={handleNameChange} />
        <Button
          text="추가"
          onClick={handleSubmit}
        />
      </div>
    </Form>
  );
}

CreateCategoryForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default CreateCategoryForm;
