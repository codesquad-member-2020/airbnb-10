# Ground Rule

## 스크럼

- 매일 12시
- 스크럼 기록은 issue로 관리
    - 날짜 별로 issue를 생성
    - 댓글로 각자 스크럼 내용을 작성
    - 가장 마지막에 작성한 사람이 해당 issue를 close

## Commit Rule
- Basic Commit Message

  `[#issueNumber] commit-log : content`
  
  |이름|내용|
  |---|---|
  |feat|새로운 기능 추가|
  |fix|버그 수정|
  |docs|문서 수정|
  |style|코드 포맷팅 , 세미콜론 누락 , 코드 변경이 없는 경우|
  |refactor|코드 리펙토링|
  |test|테스트 코드 , 리펙토링 테스트 코드 추가|
  |chore|빌드 업무 수정 , 패키지 매니저 수정|
  
## PR

- Title은 템플릿에 맞춰서 작성
- issue를 닫는 경우, PR 메세지에 아래 내용을 포함.

    Closed #{issueNumber}
    > 예시 `Closed #11`

## 브랜치 구조

- master
    - 배포용 브랜치
- dev
    - 개발용 브랜치
- fe-dev
    - 프론트엔드 개발용 브랜치
- 기능별 브랜치
    - 예시
         `feature/{클래스}-{기능명}`
