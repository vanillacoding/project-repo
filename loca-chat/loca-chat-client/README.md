## LocaChat

익명의 사용자들끼리 현재 위치를 기반으로 채팅을 할 수 있는 모바일 앱입니다.

![img](https://user-images.githubusercontent.com/47530702/79829198-67296a80-83dd-11ea-842c-15c19d36f98c.png)


## Requirements

LocaChat은 안드로이드 기기에서 사용 할 수 있습니다.

## Installation

### Client

```
git clone https://gitlab.com/th05662205/loca-chat-client
cd piccle-web
npm install
expo start
```

### Server

```
git clone https://gitlab.com/th05662205/loca-chat-server
cd piccle-server
npm install
npm start
```

## Features

- 사용자는 익명으로 앱을 시작 할 수 있습니다.
- 시작하기 버튼을 터치하면 구글맵에 현재 자신의 위치와 자신의 위치를 기준으로 반경 100m 이내에 있는 채팅방이 보입니다.
- 사용자가 움직이면 실시간으로 바뀐 위치의 채팅방을 보여줍니다.
- 자신의 위치에 채팅방을 만들 수 있습니다.
- 사용자는 채팅방에서 텍스트와 이미지를 실시간으로 주고 받을 수 있습니다.
- 모든 채팅방과 채팅내역은 데이터베이스에 저장되기 때문에 언제든지 다시 볼수 있습니다.

## Tech Stack

### Client

- 자바스크립트 ES2015+
- React native
- Expo
- Google Map API
- Redux

### Server

- 자바스크립트 ES2015+
- Node express
- MongoDB
- Mongo Atlas
- Socket
- AWS S3

## Deployment

### Client

Google playstore

### Server

AWS elastic beanstalk

## Challenges

가장 고민했던 부분은 100m 이내에 있는 채팅방을 어떻게 가져올 것인지에 대한 방법이었습니다. 이부부은 사실 처음에는 클라이언트에서 요청을 보내면 서버에서 모든 채팅방을 하나하나 거리를 계산해서 클라이언트로 보내주는 방법으로 구현했는데, 다시 생각해보니 채팅방이 아주 많아질 경우에 이런 방법은 서버에 많은 부담을 가져올 것 같다는 생각이 들었습니다.

그래서 채팅방을 그냥 데이터베이스에 저장하지 않고 채팅방의 위치 정보를 바탕으로 시 혹은 도 별로 묶어서 데이터베이스에 저장하는 방식으로 구현하면 서버는 모든 채팅방을 조회할 필요가 없기 때문에 더 효율적으로 요청을 처리할 수 있다고 생각했습니다.

하지만 처음 리액트 네이티브를 사용해봐서 그런지 간단하게 될 것 같았던 기능조차 많은 시간이 걸렸고 결국 생각했던 방식으로 다시 구현하지 못했습니다. 이 부분이 아쉽게 느껴집니다.

## Things To Do

- 채팅방을 효율적으로 가져올 수 있도록 서버 로직 재작성
- 채팅방 삭제 기능 추가
- 채팅방 무한 스크롤 기능 추가
- 마커에 현재 채팅방에있는 사람의 수 표시

## Sincere Thanks

[Ken Huh](https://github.com/Ken123777) / Vanilla Coding
