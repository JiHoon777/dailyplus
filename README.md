# DailyPlus

DailyPlus는 Next.js 13+ App Router를 기반으로 하는 웹 애플리케이션입니다.

## 기술 스택

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui

## 프로젝트 구조

```
dailyplus/
├── app/                    # Next.js App Router 구조
│   ├── (main)/            # 메인 레이아웃 그룹
│   ├── admin/             # 관리자 페이지
│   ├── auth/              # 인증 관련 페이지
│   └── layout.tsx         # 루트 레이아웃
│
├── src/                   # 소스 코드 (FSD 아키텍처)
│   ├── _pages/           # 페이지 컴포넌트
│   ├── app/              # 앱 설정, 프로바이더
│   ├── entities/         # 도메인 엔티티
│   ├── features/         # 기능 구현체
│   ├── shared/           # 공유 유틸리티
│   └── widgets/          # 복합 UI 블록
│
├── public/               # 정적 파일
└── ...                  # 설정 파일들
```

## 주요 특징

1. **Next.js App Router**:

   - App Router를 사용한 라우팅 구조
   - 서버 컴포넌트 활용
   - 레이아웃 시스템

2. **Feature-Sliced Design**:

   - 확장 가능한 아키텍처
   - 명확한 책임 분리
   - 자세한 내용은 `src/README.md` 참조

3. **관리자 기능**:

   - 관리자 전용 대시보드
   - 콘텐츠 관리 시스템

4. **인증 시스템**:
   - 사용자 인증/인가
   - 보안 기능

## 시작하기

```bash
# 의존성 설치
pnpm i

# 개발 서버 실행
pnpm dev
```

개발 서버를 실행한 후 [http://localhost:3000](http://localhost:3000)에서 결과를 확인할 수 있습니다.

## 환경 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 필요한 환경 변수를 설정하세요.

## 문서

- FSD 아키텍처 가이드: `src/README.md`
- API 문서: (작성 예정)
- 컴포넌트 문서: (작성 예정)
