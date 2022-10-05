import React from 'react';
import { Header, Grid, Menu, Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

const Selection = (props) => {

  const handleItemClickforY = (e) => {
    e.preventDefault();
    props.setY(e.target.getAttribute('id'));
  }

  const handleItemClickforX = (e) => {
    e.preventDefault();

    if (props.x.indexOf(e.target.getAttribute('id')) === -1) {
      props.setX([...props.x, e.target.getAttribute('id')]);
    } else {
      props.setX(props.x.splice(props.x.indexOf(e.target.getAttribute('id'),1)));
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    props.submitTrigger(true);
  }

  const tableHeaderUiforY = props.tableHeader.map((val, idx) => {

    return (
      <Menu.Item
        style={{fontSize: '10px'}}
        textAlign='center'
        name={val}
        id={val}
        key={idx}
        onClick={handleItemClickforY}
      />
    )
  });

  const tableHeaderUiforX = props.tableHeader.map((val, idx) => {

    return (
      <Menu.Item
        style={{fontSize: '10px'}}
        textAlign='center'
        name={val}
        id={val}
        key={idx}
        onClick={handleItemClickforX}
      />
    )
  });

  const variablexUi = props.x.map((val, idx) => {

    return (
      <span>{ val } </span>
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
            MODEL
          </Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={4}>
        <Grid.Column textAlign='center' >
          <div>y variable</div>
        </Grid.Column>
        <Grid.Column textAlign='center' >
          <div>x variables</div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={4}>
        <Grid.Column textAlign='center' >
          <div id='y'>{props.y || " "}</div>
        </Grid.Column>
        <Grid.Column textAlign='center' >
          <span>{ variablexUi || " " }</span>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={4}>
        <Grid.Column textAlign='center' >
          { props.y.length < 1 || props.x.length < 1 ?
          <button disabled>
            Train
          </button>:
          <button onClick={ handleClick }>
            Train
          </button> }
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as='h4' dividing>
            SELECT VARIABLES
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column textAlign='center' >
          <div>Select y variable</div>
          { props.tableHeader.length > 1 ?
          <Menu fluid vertical>
            { tableHeaderUiforY }
          </Menu>:
          <Segment>
            <Dimmer active>
              <Loader size='medium'>Loading</Loader>
            </Dimmer>
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
          </Segment> }
        </Grid.Column>
        <Grid.Column textAlign='center' >
          <div>Select x variables</div>
          { props.tableHeader.length > 1 ?
          <Menu fluid vertical>
            { tableHeaderUiforX }
          </Menu>: <Segment>
            <Dimmer active>
              <Loader size='medium'>Loading</Loader>
            </Dimmer>
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
          </Segment> }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Selection;
