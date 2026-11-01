# 2026 OSS Assignment 06

## Deployment

- GitHub URL: https://github.com/donkeyears0402-star/2026-oss-assign06
- Vercel URL: https://2026-oss-assign06.vercel.app
- MockAPI Endpoint URL: https://6ae6da4556b2ee1e543feb38.mockapi.io/api/v1/movies

비밀 키와 비밀번호는 없다. 이 주소는 공개라서 다른 사람이 데이터를 바꿀 수 있다. 실습용 가상 데이터만 넣었다.

## Service

- 주제: 영화 감상 기록
- Field: `id`, `title`, `director`, `genre`, `year`, `rating`
- GET: 페이지를 열 때 `fetch`로 목록을 가져와 표에 출력
- POST: 폼 데이터를 서버에 추가하고 목록을 다시 그린다
- PUT: 기존 데이터를 폼에 불러온 뒤 서버에 반영
- DELETE: `confirm()` 후 서버에서 삭제

## Key Learning

1. `fetch()`는 주소와 method를 보내 서버와 데이터를 주고받는다. `response.ok`가 거짓이면 status를 보고 실패로 처리하고, `response.json()`으로 본문을 객체 배열로 바꾼다.
2. `async/await`를 쓰면 목록을 받은 다음에 표를 그리는 순서를 코드 위에서 아래로 읽을 수 있다. 실패한 요청은 `try/catch`로 잡아 `#message`에 보여 준다.
3. REST에서는 목록 조회가 GET, 추가가 POST, 수정이 PUT, 삭제가 DELETE다. 배열은 검색과 화면용이고, 새로고침 뒤에도 남는 저장은 MockAPI가 한다.

## AI / Search Usage

| 도구 | 사용 목적 | 참고 또는 반영한 기능 | 직접 수정한 내용 | 배운 점 |
| --- | --- | --- | --- | --- |
| OpenAI | 과제 05 배열 CRUD를 fetch로 확장 | GET/POST/PUT/DELETE, 검색, 실패 메시지, 수정 취소, 검색 지우기 | 주제와 필드는 과제 05 영화 기록을 유지했다. 검사 문구, 장르 목록, 버튼 이름은 기존 화면과 같게 맞췄다 | `response.ok`를 확인하지 않으면 실패해도 빈 목록처럼 보일 수 있다 |
| MDN | `fetch`, `response.ok`, `response.json` 확인 | 요청 헤더 `Content-Type: application/json` | 메서드 이름과 에러 문장은 페이지 문구에 맞게 고쳤다 | JSON으로 보낼 때 헤더가 없으면 서버가 본문을 객체로 못 읽을 수 있다 |

본인 추정 AI 코드 기여율: 70%

## Problem & Solution / Reflection

1. MockAPI의 `id`는 문자라서 숫자와 `===`로 비교하면 수정 중인 영화를 자기 자신으로 못 찾는다. `String()`으로 맞춘 뒤 중복 제목을 검사했다.
2. 검색어가 있는 상태에서 목록을 다시 받아 오면 검색이 풀린다. 서버에서 받은 뒤 `applySearch()`를 다시 호출했다. 검색 결과가 없을 때는 "검색 결과가 없습니다."로 빈 목록과 구분했다.

과제 05는 새로고침하면 배열이 처음 3개로 돌아갔다. 이번에는 추가, 수정, 삭제가 MockAPI에 남아서 새로고침 후에도 같다.
