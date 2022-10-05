# minimo

미니모는 간단한 모바일 초대장, 카드 등을 드래그 앤 드롭으로 쉽게 제작할 수 있는 웹 에디터입니다.

🔗  배포링크: [https://www.minimo.life](https://www.minimo.life/)

🔗  frontend: [https://github.com/minimo-editor/minimo-client](https://github.com/minimo-editor/minimo-client)

🔗  backend: [https://github.com/minimo-editor/minimo-server](https://github.com/minimo-editor/minimo-server)

---

## 🧑‍💻  **프로젝트 동기**

처음에는 평소 사용하고싶던 라이브러리들을 사용하여 동적인 요소가 많이 들어간 청첩장 메이커를 만들려고 했지만, '웨딩'이라는 컨셉보다는 에디터 자체를 구현하는 것에 초점을 두기 위해

이번 프로젝트 기간 동안에는 직접 드래그 드롭과 재사용성이 높은 블락단위의 기본 에디터를 구현하는 것에 목표를 두었습니다.

---

## 📅  **작업 기간**

- **기획 :** 2021/05/03 ~ 2021/05/07 **(1주)**
    - 아이디어 브레인스토밍, 기획, 기술 검증
    - wireframe 작성

        [minimo wireframe](https://www.notion.so/minimo-wireframe-3fd7effb57b54c0791e1b793b5f5fbdd)

- **개발 :** 2021/05/10 ~ 2021/05/21 **(2주)**
    - **2주차**
        - 생성된 프로젝트(제작된 미니웹) 데이터 형식 결정
        - 드래그 드롭 구현
        - 블락 구조의 에디터 구현
        - 블락 대표 이미지와 컴포넌트 맵핑
        - 백엔드 user, project api 작업
        - 소셜로그인
    - **3주차**
        - 에디터 컴포넌트 리팩토링
        - 드래그 드롭 관련 이벤트 정리
        - 드래그 드롭 애니메이션 추가
        - 생성될 미니웹 주소 설정기능
        - 전역상태관리
        - 구글 지도, 쉐도우텍스트 등 블락 추가
        - 배포

---

## 💡 특징

- WYSIWYG (What You See Is What You Get)

    프로젝트를 제작/편집 하는 과정에서의 모습 그대로 결과물이 나오도록 구현하였습니다.

- Block 단위 에디터

    미니모는 전통적인 WYSIWYG 에디터와 다르게 block 단위로 구현하였습니다.

    전통적인 WYSIWYG는 하나의 `contenteditable` 요소 안에 서로다른 `html markup` 을 작성하는 방식인데, 이는 편집하는 각각의 요소가 서로에게 영향을 주는 작은 버그가 존재합니다. 저도 이러한 불편함을 겪어본 적이 있기 때문에, 미니모는 `paragraph`, `title`, `image` 등을 각각 독립적인 `contenteditable` 요소로서 편집하도록 구현했습니다.

- json data

    프로젝트의 결과물은 `html markup` 이 아닌 `json` 형식의 데이터로 저장하였습니다.

    몇몇 에디터, 블로그 서비스 등에서 `html markup` 형태로 데이터를 저장하여 많은 고민을 했지만, `json` 형식에 장점이 더 많다고 생각하여 `json` 형식으로 저장하였습니다.

    `html markup` 형식

    ```jsx
    <section name="0ed1" class="section section--body section--first">
       <div class="section-divider">
          <hr class="section-divider">
       </div>
       <div class="section-content">
          <div class="section-inner sectionLayout--insetColumn">
             <h3 name="f8e8" class="graf graf--h3 graf--leading graf--title">
                <br>
             </h3>
             <p name="83d3" class="graf graf--p graf-after--h3">
                So what do we have?
             </p>
          </div>
       </div>
    </section>
    <section name="d1d2" class="section section--body">
      ...
    </section>
    ```

     minimo의 `json` 형식

    ```jsx
    {
        "_id": "60a8ac7ec767550586e16766",
        "address" : "freeboard",
        "concept": "basic",
        "blocks" : [
            {
                "type" : "paragraph",
                "data" : {
                    "contents" : {
                        "texts": "<p>this is free<p>"
                    },
                    "styles": {
                        "color": "black"
                    }
                }
            },
            {
                "type" : "title",
                "data" : {
                    "contents" : {
                        "texts": "give away alert"
                    },
                    "styles": {
                        "color": "red"
                    }
                }
            },
            {
                "type" : "image",
                "data" : {
                   "contents" : {
                        "src": "https://minimo.s3.amazonaws.com/project-image/any.png"
                    }
                }
            }
        ],
       "createdAt": "2021-05-22T07:02:22.401Z"
    }
    ```

    위와같은 `json` 형태로 데이터를 저장 함으로써, 현재 사용하는 minimo 웹 뿐만 아니라, native, desktop app, 오디오 리더, 챗봇 등에게도 쉽게 적용할 수 있을거라 생각되었습니다.

    또한 백엔드에서의 validation도 더 용이하고, 특정 부분의 데이터만 추출하는 데에도 수월할 것이라고 생각했습니다.

---

## 🕹 기능

🔗  [https://youtu.be/F8OHnevCS30?t=7332](https://youtu.be/F8OHnevCS30?t=7328)

- 3분 내외의 간단한 기능소개 부분입니다. 전체적인 플로우를 보실 수 있습니다.  🙂

- 기본 템플릿을 선택할 수 있습니다.
- 드래그 드롭을 통해 쉽게 블록들을 추가할 수 있습니다.
- 이미지, 동영상, 유튜브 영상 등을 추가할 수 있습니다.
- 소셜 미디어 버튼에 개인 링크를 연결할 수 있습니다.
- 특정 위치를 지도에 마크하여 주소와 함께 표시할 수 있습니다.
- 모바일 화면에 맞게 미리보기가 가능합니다.
- 원하는 주소를 설정할 수 있습니다.

---

## 🙇‍♂️ **프로젝트를 마치며**

- 프로젝트를 끝내고 스스로 잘했다고 생각한 점은 핵심 기능 관련 라이브러리를 사용하지 않았다는 것 입니다.

    이전 프로젝트에서 'react-three-fiber'라는 라이브러리를 사용했는데, 내부에서 돌아가는 three.js, canvas, webGL을 잘 모른 채 사용하여 문제들을 해결하기 어려웠고 원하는 대로 구현하지 못한 부분도 있었습니다.

    따라서 이번에는 핵심 기능 관련 라이브러리를 사용하지 않고 기본 web api를 이용하여 구현하려 했습니다. 물론 그럼에도 어려운 점은 많았습니다. 특히 에디터에 여러 드래그-드롭 이벤트가 존재하여 에디터 위의 모달로 '드래그-드랍 이미지 업로드' 구현에 어려운 점이 있었는데, 그래도 모든 이벤트를 제가 제어하고있었기 때문에 원인을  찾을 수 있었고 기획한 대로 기능 구현을 자유롭게 할 수 있었다고 생각합니다.

- 평소 생산성이 있는 웹앱에 관심이 많았고 한번 만들어 보고 싶었는데 이번 기회를 통해 만들게되어 너무 기쁩니다. 처음에는 결과물이 너무 안나올까봐 걱정했는데, 현업에 계신 멘토분께서 조언을 많이 주셔서 잘 마무리 할 수 있었습니다. 도움을 주신 멘토님들과 켄님 모두 정말 감사드립니다.
- 개인적으로 너무 재밌게 작업했고, 나름 만족스러우며 애착이 가는 프로젝트입니다. 시간이 날 때마다 재밌는 블락, 컨셉들을 추가할 예정인데 너무 재밌을 것 같네요. 🙂