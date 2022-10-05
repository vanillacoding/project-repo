# Anonym

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f5f70c73-a46b-4e97-9b43-94fae287265a/_2021-05-24__12.34.49.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f5f70c73-a46b-4e97-9b43-94fae287265a/_2021-05-24__12.34.49.png)

Anonym은 유저의 실물 대신 캐릭터를 송출하는 스트리밍 서비스입니다.

Deploy Site :

Github Repositories : [**https://github.com/avatar-streaming**](https://github.com/avatar-streaming)

## 프로젝트 동기
---

최근 늘어가는 스트리밍에 대한 관심과 수요와 함께\
스트리밍을 하면서 익명성을 보장받고 싶은 사람들을 위해\
실물 대신 캐릭터를 송출하는 스트리밍 서비스를 제공하면\
라디오 방송보다 더 역동적인 스트리밍이 될 수 있겠다고 생각하여 기획하게 되었습니다.

## 기술 스택

---

**[Front-end]**

- React
- Redux
- SCSS
- Tensorflow
- WebRTC
- socket
- lodash

## 프로젝트 기간

---

- **기획 :** 2021 / 05 / 03 ~ 2021 / 05 / 09 **(1주간)**
    - **1주차 -**  아이디어 및 기술스택 검토

- **개발 :** 2021 / 05 / 10 ~ 2021 / 05 / 21 **(2주간)**
    - **2주차 -** <React> Component, UI / <Server> CRUD / <TensorFlow> PoseAnimator 적용
    - **3주차 -** <WebRTC> Streaming  / <Socket> Chatting

## 주요 기능 및 시연 영상
---

[바닐라코딩 부트캠프 9기 최종 프로젝트 Stand-up Event](https://www.youtube.com/watch?v=F8OHnevCS30&t=13148s)

`3: 39: 10`부터 주요 기능과 프로젝트 플로우에 대한 설명을 보실 수 있습니다.

## 기술
---

### SCSS

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/959ff5c4-764b-4bff-9f8b-1d2a0dc88443/_2021-05-28__10.25.42.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/959ff5c4-764b-4bff-9f8b-1d2a0dc88443/_2021-05-28__10.25.42.png)

[https://2020.stateofcss.com/en-US/technologies/](https://2020.stateofcss.com/en-US/technologies/)

`The State of CSS 2020`에서 CSS의 트렌드를 확인해 봤습니다.

`CSS-in-JS`와 `CSS-in-CSS`를 기준으로\
사용량과 만족도가 높은 `Styled Component`와 `Sass`를 고민하던 중\
조사 결과 `Styled Component`는 CSS와 JS가 분리되어있지 않기 때문에\
Component를 rendering할때
style도 같이 road되는 특징이 있는 것을 확인했습니다.

만약, 굉장히 동적인 이벤트가 많은 웹사이트가 있다면\
그만큼 Component의 상태 값 전환도 활발하며,\
Component interaction이 활발할수록 자주 렌더링 될 것입니다.

이러한 웹사이트에서 `CSS-in-JS`를 사용한다면\
그만큼 스타일 정보도 다시 읽어와야 하므로 성능 저하가 발생합니다.

이번 프로젝트는 특정 페이지의 경우\
상태 값 전환으로 인한 rendering이 활발하게 일어나기 때문에\
처음에는 스타일 정보를 가져오는 양이 많더라도 `CSS-in-CSS`인 `Sass`를 사용하기로 했습니다.

### WebRTC
---

이번 프로젝트는 실시간성이 중요한 스트리밍 서비스이기 때문에\
`WebRTC`를 통해 스트리밍을 구현하기로 했습니다.

`WebRTC`는 데이터 통신이 필요한 Peer들을 1:1로 연결하는 P2P 프로토콜입니다.\
Signaling을 제외하면 통신을 위해 서버를 경유할 필요가 없어서 빠르게 실시간 통신이 가능합니다.

문제는 N:N 통신의 경우 `Mesh` 형태로 트래픽이 발생하여\
`uplink`와 `downlink`가 N 개만큼 필요하기 때문에\
통신 인원이 많을수록 클라이언트의 부하가 심해진다는 것입니다.

이는 대규모의 스트리밍 서비스에는 적합하지 않은 방식이며,\
이러한 문제점을 해결하기 위해 스트리밍에 적합한 `SFU(Selected Foward Unit)` 방식으로 구현했습니다.

`SFU` 구현을 위해 `mideasoup`과 같은 라이브러리를 사용할 수도 있겠지만\
학습 차원에서 midea server를 직접 구현했습니다.

## 프로젝트 소감
---
