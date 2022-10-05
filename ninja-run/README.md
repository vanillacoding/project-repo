# 🐱‍👤Ninja Run

<p align="center"><img src="./readme/ninja6_hanging_fit.png" width="100"></p>

### Rope swing And Jump Over!

스파이더맨 처럼 로프를 타고 장애물을 넘어가는 게임입니다!

👉Deploy Address: https://www.ninjarun.fun/

👉Backend Address: https://github.com/Jay-WKJun/ninjaRunBack

## Demo

<img src="./readme/mainDemo.gif" />

(게임화면의 일부를 촬영했습니다)

## 시연영상

[![stand-up event](https://img.youtube.com/vi/F8OHnevCS30/0.jpg)](https://youtu.be/F8OHnevCS30?t=9741)

(2시간 42분 21초 시작)

# ❗ Motivation

- why game?

  - **객체지향 패러다임을 심도있게** 다루어보고 싶었습니다.
  - **직접 물리 현상들을 코드로** 구현해보고 싶었습니다.
  - **바닐라 자바스크립트를 사용하며 자바스크립트의 이해도를 높여보고 싶었습니다.**

- why Rope Action?

  - **대중적이지만** 사람들에게 **상대적으로 덜 알려진** 로프액션이 참신하다고 생각했습니다.
  - 개인적으로 스파이더맨과 과거 Worms 라는 게임처럼 속도 있는 게임을 좋아합니다.

# 🛠 Tech stack

- Phaser 3

  Sprite 렌더링과 물리엔진을 동시에 그리고 조화롭게 사용할 수 있는 FrameWork 이었기에 전체적인 게임 제작에 활용하였습니다.

- matterJS

  두 Object간 구속관계(Constraint) 기능과 공기 저항 등의 더욱 더 정교하고 복잡한 물리 현상을 재현하기 위해 사용하였습니다.

- Vanilla Javascript

  간단한 routing과 page rendering에 React는 너무 OverEngineering이라 생각하여 처음부터 Vanilla Javascript로 만들기로 결정했습니다.

  Main page와 Backend Server 통신 그리고 routing에 사용되었습니다.

- Webpack

  Game의 수많은 asset과 Phaser framework를 bundling하기 위해 사용했습니다.

- Express.js

  Backend api server에 활용되었습니다.

# 🌐 Deploy

**Client**

- Netlify를 이용해 배포

**Server**

- AWS Elastic Beanstalk (EB)
- AWS Code Pipeline for Deployment automation

# 🕹 How to Play?

- **표창 발사**

  **클릭**시, 마우스 커서 위치로 표창 발사

  - **땅**에 맞을 시?

    **로프 생성!** Swing 시작!

  - **적**에게 맞을 시?

    **적을 처치!**

- **Rope 놓기**

  **Swing중 클릭**, 관성 그대로 날아간다

- **점수 획득**

  적 하나당 1점! 10초 당 1점!

- **Rule!!**

  - 로프와 표창은 화면상 하나만 가능(swing중 표창 발사 불가)
  - 1분 마다, 난이도 증가!

# 🎯 Focus point!

## OOP 설계 (Object-Oriented Programming)

게임이기에 **여러 Object들의 상호작용을 코드로 직관적이고 간결하게 나타내기 위해 OOP 설계에 특히 집중**하였습니다.

### 높은 응집도와 낮은 결합도

```
OOP의 다른 법칙도 모두 고려하며 개발하였지만 특히 응집도와 결합도의 원칙은
순수 함수가 핵심이 되는 Functional Programming과
module화 가능한 것을 만든다라는
함수 생성 원칙이 유사다고 생각하여 조금 더 신경쓰며 설계했습니다.
```

#### 대표적인 적용 예시

이번에 **사용한 엔진은 'matterJS' 물리엔진**은 Object가 스스로 움직이도록 하는 기능이 없어 처음에는 frame이 update될 때마다 velocity를 설정해주어 속도를 일정하게 유지해 주었지만,

해당 기능은 다른 Object와 상호작용이 필요없는데 게임 field의 update 함수에 있는 것은 코드의 낭비라고 생각,

tween의 counter를 각 class내에서 사용, 1x -> 2x지점까지 일정한 간격으로 숫자를 count, 그것을 속도로 삼아 스스로 움직이도록 설정하였습니다.

이런식으로 **class의 응집성은 늘이고 결합성을 줄였습니다.**

#### 느낀점

- OOP의 장점

  - 매우 직관적인 설계

    현실세계의 물건(Entity)을 만드는 것 처럼 **매우 직관적인 설계가 가능**하여 좋았습니다.

    설계 뿐만 아니라 **object끼리의 상호작용에도 각각의 method만 활용하면 되는 점에서 매우 편리하고 직관적이어서 좋았습니다.**

    ex) 캐릭터가 자신의 각도를 360도 회전 시키는 행동을 캐릭터 class안에 하나의 method로 정의하고 필요할 때, 실행시켜 캐릭터를 회전시키도록 하였습니다. 이렇게 <u>스토리를 짜듯이 코드를 작성</u>하게 되어 설계와 코드 작성에 매우 용이했습니다.

    동시에 코드 또한 직관적으로 읽히도록 작성이 가능했습니다.

- 불편했던 점, 단점

  - 불완전한 캡슐화

    javascript만의 문제일 수 있지만 ES2019에 추가된 private밖에 없어 capsulation이 불완전하다는 점입니다. class 하나의 수많은 method들의 범위 설정이 어려워 가독성이 떨어진것 같습니다.

  - 메모리 비효율성

    필요한 기능은 상속받아 만든 class의 여러 기능 중에 몇가지인데 그것을 위해 instance로 모든 것을 만들어내야 한다는 점이 비효율 적이라 생각했습니다.

    ex) 실제로 이번 project에서 sprite class를 상속받아 만든 Character class의 method 중에 30%만 사용했습니다.

    interface나 abstract class를 통해 필요한 method와 variable을 정의하는 것도 해결 방법중 하나라고 생각합니다.

