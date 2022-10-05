export default function validateTag(tags) {
  const checkEng = /[a-zA-Z]/;

  if (checkEng.test(tags.tag)) {
    alert("태그는 한글로 입력해주세요");
    return false;
  }

  if (tags.tag.length > 5) {
    alert("태그는 5글자 이하로 입력해주세요");
    return false;
  }

  if (tags.tagsArray.length > 3) {
    alert("tag는 3개까지만 입력해주세요");
    return false;
  }

  return true;
}
