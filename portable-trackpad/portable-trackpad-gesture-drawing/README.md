# Portable TrackPad

항상 들고 다니는 스마트폰을 매직 트랙패드처럼 사용할 수 있다면 어떨까? 에서 출발한 프로젝트
**Portable TrackPad**입니다. 

사용자는 Portable TrackPad를 이용해 스마트폰을 트랙패드처럼 사용할 수 있으며, 제스처를 사용해 볼륨 조절과 탭 넘기기 같은 기능을 사용할 수 있습니다. 또한 Gesture Drawing 웹페이지에서 다른 사용자들과 함께 그림을 그리고, 제스처를 이용해 도형을 생성하거나 크기를 조절할 수 있습니다.

> Deploy(Web) : https://gesture-drawing.online

<br>

## 📃 프로젝트 구조

### Portable TrackPad: 1개의 모바일 애플리케이션과 2개의 서버(Sever, Package)로 구성
- React Native를 통해 커서 조작 데이터를 Socket으로 보낼 모바일 애플리케이션
- 모바일 애플리케이션과 트랙패드 움직임 데이터를 Socket으로 받을 Node.js Package
- 사용자 정보 등 다양한 DB 정보에 접근할 수 있는 Node.js Express Server

### Gesture Drawing: 1개의 웹 애플리케이션과 Socket 통신을 담당하는 1개의 서버 (Package)로 구성
- React를 통해 드로잉 기능을 구현한 웹 애플리케이션
- 웹 애플리케이션에서 전달해준 데이터를 Socket으로 사용자들에게 전달하는 Package

<br/>

## 🗄 레포지토리 링크

