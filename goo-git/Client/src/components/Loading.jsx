import React, { useState, useEffect } from 'react';
import { IslandWrapper } from '../styledComponents/IslandWrapper.styled';

export default function Loading({ text }) {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const interval = window.setInterval(() => {
      content === `${text}...`
        ? setContent(text)
        : setContent(`${content}.`);
    }, 300);

    return () => {
      window.clearInterval(interval);
    };
  });

  return (
    <IslandWrapper>
      <h1>{content}</h1>
    </IslandWrapper>
  );
}
