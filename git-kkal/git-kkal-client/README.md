<h1 align="center">
  Git-Kkal
</h1>

<p align="center">
  <img src="./readme-assets/git_kkal_logo.png" alt="Git Kkal Logo">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue.svg" alt="Frontend-React">
  <img src="https://img.shields.io/badge/Backend-Node%20&%20Express-green.svg" alt="Backend-Node-Express">
  <img src="https://img.shields.io/badge/AWS-deployed-brightgreen" alt="AWS">
  <a href="https://gitkkal.xyz" title="Netlify-deploy-status">
    <img src="https://api.netlify.com/api/v1/badges/b53a6a4d-8634-4f9b-959b-6656ca76c6db/deploy-status" alt="Netlify-deploy-status">
  </a>
</p>

<br/>

Git Kkal은 설치 없이 간편하게 이용할 수 있는 Web Git GUI Viewer 입니다.

<br/>
<br/>

### 구동장면

<img src="./readme-assets/input-url-redirect-to-repo.gif" />

<br/>
<br/>

## Index

  <ol>
    <li><a href="#motivation">Motivation</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#task-tool">Task Tool</a></li>
    <li><a href="#role-and-responsibility">R&R</a></li>
    <li><a href="#schedule">Schedule</a></li>
    <li><a href="#convention">Convention</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#ui-example">UI Example</a></li>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
  </ol>

<br/>
<br/>

## Motivation

Git의 Tree 구조를 쉽게 이해하기 위해 Graph를 시각화하여 보여주는 Git GUI Application 들을 시중에서 이미 찾아볼 수 있지만, Application 설치를 선호하지 않는 사용자들 또는 자신의 PC가 아닌 PC를 사용하게 되는 경우 CLI로 Git Log를 확인해야 하는 번거로움이 있습니다.

그러한 불편함을 해소하기 위하여 간편하게 웹에서 Git Log를 확인할 수 있는 Web Application을 만들어보고자 이번 Project를 기획하게 되었습니다.

<br/>
<br/>

## Tech Stack

Base  
`React`

Style  
`Styled-component`

Graph render  
`Pixi-js`, `Three-js`

Convention Management  
`Eslint`

Version Management  
`Git`

Test case  
`Mocha`, `Cypress`

<br/>
<br/>

## Task Tool

