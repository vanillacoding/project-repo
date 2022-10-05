import React from 'react';
import Cell from './Cell';
import Layout from './Layout';

export default function Board() {
  return (
    <Layout>
      {new Array(64).fill(0).map((_, index) => {
        const colorNumber = (index - Math.floor(index / 8)) % 2;
        return <Cell key={index} index={index} colorIndex={colorNumber} />;
      })}
    </Layout>
  );
}
