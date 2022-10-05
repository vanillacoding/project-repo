import React, { useState, useEffect } from 'react';
import LandingPage from '../components/LandingPage';
import Selection from '../components/Selection';
import SelectVariablesPage from '../components/SelectVariablesPage';
import { saveUser, saveUrl, getColumn } from '../api';
import { normalise, createModel, trainModel } from '../api/callTensorflowFunc';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

function MainContainer() {
  const [userInfo, setUserInfo] = useState('');
  const [driveUrl, setDriveUrl] = useState('');
  const [buttonTrigger, setButtonTrigger] = useState('');
  const [submitTrigger, setSubmitTrigger] = useState('');
  const [tableHeader, setTableHeader] = useState([]);
  const [loadData, setLoadData] = useState('');
  const [x, setX] = useState([]);
  const [y, setY] = useState('');
  const [inputX, setInputX] = useState([]);
  const [saveTrigger, setSaveTrigger] = useState('');
  const [saveModel, setSaveModel] = useState('');
  const [inputSubmitTrigger, setInputSubmitTrigger] = useState('');
  const [saveNormlisedFeature, setSaveNormalisedFeature] = useState('');
  const [saveNormalisedLabel, setSaveNormalisedLabel] = useState('');
  const [predictedValue, setPredictedValue] = useState('');
  const [yValues, setYValues] = useState('');
  const [history, setHistory] = useState('');

  useEffect(() => {
    if (userInfo) {
      saveUser(userInfo.googleId, userInfo.name, userInfo.email);
      window.sessionStorage.setItem('googleId', userInfo.googleId);
    }
  }, [userInfo]);

  useEffect(() => {
    if (buttonTrigger && !loadData) {
      (async () => { setTableHeader(await getColumn(driveUrl)) })();
    }
  }, [buttonTrigger]);

  useEffect(() => {
    if (submitTrigger) {
      (async () =>
        { setLoadData(
           await saveUrl(window.sessionStorage.getItem('googleId'),
           driveUrl,
           x,
           y ))
        }
      )();
      window.sessionStorage.setItem('google_drive_url', driveUrl);
    }
  }, [submitTrigger]);

  useEffect(() => {
    if (loadData) {
      let points = loadData.points;

      (async function () {

        if (points.length % 2 !== 0) {
          points.pop();
        };

        tf.util.shuffle(points);
        const featureValues = points.map(p => p.x);
        const labelValues = points.map(p => p.y);
        const featureTensor = tf.tensor2d(featureValues, [featureValues.length, x.length]);
        const labelTensor = tf.tensor2d(labelValues, [labelValues.length, 1]);
        const normalisedFeature = normalise(featureTensor);
        const normalisedLabel = normalise(labelTensor);
        const [trainingFeatureTensor, testingFeatureTensor] = tf.split(normalisedFeature.tensor, 2);
        const [trainingLabelTensor, testingLabelTensor] = tf.split(normalisedLabel.tensor, 2);
        const model = createModel(x);
        const layer = model.getLayer(undefined, 0);
        tfvis.show.modelSummary({name: 'Model'}, model);
        tfvis.show.layer({name: 'Model'}, layer);
        const historyContainer =
            await trainModel(model, trainingFeatureTensor, trainingLabelTensor, featureValues.length);
        setHistory(historyContainer.params);
        console.log(historyContainer)
        setYValues(labelValues);
        setSaveNormalisedFeature([normalisedFeature.min, normalisedFeature.max]);
        setSaveNormalisedLabel([normalisedLabel.min, normalisedLabel.max]);
        setSaveModel(model);
      })();
    }
  }, [loadData]);

  useEffect(() => {
    if(saveTrigger) {
      saveModel.save(
        'https://api.epoch.run/api/model/save');
    }
  }, [saveTrigger]);

  useEffect(() => {
    if(inputSubmitTrigger) {

      function normalise(tensor, min, max) {
        const normalisedTensor = tensor.sub(min).div(max - min);

        return normalisedTensor;
      }

      function denormalise(tensor, min, max) {
        const denormalisedTensor = tensor.mul(max - min).add(min);

        return denormalisedTensor;
      }

      tf.tidy(() => {
        const inputTensor = tf.tensor1d([inputX]);
        const normaliseInputTensor = normalise(
          inputTensor,
          saveNormlisedFeature[0].dataSync()[0],
          saveNormlisedFeature[1].dataSync()[0]
        );
        const noramliseoutputTensor = saveModel.predict(normaliseInputTensor);
        const outputTensor = denormalise(
          noramliseoutputTensor,
          saveNormalisedLabel[0].dataSync()[0],
          saveNormalisedLabel[1].dataSync()[0]
        );
        const outputValue = outputTensor.dataSync()[0];
        setInputSubmitTrigger(false);
        setPredictedValue(outputValue);
      });
    }
  }, [inputSubmitTrigger]);

  return (
    <div>
      { !buttonTrigger ?
      <LandingPage
        userInfo = { userInfo }
        setUserInfo = { setUserInfo }
        setDriveUrl = { setDriveUrl }
        driveUrl = { driveUrl }
        buttonTrigger = { setButtonTrigger }
      />: !submitTrigger ?
      <Selection
        tableHeader = { tableHeader }
        submitTrigger = { setSubmitTrigger }
        userInfo = { userInfo }
        x = { x }
        y = { y }
        setX = { setX }
        setY = { setY }
      />:
      <SelectVariablesPage
        tableHeader = { tableHeader }
        loadData = { loadData }
        setSaveTrigger = { setSaveTrigger }
        userInfo = { userInfo }
        x = { x }
        y = { y }
        inputX = { inputX }
        setInputX = { setInputX }
        setInputSubmitTrigger = { setInputSubmitTrigger }
        predictedValue = { predictedValue }
        submitTrigger = { setSubmitTrigger }
        yValues = { yValues }
        history = { history }
      />  }
    </div>
  );
}

export default MainContainer;
