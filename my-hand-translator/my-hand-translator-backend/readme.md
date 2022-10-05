# 내손번역 My Hand Translator Backend

[내손번역](https://my-hand-translator.github.io/#/) 크롬 확장 프로그램에 REST API를 제공하는 Application의 예시입니다.

[내 손 번역 익스텐션 레포지토리](https://github.com/my-hand-translator/my-hand-translator-extension)

## install

```
npm install
```

## Run the app

```
npm start
```

## Run the tests

```
npm test
```

---

아래에 REST API 예제가 설명되어 있습니다.

# 회원가입

## Request

`POST /users/signup`

### Header

```
{
  Authorization: `bearer ${accessToken}`,
  Content-Type: application/json,
}
```

### Body

```json
{
  "email": "something@gmail.com",
  "name": "whoever",
  "keywords": ["react", "node", "express"],
  "glossary": {
    "component": "컴포넌트"
  }
}
```

## Response

```
HTTP/1.1 200 OK
Status: 200 OK
Connection: close
Content-Type: application/json

{
  "result": "ok"
  "glossaryId": "glossaryId"
}
```

# 로그인

## Request

`POST /users/login`

### Header

```
{
  Authorization: `bearer ${accessToken}`,
  Content-Type: application/json,
}
```

### Body

```json
{
  "result": "ok",
  "isUser": true,
  "glossaryId": "glossaryId",
  "message": "User found."
}
```

# 용어집 가져오기

## Request

`GET /users/:user_id/glossary`

### Header

```
{
  Authorization: `bearer ${accessToken}`,
  Content-Type: application/json,
}
```

### Body

```
null
```

## Response

```json
{
  "result": "ok",
  "data": {
    "component": "컴포넌트",
    "enzyme": "엔자임",
    "state": "상태"
  }
}
```

# 번역 결과 가져오기

## Request

`GET /translations/:user_id?page={ STRING }&limit={ STRING }`

### Header

```
{
  Authorization: `bearer ${accessToken}`,
  Content-Type: application/json,
}
```

### Body

```
null
```

## Response

```json
{
  "result": "ok",
  "data": [
    {
      "nanoId": "baedga",
      "text": "As your app grows, you can catch a lot of bugs with typechecking.",
      "translated": "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
      "url": "www.naver.com",
      "createdAt": "2021-09-10T02:17:29.952Z"
    }
  ]
}
```

# 번역기록 추가하기

## Request

`POST /translations`

### Header

```
{
  Authorization: `bearer ${accessToken}`,
  Content-Type: application/json,
}
```

### Body

```json
{
  "email": "somting@gmail.com",
  "translations": [
    {
      "text": "As your app grows, you can catch a lot of bugs with typechecking.",
      "translated": "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
      "url": "http://www.naver.com",
      "glossary": {
        "react": "리액트"
      },
      "createdAt": "2021-09-10T02:08:27.098Z",
      "nanoId": "V1StGXR8_Z5jdHi6B-myT"
    }
  ]
}
```

## Response

```json
{
  "result": "ok"
}
```

# 특정 유저의 번역기록 추가하기

## Request

`POST /translations/:user_id`

### Header

```
{
  Authorization: `bearer ${accessToken}`,
  Content-Type: application/json,
}
```

### Body

```json
{
  "text": "As your app grows, you can catch a lot of bugs with typechecking.",
  "translated": "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
  "url": "http://www.naver.com",
  "glossary": {
    "react": "리액트"
  },
  "createdAt": "2021-09-10T02:08:27.098Z",
  "nanoId": "V1StGXR8_Z5jdHi6B-myT"
}
```

## Response

```json
{
  "result": "ok"
}
```

# 번역 된 적이 있는지 확인

## Request

`GET /words/translated?words=USER_INPUT`

### Header

```
{
  Authorization: `bearer ${accessToken}`,
  Content-Type: application/json,
}
```

### Body

```
null
```

## Response

```json
{
  "result": "ok",
  "data": "다른 사람이 번역한 문장..."
}
```
