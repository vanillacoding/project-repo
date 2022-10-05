export default function validatePinData({ tags, text, imageUri }) {
  if (!imageUri) {
    alert("이미지를 채워주세요!");
    return false;
  }

  if (!tags.length) {
    alert("태그를 입력해주세요!");
    return false;
  }

  if (!text) {
    alert("텍스트를 채워주세요!");
    return false;
  }

  if (text.length < 10) {
    alert("텍스트를 10자까지 채워주세요!");
    return false;
  }

  return true;
}
