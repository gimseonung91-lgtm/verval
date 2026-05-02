/**
 * Home ABA - Main Application Logic
 * Using Web Components for modularity and modern ES features.
 */

import { celebrate } from './celebration.js';

// --- App State ---
const state = {
    currentView: 'mand',
    sessionStartTime: null,
    sessionDuration: 0,
    reinforcers: ['주스', '과자', '비누방울', '자동차'],
    records: []
};

// --- View Router ---
function navigateTo(viewId) {
    state.currentView = viewId;
    renderView();
    updateNavUI();
}

function updateNavUI() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === state.currentView);
    });
}

function renderView() {
    const container = document.getElementById('view-container');
    container.innerHTML = ''; // Clear current view

    switch (state.currentView) {
        case 'mand':
            container.appendChild(document.createElement('aba-mand'));
            break;
        case 'tact':
            container.appendChild(document.createElement('aba-tact'));
            break;
        case 'echoic':
            container.appendChild(document.createElement('aba-echoic'));
            break;
        case 'intraverbal':
            container.appendChild(document.createElement('aba-intraverbal'));
            break;
        case 'dashboard':
            container.appendChild(document.createElement('aba-dashboard'));
            break;
    }
}

// --- Helper Functions ---
function recordSuccess(type, detail) {
    const record = { type, detail, timestamp: new Date() };
    state.records.push(record);
    console.log('Success Recorded:', record);
    celebrate();
    if ("vibrate" in navigator) navigator.vibrate(50);
}

// --- Session Timer ---
function updateTimer() {
    if (!state.sessionStartTime) return;
    const now = new Date();
    const diff = Math.floor((now - state.sessionStartTime) / 1000);
    const mins = String(Math.floor(diff / 60)).padStart(2, '0');
    const secs = String(diff % 60).padStart(2, '0');
    document.getElementById('sessionTimer').textContent = `${mins}:${secs}`;
}

// --- Web Components ---

/**
 * MAND VIEW
 */
class AbaMand extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="mand-view">
                <div class="card pairing-guide">
                    <h2>💡 페어링 가이드</h2>
                    <p>발화를 강요하지 마세요. 사물과 이름을 짝지어주며 1~2초 간격으로 즐겁게 명명하세요.</p>
                </div>

                <div class="reinforcer-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                    ${state.reinforcers.map(item => `
                        <div class="card reinforcer-card" style="text-align: center; cursor: pointer;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">🎁</div>
                            <div style="font-weight: 700;">${item}</div>
                            <button class="btn btn-success success-btn" style="width: 100%; margin-top: 10px;" data-item="${item}">강화 제공</button>
                        </div>
                    `).join('')}
                </div>

                <div class="card" style="margin-top: 20px;">
                    <h3>+ 새로운 강화물 추가</h3>
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <input type="text" id="newReinforcer" placeholder="예: 젤리" style="flex: 1; padding: 10px; border-radius: 10px; border: 1px solid #ddd;">
                        <button class="btn btn-primary" id="addReinforcerBtn">추가</button>
                    </div>
                </div>
            </section>
        `;

        this.querySelectorAll('.success-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.currentTarget.dataset.item;
                recordSuccess('mand', item);
            });
        });

        this.querySelector('#addReinforcerBtn').addEventListener('click', () => {
            const input = this.querySelector('#newReinforcer');
            if (input.value) {
                state.reinforcers.push(input.value);
                this.connectedCallback(); // Re-render
            }
        });
    }
}
customElements.define('aba-mand', AbaMand);

/**
 * TACT VIEW
 */
