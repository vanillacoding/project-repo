import React from 'react';
import { Header, Grid } from 'semantic-ui-react';
import * as tfvis from '@tensorflow/tfjs-vis';
import { Scatter } from 'react-chartjs-2';

const SelectVariablesPage = (props) => {

  function handleClick(e) {
    e.preventDefault();
    tfvis.visor().toggle();
  };

  const handleChange = (e) => {
    props.setInputX(Number(e.target.value));
  };

  function saveModel(e) {
    e.preventDefault();
    props.setSaveTrigger(true);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.setInputSubmitTrigger(true);
  };

  function handleRetryButton(e) {
    e.preventDefault();
    window.location.reload(true);
  }

  const data = {
    datasets: [
      {
        label: props.y,
        data: props.loadData.point5,
        fill: false,
        borderColor: 'red'
      }
    ]
  };

  const featuresUi = props.x.map((val, idx) => {

    return (
      <Grid.Column>
        <div>
          { val }
        </div>
        <div>
            <input
            width='30'
            name= { val }
            id= { val }
            key= { idx }
            onChange= { handleChange }
          />
        </div>
      </Grid.Column>
    )
  });

  return (
    <Grid container style={{ padding: '3em 5em' }}>
      <Grid.Row>
        <Grid.Column textAlign='right' >
          { props.userInfo ?
          <span>{ props.userInfo.name }</span>
          : <span>guest</span> }
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as='h3' dividing>
            Machine Learning Online
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <p>
            Machine Learning Online is a website that performs linear regression using
            Google's TensorFlow.js. Training performance depends on the GPU of your computer.
            In my case, it takes about 10 seconds to process approximately 20,000 sample data.
            I use Apple MacBook Pro 13-Inch (2017, Touch Bar).
            Therefore, if you handling very large amounts of data you should be very careful.
          </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as='h4' dividing>
            STATUS
          </Header>
          { !props.history ?
            <div>Training...</div>
          : <div>Training Complete</div>}
        </Grid.Column>
      </Grid.Row>
      { !props.loadData ?
      <Grid.Row>
        <Grid.Column>
          <button disabled>
            Details
          </button>
        </Grid.Column>
      </Grid.Row>:
      <Grid.Row>
        <Grid.Column>
          <button as='a' tabIndex='0' onClick={ handleClick }>
            Details
          </button>
        </Grid.Column>
      </Grid.Row> }
      <Grid.Row>
        <Grid.Column>
          <Header as='h4' dividing>
            MODEL TRAINING SUMMARY
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={4}>
        <Grid.Column textAlign='center' >
          <div>Epoch</div>
        </Grid.Column>
        <Grid.Column textAlign='center' >
          <div>BatchSize</div>
        </Grid.Column>
        <Grid.Column textAlign='center' >
          <div>Total samples</div>
        </Grid.Column>
        <Grid.Column textAlign='center' >
          <div>Learning rate</div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={4}>
        { props.history ?
        <Grid.Column textAlign='center' >
          <div>{ props.history.epochs }</div>
        </Grid.Column>: null }
        { props.history ?
        <Grid.Column textAlign='center' >
          <div>{ props.history.batchSize }</div>
        </Grid.Column>: null }
        { props.history ?
        <Grid.Column textAlign='center' >
          <div>{ props.history.samples }</div>
        </Grid.Column>: null }
        { props.history ?
        <Grid.Column textAlign='center' >
          <div>0.01</div>
        </Grid.Column>: null }
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as='h4' dividing>
            MODEL PREDICTION
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={props.x.length}>
        <Scatter data={data} options={{ showLines: true }} />
      </Grid.Row>
      <Grid.Row columns={4}>
        { featuresUi }
      </Grid.Row>
      <Grid.Row columns={4}>
       <Grid.Column>
        <button onClick= { handleSubmit }>
          Predict
        </button>
       </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={4}>
        <Grid.Column>
          <div>
            Predicted { props.y }
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={4}>
        <Grid.Column>
          <div>
            { Math.floor(props.predictedValue) }
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as='h4' dividing>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={3}>
        <Grid.Column textAlign='center' >
          <button onClick={ handleRetryButton }>
            Retry
          </button>
        </Grid.Column>
        <Grid.Column textAlign='center' >
          <button onClick={ saveModel }>
            Model Save
          </button>
        </Grid.Column>
        <Grid.Column textAlign='center' >
          <button onClick={ saveModel }>
            Model Load
          </button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default SelectVariablesPage;