- Scheduling: [Trello](https://trello.com/b/iKjkI4Ex/git-kkal/calendar-view)
- Mockup Sketch: [Figma](https://www.figma.com/file/71oL7x9N5Jm7U1WGy0JJ9a/git-kkal?node-id=0%3A1)
- Information Archiving: Notion

<br/>
<br/>

## Role and Responsibility

치원

- [KANBAN](https://trello.com/b/iKjkI4Ex/git-kkal/calendar-view) 제작 및 스케쥴 관리
- Team Convention Setting
- [Daily Scrum Log](https://www.notion.so/Daily-scrum-67296b8a8ad0410898e8e51f3e086129) 작성
- Get /repository API 구현
- Client Directory 구조 Setting
- Repository Page 구현
- Landing Page UI
- Server & Client Deploy
- Server & Client Test case 작성
- Readme 작성

선관

- Mockup 제작
- Server Directory 구조 Setting
- Get /repository/diff API 구현
- Diff Page 제작
- 2D Graph UI
- 3D Graph UI

승현

- Git Log Data로 Graph 상 Commit Node의 위치를 계산할 수 있는 Algorithm 구현
- 2D Graph 구현
- 3D Graph 구현

<br/>
<br/>

## Schedule

[KANBAN](https://trello.com/b/iKjkI4Ex/git-kkal/calendar-view)

개발기간 (08.30 ~ 09.17) 총 제작기간 19일

1주차 - 기획, POC

- 주제 선정
- [Mockup Sketch 제작](https://www.figma.com/file/71oL7x9N5Jm7U1WGy0JJ9a/git-kkal?node-id=0%3A1)
- Spec Check, Scheduling
- Convention 협의
- Directory Structure Setting

2주차 - 구현

- Front
  - UI Layout Setting
  - Graph Render Algorithm 구현
  - Branch List, Commit List, Diff File List 출력 및 상호작
  - 2D Graph 출력 및 Click Event 구현
- Back
  - Get /repository API, Get /repository/diff API 구현
  - Error Handling

3주차 - 마무리

- 3D Graph 출력 및 Click Event 구현
- UI 개선작업
- Deploy
- Test Case 작성
- Readme 작성
- 2D, 3D Graph Bug Fix

<br/>
<br/>

## Convention

- Coding Convention: [airbnb](https://github.com/airbnb/javascript)
- [Commit Message Convention](https://github.com/helderburato/dotfiles/blob/main/git/.gittemplates/commit)
- CSS 선언 순서: NHN Coding Convention
- Branch 전략: Git-flow
- Merge 전략: Merge (Create Merge Commit)

<br/>
<br/>

## Features

- Public Repository 주소를 입력하여 Commit Log 확인
- 2D 및 3D Graph 지원
- 변경된 파일을 클릭하여 변경사항 확인 가능

<br/>
<br/>

## UI Example

### Landing Page

<img src="./readme-assets/landing-page.png" />

<br/>

### Repository page

<img src="./readme-assets/repo-page.png" />

<br/>

### 3D Graph

<img src="./readme-assets/3d-graph.png" />

<br/>

### Diff Page

<img src="./readme-assets/diff-page.png" />

<br/>
<br/>

## Demo

[Demo Link](https://gitkkal.xyz)

### Client

- Netlify를 이용하여 애플리케이션 배포 및 관리

### Server

- AWS Elastic Beanstalk를 사용하여 애플리케이션 배포 및 관리
- Amazon ACM (AWS Certificate Manager)을 사용한 SSL 관리 (HTTPS Protocol)
  <br/>
  <br/>

## Installation

- Git-Kkal은 서버가 배포된 사이트입니다.
- 로컬에서 구동을 원하시는 경우 아래와 같이 `.env` 파일 설정이 필요합니다.

### env 설정

1. Frontend

```shell
REACT_APP_SERVER_URL=http://localhost:8000
```

2. Backend

```shell
PORT=8000
DEBUG=*:*
CLIENT_URL=http://localhost:3000
```

<br/>
<br/>

## Usage

1. Landing Page에서 Public Repository URL 입력
2. Branch, Commit Node, Commit Message를 클릭하여 Diff를 확인하고자 하는 Commit을 변경
3. 2D, 3D 버튼으로 2D Graph-3D Graph 간 전환
4. Diff File Name을 클릭하여 해당 Diff Page로 이동

<br/>
<br/>

## Challenge

1. Git Graph Rendering Algorithm

   - Challenge Factor
     - Git Log Data를 기반으로, CLI git log --graph 또는 Source Tree 에서 보이는 그래프 형태를 구현해야 했음
   - 구현 원리
     1. Commit Graph는 Commit 의 Parent를 기준으로 만든 Tree 구조
     2. Algorithm 실행시 먼저 Parent가 없는 Commit들을 찾아 해당 브랜치의 최상위 Commit을 파악
     3. Git Log를 탐색하며 Node의 포지션 Data를 만들어냄
     4. Parent 는 최대 2개 까지 가질 수있으며, Parent의 갯수로 해당 Commit의 종류를 파악할 수 있음(Merge Commit, 새로 시작된 Branch, 단순 Commit)

2. 2D Graph Rendering
   - 문제점
     - 하나의 Canvas 위에 그려낼 수 있는 Pixel 수에 제한이 있으므로 Git Log가 많은 Repository를 Render할 경우 비정상적 Render 발생
   - 해결책
     - Git Log 의 개수를 제한하여 Render

<br/>
<br/>

## 개인별 느낀점(아쉬운점)

### 공통

상태관리 라이브러리 도입

- Spec Check 당시 전역에서 관리할 State가 없을 것으로 예측하였으나, 개발 진행 도중 예상외로 관리가 필요한 State의 존재를 알게되었다. Schedule 준수를 위해 상태관리 라이브러리를 도입하지 않고 진행하였으나, Prop Drilling이 반복되며 개발속도와 코드의 가독성을 저하시켰다.

### 치원

ShellJs (Node.js Unix Shell Command Library)

- Spec Check 당시 CLI Command 를 직접적으로 사용할 수 있는 Library의 존재를 알았다면, Git Graph Render Algorithm을 보다 쉽게 구현할 수 있었을 것이고, 추가 기능 개발에 투자할 수 있는 시간을 확보할 수 있었을 것으로 예상한다.

### 선관

1. 3D Graph 선 두께 조절

   - 문제점
     - Three-js 에서 선을 두껍게 하는 옵션이 동작하지 않음.
     - WebGL 렌더러를 사용하는 OpenGL Core Profile 의 제한으로 인해 선의 두께는 항상 1로 고정됨
   - 해결을 위하여 시도한 방법

     1. 선을 원통형으로 돌려 두꺼워보이는 효과를 냄
        - 선을 입체로 Render하는 Logic이 필요하나, 스케쥴 준수를 우선 두께를 조정하지 않고 진행
     2. 관련 Library 도입
        - 최소한의 Library만 사용하고자, 관련 Library는 사용하지 않음

2. Local File에 접근할 수 있는 [Web API](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream)의 존재

   - Spec Check 때 알았더라면 시중에 나와있는 Source Tree 또는 Git Kraken과 같은 Git Add, Commit, Push, Pull 등의 기능을 추가해볼 수 있었을 것으로 예상

3. 구체적인 Mockup 제작
   - Mockup 을 섬세하게 설계하지 못해 지속적으로 변경되는 부분이 나오게 되어, 불필요한 시간모소를 하게됨

### 승현

1. Graph Rendering Algorithm

   - 충분하지 못한 Algorithm 검증으로 Edge Case가 발생하였고, 수정을 위하여 Schedule에 없던 시간을 소모하게 됨

2. WebGL Library 선택

   - Three-fiber가 아닌 일반 Three Library를 사용하는 것이 관련자료를 찾기에 용이하여 구현에 보다 용이하였을 것으로 예상

<br/>

## Future Plan(차후 구현예정 or 수정예정기능)

### 치원

State Management Library

- Redux와 같은 상태관리 라이브러리 도입

### 선관

Code Mirror

- Code Highlighting 및 간단하게 수정하고 Push 할 수 있는 Editor기능

### 승현

Three Clean Up

- Three 로 Rendering을 위해 생성해둔 객체들을 Clean Up 되지 않고 있음
- Dispose 가능한 방법을 찾아 해결 예정

Large Repository

- 표현해야되는 Git Log의 양이 1개의 Canvas를 초과할 경우, 다수의 Canvas에 Commit Log를 나눠서 Render
