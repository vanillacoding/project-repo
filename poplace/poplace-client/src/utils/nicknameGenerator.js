import wordsData from "../assets/recommendedNickname";

export default function generateNickname() {
  let firstWord = "";
  let secondWord = "";

  for (let i = 0; i < wordsData.first.length; i++) {
    firstWord = wordsData.first[Math.floor(Math.random() * wordsData.first.length)];
  }

  for (let i = 0; i < wordsData.second.length; i++) {
    secondWord = wordsData.second[Math.floor(Math.random() * wordsData.second.length)];
  }

  if ((firstWord + secondWord).length > 7) {
    return generateNickname();
  }

  return firstWord + secondWord;
}
