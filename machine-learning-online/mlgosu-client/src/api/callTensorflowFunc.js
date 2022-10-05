import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

export const normalise = (tensor) => {
  const min = tensor.min();
  const max = tensor.max();
  const normalisedTensor = tensor.sub(min).div(max.sub(min));

  return {
    tensor: normalisedTensor,
    min,
    max
  };
};

export const plot = async (pointsArray, featureName) => {
  tfvis.render.scatterplot(
    {name: 'My Surface', tab: 'Graph'},
    { values: [pointsArray], series: ["original"] },
    {
      xLabel: featureName,
      yLabel: "Price"
    }
  );
};

export const createModel = (x) => {
  let model = tf.sequential();

  model.add(tf.layers.dense({
    units: 1,
    useBias: true,
    activation: 'linear',
    inputDim: x.length
  }));

  const optimizer = tf.train.sgd(0.1);
  model.compile({
    loss: 'meanSquaredError',
    optimizer
  });

  return model;
};

export const trainModel = (model, x, y, size) => {
  const { onBatchEnd, onEpochEnd } = tfvis.show.fitCallbacks(
    { name: "Training", tab: "Train" },
    ['loss']
  );

  return model.fit(x, y, {
    batchSize: Math.floor(size/20),
    epochs: 20,
    callbacks: {
      onEpochEnd, onBatchEnd
    }
  });
};
