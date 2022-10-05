import React from 'react';
import { LIGHT_RED, LIGHT_GREEN } from '../constants/colors';

export default function Leaf({
  attributes,
  children,
  leaf,
}) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strike) {
    children = <strike>{children}</strike>;
  }

  if (leaf.big) {
    children = <big>{children}</big>;
  }

  if (leaf.mark) {
    children = <mark>{children}</mark>;
  }

  if (leaf.before) {
    children = <span style={{ background: LIGHT_RED }}>{children}</span>;
  }

  if (leaf.after) {
    children = <span style={{ background: LIGHT_GREEN }}>{children}</span>;
  }

  return <span {...attributes}>{children}</span>;
};
