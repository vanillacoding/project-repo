# 42 space simulator
- [ABOUT](#about)
  * [1. About](#1-about)
  * [2. Features](#2-features)
- [Before get started](#before-get-started)
  * [1. Planning](#1-planning)
  * [2. Periods of Development](#2-periods-of-development)
  * [3. Concept](#3-concept)
- [How to install](#how-to-install)
- [Stack](#stack)
  * [Frontend](#frontend)
  * [Why use](#why-use)
    + [ThreeJS](#threejs)
    + [Javascript and Webpack](#javascript-and-webpack)
    + [Flux pattern and Mobx](#flux-pattern-and-mobx)
- [What I have Learned](#what-i-have-learned)
  * [Think before code](#think-before-code)
    + [Class vs Factory function](#class-vs-factory-function)
    + [Variable name and readability](#variable-name-and-readability)
    + [Applying design pattern - factory pattern](#applying-design-pattern---factory-pattern)
  * [Knowing dose not equal Doing](#knowing-dose-not-equal-doing)
- [Summary](#summary)



## 1. About

<p align="center">
<img src="https://github.com/patissier-boulanger/42-space-simulator/blob/readme/static/images/exemple.png" width="70%" height="70%">
<img src="https://github.com/patissier-boulanger/42-space-simulator/blob/readme/static/images/exemple2.png" width="70%" height="70%">
<img src="https://github.com/patissier-boulanger/42-space-simulator/blob/readme/static/images/exemple3.png" width="70%" height="70%">
</p>

[http://42simulator.space/](http://42simulator.space/)


42 space simulator는 우주를 1인칭 시점으로 탐험해 볼 수 있는 웹 어플리케이션입니다. 웹 브라우저에서 설치 없이 바로 구동이 가능합니다. 위의 링크를 통해서 바로 체험해 볼 수 있습니다. 

**실행 영상 링크**
https://www.youtube.com/watch?v=mvFBfis8bU0

## 2. Features

당신은 우주에 홀로 남겨진 우주 비행사입니다! 42 space simulator를 통해 유저들은 우주에 홀로 남겨진 기분을 체험해 볼 수 있습니다. 태양계의 행성들과 우주 정거장, 소행성들이 구현되어 있으며 각자가 궤도에 맞춰서 공전하고 자전하는 모습을 볼 수 있습니다. 유저에게 주어진 시간은 42초로써 시간이 지나면 저절로 시뮬레이터가 종료되게 됩니다. 

- 3d로 구현된 태양계
- 마우스와 키보드로 조작 가능한 1인칭 시점
- 우주공간에서의 무중력 구현
- 자막과 사운드를 통한 내러티브 구현
<br>

# Before get started


## 1. Planning

<p align="center">
<img src="https://github.com/patissier-boulanger/42-space-simulator/blob/readme/static/images/gravity.jpg" width="70%" height="40%">
<img src="https://github.com/patissier-boulanger/42-space-simulator/blob/readme/static/images/obraDinn.jpg" width="70%" height="70%">
</p>

42는 영화 그래비티와 게임 오브라딘 호의 귀환을 보고 영감을 받아서 만들게 되었습니다. 우주라는 공간은 여러 매체에서 다양한 모습으로 그려집니다. 가끔은 탐험의 대상이기도 하고, 가끔은 낭만적인 공간이기도 합니다. 그러나 저는 42에서 우주를 고독함과 무력함을 느낄 수 있는 완전히 분리된 공간으로 그리고 싶었습니다. 

이러한 공간의 느낌을 전달하기 위해 다양한 방법을 생각해 보았습니다. 여기서 게임 오브라딘 호의 귀환의 셰이더 효과를 떠올렸습니다. 강렬한 흑백 대비와 아웃 라인의 강조가 제가 그리고 싶은 우주의 모습과 잘 어울린다고 생각해서 이와 같은 효과를 사용한 시뮬레이터를 만들기로 하였습니다. 

여기에 단순히 우주를 유영하는 것만으로는 유저에게 몰입감을 주기 힘들다고 생각하여 약간의 내러티브를 적용하였습니다. 간단한 인트로와 아웃트로, 그리고 42초가 지나면 시뮬레이터가 종료된다는 스토리라인을 적용하였습니다.

<br>

## 2. Periods of Development

5/3/2021 ~ 5/21/2021

<br>

## 3. Concept 

<p align="center">
<img src="https://github.com/patissier-boulanger/42-space-simulator/blob/readme/static/images/moodboard.PNG" width="70%" height="70%">
</p>

먼저 기본적인 앱의 플로우와 이에 따라 어떤 기술 스택을 사용해야 하는지 생각해보았습니다. 후에 `Figma` 를 사용해서 간단한 목업을 제작하였습니다. 우주에 관련된 이미지와 실제로 상용화되어 있는 게임들의 이미지를 참조하여 무드보드를 만들었습니다. 

일별로 해야 할 태스크를 나눠서 태스크 보드를 작성한 뒤 이에 맞춰서 일정을 조정하는 등 최대한 스케줄에 맞춰서 개발하려고 노력하였습니다. 

- 첫 주차는 기획과 컨셉 결정 그리고 지금까지 `Create-react-app`을 사용해서 개발하다보니 `Webpack` 과 같은 번들러에 대한 이해가 부족하다고 느껴 이에 대한 보완과  `Three.js` 를 공부하는 데 초점을 맞추었습니다. 

- 2주 차부터는 모델 제작과 1인칭 카메라 구현, 물리 법칙 구현에 가장 많은 시간을 쏟았습니다. 3차원 공간을 그리려 다 보니 수학적인 부분이 굉장히 많이 필요했는데 특히 물체를 회전하는 부분에서 많은 어려움을 느꼈습니다. 

- 마지막 주차는 전체적인 코드의 정리와 리드미 작성을 하였습니다.
  
<br>

# How to install

```
1. git clone https://github.com/patissier-boulanger/42-space-simulator.git

2. npm install

3. npm run dev
```
<br>

# Stack

## Frontend

Javascript, ThreeJS, Mobx, Webpack,

<br>

## Why use

### ThreeJS

- 3d 그래픽을 브라우저에서 표현하기 위해서는 기본적으로 자바스크립트 라이브러리인 `webGL` 을 사용합니다. `webGl` 만 가지고 구현하는 것도 가능하지만, 러닝 커브가 높아서 3주의 시간으로는 원하는 만큼의 퀄리티를 구현하기 힘들다고 판단해서 `webGL` 을 사용한 라이브러리를 사용하고자 하였습니다.
- 대표적인 두 가지 라이브러리 `ThreeJS` 와 `Babylon.js` 사이에서 고민을 하였습니다.  `ThreeJS` 는 브라우저 안에서 애니메이션적인 요소로 사용하는 등 브라우저와 같이 좀 더 범용적인 요소로 사용할 수 있다면  `Babylon.js` 는 충돌 계산과 같이 웹 게임에 더 유리하다는 점이 있었습니다.
- 그러나 현재까지는 서로 장단점과 차이점이 명확하지 않았고, 가장 중요한 점이었던 관련 커뮤니티와 레퍼런스 양이 `ThreeJS` 가 압도적이어서 `ThreeJS` 를 선택하였습니다.

<br>

### Javascript and Webpack

- 의존성 관리와 전역 스코프 관리, 코드 분할을 위해서 번들러를 사용하였습니다.
- `React` 와 함께  `Create-React-App` 을 사용했다면 초기 개발 속도가 빨라질 수 있었지만, 하나의 캔버스 element 위에서 렌더링이 이루어지므로 재사용 가능한 컴포넌트, 가상 dom을 통한 빠른 렌더링과 같은 `React`의 장점을 살릴 수 없다고 생각해서 `Javascript`를 사용하였습니다.
- 번들러의 경우 `Webpack`과 `Parcel`, `Rollup` 사이에서 고민하였습니다. `Rollup`은 tree shaking을 통해 효율적인 라이브러리 개발을 할 수 있다는 강점이 있지만 많은 플러그인이 필요하다는 단점이 있어서 제외하였습니다.
- `Parcel`의 경우 설정이 간편하다는 가장 큰 장점이 있었습니다. 규모가 크지 않은 프로젝트인 만큼 `Parcel`을 사용하는 게 가장 좋은 선택이었을 것 같았으나, 안정성과 많은 레퍼런스 그리고 학습의 목적으로 `Webpack`을  사용하였습니다.

<br>

### Flux pattern and Mobx

- 기획 단계에서 여러가지 상태를 관리할 필요성을 느끼고 Flux pattern을 사용하였습니다. MVC pattern을 사용하여 유저가 w 버튼을 누르면 컨트롤러가 모델을 앞으로 이동시키고, 그 상태를 다시 뷰가 렌더링하고 하는 방식으로 하는 것 보다, 단순히 상태를 캐치하여 뷰를 업데이트 하는 것이 더 간단하다고 생각하였습니다.
- 프로젝트를 객체지향적으로 설계하였는데 `Redux`의 경우 상태를 바꾸는게 아니라 불변성을 유지하기 위해 새로운 상태로 계속 덮어 써야 하는 특징을 가지고 있어 함수형 프로그래밍에 더 적합하다고 생각하였습니다.
- 반면 `Mobx`는 공식 도큐먼트의 예제부터가 class 문법을 사용하고 있고 상태를 변화시킬 수 있는 등 좀 더 객체지향에 친화적이라고 생각하였습니다. 또한 여러가지 스토어를 사용할 수 있어 여러 객체들의 상태를 좀 더 분리시켜서 관리할 수 있다고 판단하였습니다. 마지막으로 적은 Boiler plate와 낮은 러닝 커브 또한 장점이라고 생각하였습니다.

<br>

# What I have Learned

## Think before code

프로젝트를 진행하면서 어떤 선택을 내리기 전에 항상 장단점을 조사하려고 노력하였습니다. 스택을 결정하는 것부터 시작해서 설계 구조, 어떤 패턴을 선택해야 하는지, class를 써야 하는지 factory function을 써야 하는 지까지 항상 코드를 치기 전에 생각해야 한다고 느꼈습니다. 

조사하는 와중에 평소에는 생각치 못했던 점이나 새로운 사실들을 발견할 수 있었습니다. 

<br>

### Class vs Factory function

본 프로젝트에서는 class 문법을 도입하였습니다. 자바스크립트가 프로토 타입 언어이고, class 문법은 단지 syntactic sugar라는 의견이 많지만, es6에 익숙해 질 수 있는 기회라고 생각했고 private field와 같은 부가적인 기능이 있어 class를 선택하였습니다. 

프로젝트 진행 도중 간단한 함수들을 factory function으로 써보기도 하였지만 깊은 고민을 하지 않고 통일성을 위해 class로 모든 생성자 함수들을 작성하였습니다. class를 사용하므로써 캡슐화와 상속을 쉽게 구현할 수 있겠다는 생각이였습니다. 

그러나 후에 factory function으로 class 함수의 장점들을 모두 살려서 더 효율적으로 작성할 수 있다는 사실을 알게 되었습니다. 

```jsx
const createPlanets = () => {
  const planet = [];
  const orbit = null;

  const realize = () => {
    console.log("realized!");
  };
  const revolution = () => {
    console.log("revolutioning");
  };

  return Object.freeze({
    realize,
  });
};

const planet = createPlanets();
planet.realize(); // "realized!"
planet.revolution(); // planet.revolution is not a function
```

클래스에서 따로 private field를 선언할 필요 없이 캡슐화를 쉽게 구현 가능하며 Object.freeze 를 사용함으로써 다른 개발자가 실수로 객체를 수정하는 일을 막을 수 있습니다. 또한 this를 쓸 필요가 없는 것도 가독성 면에서 장점이라고 느껴졌습니다.  

이와 같은 경험을 바탕으로, 앞으로 객체 지향 방식을 쓸 일이 생긴다면 factory function으로 사용하는 것이 더 좋겠다 라고 생각하였습니다.

<br>

### Variable name and readability

가독성 있는 변수명이 얼마나 기본적이고 중요한지 프로젝트를 진행하면서 느낄 수 있었습니다. 프로젝트 초반 `ThreeJS` 학습을 위해서 다른 사람들의 코드를 볼 일이 매우 많았습니다. 이 중에서 읽는데 불편함을 느꼈던 코드들이 있었습니다. 예를 들면 벡터의 위치를 계산하는 아래와 같은 코드가 있었습니다. 

```jsx
for (let i = 0, l = position.count; i < l; i++) {
  v.fromBufferAttribute(position, i);

  v.x += Math.random() * 20 - 10;
  v.y += Math.random() * 2;
  v.z += Math.random() * 20 - 10;

  position.setXYZ(i, v.x, v.y, v.z);
}
```

물론 매우 훌륭한 코드였지만 이렇게 한 부분만 보았을 때 v가 의미하는 바가 무엇인지 한번 더 보아야 했습니다. setXYZ라는 메소드의 인자로 v가 들어가므로 vector라고 생각할 수 있지만, 다른 부분에서도 한 글자로 쓴 변수명이 많으니 전체적으로 코드를 볼 때 로직과 상관없이 한번 더 생각해야 하는 일이 많았습니다. 결국 변수명이 조금 길어지더라도 풀어서 쓰는 것이 협업에 있어 좀 더 좋은 방향이 아닌가 생각하게 되는 계기가 되었습니다. 

<br>

### Applying design pattern - factory pattern

머리로는 디자인 패턴을 안다고 생각했는데 실제로 이를 적용하는 것에 아쉬운 점을 많이 느꼈습니다. 실제 코드의 class PlanetFactory 를 보면 이렇게 단순히 더 작은 단위의 Planet의 인스턴스의 실행문을 엮어 놓았을 뿐 진짜 팩토리 패턴을 적용했다고 보긴 어렵다고 생각했습니다.

```jsx
class PlanetFactory {
  constructor(scene, modelStorage) {
    this.scene = scene;
    this.modelStorage = modelStorage;
    this.planets = [];
  }

  realize() {
    const sun = new Planet(
      this.scene,
      this.modelStorage.sunModel,
      sunCharacteristics.startPosition,
      sunCharacteristics.revolutionSpeedRate,
      sunCharacteristics.rotationSpeedRate,
      sunCharacteristics.distanceFromAxis,
      sunCharacteristics.rotationHeight,
    );
    sun.setShadow();
    sun.setScale(sunCharacteristics.scale);
    sun.addToScene();
```

위의 코드를 아래처럼 적용했다면 좀 더 깔끔하게 쓸 수 있었지 않았을까 하는 생각이 듭니다. 

```jsx
function planetFactory() {

  this.create = function(name, type) {
      switch(type) {
         case "Sun":
           return new Planet(name, type);
         case "Earth":
           return new Planet(name, type);
         default;
      }
  }
}

```

<br>

## Knowing dose not equal Doing

프로젝트를 진행하면서 여러가지 기술적 어려움을 겪었습니다. 3차원에서의 좌표 계산과 같은 수학에 관련한 어려움도 겪었고, 광원이 없어서 사물이 보이지 않는다던지 하는 기술적인 문제도 많았습니다. 특히 모델에 관한 부분은 결국 3d 툴인 `blender` 를 사용해서 문제를 해결해야 하는 경우도 있었습니다. 그러나 이러한 문제들은 `ThreeJS` 라이브러리를 사용하는데 익숙해지면서 자연스럽게 해결이 가능했습니다.

진짜 어려움을 겪었던 부분은 기본적인 부분이었습니다. 위에서 쓴 클래스와 팩토리, 디자인 패턴, 변수명과 같은 부분부터 해서 폴더 구조와 같은 부분이 가장 어려웠습니다. `React`에 익숙해져 있다 보니 컴포넌트 단위의 폴더 구조가 아니라, 스스로 어떻게 효율적이고 쉽게 파악이 가능한 구조를 만들어야 하는지 한번 더 생각해야 했습니다. 
그리고 객체지향적으로 코드를 짠 경험이 부족하다보니 실제로 어색함을 많이 느꼈습니다. 이로 인하여 중간에 계속 코드를 갈아엎어야 하는 일이 생겨 일정에도 많은 차질을 겪었습니다.

<br>

시작하기 전에는 SOLID 원칙, 팩토리 디자인 패턴과 같이 안다고 생각했고, 그대로 적용하면 되지 않을까 생각했습니다. 그런데 위 디자인 패턴 부분에서 쓴 대로 실제로 적용하려고 하니 예상과는 다른 점이 많았습니다. 추상화를 잘못 적용해서 여러 메소드가 중복된다던지, 단일 책임 원칙을 지키지 않아서 여기 저기 수정해야 할 곳이 많아진다던지 하는 문제점들이 발생하였고 이를 해결하는데 가장 많은 시간을 쏟을 수 밖에 없었습니다.

그래도 이러한 문제들을 완벽히 해결하지는 못했더라도 여러 가지 시도를 하면서 조금이라도 지금까지 잘 쓰지 않았던 객체지향에 익숙해지는 좋은 계기가 되었다고 생각합니다. 

<br>

# Summary

마지막으로 처음부터 끝까지 모든 것을 혼자서 진행하다보니 프로젝트를 진행하면서 막막함을 많이 느꼈습니다. 물론 혼자서 함으로써 배운 부분도 많습니다. 그러나 만약 다른 사람들과 상의하거나 토론하면서 진행 했다면 좀더 나은 퀄리티의 코드를 쓸 수 있었을지 않을까 아쉽기도 하였습니다. 

그러나 좋은 팀플레이를 위해서는 개개인의 퍼포먼스가 뒷받침 되어야 한다고 생각합니다. 이번 프로젝트가 저에게는 레벨 업 할 수 있는 좋은 기회였다고 생각합니다.

<br>

