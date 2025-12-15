# 3D Survival RPG Game

Three.js 기반 3D 서바이벌 RPG 게임입니다.

## 🚀 빠른 시작

### 방법 1: npm 사용
```bash
npm run dev
```

### 방법 2: Python 직접 실행
```bash
python3 -m http.server 8080
```

그 다음 브라우저에서 http://localhost:8080 을 열어주세요.

## 🎮 조작법

- **WASD**: 이동
- **마우스**: 카메라 회전
- **Space**: 점프
- **E**: NPC와 대화

## 📁 프로젝트 구조

```
test-game-01/
├── index.html          # 메인 HTML
├── main.js            # 게임 진입점
├── style.css          # 스타일
├── modules/           # 게임 모듈
│   ├── World.js       # 3D 월드
│   ├── Player.js      # 플레이어
│   ├── NPC.js         # NPC 시스템
│   ├── Controls.js    # 입력 제어
│   └── DialogueManager.js  # 대화 시스템
└── package.json       # 프로젝트 설정
```

## 🛠️ 기술 스택

- **Three.js**: 3D 렌더링
- **Python HTTP Server**: 로컬 개발 서버