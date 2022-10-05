👉 Frontend: https://github.com/DnD-Land/dnd-land-client  
👉 Backend: https://github.com/DnD-Land/dnd-land-server

# ⭐️ Features

- 슈팅게임, 퍼즐게임, 연결짓기 게임으로 구성되어 있습니다.
- 각 게임은 모두 드래그 앤 드랍을 통해 진행됩니다.
- 각 게임을 플레이 하는 방법을 애니메이션을 통해 안내합니다.
- 각 게임에서 별을 다 모을 경우, 다음 스테이지로 넘어갈 수 있습니다.
- Progressive Web App을 지원하여, 기기에 프로그램을 다운로드 할 수 있습니다.

<br>

## 🎬 Getting Started

Local 환경에서 실행시 아래와 같이 준비가 필요합니다.

<details>
  <summary>Client</summary>

```
REACT_APP_SERVER_URL=<default: http://localhost:8080>

REACT_APP_API_KEY=<Firebase API Key>
REACT_APP_AUTH_DOMAIN=<Firebase Auth Domain>
REACT_APP_PROJECT_ID=<Firebase Project ID>
REACT_APP_APP_ID=<Firebase App ID>
```

</details>

<details>
  <summary>Server</summary>

```
ORIGIN_URI_PROD=<default: http://localhost:3000>

JWT_SECRET=<jwt secret key>
MONGODB_URL=<mongodb url>
MONGODB_NAME=<db name>
```

</details>

<br>

## 🖥 Tech Stacks

### Client

- Typescript
- React
- Styled-Component
- Phaser3
- PWA

### Server

- Node JS
- MongoDB
- Express

<br>

## 🤝 이렇게 개발했습니다

### 객체지향 구조의 설계

게임 프로젝트를 진행했기 때문에, 여러 객체간 상호작용을 직관적이고 간결하게 나타내기 위해 많은 고민을 했습니다. 이론적으로는 공부해 보았지만, 주도적으로 객체지향 구조를 설계해본 것은 처음이었기 때문입니다.

- 첫 번째 슈팅 게임에서 "대포", "대포의 미사일", "미사일 Preview" 등을 다른 객체로 분리하여 객체의 책임을 분산하도록 하여 단일 책임 원칙을 지켜보려고 했습니다.

- 카드의 기본 속성을 정의해두고, 다음과 같이 다형성을 갖도록 구현해보았습니다.

  1. 드래그가 가능한 카드
  2. 포인트 객체를 자식으로 갖고 있는 카드

- 다만, 현재는 각 인스턴스가 사용하지 않는 기능까지도 전부 상속받고 있는 비효율적인 구조를 갖고 있다고 생각합니다. Interface나 Abstract Class를 통해 각 카드의 상세 사항을 구현했다면 더욱 효율적인 구조를 가질 수 있었을 것이라는 아쉬움이 남습니다.

## Things to do

- Precache 기능 도입, 오프라인에서 실행되도록 구현
- Webp 등 최적화 과정을 도입하여 Lighthouse 퍼포먼스 수치 향상
