import api from './config';

export const saveBookReport = async ({
  editMode,
  reportId,
  userToken,
  quote,
  imageUrl,
  draftsText,
  draftsTitle,
  selectedBook,
  selectedCategory
}) => {
  if (editMode) {
    await api.put(`/users/${userToken}/book-report`, {
      data: {
        reportId,
        quote,
        imageUrl,
        draftsText,
        draftsTitle,
        selectedBook,
        selectedCategory
      }
    });
  } else {
    await api.post(`/users/${userToken}/book-report`, {
      data: {
        quote,
        imageUrl,
        draftsText,
        draftsTitle,
        selectedBook,
        selectedCategory
      }
    });
  }
  return;
};

export const receiveMemberBookReport = async (userToken) => {
  const response = await api.get(`/users/${userToken}/book-reports`);
  return response.data.bookReports;
};

export const receiveNonMemberBookReport = async () => {
  const response = await api.get(`/non-member/book-reports`);
  return response.data.bookReports;
};

export const saveBookImage = async (userToken, file) => {
  const formData = new FormData();
  formData.append('photo', file);

  const response = await api.post(`/users/${userToken}/writing/attaching-image`,
    formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data.imageUrl;
};

export const findOneBookReport = async (id) => {
  const response = await api.get(`/book-reports/${id}`);

  return response.data;
};

export const saveBookmark = async (userToken, reportId, isBookmarked) => {
  const response = await api.put(`/book-reports/${reportId}/users/${userToken}/bookmark`, { isBookmarked });

  return response.data.isBookmarked;
};

export const saveComment = async (userToken, reportId, comment) => {
  const response = await api.post(`/book-reports/${reportId}/users/${userToken}/comment`, {
    data: {
      comment
    }
  });

  return response.data.comments;
};

export const deleteComment = async (userToken, reportId, commentId) => {
  const response = await api.delete(`/book-reports/${reportId}/users/${userToken}/comment`, {
    data: {
      commentId
    }
  })

  return response.data.comments;
};
