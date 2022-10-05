import React, { useEffect } from "react";
import styled from "styled-components";

const StyledRotateText = styled.div`
  display: flex;
  text-align: left;
  color: #1d2546;
  font-weight: 600;
  font-size: 3.5em;

  p {
    margin: 0 7px;
  }
`;

const Word = styled.span`
  position: absolute;
  width: 290px;
  opacity: 0;
  color: ${({ color }) => color};

  .letter {
    display: inline-block;
    position: relative;
    transform: translateZ(25px);
    transform-origin: 50% 50% 25px;

    &.out {
      transform: rotateX(90deg);
      transition: transform 0.32s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    &.behind {
      transform: rotateX(-90deg);
    }

    &.in {
      transform: rotateX(0deg);
      transition: transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  }
`;

const RotateArea = styled.p`
  width: 250px;
`;

export default function RotateText({ staticText, rotatingWords }) {
  useEffect(() => {
    const words = document.getElementsByClassName("word");
    const wordArray = [];
    let currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (let i = 0; i < words.length; i++) {
      splitLetters(words[i]);
    }

    function changeWord() {
      const cw = wordArray[currentWord];
      const nw =
        currentWord == words.length - 1
          ? wordArray[0]
          : wordArray[currentWord + 1];
      for (let i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i);
      }

      for (let i = 0; i < nw?.length; i++) {
        nw[i].className = "letter behind";
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
      }

      currentWord = currentWord === wordArray.length - 1 ? 0 : currentWord + 1;
    }

    function animateLetterOut(cw, i) {
      setTimeout(() => {
        cw[i].className = "letter out";
      }, i * 80);
    }

    function animateLetterIn(nw, i) {
      setTimeout(() => {
        nw[i].className = "letter in";
      }, 340 + i * 80);
    }

    function splitLetters(word) {
      const content = word.innerHTML;
      word.innerHTML = "";
      const letters = [];
      for (let i = 0; i < content.length; i++) {
        const letter = document.createElement("span");
        letter.className = "letter";
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
      }

      wordArray.push(letters);
    }

    changeWord();
    setInterval(changeWord, 4000);
  }, []);

  return (
    <StyledRotateText>
      <p>{staticText}</p>
      <RotateArea>
        {rotatingWords.map((word) => (
          <Word className="word" key={word.text} color={word.color}>
            {word.text}
          </Word>
        ))}
      </RotateArea>
    </StyledRotateText>
  );
}
