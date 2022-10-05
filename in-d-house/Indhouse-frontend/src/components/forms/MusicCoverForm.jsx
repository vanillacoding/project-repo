import React, { useState } from "react";
import PropTypes from "prop-types";

const MusicCoverForm = ({ setPhoto }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileOnChange = e => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      reader.onloadend = () => {
        setPhoto(file);
        setPreviewUrl(imageUrl);
      };

      reader.readAsDataURL(file);

      return;
    }

    setPhoto(null);
    setPreviewUrl(null);
  };

  return (
    <>
      <form
        encType="multipart/form-data"
      >
        <label htmlFor="file">Edit Music Cover</label>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          onChange={handleFileOnChange}
          required
        />
      </form>
      <img src={previewUrl} />
    </>
  );
};

MusicCoverForm.propTypes = {
  setPhoto: PropTypes.func,
};

export default MusicCoverForm;
