import React from 'react';
import { Header, Message, Grid, Button, Input } from 'semantic-ui-react';
import GoogleLogin from 'react-google-login';

const LandingPage = (props) => {

  const responseGoogle = (res) => {
    props.setUserInfo(
      {
        googleId: res.profileObj.googleId,
        name: res.profileObj.name,
        email: res.profileObj.email
      }
    );
  };

  const handleChange = (e) => {
    props.setDriveUrl(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    props.buttonTrigger(true);
  };

  return (

    <Grid container style={{ padding: '3em 5em' }}>
      <Grid.Row>
        <Grid.Column textAlign='right' >
          { !props.userInfo ?
          <GoogleLogin
            render={ renderProps =>(
                <button
                  onClick={ renderProps.onClick }
                  disabled={ renderProps.disabled }>
                  Google
                </button>
              )}
            clientId = { process.env.REACT_APP_GOOGLE_ID }
            buttonText="Google"
            onSuccess= { responseGoogle }
            cookiePolicy={'single_host_origin'}
          />: <span>Welcome! { props.userInfo.name }</span> }
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
            Machine Learning Online is a website that performs linear regression using Google's TensorFlow.js. Training performance depends on the GPU of your computer. In my case, it takes about 10 seconds to process approximately 20,000 sample data. I use Apple MacBook Pro 13-Inch (2017, Touch Bar). Therefore, if you handling very large amounts of data you should be very careful.
          </p>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column onChange= { handleChange } >
          <Input placeholder='url' />
          { props.driveUrl.length < 15 ?
            <Button id='disabledBtn' disabled>
              Submit
            </Button>:
            <Button id='abledBtn' as='a' tabIndex='0' onClick={ handleClick }>
              Submit
            </Button> }
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Message>
            <Header as='h4'>NOTICE</Header>
              <ol>
                <li>prepare csv dataset (local)</li>
                <li>upload to google drive (your account)</li>
                <li>right click > sharing link copy</li>
                <li>refer to the example below to modify the url</li>
              </ol>
              <ul>
                <li>open? => uc?export</li>
                <li>origin:
                    https://drive.google.com/open?=download&id=1j78fFH-IZUXnEmW0dNgOd9M2w64oU1zj
                </li>
                <li>fixed url:
                    https://drive.google.com/uc?export=download&id=1j78fFH-IZUXnEmW0dNgOd9M2w64oU1zj
                </li>
              </ul>
          </Message>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as='h4' dividing>
            SAMPLE DATASET
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <p>
            BTC, ETH, XLM Historical daily price data 17.03 ~ 20.05
            <li>https://drive.google.com/uc?export=download&id=1dypyzne0Brd5YfqfmUYwqa99QHkfziPs</li>
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default LandingPage;
