window.addEventListener('DOMContentLoaded', async () => {
  const url = window.location.href;

  const connectEvent = {
    name: 'connect',
    url,
  };

  const ip = await fetch('https://api.ipify.org?format=json', {
    method: 'GET',
  }).then(res => res.json()).then(res => res.ip);

  console.log('tracking start');
  fetch(`http://localhost:8080/api/test-page/${key}?event=${JSON.stringify(connectEvent)}&ip=${ip}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    mode: 'no-cors',
  }).then(res => console.log('received response'));

  document.body.addEventListener('click', (ev) => {
    const isButtonCTA = !!ev.target.closest('.vabt-cta-btn');

    const clickEvent = {
      name: 'click',
      x: ev.pageX,
      y: ev.pageY,
      isButtonCTA,
    };
    console.log('send click event');
    fetch(`http://abtest-env.zui4w2hpdb.ap-northeast-2.elasticbeanstalk.com/api/test-page/${key}?event=${JSON.stringify(clickEvent)}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      mode: 'no-cors',
    }).then(res => console.log('received click event request'));
  });
});

window.onunload = () => {
  const event = {
    name: 'leave',
  };
  console.log('I will leave');
  fetch(`http://abtest-env.zui4w2hpdb.ap-northeast-2.elasticbeanstalk.com/api/test-page/${key}?event=${JSON.stringify(event)}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    mode: 'no-cors',
  });
};
const key = "dp73yy179jtk4tn40";