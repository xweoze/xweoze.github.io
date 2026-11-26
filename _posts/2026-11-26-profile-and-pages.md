---
title: "GitHub에서 내 소개와 첫 글을 연결하는 법"
date: 2026-11-26 00:00:00 +0900
description: "소개를 고치는 곳과 새 글을 쓰는 곳은 어디일까? xweoze의 두 저장소를 예로 들어 글 한 편이 공개되는 과정을 따라갑니다."
categories: [공부, GitHub]
mood: Wine
tags: [github, github-pages]
---

GitHub에서 내 이름을 눌렀을 때 보이는 소개와 이 글의 원고는 서로 다른 곳에 저장됩니다. 그래서 다음 글을 쓸 때 소개까지 고칠 필요가 없습니다.

## 소개와 글은 어디에 저장될까?

계정 이름과 같은 저장소인 `xweoze/xweoze`의 `README.md`는 GitHub 프로필(Profile)에 나타납니다. 이 문서에 블로그(Blog) 주소를 한 번 적으면 방문자는 소개에서 바로 글 목록으로 이동할 수 있습니다. [GitHub 계정 소개](https://github.com/xweoze)

글 원고를 보관하는 곳은 `xweoze/xweoze.github.io`입니다. 저장소에서 원고를 열면 작성한 문법과 수정 이력을 볼 수 있고, 공개 주소를 열면 제목과 목차가 있는 읽기 화면을 볼 수 있습니다. [글 원고가 있는 저장소](https://github.com/xweoze/xweoze.github.io) · [공개 글 목록]({{ '/' | relative_url }})

## 새 글 한 편이 공개되기까지

1. 글 저장소의 `_posts`에서 `Add file → Create new file`을 선택합니다. 파일 이름은 `YYYY-MM-DD-짧은이름.md` 형식으로 짓습니다.
2. 문서 맨 위에 아래처럼 제목, 발행 시각, 분류를 적습니다. 두 번째 `---` 아래부터는 자유롭게 본문을 씁니다.
3. `Commit changes`로 변경을 `main`에 저장합니다. 저장소의 `Actions`에서 `Build and Deploy` 실행이 성공하면 공개 글 목록에서 새 제목을 열 수 있습니다.

```markdown
---
title: "저장하기 전에 변경 내용 확인하기"
date: 2026-11-26 09:00:00 +0900
categories: [공부, Git]
tags: [git]
---

Git에서 아직 `git add`로 고르지 않은 수정은 `git diff`로 확인한다.
이미 `git add`로 고른 수정은 `git diff --staged`로 확인한다.
```

위 날짜와 제목은 작성 예시입니다. 새 글을 발행할 때는 파일 이름과 `date`에 실제 발행일을 넣습니다. 둘 다 맞는데 목록에 나타나지 않는다면 `Actions`에서 배포가 끝났는지, `date`가 한국 시간으로 미래인지 확인합니다. [Chirpy 글 작성 안내](https://chirpy.cotes.page/posts/write-a-new-post/)
