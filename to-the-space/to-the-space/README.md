
# 🚀 TO THE SPACE 🚀

[![Netlify Status](https://api.netlify.com/api/v1/badges/3216b7c6-d5d6-4acd-bf0f-3ea1555228b0/deploy-status)](https://app.netlify.com/sites/nostalgic-poincare-9c2731/deploys)

[To The Space](https://www.to-the-space.space/) 는 장애물을 피해 로켓을 최대한 높이 발사하는 3D 웹 게임입니다.

<br>
<br>


![preview](/assets/preview.gif)

<br>

# 𝌞 Table of Contents
- [🧑‍🚀 Motivation](#-motivation)
- [🔗 Link](#-link)
- [🕹 How to play](#-how-to-play)
- [🗓 Planning](#-planning)
- [⚙️ Tech Stack](#️-tech-stack)
- [📝 Log](#-log)
- [📚 Summary](#-summary)

<br>

# 🧑‍🚀 Motivation

### Why 3D Game?
이전부터 3D 기술을 사용하여 생동감과 입체감을 표현할 수 있는 웹 서비스를 만들고 싶다고 생각하였습니다. 최근 크게 관심을 받는 SpaceX 우주 로켓 발사에서 모티브를 얻어 관련 주제로 여러 사람이 즐길 수 있는 게임을 만들면 재미있을 거 같다고 생각하여 To The Space 프로젝트를 기획하게 되었습니다.

### Why Vanilla JS?
초기에는 React의 사용도 고려했었지만, 이번 프로젝트를 기획하면서 React를 이용했을 때 가질 수 있는 장점인 재사용 가능한 컴포넌트 혹은 가상 DOM을 이용한 빠른 렌더링을 많이 활용되지 않을 것이라고 판단하였습니다. 또한, 이전부터 UI 프레임워크나 라이브러리 없이 Vanilla JS만을 사용하여 프로젝트를 만들어 보고 싶었기에 Javascript에 가장 기초가 되는 Vanilla JS를 이용하여 기초적인 지식을 다시 한번 학습하면 좋을 거 같다고 생각했습니다. 실제로 이전에 사용했었던 프레임워크나 라이브러리들에 대한 장단점도 좀 더 명확하게 알 수 있는 경험이 될 것으로 생각하였는데 Vanilla JS를 이용하면서 prototype, closure, this 등 많은 개념에 대해 다시 한번 공부할 수 있었던 기회를 가질 수 있어 좋았습니다.

### Why Three JS?
3D를 브라우저에 렌더링하고 구동되게 하려면 Javascript API인 webGL만 이용해서 코드를 작성할 수 있었지만, Scene, 광원, 그림자, 물체 등을 이용한 3차원 세계를 구현하려면 많은 양을 코드를 작성해야 했고 코드가 매우 복잡해지기 쉬우므로 유지보수가 어렵다는 점에서 webGL을 사용하는 Three JS를 이용하여 3D 요소들을 보다 직관적으로 처리할 수 있도록 하였습니다.

<br>

# 🔗 Link

### Deploy Site
👉 https://to-the-space.space

### Github Repository
👉 https://github.com/to-the-space/to-the-space

<br>

# 🕹 How to play

- 5초 동안 스페이스 바를 이용해 로켓 발사 에너지를 모을 수 있습니다.
- 키보드 방향키를 이용하여 운석 장애물을 피하고 금을 획득할 수 있습니다.
- 운석에 닿게 되면 속도가 줄어듭니다.
- 금을 획득하면 속도가 증가합니다.
- 게임이 끝나면 10위 안에 든 플레이어들의 기록을 확인할 수 있습니다.

<br>

# 🗓 Planning

### 1 주차 09.27 - 10.03
  - 아이디어 기획 & 목업
  - 기술 스택 학습 (Three JS & Cannon JS)

### 2주차 10.04 - 10.10
  - Webpack 기본 설정 (entry, output, plugin, module)
  - Assets(3D Model, texture) 수집
  - 개발 진행

### 3주차 10.11 - 10.15
  - Netlify 배포
  - README 작성
  - 테스트 코드 작성
  - 코드 refactoring

  <br>

  # ⚙️ Tech Stack

  - Vanilla JS + Webpack
  - Three JS
  - Cannon JS
  - MobX
  - SCSS
  - Firebase Database

<br>

# 📝 Log

### Object Orient Programming (OOP)

그동안 React Hooks를 이용한 함수형 프로그래밍 방식에 익숙해져 있었고 이론적으로는 공부했었지만, 프로젝트에 실제로 OOP를 이해하고 적용해본 적은 처음이라 직접 OOP 방식을 프로젝트에 적용하는 데 까다로웠습니다. 해당 Challenge를 해결하기 위해 OOP 방식에서 중요한 두 가지 개념에 대해 프로젝트에 적용하려고 노력하였습니다. 첫 번째로는 추상화를 위해 객체를 구현하면서 메소드의 기능을 보편적으로 사용할 수 있도록 최소한의 정보를 담은 함수명을 작성하기 위해 노력하였습니다. 두 번째로, 캡슐화가 필요한 변수나 메소드의 예상치 못한 변화를 방지하기 위해서 Factory function을 이용한 util 함수에서는 `Object.freeze`를 이용하였고, class 문법을 이용한 대부분 함수에서는 private field를 적용하여 값의 일관성을 유지하였습니다.

<details>
  <summary>예시 코드</summary>

```js
class Model {
  #defaultMaterial = new CANNON.Material("default");

  constructor(model, scene, physicsWorld) {
    this.model = model;
    this.scene = scene;
    this.physicsWorld = physicsWorld;
  }

  setScale(size) {
    this.model.scale.set(size, size, size);
  }

  setPosition(x, y, z) {
    this.model.position.set(x, y, z);
  }

  setRotation(x, y, z) {
    this.model.rotation.set(x, y, z);
  }

  createPhysicsBox(width, height, depth) {
    const boxShape = new CANNON.Box(new CANNON.Vec3(width, height, depth));

    this.boxBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 0, 0),
      shape: boxShape,
      material: this.#defaultMaterial,
    });

    this.boxBody.position.copy(this.model.position);
    this.boxBody.quaternion.copy(this.model.quaternion);
    this.physicsWorld.addBody(this.boxBody);
  }

  addToScene() {
    this.scene.add(this.model);
  }

  removeFromScene() {
    this.scene.remove(this.model);
  }
}
```

</details>

<br>

### 반응형 웹 디자인 (RWD)

어떤 환경에서든 게임이 구동될 수 있도록 반응형 웹 디자인을 도입하였습니다. 기본적으로 `canvas` 요소는 300 * 150픽셀이지만 CSS 전체 요소의 `margin`과 `padding`을 0으로 두고 `body` 요소의 높이와 너비를 100%로 주어 `canvas`가 화면 전체를 차지할 수 있도록 하였습니다. 다만, 이렇게 `canvas`가 화면 전체를 차지하게 되면 3D 객체들이 렌더링 된 화면에 따라 늘어나거나 줄어드는 현상이 있었고, 저화질로 인해 객체들이 깨지거나 흐려지는 현상이 발견되었습니다. 이 문제를 해결하기 위해 창이 변화할 때마다 Camera aspect(비율) 속성을 `canvas` 화면에 맞춰주고 `renderer.setSize` 와 `renderer.setPixelRatio` 두 메소드를 이용하여 해상도를 맞춰주는 작업을 하였습니다. 또한, PC 화면에서는 키보드를 조작하여 로켓 3D 객체를 조작할 수 있도록 "keydown" 과 "keyup" 이벤트를 사용하였고 모바일 환경에서는 "touchstart" 과 "touchend" 이벤트를 listener에 등록할 수 있도록 분기 처리하였습니다.

<details>
  <summary>해상도 맞춤 예시 코드</summary>

```js
onWindowResize() {
  this.sizes.width = window.innerWidth;
  this.sizes.height = window.innerHeight;

  this.camera.aspect = this.sizes.width / this.sizes.height;
  this.camera.updateProjectionMatrix();

  this.renderer.setSize(this.sizes.width, this.sizes.height);
  this.renderer.setPixelRatio(window.devicePixelRatio);
}
```

</details>

<br>

<details>
  <summary>조작 예시 코드</summary>

```js
const currentDeviceType = detectDevice();

if (currentDeviceType === "desktop") {
  document.addEventListener("keydown", (event) => this.#onKeyDown(event), false);
  document.addEventListener("keyup", (event) => this.#onKeyUp(event), false);
} else {
  const canvas = document.querySelector("canvas.webgl");

  canvas.addEventListener("touchstart", (event) => this.#onTouchStart(event), false);
  canvas.addEventListener("touchend", (event) => this.#onTouchEnd(event), false);
}
```

</details>

<br>

### Flash Of Unstyled Content (FOUC)

처음 웹페이지 로딩 시 1~2초 정도 CSS가 적용되지 않은 html 요소들이 렌더링 되는 현상을 발견하였습니다. 리서치를 해본 결과 scss webpack loader 설정 시 `style-loader`를 사용하면 scss파일의 CSS style을 Javascript 번들에 포함하기 때문에 브라우저가 Javascript를 파싱하기 이전 html에 inline style을 우선 적용하는데 해당 프로젝트에서는 별도의 inline style이 없어 Javascript가 파싱되고 style이 이전에 default style로 우선 렌더링 된다는 사실을 알 수 있었습니다. 이 문제를 해결하기 위해 `MiniCssExtractPlugin`을 사용하여 SCSS파일을 별도의 CSS로 추출하였습니다. 이렇게 하여 webpack으로 애플리케이션을 빌드 시 html파일 `<head>` 태그 안에 추출된 stylesheet를 포함했고, 브라우저가 render tree를 화면에 최초 렌더링할 때 의도된 style이 적용된 상태로 렌더링하도록 하여 FOUC 이슈를 해결할 수 있었습니다.

<details>
  <summary>예시 코드</summary>

```js
//before
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};

// after
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          process.env.NODE_ENV !== "production"
           ? "style-loader"
           : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
```

</details>

<br>

# 📚 Summary

처음으로 개인 프로젝트를 진행하면서 많은 압박감과 두려움이 앞섰던 것 같습니다. 실제로 기획 단계에서부터 혼자 결정하고 자료를 찾아봐야 하는 부분에서 많은 어려움을 느꼈습니다. 새로운 기술을 습득하는 부분에서도 피드백을 받지 못하고 스스로 문제를 해결해야 했었는데 이전에 팀 프로젝트를 했었던 때 보다 많은 시간이 걸렸습니다.

시간은 오래 걸렸지만 직접 자료를 찾아보고 여러 가지 시도를 해보는 과정에서 여러 가지 지식을 습득할 수 있었고 고통스러웠지만 좋은 학습의 기회가 되었던 것 같습니다. 다른 사람에서 질문하여 쉽게 정답을 찾을 때보다 직접 정답을 찾아가는 과정에서 어렵게만 느껴졌던 새로운 지식 습득에 자신감을 얻을 수 있었습니다.