## Vanilla Javascript Page

그동안 React를 사용하면서 Vanilla Javascript와 멀어져 이번 기회에 Vanilla Vavascript와 친해지기 위해 Vanilla Javascript로 Page를 작업했습니다. 이번 기회로 다시금 본질적인 프로그래밍에 대해 다시 생각해 볼 수 있는 계기가 되었습니다.

Main Page는 접속한 사용자들의 Name을 파악하고 Ranking Page를 위해 따로 만들었습니다.

### 관심사의 분리 (Business logic과 Game logic의 분리)

Logic은 크게 Main Page에서 필요한 <u>"Business Logic"</u>과 게임을 위한 <u>"Game Logic"</u>이 있어 이 **둘의 관심사를 확실하게 분리**하기 위해 React와 유사하게 **Component화 및 Routing을 구현**했습니다.

#### 관심사의 분리에 집중한 이유

1. Game에 전혀 영향을 주지 않는 Logic

  Game이 구동되는데 전혀 상관없는 Logic이기에 완전히 분리하고자 했습니다.

2. Logic이 섞였을 때, 가독성의 저하, 유지보수의 불편함

  Game Logic 안에서도 나눌 수 있지만 완전히 파일을 나눔으로서 유지보수 면에서 크게 좋아졌습니다.

  ex) 실제로 기록저장 기능을 추가할 때 api fetch Logic 따로, 게임 종료 및 저장 Logic 따로 구현 한 후 연동했습니다.
  이 전, Game Logic 안에서 모든 것을 처리했던 것과는 달리 굉장히 빠르고 편리하게 구현했고, 파일이 확실히 구분되어 가독성도 훨씬 좋아 졌습니다.

  ex) 사용자 정보에 대한 변수도 다른 파일로 나누어 버리니 난이도에 영향을 주는 factor들을 정리하기가 훨씬 수월해져 난이도 조절에도 훨씬 수월했습니다!

#### 왜 React처럼 구현?

Phaser framework가 webpack 혹은 parcel을 통한 bundling이 필요했기 때문에 bundler에 맞춰 Vanilla Javascript page와 routing을 각 Component로 나누어 SPA 형태로 구현할 필요가 있었습니다.

routing도 실제 api 주소를 통해 page 자료들을 가져오는 것이 아니므로,
```
window.history.pushState({ data, "/" });
```
를 사용하여 실제로 해당 IP에 가서 자료를 불러오는 것은 아니지만 주소에 해당하는 Javascript 파일을 불러 페이지를 렌더링 함으로써, 플레이어가 routing을 사용 할 수 있도록 했습니다.

#### 느낀점

- Vanilla Javascript 감각이 되살아 났다

그동안 React와 React router를 사용하며 Vanilla Javascript에 대한 감각을 잃어버려서 React가 Vanilla Javascript로 되어 있다는 사실도 잊어가는 참에 거꾸로 Vanilla Javascript로 React의 기능들을 만들어 보면서 Javascript 본연의 프로그래밍에 대한 감각을 다시 살릴 수 있었던 기회가 되었습니다.

또한 어떠한 기술에 얽매이는 개발자가 아닌 **어떤 문제든 스스로 해결하고 만들어 낼 수 있다는 프로그래머로서의 자신감을 얻었습니다.**

- 관심사 분리와 코딩 컨벤션들

이번 프로젝트를 땐, 기능을 추가하고 도중에 코드를 한번 정리하고 다시 추가 및 수정해나가는 식으로 진행했습니다. 개발 속도는 좀 늦어지는 느낌이었지만 **관심사 분리와 코딩 컨벤션 노하후가 생겼는지 직접 경험해보며 생각해볼 수 있는 계기가 되었습니다...!**

저의 경우엔 직접 컨벤션을 지켜 코드를 작성하니 코드가 정리가 안되어 있을 때보다 훨씬 빠르고 정확하게 새로운 기능 추가 혹은 수정을 할 수 있었습니다!
 
