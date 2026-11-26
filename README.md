# xweoze의 개발 기록

공부 기록과 개인 개발 작업을 한국어로 정리하는 블로그(Blog)입니다. [글 목록](https://xweoze.github.io/) · [GitHub 계정 소개](https://github.com/xweoze)

## 새 글 발행하기

1. [글 작성 화면](https://github.com/xweoze/xweoze.github.io/new/main/_posts)에서 파일 이름을 `YYYY-MM-DD-짧은이름.md`로 입력합니다. 날짜에는 실제 발행일을 넣습니다.
2. 아래 예시의 제목과 날짜를 바꾸고 두 번째 `---` 아래에 본문을 작성합니다. `+0900`은 한국 시간입니다.

   ```markdown
   ---
   title: "오늘 공부한 내용"
   date: 2026-11-26 09:00:00 +0900
   categories: [공부]
   mood: Wine
   tags: [git]
   ---

   오늘 해결한 질문과 확인한 내용을 여기에 씁니다.
   ```

   `mood`에는 글을 쓸 때의 기분에 맞춰 `Whisky & Spirits`, `Cocktail`, `Wine` 중 하나를 적습니다. 예를 들어 `mood: Wine`인 글은 첫 화면의 Wine 아래에 표시됩니다. 글의 주제는 `categories`에 따로 적을 수 있습니다.

3. `Commit changes`에서 `main`에 저장합니다. [배포 상태](https://github.com/xweoze/xweoze.github.io/actions/workflows/pages-deploy.yml)에서 성공을 확인한 뒤 글 목록을 엽니다.

소개 글은 `_tabs/about.md`, 블로그 이름과 한 줄 소개는 `_config.yml`에서 수정합니다. GitHub 계정의 소개 문구는 [별도 저장소의 README](https://github.com/xweoze/xweoze/blob/HEAD/README.md)에서 관리합니다.

이 사이트는 Chirpy Starter를 사용합니다. [공식 설치 안내](https://chirpy.cotes.page/posts/getting-started/) · [공식 글 작성 안내](https://chirpy.cotes.page/posts/write-a-new-post/) · [시작용 코드의 MIT 이용 조건](LICENSE)
