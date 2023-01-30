import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";

import ChannelForm from "./ChannelForm";
import channelApi from "../../api/channelApi";
import useChannelForm from "../../hooks/useChannelForm";

export default function ChannelCreate({ setDoUpdate, toggleModal }) {
  const [formData, handleFormData] = useChannelForm();

  const navigate = useNavigate();
  const { projectId } = useParams();

  const handleOnCreateSubmit = async () => {
    try {
      await channelApi.createChannel({
        projectId,
        payload: formData,
      });

      setDoUpdate(true);
      toggleModal();
    } catch (error) {
      navigate("/error", { replace: true });
    }
  };

  return (
    <ChannelForm
      formData={formData}
      handleFormData={handleFormData}
      handleOnSubmit={handleOnCreateSubmit}
    />
  );
}

ChannelCreate.propTypes = {
  setDoUpdate: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
