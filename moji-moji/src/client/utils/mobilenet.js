/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tfc from '@tensorflow/tfjs-core';
import { loadFrozenModel } from '@tensorflow/tfjs-converter';
import SCAVENGER_CLASSES from './scavenger_classes';

const MODEL_FILE_URL = '/model/tensorflowjs_model.pb';
const WEIGHT_MANIFEST_FILE_URL = '/model/weights_manifest.json';
const INPUT_NODE_NAME = 'input';
const OUTPUT_NODE_NAME = 'final_result';
const PREPROCESS_DIVISOR = tfc.scalar(255 / 2);

export default class MobileNet {
  async load() {
    this.model = await loadFrozenModel(
      MODEL_FILE_URL,
      WEIGHT_MANIFEST_FILE_URL
    );
  }

  dispose() {
    if (this.model) {
      this.model.dispose();
    }
  }

  predict(input) {
    const preprocessedInput = tfc.div(
      tfc.sub(input.asType('float32'), PREPROCESS_DIVISOR),
      PREPROCESS_DIVISOR
    );
    const reshapedInput = preprocessedInput.reshape([
      1,
      ...preprocessedInput.shape
    ]);
    const dict = {};

    dict[INPUT_NODE_NAME] = reshapedInput;

    return this.model.execute(dict, OUTPUT_NODE_NAME);
  }

  getTopKClasses(predictions, topK) {
    const values = predictions.dataSync();
    let predictionList = [];

    predictions.dispose();

    for (let i = 0; i < values.length; i++) {
      predictionList.push({ value: values[i], index: i });
    }

    predictionList = predictionList
      .sort((a, b) => {
        return b.value - a.value;
      })
      .slice(0, topK);

    return predictionList.map(x => {
      return { label: SCAVENGER_CLASSES[x.index], value: x.value };
    });
  }
}
