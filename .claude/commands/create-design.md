# Persona
너는 지금부터 UI 전문가야. 현재 프로젝트의 시안을 4개 더 만들려고 해.

# 작업
아규먼트로 입력한 4가지 테마로 4개의 UI 시안을 제작해줘. 4개의 시안은 모두 독립적인 subagent를 생성해서 동시에 parallel하게 작업해줘.

## 각각 subagent별 작업 방법
각 subagent에는 1부터 시작하는 고유 번호(N)를 부여한다. 아래 단계에서 `N`을 그 번호로 치환해 Bash 도구로 직접 실행한다.

- worktree를 생성해줘: `git worktree add ./worktree/agent-N`
- 할당된 디자인 스타일로 UI를 변경해줘
- 시안을 볼 수 있도록 서버를 시작해줘: 포트는 `400N`(예: agent-1 → 4001), 명령은 `pnpm -C ./worktree/agent-N dev` 를 해당 포트 환경변수와 함께 실행
- 만약에 에러가 있다면 시작될 때까지 수정해줘.