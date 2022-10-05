# **Texpeech**

# Introduction

**Texpeech**는 음성 또는 텍스트로만 소통가능한 상황의 사용자를 소통 가능하게 해주는 메신저 앱입니다.

<img src="http://t1.daumcdn.net/brunch/service/user/1aNR/image/5OR_bkXXvktMzk1_OaRzw0r1i6A.png" width="30%" height="30%"></img>
<img src="http://t1.daumcdn.net/brunch/service/user/1aNR/image/ehuuMonh83hYf_529Vlz7CbZ1FE.png" width="30%" height="30%"></img>
<img src="https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/1aNR/image/H5aex5MXVbB3eXBWYj3PSETZHvQ.png" width="30%" height="30%"></img>


## Requirements


- React Native iOS App
- Firebase realtime Database 사용
- TTS(Text To Speech), STT(Speech To Text) API 사용
- react-native-firebase, react-native-sound, react-native-speech-to-text-ios, react-native-tts, react-native-contacts


## Prerequisites

Xcode 설치 및 환경구성
npm 설치 및 Xcode와 연결
react-native 설치 & react-native api 설치 및 연결

## Installation

### Client
```
git clone https://github.com/redant23/TexpeechIos
cd TexpeechIos
react-native run-ios

```

## Features

- email, name, phonenumber을 가져와 로그인 구현
- 실시간 Chat
- 음성으로 메시지를 전송하고 상대방은 텍스트로 확인 가능
- 음성모드일 경우 상대방의 메시지 및 접속정보를 음성으로 확인 가능
- 사용자의 폰 주소록 데이터 수집


## Client-Side

- React Native 로 구현
- React Native Firebase를 활용하여 DB 서버구축


## Project Control

- Git을 활용하여 기능 및 보완이 될 때마다 커밋하여 관리
- Trello 스케쥴 관리 및 Task 정리


## Things to do

추운 겨울 길에서 카톡하려니 손이 너무 시려운데 대화상대는 전화를 못하는 상황, 
'음성과 텍스트를 자유롭게 변환할 수 있는 메신저가 있다면 어떨까?'라는 생각으로 시작된 Texpeech Project.
리액트 네이티브를 기반으로 혼자서 2주간 진행하였습니다.

3일가량을 안드로이드로 진행하다가 환경세팅이 너무 힘들어 iOS로 변경해서 계속 진행하였습니다.
배우지 않은 부분에 대해서 막힐 때, 구글링으로 결과를 찾지 못했을 때, 수도 없이 포기하고 싶었으나 
처음 음성인식이 되어 콘솔창에 메시지가 출력 되었을 때의 기분이 너무 좋아 계속 진행했습니다.

아직은 얼추 시현 정도만 가능하지만 틈틈이 보완하여 꼭 출시할 계획입니다.
UX적으로나 개발적으로 부족함이 많지만 잘 다듬으면 사람들이 한번쯤은 써보지 않을까 싶네요.


Special thanks to [Ken Huh](https://github.com/Ken123777)
