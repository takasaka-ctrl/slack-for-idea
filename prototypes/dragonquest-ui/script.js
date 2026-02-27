// 状態管理
let currentIndex = 0;
const commands = document.querySelectorAll('.command-item');
const displayArea = document.getElementById('display-area');

// コマンド定義
const commandActions = {
    files: {
        title: 'ファイル管理',
        messages: [
            '▼ ファイルシステムにアクセスしています...',
            '📁 /workspace/projects',
            '📁 /workspace/memory',
            '📄 AGENTS.md',
            '📄 USER.md'
        ]
    },
    system: {
        title: 'システム情報',
        messages: [
            '▼ システム情報を取得中...',
            '🖥️ OS: Linux x64',
            '⚡ Node: v22.22.0',
            '🤖 Model: Claude Sonnet 4.5',
            '✅ Status: Online'
        ]
    },
    tasks: {
        title: 'タスク管理',
        messages: [
            '▼ 実行中のタスクを確認しています...',
            '⏳ Heartbeat monitor: Active',
            '📊 Memory search: Ready',
            '🔄 Cron jobs: 3 scheduled',
            '✨ All systems operational'
        ]
    },
    settings: {
        title: '設定',
        messages: [
            '▼ 設定メニュー',
            '🎨 テーマ: ドラクエ風',
            '⌨️ 操作: キーボード優先',
            '🔔 通知: 有効',
            '💾 自動保存: 有効'
        ]
    },
    help: {
        title: 'ヘルプ',
        messages: [
            '▼ 操作方法',
            '↑↓ 矢印キー: コマンド選択',
            '⏎ ENTER: コマンド実行',
            '⎋ ESC: キャンセル',
            '💡 マウスクリックでも操作可能です'
        ]
    }
};

// 選択を更新
function updateSelection(newIndex) {
    commands[currentIndex].classList.remove('active');
    currentIndex = newIndex;
    commands[currentIndex].classList.add('active');
}

// メッセージを表示
function displayMessages(messages, delay = 100) {
    displayArea.innerHTML = '';
    messages.forEach((msg, index) => {
        setTimeout(() => {
            const p = document.createElement('p');
            p.className = 'message';
            p.textContent = msg;
            displayArea.appendChild(p);
            
            // 最後のメッセージで少し待つ
            if (index === messages.length - 1) {
                setTimeout(() => {
                    // 効果音的な視覚フィードバック（オプション）
                }, 300);
            }
        }, index * delay);
    });
}

// コマンド実行
function executeCommand(commandKey) {
    const action = commandActions[commandKey];
    if (action) {
        displayMessages(action.messages);
    }
}

// キーボード操作
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            updateSelection((currentIndex - 1 + commands.length) % commands.length);
            break;
        case 'ArrowDown':
            e.preventDefault();
            updateSelection((currentIndex + 1) % commands.length);
            break;
        case 'Enter':
            e.preventDefault();
            const selectedCommand = commands[currentIndex].dataset.command;
            executeCommand(selectedCommand);
            break;
        case 'Escape':
            e.preventDefault();
            displayMessages(['▼ ようこそ、マスター。', 'コマンドを選択してください。']);
            break;
    }
});

// マウス操作
commands.forEach((cmd, index) => {
    cmd.addEventListener('mouseenter', () => {
        updateSelection(index);
    });
    
    cmd.addEventListener('click', () => {
        executeCommand(cmd.dataset.command);
    });
});

// 時計更新
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ja-JP', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    document.getElementById('time').textContent = timeStr;
}

// メモリ情報（ダミー）
function updateMemory() {
    const memoryMB = Math.floor(Math.random() * 50) + 100;
    document.getElementById('memory').textContent = `${memoryMB}MB`;
}

// 初期化
updateClock();
updateMemory();
setInterval(updateClock, 1000);
setInterval(updateMemory, 5000);

// スタートアップメッセージ
setTimeout(() => {
    displayMessages([
        '▼ システム起動完了。',
        '🪽 Athena が待機中です。',
        'コマンドを選択してください。'
    ], 150);
}, 500);
