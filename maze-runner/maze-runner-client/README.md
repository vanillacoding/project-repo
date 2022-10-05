# 👟 Maze Runner

미로를 만들고 다양한 알고리즘을 이용해 탈출해보세요!

![구동장면](./readme-asset/mazerunner.gif)

<br>

## 목차

1. [Motivation](#motivation)
2. [Tech Stack](#tech-stack)
3. [Task Tool](#task-tool)
4. [Schedule](#schedule)
5. [Convention](#convention)
6. [Features](#features)
7. [Algorithms](#algorithms)
8. [UI example](#ui-example)
9. [Log](#log)
10. [Installation](#installation)

<br>
<br>
<br>

## Motivation

알고리즘을 처음 접할 때 이해하기 어려운 경우가 종종 있습니다. 하지만 이런 말이 있죠.

**"백문이 불여일견"**

두 눈으로 알고리즘을 직접보면 더 쉽게 알고리즘을 학습할 수 있습니다.

Maze Runner에서 효율적으로 학습 해보세요! A \* search / Dijkstra / DFS / BFS 알고리즘을 눈으로 즐길 수 있습니다.

<br>
<br>

## Tech Stack

React / Redux / PostCSS / MongoDB Atlas / Express / Jest

- Front
  React / Redux / PostCSS

- Back
  MongoDB Atlas / Mongoose / Express

- Third party
  Jest / Netlify / AWS EB

<br>
<br>

## Task Tool

- Mockup: https://www.figma.com/file/WeZ2ZDddDEtHXWKVJIiLDz/Maze-runner?node-id=0%3A1
- Kanban: https://github.com/orgs/MazeRunner-PathfindingVisualizer/projects/1

<br>
<br>

## Schedule

총 개발 기간: 2021/09/27 ~ 2021/10/19

1주차:

- Mockup
- Kanban
- Spec check
- Directory Settings

2주차:

- Apis
  - GET /maze/:mazeId
  - POST /maze
- UI layout
  - Nav bar
  - Mobile nav bar
- 미로 에디터
- 길 찾기 알고리즘 - DFS / BFS / Dijkstra / A star search
- 길 찾기 기능
- 길 찾기 속도 조절 기능

3주차:

- 경유 기능
- 가중치 블록 생성 기능
- 미로 지우기 기능
- 미로 만들기 알고리즘 - Algorithm Recursive-division
- 저장 & 공유 기능
- 모바일 이벤트 대응
- Netlify / AWS 배포
- 테스트코드

<br>
<br>

## Convention

- Coding convetions: [React-recommend](https://github.com/yannickcr/eslint-plugin-react)
- [Commit message conventions](https://github.com/helderburato/dotfiles/blob/main/git/.gittemplates/commit)
- CSS 선언 순서: [NHN coding conventions - 63page 5.8.1 속성선언순서](https://nuli.navercorp.com/data/convention/NHN_Coding_Conventions_for_Markup_Languages.pdf)
- Branch 전략: Git-flow
- Merge 전략: Merge (create merge commit)

<br>
<br>

## Features

- 미로 에디터

  - Web event APIs를 조합하여 Desktop / Moblile에서 동작하는 미로 에디터를 구현하였습니다.

    Desktop에서는 Mouse Down / Up / Enter 이벤트를 사용하여 드래그 기능을 구현하였고, Mobile 디바이스에서는 Touch 이벤트로 드래그 기능을 구현하였습니다.

  - Dijkstra / A star search 알고리즘에 사용 가능한 가중치 블록을 구현하였습니다. 가중치가 있는 블록은 일반 블록에 비해 천천히 탐색할 수 있습니다.

  - 일반 블록의 경우 1의 가중치를 가지며 **가중치 블록**의 경우 **10의 가중치**를 갖습니다.

- 미로 길 찾기

  - Animation Queue에 방문할 Node를 저장한 후 차례대로 Animate하여 미로를 찾아가는 과정을 시각화하였습니다.
  - Animation 정지 기능을 위해 setTimeout의 id를 기억하여 clearTimeout 를 하였습니다. 그리고, Animation 속도에 따라 setTimeout의 delay를 변경하였습니다.
  - A star search / Dijkstra / DFS / BFS 알고리즘으로 미로를 탈출할 수 있습니다.

- 경유 기능

  - 경유 해야 하는 중간 지점을 구현하였습니다. 시작지점에서 중간지점, 중간지점에서 끝 지점으로 두 번 탐색이 진행됩니다.

- 미로 생성 기능 - recursive division / basic random

  - 미로 생성 알고리즘을 구현했습니다. 이 알고리즘을 이용하여 미로를 자동 생성할 수 있습니다.
  - recursive division 알고리즘은 하나의 평면을 두 공간으로 나누는 작업을 반복하는 알고리즘입니다.
  - basic random은 무작위 블록을 벽 블록 또는 거미줄 블록으로 바꾸게됩니다.

- 저장 및 공유
  - 링크를 생성하여 저장된 미로를 불러올 수 있습니다.
  - 미로를 구성하는 Node의 상태를 0~5의 숫자로 변환하여 서버에 저장되는 데이터의 양을 줄였습니다.

<br>
<br>

## Algorithms

- 가중치를 적용할 수 없는 알고리즘

  - DFS (Depth First Search)

    깊이를 우선적으로 탐색하는 알고리즘입니다. 깊이를 우선 탐색 하기 때문에 미로의 입구와 출구가 가까이 있는 경우라도 멀리 떨어진 블록을 먼저 탐색할 가능성이, 즉 비효율적으로 탐색할 가능성이 있습니다. 따라서 DFS 알고리즘은 길을 찾는 알고리즘으로 적합하지 않습니다.

  https://user-images.githubusercontent.com/26831729/140452059-f339b0fb-af53-4360-8930-e5a2ff57df2a.mp4

  - BFS (Breadth First Search)

    너비를 우선적으로 탐색하는 알고리즘입니다. 입/출구 사이의 거리와 탐색속도가 비례하기 때문에 탐색 시간의 예측이 가능합니다. 따라서 BFS 알고리즘은 길 찾기 알고리즘으로 사용되기에 적합합니다.

  https://user-images.githubusercontent.com/26831729/140463191-7a6969dc-aba9-41ee-899f-497e500340ad.mp4

- 가중치를 적용할 수 있는 알고리즘

  - Dijkstra

    그래프의 한 점으로부터 다른 모든 점들까지의 최단거리를 찾는 알고리즘입니다. 미로에서는 인접한 블록으로만 이동할 수 있기 때문에 일반 블록으로 이루어진 미로에서는 BFS와 동일하게 동작합니다. 그러나 Dijkstra 알고리즘은 가중치 블록의 탐색이 가능합니다. 이 알고리즘은 가중치 블록과 일반 블록중 지나가기 더 쉬운 블록을 선택하게 됩니다.

    ```
    알고리즘 평가함수: fn = gn

    gn: 출발에서 지금(n) 까지의 경로 가중치
    ```

    알고리즘 진행 단계는 다음과 같습니다.

    1. 출발 노드를 선택
    2. 출발 노드를 기준으로 각 노드까지의 최소 거리(낮은 가중치)을 저장
    3. 방분하지 않은 노드중 최소 비용으로 갈 수 있는 노드를 선택
    4. 선택한 노드를 거쳐 각 노드까지의 최소 비용 갱신
    5. 3 ~ 4 단계 반복

  https://user-images.githubusercontent.com/26831729/140464170-7a03285d-32c4-47f0-8beb-b2a7d8816e82.mp4

  - A star search

    Dijkstra 알고리즘에서 hn(휴리스틱)을 추가한 알고리즘입니다.

    ```
    A* 알고리즘 평가 함수: fn = gn + hn
    fDistance = gDistance + hDistance

    gn: 출발에서 지금(n) 까지의 경로 가중치
    hn: 지금(n) 부터 목표까지의 경로 가중치 - (n ~ 목표 거리(manhattan 거리) 계산)
    ```

    즉, A star search 알고리즘은 출구의 위치를 알고있습니다. 따라서 현재 위치에서 출구까지의 거리 또한 알고있으며 이 거리를 알고리즘 평가 함수에 반영하여 길을 찾게됩니다.

    A star search 알고리즘의 진행 단계는 다익스트라와 같습니다.

    [A star search 알고리즘 위키](https://ko.wikipedia.org/wiki/A*_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)

  https://user-images.githubusercontent.com/26831729/140465114-1805e763-6d08-4b26-874d-19386be396a2.mp4

<br>
<br>

## UI example

- 미로 그리기

  https://user-images.githubusercontent.com/26831729/140500195-9599d1f0-a9f9-415b-b99d-56a9a52d6d0c.mp4

- 경유지 설정

  https://user-images.githubusercontent.com/26831729/140500901-8b0b18e3-6b9f-4169-b0f0-dd6f7322c000.mp4

- 미로 공유

  https://user-images.githubusercontent.com/26831729/140654346-bf74da9f-044b-4062-98aa-8cfcb7156307.mp4

<br>
<br>

## Log

1. Lighthouse 최적화 진행

![Before](https://user-images.githubusercontent.com/26831729/140675765-9f8d0b07-14ab-4918-a2f2-e81820c4df35.png)
![After](https://user-images.githubusercontent.com/26831729/140849959-46d50fa6-fd6b-4c4f-8e3d-201045a5a442.png)

img 태그에 alt / width / height 속성 부여, image 해상도 최적화, html description 작성하여 SEO 및 Accessibility 점수를 크게 향상시킬 수 있었습니다.

또한 build 시 source map을 삭제하여 용량을 감소시키고 react.lazy와 react.suspense를 사용하여 rendering block을 줄임으로써 Performance 점수를 향상시킬 수 있었습니다.

<br>

2. Event APIs를 조합한 미로 에디터 구현

모바일과 데스크탑 환경에 대응하기 위해 pointer event - Down / Up / Enter를 사용하여 미로 에디터를 구현하였습니다. 그러나 pointer event만을 사용할 경우 드래그 기능이 모바일에서 동작하지 않는 문제가 발생하였습니다.

https://user-images.githubusercontent.com/26831729/140678678-eb77a8a7-72e3-4832-b3ed-410d48ab4ce2.mp4

Touch event를 사용한 로직을 별도로 구현하여 모바일 환경에서도 동작하도록 할 수 있었습니다.

<br>
<br>

## Installation

maze runner는 서버가 배포된 사이트입니다.

로컬에서 구동을 원하실 경우 아래의 `.env` 파일 설정이 필요합니다.

### client

```
REACT_APP_SERVER_URL=http://localhost:8080
```

### Server

```
PORT=8080
DB_URL='Input your mongoDB URL'
FRONT_URL='http://localhost:3000'
```
