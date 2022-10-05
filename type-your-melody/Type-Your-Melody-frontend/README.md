## Type Your Melody!

## Period
from 2018.07.24 ~ 2018.08.03

## Introduction

'Type Your Melody'는 키보드로 다양한 악기의 소리로 음악을 연주할 수 있는 웹 애플리케이션입니다. 피아노, 오르간, edm, 어쿠스틱 기타의 소리로 자유롭게 음악을 연주할 수 있습니다. 그리고 짧은 곡은 악보를 그릴 수 있습니다.



## Requirements

- Firebase Authentication에서 제공하는 Google Login을 사용했습니다.
- 로그인 없이 연주 및 악보 그리기 기능을 사용할 수 있습니다.
- 악보를 pdf로 저장하거나 공유하기 위해서는 로그인이 선행되어야 합니다.
- PC 웹, Chrome Browser를 권장합니다. (모바일에서는 작동이 느릴 수 있습니다.)


## Development Environment

- Client : React.js
- Server : Node.js (express)
- etc : Firebase (Google Auth, Storage)
- [Type Your Melody 바로가기](https://typeyourmelody.netlify.com/)
- 2018.08.05 기준 Netlify, AWS로 배포상태 


## Installation

**Client**

```
git clone https://github.com/syaring/Type-Your-Melody-frontend
npm install
npm start
```

**Server**

- AWS 배포 상태로 별도의 설치 없이 사용할 수 있습니다
- 로컬에서 서버를 구동할 경우

```
git clone https://github.com/syaring/Type-Your-Melody-backend
npm install
npm start
```

- 설치 후 client 폴더의 src/Components/PianoKeyboard/PianoKeyboard.js 수정  
  (328 주석 해제, 330 주석)


## API

- [VexFlow](http://www.vexflow.com/)  
  An open-source online music notation rendering API.
- [Audiosynth](https://github.com/keithwhor/audiosynth)  
  Dynamic waveform audio synthesizer, written in Javascript.
