import { translate } from './kakao';
import api from './api';
import { format } from './index';

const compareLabels = async ({ keyword, data }) => {
  if (typeof keyword !== 'string') throw Error(`${keyword} should be string`);

  const translatedKeyword = await translate(keyword);
  const formattedKeyword = format(translatedKeyword);

  return data.Labels.some((label) => (
    format(label.Name) === formattedKeyword
  ));
};

const detectLabels = async (datauri) => {
  return await api.post({ path: '/aws/rekognition', body: { datauri }});
};

export default {
  compareLabels,
  detectLabels,
};
