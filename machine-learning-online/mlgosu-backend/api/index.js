const express = require("express");
const tf = require('@tensorflow/tfjs');

const run = async (url, x, y) => {
  const returnedData = {};
  const columnConfigs = {};

  for (let i = 0; i < x.length; i++) {
    columnConfigs[x[i]] = { default: true }
  }

  columnConfigs[y] = { isLabel: true };

  const csvDataSet = tf.data.csv(url, {
    columnConfigs: columnConfigs,
    configuredColumnsOnly: true
  });

  const pointsDataset = await csvDataSet.map(({xs, ys}) => ({
    x: Object.values(xs),
    y: Object.values(ys)
  }));

  const points = await pointsDataset.toArray();

  returnedData.points = points;
  let yValues = points.map(p => p.y);
  let yPoints = yValues.map(val => Object.values(val));

  function flatten(arr) {
    return [].concat(...arr);
  };

  let xValues = points.map(p => p.x);
  let xPoints = xValues.map(val => Object.values(val));
  returnedData.point3 = flatten(yPoints).slice(0,100);
  returnedData.point4 = flatten(xPoints).slice(0,100);

  returnedData.point5 = points.slice(0, 200);
  returnedData.point2 = points.map(val => Object.values(val)).slice(0, 10);
  returnedData.point2.unshift([x[0], y]);

  return returnedData;
}

const getHeader = async (url) => {
  const csvDataSet = tf.data.csv(url);

  return csvDataSet.columnNames();
}

module.exports = { run, getHeader }
