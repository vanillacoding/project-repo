import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../api/channelApi";
import ChannelForm from "./ChannelForm";
import useChannelForm from "../../hooks/useChannelForm";

export default function ChannelEdit({ channelInfo, setDoUpdate, toggleModal }) {
  const { title, description, isActive, _id: channelId } = channelInfo;
  const [formData, handleFormData] = useChannelForm(
    title,
    description,
    isActive
  );

  const { projectId } = useParams();
  const navigate = useNavigate();

  const handleOnEditSubmit = async () => {
    try {
      const payload = formData;
      await api.putChannel({ projectId, channelId, payload });

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
      handleOnSubmit={handleOnEditSubmit}
    />
  );
}

ChannelEdit.propTypes = {
  channelInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  setDoUpdate: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
