import { useContext, useState } from 'react';
import { checkValidAddress, postProject } from '../../apis/project';
import { ProjectContext } from '../../contexts/ProjectContext';

function getValidText(text) {
  // eslint-disable-next-line no-useless-escape
  const speacialTextRegex = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\ '\"\\(\=]/gi;
  return text.replace(speacialTextRegex, '');
}

export default function usePublishForm() {
  const { project, setProject } = useContext(ProjectContext);

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [isPublished, setIsPublished] = useState('');

  const [isAddressValid, setIsAddressValid] = useState(null);

  function handleChangeTitle(e) {
    const { value } = e.target;

    setTitle(value);
    setProject((prev) => ({
      ...prev,
      title: value,
    }));
  }

  function handleChangeAddress(e) {
    setIsAddressValid(null);
    setAddress(getValidText(e.target.value));
  }

  async function handleClickCheckAddress() {
    const isValid = await checkValidAddress(address);
    setIsAddressValid(isValid);

    if (isValid) {
      setProject((prev) => ({
        ...prev,
        address,
      }));
    }
  }

  async function handleSubmitForm(e) {
    e.preventDefault();

    if (!isAddressValid) {
      return;
    }

    try {
      const isPosted = await postProject(project);
      setIsPublished(isPosted);
    } catch (error) {
      setIsPublished(false);
    }
  }

  return {
    title,
    address,
    isPublished,
    isAddressValid,
    handleSubmitForm,
    handleChangeTitle,
    handleChangeAddress,
    handleClickCheckAddress,
  };
}