class AbaTact extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="tact-view">
                <h2>📸 택트(명명하기) 훈련</h2>
                <div class="card flashcard" style="aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 5rem; position: relative;">
                    🍎
                    <div style="position: absolute; bottom: 20px; font-size: 1.5rem; font-weight: 700;">사과</div>
                </div>
                
                <div style="display: flex; gap: 20px; margin-top: 20px;">
                    <button class="btn btn-secondary" style="flex: 1; background: #ffcccc;" id="failBtn">❌ 실패</button>
                    <button class="btn btn-success" style="flex: 1;" id="successBtn">⭕ 성공</button>
                </div>

                <div class="card" style="margin-top: 20px;">
                    <p style="font-size: 0.9rem; color: #666;">부모 가이드: 아이가 사물을 보고 이름을 말하면 즉시 강화하고 기록 버튼을 누르세요.</p>
                </div>
            </section>
        `;

        this.querySelector('#successBtn').addEventListener('click', () => recordSuccess('tact', '사과'));
    }
}
customElements.define('aba-tact', AbaTact);

/**
 * ECHOIC VIEW
 */
class AbaEchoic extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="echoic-view">
                <h2>🗣️ 에코익(모방하기) 훈련</h2>
                <div class="card">
                    <h3>오늘의 목표 단어</h3>
                    <ul style="list-style: none; margin-top: 15px;">
                        <li style="padding: 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                            <span>공~ 공~ 공~</span>
                            <button class="btn btn-primary" style="padding: 8px 15px; font-size: 0.8rem;">가이드 듣기</button>
                        </li>
                        <li style="padding: 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                            <span>물~</span>
                            <button class="btn btn-primary" style="padding: 8px 15px; font-size: 0.8rem;">가이드 듣기</button>
                        </li>
                    </ul>
                </div>
                <button class="btn btn-success" id="echoicSuccessBtn" style="width: 100%; margin-top: 20px;">따라하기 성공 기록</button>
            </section>
        `;

        this.querySelector('#echoicSuccessBtn').addEventListener('click', () => recordSuccess('echoic', '모방성공'));
    }
}
customElements.define('aba-echoic', AbaEchoic);

/**
 * INTRAVERBAL VIEW
 */
class AbaIntraverbal extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="intraverbal-view">
                <h2>💬 인트라버벌(대답하기)</h2>
                <div class="card">
                    <p style="font-size: 1.2rem; margin-bottom: 20px;">"반짝 반짝 작은..."</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <button class="btn btn-primary" id="intraSuccessBtn">별</button>
                        <button class="btn btn-secondary">기다려주기</button>
                    </div>
                </div>
                <div class="card" style="margin-top: 20px;">
                    <p style="font-size: 0.9rem; color: #666;">부모 가이드: 노래나 문장의 끝을 아이가 채울 수 있도록 빈칸을 두고 기다려주세요.</p>
                </div>
            </section>
        `;

        this.querySelector('#intraSuccessBtn').addEventListener('click', () => recordSuccess('intraverbal', '문장채우기'));
    }
}
customElements.define('aba-intraverbal', AbaIntraverbal);

/**
 * DASHBOARD VIEW
 */
class AbaDashboard extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="dashboard-view">
                <h2>📊 오늘의 기록</h2>
                <div class="dashboard-grid">
                    <div class="card" style="text-align: center;">
                        <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-color);">${state.records.length}</div>
                        <div>총 발화 빈도</div>
                    </div>
                    <div class="card">
                        <h3>발화 유형별 분포</h3>
                        <div style="height: 150px; display: flex; align-items: flex-end; gap: 10px; margin-top: 10px;">
                            <div style="flex: 1; height: 60%; background: var(--primary-color); border-radius: 5px 5px 0 0;"></div>
                            <div style="flex: 1; height: 30%; background: var(--secondary-color); border-radius: 5px 5px 0 0;"></div>
                            <div style="flex: 1; height: 45%; background: var(--accent-color); border-radius: 5px 5px 0 0;"></div>
                            <div style="flex: 1; height: 20%; background: #ccc; border-radius: 5px 5px 0 0;"></div>
                        </div>
                        <div style="display: flex; font-size: 0.7rem; margin-top: 5px; text-align: center;">
                            <div style="flex: 1;">맨드</div>
                            <div style="flex: 1;">택트</div>
                            <div style="flex: 1;">에코익</div>
                            <div style="flex: 1;">인트라</div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}
customElements.define('aba-dashboard', AbaDashboard);

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Nav Event Listeners
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            navigateTo(item.dataset.view);
        });
    });

    // Start Session Timer
    state.sessionStartTime = new Date();
    setInterval(updateTimer, 1000);

    // Initial Render
    renderView();
});
