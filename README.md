# 원티드 프리온보딩 5주차 과제

### _WEEK 5-1_

- 과제 목표 : 한국임상정보 검색영역을 클론

- 수행 기간 : 2022/09/27 ~ 2022/09/29

<br>

# 배포 링크

- [링크](https://pre-onboarding-assignment-week-5-1-team-3-kr77-ycs1m1yk.vercel.app/)

<br>

# 목차

- [원티드 프리온보딩 5주차 과제](#원티드-프리온보딩-5주차-과제)
    - [_WEEK 5-1_](#week-5-1)
- [배포 링크](#배포-링크)
- [목차](#목차)
- [3팀 소개 및 역할](#3팀-소개-및-역할)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [과제 요건 및 구현 내용](#과제-요건-및-구현-내용)
  - [과제 요건](#과제-요건)
    - [1. 아래 사이트의 검색영역을 클론하기](#1-아래-사이트의-검색영역을-클론하기)
    - [2. 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현](#2-질환명-검색시-api-호출-통해서-검색어-추천-기능-구현)
    - [3. API 호출 최적화](#3-api-호출-최적화)
    - [4. 키보드만으로 추천 검색어들로 이동 가능하도록 구현](#4-키보드만으로-추천-검색어들로-이동-가능하도록-구현)
  - [기능별 코멘트](#기능별-코멘트)
    - [[ 검색영역 클론 ]](#-검색영역-클론-)
    - [[ 질환명 검색시 API 호출 - 검색어 추천 기능 구현 ]](#-질환명-검색시-api-호출---검색어-추천-기능-구현-)
    - [[ API 호출 최적화 ]](#-api-호출-최적화-)
    - [[ 키보드로 추천 검색어 이동 구현 ]](#-키보드로-추천-검색어-이동-구현-)
- [컨벤션 링크](#컨벤션-링크)

<br><br>

# 3팀 소개 및 역할

| 이름   | 역할             |
| ------ | ---------------- |
| 김리후 | 개별 과제 구현, 리팩토링 |
| 이경준 | -                 |
| 이혜성 | **팀장** / 배포, 개별 과제 구현, 리팩토링 |
| 홍성준 | 개별 과제 구현, 리팩토링 |

<br><br>

# 기술 스택

- JavaScript, React, axios

- Styled-components

<br><br>

# 프로젝트 구조

<details>

<summary>프로젝트 구조</summary>

```
📦src
 ┣ 📂api
 ┃ ┗ 📜index.js
 ┣ 📂components
 ┃ ┣ 📜Search.constant.js
 ┃ ┗ 📜SearchBox.jsx
 ┣ 📂styles
 ┃ ┣ 📜globalStyles.js
 ┃ ┗ 📜serach-box.js
 ┣ 📂utils
 ┃ ┗ 📜regex.js
 ┣ 📜App.js
 ┗ 📜index.js
```

</details>

<br><br>

# 과제 요건 및 구현 내용

## 과제 요건

### 1. 아래 사이트의 검색영역을 클론하기

[한국임상정보](https://clinicaltrialskorea.com/)

  <br>
  
### 2. 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

<img src='https://user-images.githubusercontent.com/81549337/192813572-491bf3fc-65e5-4317-9ea3-5a33a28eee53.png' width=500 />

- 사용자가 입력한 텍스트와 일치하는 부분 볼드처리

  - 예)
    - 사용자 입력: 담낭
      추천 검색어:  **담낭**의 악성 신생물, **담낭**염, **담낭**의 기타 질환, 달리 분류된 질환에서의 **담낭**, 담도 및 췌장의 장애

- 검색어가 없을 시 “검색어 없음” 표출

  <br>

### 3. API 호출 최적화

- API 호출별로 로컬 캐싱 구현

  - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
  - 캐싱을 어떻게 기술했는지에 대한 내용 README에 기술

- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

  - README에 전략에 대한 설명 기술

- API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

<br>

### 4. 키보드만으로 추천 검색어들로 이동 가능하도록 구현

- 사용법 README에 기술

<br><br>

## 기능별 코멘트

### [ 검색영역 클론 ]

- 구현내용
  - 검색 **input 포커스시** 검색 결과창이 보이도록 구현.
  - 검색 결과창 : **키워드 없을 시** 최근 검색어, 추천 검색어 노출 / **키워드 있을 시** api 호출을 통한 추천 검색어 노출.
  - 입력 키워드는 input의 **'x' 버튼**으로 지울 수 있음.
  - 검색 결과는 **키보드 방향키**(위, 아래)로 움직여 선택 가능.
  - 검색 결과에 해당 키워드는 bold 처리.

- 논의내용
  - **검색 input의 키워드 리셋 방식** : 별도의 아이콘을 추가하는 대신 input search 타입 활용.
  - **공백무시 검색**: api query로 검색하면 검색어 사이 공백을 무시하지 않음. 컴포넌트에서 정규식을 이용해 따로 처리함.
    - 네이버
    
    <img src='https://user-images.githubusercontent.com/27720475/192835381-946d24f1-520d-422b-a2e0-3a20167db8ac.png' width=400 />
    
    - 앱
    
    <img src='https://user-images.githubusercontent.com/27720475/192835868-90336fc9-cb26-4803-b3a2-2302a4ac6b4e.png' width=400 />


<br><br>

### [ 질환명 검색시 API 호출 - 검색어 추천 기능 구현 ]

- 구현내용
  - Keyword 유무 조건에 따라 debounce 실행하여 api 호출.
  - 결과값에 keyword가 포함된다면 추천 검색어에 포함. 
  - 입력한 keyword는 추천 검색어에서 bold 처리.


<br><br>

### [ API 호출 최적화 ]

- 구현내용

  - data cache기능을 session storage를 통한 전역상태 key로 관리하였습니다.
  - api call을 할때 query key를 통해 session storage에 key가 없을 경우 api호출로 데이터를 받아옵니다.
  - 한번 받아온 데이터는 set session storage를 이용하여 검색 데이터를 추가하여 관리하였습니다.
  
  <img src='https://user-images.githubusercontent.com/27720475/192859862-be25f2ea-753c-4d14-a0a0-ad525ad63d75.png' width=500 />


<br><br>

### [ 키보드로 추천 검색어 이동 구현 ]

- 구현내용
    - 검색 input의 onKeyDown 속성 활용.
    - e.key 값에 따라 추천 검색어 리스트의 index를 설정.
    - 추천 검색어 리스트는 useRef를 사용하여 접근, 해당 결과창 요소의 innerText 활용하여 setKeyword에 할당.
    - 할당된 keyword 값으로 추천 검색어 선택시 검색창에 입력되도록 구현.
  
- 논의내용
    - index 오류 방지를 위해 composition 활용.
  
<br><br>

# 컨벤션 링크

[링크](https://sunhwaday.notion.site/c0ff2ba4723c42a289ab9021e8aa95ba)
