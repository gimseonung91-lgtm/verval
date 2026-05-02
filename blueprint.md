# Home ABA - 가정 내 언어행동 중재 시스템 (Blueprint)

## 프로젝트 개요
스키너의 언어행동(Verbal Behavior) 이론을 기반으로, 자폐성 장애 및 언어발달지연 아동의 음성 발화 빈도를 높이기 위한 가정용 중재 도구입니다. 부모가 일상 속에서 직접 '맨드(요구하기)', '택트(명명하기)', '에코익(모방하기)', '인트라버벌(대답하기)'을 지도할 수 있도록 돕습니다.

## 핵심 기능 및 구현 계획

### 1. UI/UX 디자인 (Aesthetics)
- **분위기**: 긍정적, 활기참, 스트레스 없는 디자인.
- **색상**: 따뜻하고 부드러운 파스텔 톤 + 강조색(강화 버튼용).
- **컴포넌트**: 큰 버튼, 직관적인 아이콘, 카드형 레이아웃.
- **응답성**: 모바일 우선 디자인 (PWA).

### 2. 핵심 모듈 (Web Components 기반)
- `<aba-mand>`: 강화물 관리 및 페어링 가이드 제공.
- `<aba-tact>`: 플래시카드 및 정답 기록.
- `<aba-echoic>`: 모방 목표어 리스트 및 오디오 가이드.
- `<aba-intraverbal>`: 빈칸 채우기 템플릿.
- `<aba-dashboard>`: 발화 데이터 시각화 차트.

### 3. 기술 스택
- **Frontend**: Vanilla JS (ES Modules), Web Components, CSS Container Queries, `:has()` selector.
- **Backend/Data**: Firebase (Firestore, Hosting).
- **Graphics**: 필요시 Chart.js 등을 활용한 시각화.

## 구현 단계 (Execution Plan)

### Step 1: 기본 구조 및 네비게이션
- [ ] `index.html` 기초 설계 (탭 기반 네비게이션).
- [ ] `style.css` 테마 및 전역 레이아웃 정의.
- [ ] `main.js` 앱 초기화 및 라우팅 로직.

### Step 2: 강화물 및 설정 모듈
- [ ] 강화물 리스트 등록/관리 기능.
- [ ] 세션 모드 선택 (데스크 vs 일상).

### Step 3: 4대 언어작동행동 훈련 UI
- [ ] Mand 탭: 페어링 가이드 및 성공 버튼.
- [ ] Tact 탭: 이미지 카드 시스템.
- [ ] Echoic 탭: 단어 리스트 및 가이드.
- [ ] Intraverbal 탭: 스크립트 템플릿.

### Step 4: 데이터 기록 및 Firebase 연동
- [ ] Firestore 연동 (발화 기록 저장).
- [ ] 대시보드 (발화 빈도 차트).

### Step 5: 마무리 및 폴리싱
- [ ] 오프라인 지원 (Local Storage).
- [ ] 전반적인 애니메이션 및 효과 추가.