- [Frontend(Mobile)](https://github.com/Team-Saisiot/portable-trackpad-client)
- [Frontend(Web)](https://github.com/Team-Saisiot/portable-trackpad-gesture-drawing)
- [Backend](https://github.com/Team-Saisiot/portable-trackpad-server)
- [Package](https://github.com/Team-Saisiot/portable-trackpad-package)

<br/>

## ⚙️ 셋업 설명
<details>
  <summary>Frontend(Mobile)</summary>

1. [해당 Repository](https://github.com/Team-Saisiot/portable-trackpad-client)를 git clone을 한다.
2. 환경변수 파일(.env)을 생성하고 아래와 같은 형식으로 입력한다.
    
    ```jsx
    SERVER_PORT=SERVER_PORT
    PACKAGE_SERVER_PORT=PACKAGE_SERVER_PORT
    EXPO_CLIENT_ID=EXPO_CLIENT_ID
    EXPO_WEB_CLIENT_ID=EXPO_WEB_CLIENT_ID
    ```
    
3. 해당 프로젝트 폴더 내에서 아래의 명령어를 실행한다.
    
    ```jsx
    $ npm install
    $ npm start
    ```
    
4. Android의 경우 PlayStore에서 `Expo`를, IOS의 경우 AppStore에서 `Expo Go`를 다운로드 받는다.
5. 해당 Expo어플리케이션에서 QR코드인식 모드를 켠다.
6. 프로젝트에서 표시된 QR코드를 스캔한다.

</details>
<details>
  <summary>Frontend(Web)</summary>

1. [해당 Repository](https://github.com/Team-Saisiot/portable-trackpad-gesture-drawing)를 git clone을 한다.
2. 환경변수 파일(.env)을 생성하고 아래와 같은 형식으로 입력한다.
    
    ```jsx
    REACT_APP_SERVER_IPADDRESS=REACT_APP_SERVER_IPADDRESS
    REACT_APP_SERVER_PORT=REACT_APP_SERVER_PORT
    REACT_APP_PACKAGE_IPADDRESS=REACT_APP_PACKAGE_IPADDRESS
    REACT_APP_PACKAGE_PORT=REACT_APP_PACKAGE_PORT
    ```
    
3. 해당 프로젝트 폴더 내에서 아래의 명령어를 실행한다.
    
    ```jsx
    $ npm install
    $ npm start
    ```
</details>

<details>
  <summary>Backend</summary>
  
1. [해당 Repository](https://github.com/Team-Saisiot/portable-trackpad-client)를 git clone을 한다.
2. 환경변수 파일(.env)을 생성하고 아래와 같은 형식으로 입력한다.
    
    ```jsx
    PORT=PORT
    MONGODB_URL=MONGODB_URL
    CLIENT_PORT=CLIENT_PORT
    EXPO_CLIENT_ID=EXPO_CLIENT_ID
    MAILS_EMAIL=MAILS_EMAIL
    MAILS_PWD=MAILS_PWD
    ```
    
3. 해당 프로젝트 폴더 내에서 아래의 명령어를 실행한다.
    
    ```jsx
    $ npm install
    $ npm run dev
    ```

</details>  

<details>
  <summary>Package</summary>
  
1. [해당 Repository](https://github.com/Team-Saisiot/portable-trackpad-client)를 git clone을 한다.
2. 해당 프로젝트 폴더 내에서 아래의 명령어를 실행한다.
    
    ```jsx
    $ npm install
    $ npm run dev
    ```
</details>
<br/>    

## 🎥 기능 시연 영상

## Portable TrackPad
<details>
  <summary>커서 이동</summary>
  
https://user-images.githubusercontent.com/99075014/199181600-7b149691-fb0b-460c-8f07-c063db5a33c2.mov

</details>

<details>
  <summary>드래그</summary>
  
https://user-images.githubusercontent.com/99075014/199181649-86f67156-5f5b-4e0a-a0d1-933c6a4897ba.mov

</details>

<details>
  <summary>스크롤</summary>
  
https://user-images.githubusercontent.com/99075014/199181705-899ffa28-e478-438a-9096-a708e072c7b8.mov

</details>

<details>
  <summary>브라우저 앞으로, 뒤로가기</summary>
  
https://user-images.githubusercontent.com/99075014/199185416-abc538cb-1249-4700-8bf6-a9d4030b0a2d.mov

</details>


<details>
  <summary>브라우저 탭 앞으로, 뒤로가기</summary>
  
https://user-images.githubusercontent.com/99075014/199185470-f21f706c-702b-423b-b4c7-a1cf1c38cb6e.mov

</details>

<details>
  <summary>볼륨 업, 다운</summary>
  
https://user-images.githubusercontent.com/99075014/199185310-74e5a7b0-864d-443e-9e12-bcbc2db78b96.mov

</details>

<details>
  <summary>제스처 생성 기능</summary>
  
https://user-images.githubusercontent.com/99075014/199181948-ce32368d-2462-41c2-b2ac-26aae2555eee.mov

</details>

<details>
  <summary>제스처 편집 기능</summary>
  
https://user-images.githubusercontent.com/99075014/199185540-a9fb2cbd-2cb8-4c9c-b312-698b54467a5b.mov

</details>
<br/>

## Gesture Drawing

<details>
  <summary>제스처로 도형 생성 기능 (With Portable TrackPad)</summary>
  
https://user-images.githubusercontent.com/99075014/199187026-83c794cf-bc4b-43b3-a888-023e199bf092.mov

</details>

<details>
  <summary>제스처로 도형 크기 조절 기능 (With Portable TrackPad)</summary>
  
https://user-images.githubusercontent.com/99075014/199187110-2d024476-e1a5-4123-9684-38f4f7722f5f.mov

</details>

<details>
  <summary>Drawing 공유기능</summary>
  

https://user-images.githubusercontent.com/99075014/200184662-a9e3de36-d7c5-4aba-8cd0-9e1e74a6a1ff.mov


</details>

<details>
  <summary>Figure 공유기능</summary>

https://user-images.githubusercontent.com/99075014/200184705-4d16848c-9edb-41f1-a567-2fc92efd7189.mov

</details>

<details>
  <summary>사용자간 공유되는 Undo, Redo</summary>

https://user-images.githubusercontent.com/99075014/200184725-27b0084b-0bdf-4d0a-ba63-d516cb1cfaa3.mov

</details>

<br/>

## 🛠 기술 스택

## Frontend(web + mobile)
- React
- React Native
- React Native Gesture handler
- Redux-Toolkit
- Socket io(Client)
- Canvas

## Backend(package + server)
- Node.js
- Express
- Google Oauth
- MongoDB
- Socket io(server)
- Robot.js

<br/>

## 🗓 프로젝트 기간

**2022년 10월 10일 ~ 10월 29일**

- 10월 10일 ~ 10월 13일 : 아이디어 기획, 기술 검증 및 구현 방법 리서치, 목업 작성, 칸반 작성
- 10월 14일 ~ 10월 29일 : 개발 진행, 배포, 테스트 작성
- 10월 21일 ~ 10월 29일 : 추가 프로젝트(Gesture Drawing)기획 및 개발 진행

<br/>

## 💡 핵심 구현 사항
  
## 1. 레이턴시 개선
### [충분히 빠른 레이턴시 확보의 필요성]

본 프로젝트에서 가장 핵심 기능은 Socket을 통한 PC와 모바일간의 데이터 통신이다. 
우리가 이 부분을 구현하면서 가장 고심했던 부분은 얼마나 Socket통신을 원활한 상태로 유지할 수 있을까? 였다. 

사용자가 터치패드를 사용하면서 가장 크게 체감되는 불편함은 PC와 터치 동작간의 입출력 시간의 딜레이. 즉, `충분히 빠르지 못한 레이턴시`이다. 

터치패드는 연속된 동작을 인식해야하는 입력기기이기 때문에 레이턴시에 민감하다. 만약 20ms의 아주 짧은 딜레이가 생기더라도 그것을 사용하게될 사용자의 입장에서는 상당히 크게 느껴진다. 

때문에 `사용자가 불편함을 느끼지 않을만큼 충분히 빠른 레이턴시를 확보`하는것이 중요했다. 


### [Socket 통신의 흐름 파악]
Socket통신 흐름을 통해 어느 구간에서 딜레이가 생길지를 파악해보았다.

1. `터치 인식` : 사용자가 모바일 디바이스 스크린에 터치를 한다.
2. `터치 이벤트 감지` : 해당 터치에 해당하는 이벤트를 감지한다.
3. `실행 기능 변환` : 해당 이벤트를 Robot.js가 실행해야할 기능으로 변환한다.
4. `Socket 전송`: 해당 기능에 대한 데이터를 Socket을 통해 Package로 전송한다.
5. `해당 기능 실행`: Socket을 통해 전달받은 데이터를 기반으로 PC가 동작한다.

<details>
  <summary>위의 딜레이 구간에서의 레이턴시 개선 조치 사항</summary>

### `1. 터치 인식`

***조치 사항: PWA에서 React Native로 전환***

 프로젝트 기획 초기에는 PWA를 활용하여 개발을 진행하려했다. 하지만 PWA는 엄밀히 말해서 Native한 모바일 어플리케이션이 아니고 단지 웹을 앱처럼 보이게 해줄 뿐이다.  
 하지만 React Native를 통해 개발하면 보다 Native한 터치를 구현할 수 있을것이라 판단하였다. 때문에 모바일 디바이스가 터치를 인식함에 있어서 보다 정밀하고 빠른 인식을 위해 React Native를 선택하였다.

### `2. 터치 이벤트 감지`

***조치 사항: React Native Gesture Handler***

 React Native에서 제공하는 내장 터치 매서드는 Javascript 스레드에서 실행되기 때문에 네이티브 스레드에서의 실행보다 성능이 떨어진다. 제스쳐 이벤트가 수행될 때마다 React Native 브리지를 통해 인터페이스로 데이터를 전송하여 성능이 저하될 수 있기 때문이다.

하지만 React Native Gesture handler를 사용하면 네이티브 스레드에서 실행되고 플랫폼별 동작을 따르기 때문에 React Navtive에서 고성능 제스처를 구현할 수 있어 성능이 보다 향상된다.

즉, 터치 이벤트를 감지하는 연산에서의 시간을 줄임으로써 딜레이를 줄였다


### `3. 실행 기능 변환`

***조치 사항: 없음***

 해당 구간은 단지 터치 이벤트가 실행되었을때 해당 기능을 나타내는 문자열, 좌표값을 반환하는 코드만으로 이루어져있다. 때문에 딜레이에 큰 지장을 주지않을것이라 판단하여 별다른 조치를 취하지 않았다.

### `4. Socket 전송`

***조치 사항: 전달하는 데이터의 간소화***

 사실 이 과정에서 딜레이에 영향을 주는건 `네트워크의 속도`였다.
하지만 사용자의 네트워크의 속도는 개발자의 입장에서는 컨트롤하기 어렵다. 때문에 다른 부분에서 조치를 취해야했다.

 React Native개발 초기에 사용자가 입력한 메세지를 Socket통신하는 테스트를 진행하였다.
해당 테스트에서 사용자가 입력한 메세지가 길어질때마다 미세하게 딜레이가 늘어나는것을 확인하였다.
이전에는 단순히 String만 전송하는것이기에 속도에 크게 상관없을것이라 생각했었다.
하지만 실제로 수많은 데이터를 오고가며 통신할때는 그 미세한 용량차이가 딜레이를 좌우함을 깨달았다..

위의 테스트를 통해 Socket을 통해 전달하는 데이터는 정말 최소한의 데이터로 간략화 시키는것이 중요하다고 판단하였다.

즉, Socket을 통해 전달하는 데이터는 `[”기능”, x좌표, y좌표]`라는 아주 단순한 정보만을 담도록 코드를 제작하였다.


### `5. 해당 기능 실행`

조치 사항: if문이 아닌 switch문 사용

 해당 구간에서는 Socket을 통해 받은 데이터를 분류하여 실행한다.
기존에는 if else를 사용하여 데이터를 분류하려했다. 하지만 switch case가 단순 분류에서는 더욱 나은 성능을 보인다는 [자료](http://www.blackwasp.co.uk/SpeedTestIfElseSwitch.aspx)를 보게되었다. 때문에 if else가 아닌 switch case를 사용하기로 결정하였다.

</details>
<br>

## 2. Socket을 통한 Undo, Redo 동기화
  
<details>
<summary>[Local 환경에서의 Undo, Redo 구현]</summary>

단순히 자신의 그리기 기록을 Undo, Redo를 하는것은 구현에 큰 어려움이 없을것으로 판단하였다. 
기본적으로 개체들의 정보가 담긴 `Objects`를 활용하여 Local환경에서의 Undo, Redo를 구현해보았다.

1. 사용자가 개체를 생성, 조작하면 해당하는 동작수행 후 그 사용자의 Objects를 `UndoStore`배열에 추가한다.
2. 사용자가 `Undo`를 실행하면 `UndoStore`에 저장된 Objects중 가장 최근것을 가져와 사용자의 Objects에 덮어씌운다. 덮어씌워지기 전의 Objects는 `RedoStore`에 저장한다.
3. 덮어씌워진 Objects에 맞게 렌더링(Visualizer)한다. 
4. 사용자가 `Redo`를 실행하면 `RedoStore`에 저장된 Objects중 가장 최근것을 가져와 사용자의 Objects에 덮어씌운다.
</details>

<details>
<summary>[Socket 통신 환경에서의 Undo, Redo 구현]</summary>

자신의 Undo, Redo를 다른 사람들과 공유하여 서로의 History가 동기화되도록 구현하기 위해서는 고려해야할 사항이 많았다. 
사용자들간의 Undo, Redo가 복합적으로 작용하는 상황을 매끄럽게 구현하기 위해서는 각 사용자들이 어떠한 방식으로 Undo, Redo를 전달받을것인가를 고민해보아야했다.

1. 사용자들은 개체를 생성, 조작, Undo, Redo를하면 해당하는 동작수행 후 
그 사용자의 Objects를 `UndoStore`배열에 추가한다.
2. `자신의 Objects`, `UndoStore`, `RedoStore`를 Socket을 통해 `Server`에 보내준다.
3. Server는 받은 데이터를 다시 모든 사용자들에게 `broadcast`해준다.
4. 해당 데이터를 다른 사용자가 받게되면 해당 데이터에 맞게 자신의 Objects, UndoStore, RedoStore를 덮어씌운다.
5. 덮어씌워진 Objects에 맞게 렌더링(Visualizer)한다.
</details>

<details>
<summary>[얕은 복사 이슈]</summary>

위의 로직대로 코드를 작성하였지만 Socket통신을 하는 과정에서 데이터가 제대로 전달되지 않는 문제가 발생하였다.

분명 Socket을 통해 Server로 데이터를 전송할때는 제대로된 데이터였지만, Server에서 받은 데이터는 빈 배열 또는 서로 꼬여진 데이터였다.

문제의 원인은 Server로 전달할 데이터를 담는 과정에서 스프레드 연산자를 통한 얕은 복사였고, 해당 문제를 해결하기위해 lodash의 deepClone을 사용하였다.

그 결과 서로의 Undo, Redo, Objects들이 정상적으로 전송되었다.
</details>
<br>

## 3. 제스처 추가 로직

### [로직의 모티브]
 Portable TrackPad가 가지는 장점중 하나는 사용자가 자신만의 제스처를 만들어서 사용할 수 있다는 것이다. 
기존에 제스처와 크게 겹치지 않는다면 자신이 원하는 동작을 원하는 기능에 할당할 수 있다. 
사용자에게 보다 나은 사용자 경험을 제공한다는 우리팀의 목표에 부합하는 기능이었다.

 하지만 이러한 기능 구현하기 위한 로직이 쉽게 떠오르지 않았다. 사용자가 원을 그릴 수 도, 네모를 그릴 수 도 있으며, 심지어 별을 그릴 수 있는데 그 많은 경우를 어떻게 계산할것인가?하는 문제에 봉착했다. 사용자가 어떠한 제스처를 그리던 그 정보를 저장하고 다시 그렸을때 그것과 동일함을 계산할 수 있어야했다. 

 그러던 중 어릴적에 했었던 한붓그리기가 떠올랐다. 여러개의 점을 하나씩 지나가며 결국은 하나의 도형을 만들어내는 놀이인 한붓그리기. 만약 사용자가 제스처를 생성할때 한붓그리기처럼 경로를 나타내는 점을 생성하고, 제스처를 사용할때는 그 경로와 얼마나 유사한지를 알아낸다면? 이러한 모티브를 통해서 로직을 짜게되었다.

### [로직의 구현]
- 사용자는 제스처를 생성할때 그리는 경로를 나타내는 x,y좌표들이 담긴 배열을 DB에 저장한다.
- 그리고 사용자가 해당 제스처를 사용할때는 사용자가 입력한 제스처의 x,y좌표들이 DB에 저장되어있는 x,y좌표들을 얼마나 포함하는가?를 계산한다.
- 만약 일정 기준을 통과하면 제스처 사용, 통과하지 못하면 제스처 사용 실패를 판정한다.
- 이를 그림으로 나타내면 다음과 같다.

    ![제스처 추가 설명](https://user-images.githubusercontent.com/99075014/200192143-4a1cd20e-036d-4061-be64-1180938f891d.png)

</details>
<br>

## 4. 삼각함수
 Portable TrackPad 프로젝트와 Gesture Drawing 프로젝트를 밀접하게 연결하기 위해서 만들었던 기능 중 하나는 Portable TrackPad에서 삼각형, 사각형, 원을 그리면 해당 모양을 인식해서 Gesture Drawing에서 그 모양을 출력해주는 것이었다. 하지만 작업을 시작하면서 사용자가 모양을 그렸을 때 모양을 인식하는 로직을 짜는 것이 생각했던 것보다 어렵다는 것을 깨달았다.

 어떤 방식으로 로직을 구현해야할지 고민하던 중, 사용자가 그리는 그림의 모서리의 개수를 계산해서 어떤 모양을 그리는지 확인하는 방법을 생각했고, 다음과 같은 로직을 짜게 되었다.

- 사용자가 처음 터치한 곳의 x, y 좌표를 시작점과 기준점으로 저장한다.
- 사용자가 그리기 시작하면, 기준점을 중심으로 가상의 사각형을 그려 사용자가 사각형 밖으로 나가는지 체크한다.     
- 사용자가 사각형 밖으로 나가면, 기준점의 좌표와 현재 좌표를 계산한 좌표 changeX, changeY를 구한 뒤 atan2에 좌표값을 넣어 각도를 계산한다. 그리고 각도를 이전 각도와 비교해서 일정 값 이상 차이가 생긴 경우  모서리로 판단하고 count를 올린다.
- 사용자가 터치를 끝냈다면, 시작점의 좌표와 마지막 터치한 곳의 좌표를 비교하여 도형을 완성했는지를 검사하고, 완성하지 못했다면 도형을 생성하지 않고, 완성했다면 모서리 개수에 해당하는 도형을 그려준다.

</details>

<br/>

## 🔮 개별 회고

### 김태섭

<details>
  <summary>한줄평: Team의 의미</summary>
  
  <br>

### 📕 팀 프로젝트를 통해 느낀 점

 코딩을 시작하면서 나는 막연한 꿈 하나를 가졌었다. “내가 원하는 것, 내가 그리는 것, 내가 필요로 하는 것을 내가 직접 만들어낼 수 있으면 좋겠다.” 내 머릿속에만 존재하던 공상들이 실제로 사람들이 사용할 수 있는 유용한 도구로 실체화되는 그 쾌감은 언제나 나의 행동에 큰 동기가 되어주었다. 그래서 나는 항상 무언가를 만들어내는 것에 관심이 있고, 무언가를 보여주는 것에 관심이 많았을지 모른다.

 이번 프로젝트는 그런 꿈을 처음으로 이루었던 순간들이었다. “내가 들고 다니는 스마트폰을 언제 어디서나 트랙패드로 쓸 수 있다면 좋지 않을까?” 코딩을 시작하기 한참 전에 막연하게 생각했던 아이디어는 몇 년이 지나 비로소 내 손으로 품게 되었다. 언제나 무언가를 만들어내고, 구현하는 일상을 살아왔지만, 이번만큼은 느끼는 바가 다른 것 같다. 내가 만든 프로그램이 다른 사람에게는 편리한 도구가 되어주고, 필요한 무언가가 되어줄 수 있다는 게 참 묘한 느낌이다. 아직도 부족하다고 생각하는데도 무언가를 이루었다는 마음이 생기는 것은 아마 우리가 만든 이 프로젝트가 그 자체로 의미를 가지기 때문이라 생각한다.

 나는 팀으로 함께 해나가는 것의 의미는 “혼자였다면 볼 수 없었을 다른 시각”이라고 생각했다. 혼자서 무언가를 해나가게 되면 프로젝트가 진행되어가면서 오로지 나의 시각만이 들어가기 쉽다고 생각했다. 그 때문에 목표까지 가는 길엔 갈등은 없을지라도 결과물의 단점들이 나중에서야 보이게 되곤 한다. 하지만 팀이라면 다르다. 서로 의견을 나누고, 갈등이 생기고, 다시 그 간극이 아물면서 점차 견고해지고 그 과정에서 프로젝트는 점차 퀄리티가 높아져 간다.

 하지만 나는 이번 프로젝트를 하면서 “팀”이라는 의미를 하나 더 알아가는 것 같다. 바로 “서로를 채워준다”라는 의미이다. 이번 프로젝트를 진행하면서 나는 이제껏 무언가를 만들었던 순간 중 가장 힘겨운 시간을 보냈다. 매번 “나는 아직 너무 부족하구나…”, “내가 코딩으로 어떠한 의미를 만들기에는 아직 멀었구나…”라는 생각하게 되었다. 똑같은 코드를 3시간 동안이나 되짚어보기도 하고, 이제껏 만들었던 로직을 다시 갈아엎는 순간도 있었다. 무엇이든 머릿속에 정리한 다음, 그 정리된 내용을 토대로 행동하는 것을 좋아하는 나에게 기존 계획이 엎어지고 다시 새로 시작하는 과정은 나에게 소위 “멘붕”을 선사해주었다. 그래서 나는 더더욱 이 프로젝트를 혼자 하게 되었다면 완성을 할 수 있었을까? 하는 생각이 들었다.

 이러한 멘붕에 과정에서 도와준 것은 바로 팀원들이었다. 나는 “무언가를 구현하기 위해서는 어떤 접근 방법으로 다가가야 할까?”, “내 머릿속에 맴도는 공상을 실체화시키기 위해서는 어떻게 해야 할까” 생각하는 것을 좋아한다. 하지만 이번 프로젝트에서는 나의 이러한 과정들이 하나둘 막혀가기 시작하면서 힘든 순간들이 많았다. 이러한 순간에 팀원들은 그러한 나의 빈 곳을 너무도 잘 채워주었다. 내가 알지 못했던 접근 방식을 공유해주고, 내가 해결하지 못했던 부분을 함께 고민하며 채워나가는 그 과정은 소위 말하는 “서로 힘을 합쳐 이겨낸다”에 정확히 부합하는 의미라 생각했다. 하나의 목표를 달성하기 위해 서로 모든 것을 불태울 각오로 정진하는 그 과정은 이 프로젝트를 하며 얻을 수 있었던 가장 큰 의미가 아닐까 생각한다.

<br>

### 🔥 힘들었던 점

 이번 프로젝트를 진행하면서 가장 구현에 애를 먹었던 부분은 Local IP 탐색 기능이었다. 현재 자신의 스마트폰과 같은 네트워크에 연결되어있는 Local IP들을 어떻게 찾을지 감이 잡히지 않았다. 서버에서 local-devices를 통해 찾으면 될 것이라 생각했지만 서버와 클라이언트가 같은 네트워크에 접속해있는 개발환경에서는 작동할지라도 실제 배포환경에서는 다른 네트워크에 연결되어있기 때문에 불가능함을 깨달았다. 결국 Socket을 통해 IP주소 168.192.0.0부터 168.192.255.255까지 모든 Local IP주소로 GET 요청을 보낸 후 응답이 오는 IP만 가져오는 로직으로 구현해 나갔다. 하지만 클라이언트에서 GET 요청에 실패하여도 응답받을 때까지 2000ms만큼 응답 대기시간을 갖는 이슈가 발생하였다.
 
 이 과정에서 ‘너무나 많은 시간이 지체되는 건 아닐까?’, ‘Kanban이 밀리면 어떡하지?’하는 압박감이 몰려왔다. 하지만 옆에서 팀원들이 격려해주고, 서로의 환경에서 IP 탐색을 테스트, 보완해나가면서 점차 해답을 찾아갔다. 그리고 마침내 Socket 통신을 통해 Socket 응답이 오는 IP주소를 가져오는 로직을 발견하였다. 그 결과 속도는 조금 느릴지라도 안정적으로 Local IP를 탐색하는 기능을 구현할 수 있었다.

<br>

### 🤔 개선할 점

 아쉬운 점이 있다면 Socket 통신에 대한 구조를 더 보완할 수 있지 않았을까 하는 점이다. 우리 프로젝트의 핵심 기술이라고 하면 단연 Socket이라고 할 수 있다. 그 때문에 서버의 과부하는 치명적인 사용성 저해로 이어질 수 있다. Node.js는 그 특성상 Single Thread로 작동하기 때문에 많은 사용자가 발생하면 서버에 무리가 갈 수 있다. 이를 보완하기 위해 Cluster를 도입하면 어땠을까 생각한다. Socket 통신에 Cluster를 적용한 Node.js 멀티 코어 관리를 통해 많은 사용자가 발생하여도 부하 없이 원활하게 수용할 수 있는 탄탄한 구조를 구축할 수 있을 것이다. 많은 요청이 들어오더라도 여러 개의 코어로 분산 처리함으로써 서버의 안정성을 더할 수 있을 것이다. 그리고 이 과정에서 서버가 Single Thread로 처리되는 것과 Multi Thread로 처리되는 것을 직접 구현하며 공부해 볼 수 있을 것이다.

</details>

### 김병석

<details>
  <summary>한줄평: 소통의 팀 프로젝트</summary>
  
처음 진행하는 프로젝트였고, 게다가 팀 프로젝트였기에 시작하기 전부터 많은 걱정을 했었다. 하지만 팀원들과 소통하며 역할을 정하고, 서로가 맡은 일을 진행하면서 누군가 해결하면 함께 기뻐하고, 어려움을 겪으면 함께 고민하면서 어느새 걱정이 즐거움으로 바뀌어 있었다.

프로젝트를 진행하면서 가장 어려웠던 부분은 이전에 써보지 않았던 기술들을 쓰게 되면서 겪는 문제들이었다. React Native를 쓰기 위해 자료를 찾아보다가 Expo를 알게 되었고, Expo를 사용하여 개발하려고 하니 라이브러리 충돌 등의 문제를 겪었다. 그런 어려움을 겪을 때 해결할 수 있었던 건 팀원들과 정했던 업무 방식 덕분이었다. 같은 고민으로 한나절 이상 고민한다면 서로에게 공유하고, 각자 하루에 정했던 업무량을 해결했다면 다른 팀원들이 무엇을 하고 있는지 소통하면서 어려움을 함께 해결하자고 정했던 업무 방식 덕분에, 새로운 기술에 대해서 함께 공부하고 내용을 공유하면서 어려움을 좀 더 쉽게 헤쳐나갈 수 있었다. 무언가 어려움에 부딪힐 때, 혼자서 고민하는 것도 좋지만 다른 사람들과 소통하면서 어려움을 해결하는 과정에서 많은 것을 배울 수 있었던 팀 프로젝트였다.

</details>


### 이상아

<details>
  <summary>한줄평: 같이 하면 못할게 없지</summary>
  
이번 팀 프로젝트는 다행히도 팀원들을 너무 잘 만나서 큰 어려움 없이 즐겁게 잘 끝낼 수 있었다. 어떤 기술을 적용하는 게 더 효율적일까요? 어떻게 코드를 효율적으로 짤 수 있을까요? 어떻게 배치하는 게 이쁜가요? 등 끊임없이 소통하며 만들어 나가는 게 재미있었다.

나에게 있어 제일 큰 난관은 팀원들과의 갈등이 아닌 이전에 사용해보지 않았던 리액트 네이티브를 사용해 바로 결과물로 만들어내는 것이었다. 처음엔 공식문서를 보면서 새로운 것들을 익히기도 바쁜데 한정된 시간에 바로 기술 구현을 해내야만 하는 게 막막했는데 팀원들과 이야기하며 이것저것 시도해보니 어느새 하나씩 완성되어가고 있었다. 아는 부분이 있으면 바로바로 공유하고, 막히는 부분이 있으면 어떤 문제가 있는지 체크해주며, 해결하지 못하면 밤을 새워서라도 같이 도와주면서 해결했다. 나는 이 부분이 사실 너무 좋았다.

쉽게 해결되지 않는 수많은 에러를 보면 스트레스도 많이 쌓이지만 팀원들과 머리 싸매고 고민해서 해결하면 서로 박수도 치고 격려도 해주는 과정은 정말 뜻깊었다. 결국엔 코드도 사람이 짜는 것이고 서로 간의 협동이 더 좋은 결과물을 만들어 낼 수 있다는 걸 느꼈다. 앞으로 개인 프로젝트를 하면 막히는 부분에서 함께 해결할 팀원들이 없다는 게 막막하지만, 이 경험들을 토대로 잘 해결할 수 있을 것만 같다.

</details>


<br/>

## 🌈 참여 개발자

### 김태섭
Contact: serbi2012@naver.com

### 김병석
Contact: bskim.2212@gmail.com

### 이상아
Contact: comt.mix@gmail.com

