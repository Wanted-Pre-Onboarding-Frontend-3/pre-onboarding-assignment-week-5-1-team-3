# 원티드 프리온보딩 5주차 과제

### _WEEK 5-1_

- 과제 목표 : 한국임상정보 검색영역을 클론

- 수행 기간 : 2022/09/27 ~ 2022/09/29

<br>

# 배포 링크

- [링크](https://pre-onboarding-assignment-week-5-1-team-3-server-wfe1.vercel.app/)

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
| 김리후 |                  |
| 이경준 |                  |
| 이혜성 | **팀장** / 배포, |
| 홍성준 |                  |

<br><br>

# 기술 스택

- JavaScript, React, Recoil, axios

- Styled-components

<br><br>

# 프로젝트 구조

<details>

<summary>프로젝트 구조</summary>

```
📦src
 ┣ 📂api
 ┃ ┣ 📜api.js
 ┃ ┣ 📜axios-instance.js
 ┃ ┣ 📜index.jsx
 ┃ ┗ 📜usersApi.js
 ┣ 📂assets
 ┃ ┣ 📜logo.png
 ┃ ┗ 📜logo_white.png
 ┣ 📂components
 ┃ ┣ 📂Users
 ┃ ┃ ┣ 📜UserAddForm.jsx
 ┃ ┃ ┗ 📜UserAddInput.jsx
 ┃ ┣ 📜Dashboard.jsx
 ┃ ┗ 📜Header.jsx
 ┣ 📂data
 ┃ ┣ 📜accountStatus.json
 ┃ ┣ 📜brokerFormat.json
 ┃ ┣ 📜brokers.json
 ┃ ┗ 📜index.js
 ┣ 📂hooks
 ┃ ┗ 📜useFormat.js
 ┣ 📂pages
 ┃ ┣ 📂AccountDetail
 ┃ ┃ ┣ 📂bread-crumbs
 ┃ ┃ ┃ ┗ 📜index.jsx
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜Account.jsx
 ┃ ┃ ┃ ┣ 📜AccountUser.jsx
 ┃ ┃ ┃ ┣ 📜style.js
 ┃ ┃ ┃ ┗ 📜UserSetting.jsx
 ┃ ┃ ┗ 📜AccountDetail.jsx
 ┃ ┣ 📂accounts
 ┃ ┃ ┣ 📜accounts.constants.js
 ┃ ┃ ┣ 📜accounts.jsx
 ┃ ┃ ┗ 📜accounts.utils.jsx
 ┃ ┣ 📂Login
 ┃ ┃ ┣ 📜AuthRoute.jsx
 ┃ ┃ ┗ 📜Login.jsx
 ┃ ┣ 📂userdetail
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜AccountListSection.jsx
 ┃ ┃ ┃ ┣ 📜common.js
 ┃ ┃ ┃ ┗ 📜UserInfoSection.jsx
 ┃ ┃ ┗ 📜UserDetail.jsx
 ┃ ┣ 📂Users
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜User.jsx
 ┃ ┃ ┃ ┣ 📜UserList.jsx
 ┃ ┃ ┃ ┣ 📜UserListPagination.jsx
 ┃ ┃ ┃ ┗ 📜UserMenu.jsx
 ┃ ┃ ┗ 📜Users.jsx
 ┃ ┗ 📜Main.jsx
 ┣ 📂store
 ┃ ┣ 📜account.js
 ┃ ┣ 📜user.js
 ┃ ┗ 📜userList.js
 ┣ 📂utils
 ┃ ┣ 📜account.util.js
 ┃ ┣ 📜constants.js
 ┃ ┣ 📜formatUsersData.js
 ┃ ┗ 📜storage.js
 ┣ 📜App.css
 ┣ 📜App.jsx
 ┣ 📜App.test.js
 ┣ 📜index.jsx
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js
```

</details>

<br><br>

# 과제 요건 및 구현 내용

## 과제 요건

### 1. 아래 사이트의 검색영역을 클론하기

[한국임상정보](https://clinicaltrialskorea.com/)

  <br>
  
### 2. 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
   ![image](https://user-images.githubusercontent.com/81549337/192813572-491bf3fc-65e5-4317-9ea3-5a33a28eee53.png)

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

  - **제목** : 내용.

- 논의내용
  - **제목** : 내용.

<br><br>

### [ 질환명 검색시 API 호출 - 검색어 추천 기능 구현 ]

- 구현내용

  - **제목** : 내용.

- 논의내용
  - **제목** : 내용.

<br><br>

### [ API 호출 최적화 ]

- 구현내용

  - **제목** : 내용.

- 논의내용
  - **제목** : 내용.

<br><br>

### [ 키보드로 추천 검색어 이동 구현 ]

- 구현내용

  - **제목** : 내용.

- 논의내용
  - **제목** : 내용.

<br><br>

# 컨벤션 링크

[링크](https://sunhwaday.notion.site/c0ff2ba4723c42a289ab9021e8aa95ba)
