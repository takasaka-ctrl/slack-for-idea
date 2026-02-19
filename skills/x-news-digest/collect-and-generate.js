#!/usr/bin/env node
/**
 * AI News Digest - Data Collection & JSON Generation
 * Collects AI news from X/Twitter and generates newspaper JSON
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '../../news-config.json');
const OUTPUT_DIR = path.join(__dirname, '../../news-output');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function generateSparkline(values) {
  if (!values || values.length === 0) return '▁▁▁▁▁▁';
  const bars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  return values.map(v => {
    if (range === 0) return bars[0];
    const normalized = (v - min) / range;
    const index = Math.floor(normalized * (bars.length - 1));
    return bars[index];
  }).join('');
}

function calculateReadPercent(minutes) {
  if (minutes <= 5) return 25;
  if (minutes <= 10) return 50;
  if (minutes <= 15) return 75;
  return 100;
}

function getReadLabel(minutes) {
  if (minutes <= 3) return '速読';
  if (minutes <= 8) return '中程度';
  return '長文';
}

function getCategoryClass(category) {
  const map = {
    'OpenClaw': 'ai', 'Ollama': 'tech', 'Claude Code': 'ai',
    'AIツール': 'tech', 'AIモデル': 'ai', '研究': 'research',
    '業界': 'business', 'AI安全性': 'ai', 'プロダクト': 'tech',
    'OpenAI': 'openai', 'Gemini': 'gemini', 'Google AI': 'gemini',
    '個人開発': 'indie', 'インディー開発': 'indie',
    'モバイルアプリ': 'mobile', 'iOS開発': 'mobile', 'Android開発': 'mobile',
    'Claude': 'ai', 'Anthropic': 'ai'
  };
  return map[category] || 'ai';
}

function generateMockData() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('ja-JP', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return {
    date: dateStr,
    volume: '1',
    tickerText: 'Gemini 2.0 Flash実験版が一般公開 ── OpenAI、GPT-5の段階的ロールアウト開始 ── Anthropic、Claude 3.7 Sonnetを発表 ── Ollamaがv0.5リリース：ARM64最適化強化 ── 個人開発者のAI SaaS、MRR $10K達成事例が急増 ── SwiftUIのAI統合ガイドがトレンド入り ── Gemini 2.0 Flash実験版が一般公開 ── OpenAI、GPT-5の段階的ロールアウト開始',

    dataPanel: [
      { label: 'Claude 3.7 Sonnet', value: '新モデル', sparkline: generateSparkline([60,65,70,78,95]), change: '▲ ベンチマーク+12%', changeClass: 'up' },
      { label: 'Gemini 2.0 Flash', value: '速度比', sparkline: generateSparkline([40,48,55,62,80]), change: '▲ 2x faster', changeClass: 'up' },
      { label: '個人AI SaaS MRR', value: '$10K+', sparkline: generateSparkline([2100,3500,5200,7800,10400]), change: '▲ 400% YoY', changeClass: 'up' },
      { label: 'Ollama Pulls（週次）', value: '2.1M', sparkline: generateSparkline([1200,1400,1700,1900,2100]), change: '▲ 75% 前月比', changeClass: 'up' }
    ],

    hero: {
      id: 'openclaw-setup-guide',
      category: 'OpenClaw',
      categoryClass: 'ai',
      headline: 'OpenClaw完全セットアップガイド：30分でゼロから本番環境へ',
      deck: 'AWS EC2への安全なデプロイ、Docker設定、Google Workspace連携、パーソナライズされたボットメモリのセットアップを網羅した包括的なステップバイステップチュートリアル。Tailscale設定とHTTPブロッキング問題に関する重要な警告も含む。',
      author: 'Peter Yang (@petergyang)',
      readTime: '12',
      readPercent: calculateReadPercent(12),
      readLabel: getReadLabel(12),
      updateTime: '2時間前',
      fullContent: {
        introduction: 'OpenClawを本番環境で動かすまでの完全ガイド。AWS EC2、Docker、Google Workspaceの連携からセキュリティ設定まで、実際に動作する設定を30分で構築できます。このガイドは実際の導入経験に基づいた実践的な内容で、よくあるハマりポイントと解決策を詳しく解説しています。',
        sections: [
          {
            heading: '1. AWS EC2インスタンスの準備',
            content: 'OpenClawの推奨スペックはt2.medium以上。Ubuntu 22.04 LTSで動作確認済みです。メモリ4GB、vCPU 2コアあれば快適に動作します。',
            steps: ['EC2ダッシュボードで「インスタンスを起動」をクリック', 'Ubuntu Server 22.04 LTS (64-bit x86)を選択', 'インスタンスタイプ: t2.medium を選択', 'セキュリティグループで22/80/443ポートを開放', 'Elastic IPを割り当て（IPアドレス固定化）', 'SSH鍵ペアを作成してダウンロード']
          },
          {
            heading: '2. Dockerセットアップ',
            content: 'OpenClawはDockerで動作します。公式スクリプトで簡単にインストールできます。',
            code: '# Dockerインストール（公式スクリプト）\ncurl -fsSL https://get.docker.com -o get-docker.sh\nsudo sh get-docker.sh\n\n# Docker Composeインストール\nsudo apt update\nsudo apt install docker-compose -y\n\n# 現在のユーザーをdockerグループに追加\nsudo usermod -aG docker $USER\nexit  # 再ログインして反映'
          },
          {
            heading: '3. OpenClawのクローンと設定',
            content: 'GitHubからOpenClawをクローンし、環境変数を設定します。',
            code: '# リポジトリクローン\ngit clone https://github.com/openclaw/openclaw.git\ncd openclaw\n\n# 環境変数設定\ncp .env.example .env\nnano .env\n# ANTHROPIC_API_KEY=your_api_key\n# GATEWAY_URL=https://your-domain.com'
          },
          {
            heading: '4. ⚠️ 重要：Tailscale設定の落とし穴',
            content: 'Tailscale exposeの設定で「Serve」を選択すると、プロキシロジックが複雑化してクラッシュします。必ず「Off」を選択してください。',
            warning: '⚠️ 最重要: Tailscale exposeで「Serve」オプションを選ぶとOpenClawがクラッシュします。必ず「Off」を選択してください。Tailscaleは既に安全なアクセスを提供しているため、追加のプロキシは不要です。'
          },
          {
            heading: '5. Docker起動と初回設定',
            content: '初回起動時にブラウザアクセスがHTTPブロックされる問題が発生しますが、これは仕様です。',
            code: '# コンテナ起動\ndocker-compose up -d\n\n# ログ確認\ndocker-compose logs -f',
            steps: ['コンテナが起動完了を待つ（1〜2分）', 'ブラウザで http://your-ip:3000 にアクセス', '初回はHTTPでブロックされるので待機（仕様）', 'ログで「Ready」メッセージを確認', 'Tailscale経由でアクセス（https://...ts.net）']
          },
          {
            heading: '6. Google Workspace連携',
            content: 'カレンダー、Gmail、ドキュメントと連携することで生産性が大幅に向上します。',
            steps: ['Google Cloud Consoleでプロジェクト作成', 'APIs & Services → 認証情報 → OAuth 2.0クライアントID作成', 'スコープ設定：Calendar、Gmail、Drive', 'credentials.jsonをダウンロード', 'OpenClaw設定画面で認証フロー実行']
          },
          {
            heading: '7. ボットメモリのパーソナライズ',
            content: 'SOUL.md、USER.md、AGENTS.mdを編集してボットの性格と動作をカスタマイズ。',
            code: '# workspaceディレクトリに移動\ncd /home/node/.openclaw/workspace\n\n# SOULファイル編集\nnano SOUL.md\n\n# 自分の情報設定\nnano USER.md'
          }
        ],
        keyTakeaways: [
          'Tailscale exposeは必ず「Off」設定（最重要・クラッシュ防止）',
          'Docker起動後、初回HTTPアクセスはブロックされる（仕様）',
          'Google Workspace連携で生産性が10倍向上',
          'SOUL.md編集でボットの性格を自由にカスタマイズ可能',
          't2.mediumスペックで十分快適に動作'
        ],
        sourceUrl: 'https://x.com/petergyang/status/2019070963753848838',
        relatedLinks: [
          { title: 'OpenClaw公式ドキュメント', url: 'https://docs.openclaw.ai' },
          { title: 'GitHub リポジトリ', url: 'https://github.com/openclaw/openclaw' }
        ]
      }
    },

    sidebar: [
      {
        id: 'ollama-vscode-setup',
        category: 'Ollama',
        categoryClass: 'tech',
        headline: 'Ollama + VSCodeでローカルAIモデルを実行：5ステップで完全セットアップ',
        summary: 'OpenAI APIを使わないプライベートAIコーディング。Ollamaインストール、deepseek-coder:6.7bをpull、Cline/Roo Code拡張を設定し、ローカルモデルでコーディング開始。',
        readTime: '5',
        timeAgo: '3時間前',
        fullContent: {
          introduction: 'OpenAI APIを使わずに、完全にプライベートな環境でAIコーディング支援を実現する方法。Ollamaとdeepseek-coderを使えば、APIコストゼロ、データも外部に送信されない安全な開発環境が構築できます。',
          sections: [
            {
              heading: 'Step 1: Ollamaインストール',
              content: 'ワンラインでインストール完了。macOS/Linux/Windows対応。',
              code: 'curl -fsSL https://ollama.com/install.sh | sh'
            },
            {
              heading: 'Step 2: コーディング特化モデルのpull',
              content: '6.7Bパラメータモデルは標準的なPCで動作。初回は数分かかります。他にもllama3.2、qwen2.5-coderなど選択肢は豊富です。',
              code: '# コーディング特化モデル（推奨）\nollama pull deepseek-coder:6.7b\n\n# 軽量版（低スペックPC向け）\nollama pull qwen2.5-coder:1.5b\n\n# 動作確認\nollama run deepseek-coder:6.7b "Pythonでfizzbuzzを書いて"'
            },
            {
              heading: 'Step 3: VSCode拡張インストール',
              content: 'Cline（旧Claude Dev）またはContinue拡張をインストール。どちらもOllamaと連携可能。Clineはエージェント機能が強力、ContinueはChat UIが使いやすい。',
            },
            {
              heading: 'Step 4: 拡張の設定',
              content: 'Base URLにlocalhost:11434を設定し、モデル名を指定。APIキー不要です。',
              steps: ['Clineの場合: Settings → API Provider → Ollama を選択', 'Base URL: http://localhost:11434 を入力', 'モデル: deepseek-coder:6.7b を選択', 'Continueの場合: config.json にollama設定を追加']
            },
            {
              heading: 'Step 5: コーディング開始',
              content: 'エディタでCline/Continueのチャットを開いてコードを書いてもらうだけ。全てローカルで完結。インターネット接続不要、コードが外部に送信されない完全プライベート環境です。'
            }
          ],
          keyTakeaways: [
            'OpenAI APIコストゼロ（完全無料でローカル動作）',
            'コードが外部に送信されない完全プライベート',
            '6.7Bモデルで十分実用的なコーディング支援が可能',
            'インターネット接続なしでも動作'
          ],
          sourceUrl: 'https://x.com/fetzert/status/1890098713051242906',
          relatedLinks: [
            { title: 'Ollama公式サイト', url: 'https://ollama.com' },
            { title: 'Cline VSCode拡張', url: 'https://github.com/cline/cline' }
          ]
        }
      },
      {
        id: 'claude-code-workflow',
        category: 'Claude Code',
        categoryClass: 'ai',
        headline: '効果的なClaude Codeワークフロー：計画にOpus、実装にSonnetを使い分ける',
        summary: '複数の開発者による実証済み戦略：アーキテクチャ決定にはOpus 4.5を使用し、その後Shift+TabでSonnetに切り替えて高速実装。コスト効率と品質を両立。',
        readTime: '4',
        timeAgo: '5時間前',
        fullContent: {
          introduction: 'Claude Codeを最大限に活用するためのモデル使い分け戦略。計画フェーズと実装フェーズでモデルを切り替えることで、品質とコスト効率を両立する実践的なワークフロー。',
          sections: [
            {
              heading: 'Phase 1: 計画にOpus 4.5を使う',
              content: 'アーキテクチャ決定、設計レビュー、複雑な問題分析にはOpus 4.5が最適。推論能力が高く、全体像を正確に把握した上でコードを書く前の設計図を作れます。',
              steps: [
                'Claude Codeを起動（Shift+Tabでモデル切り替え）',
                'Opus 4.5を選択',
                '「このシステムをどう設計すべきか」「何を考慮すべきか」を質問',
                '計画・設計書をMarkdownで出力してもらう',
                'ファイルに保存してコンテキストとして保持'
              ]
            },
            {
              heading: 'Phase 2: 実装にSonnetへ切り替え',
              content: 'Opusで設計が決まったら、Shift+TabでSonnetに切り替えて実装。Sonnetはコード生成速度が速く、コスト効率が高い。設計書をコンテキストに渡せばOpusの判断を正確に引き継げます。',
              code: '# Claude Code内でのモデル切り替え方法\n# Shift+Tab を押してモデル選択メニューを開く\n# claude-sonnet-4-5 を選択\n\n# プロンプト例\n"先ほどの設計書に従って、まず認証モジュールを実装してください"'
            },
            {
              heading: 'コスト比較と使い分け基準',
              content: 'Opusはコストが高いため、本当に必要な判断フェーズのみに使用。Sonnetは実装・リファクタリング・テスト生成に最適。Haikuはシンプルな変換作業や定型文生成に使える。',
              steps: [
                'Opus: アーキテクチャ決定、複雑なバグ調査、コードレビュー',
                'Sonnet: 機能実装、リファクタリング、テスト生成（メインの作業）',
                'Haiku: 変数名変更、コメント追加、単純なフォーマット修正'
              ]
            }
          ],
          keyTakeaways: [
            '計画フェーズはOpus、実装フェーズはSonnetで役割分担',
            'Shift+TabでClaude Code内でいつでもモデル切り替え可能',
            'この使い分けでコストを60〜70%削減しながら品質を維持',
            '設計書をファイルに保存してコンテキスト引き継ぎがカギ'
          ],
          sourceUrl: 'https://x.com/swyx/status/1890155900422447268',
          relatedLinks: [
            { title: 'Claude Code公式ドキュメント', url: 'https://docs.anthropic.com/en/docs/claude-code' }
          ]
        }
      },
      {
        id: 'llm-cli-function-calling',
        category: 'AIツール',
        categoryClass: 'tech',
        headline: 'Simon Willison、LLM CLIツールに関数呼び出し機能を追加',
        summary: 'LLMコマンドラインツールがOpenAI、Anthropic、Gemini、Ollama全体でツール呼び出しをサポート。Pythonの関数として定義するか、プラグインにバンドル可能。',
        readTime: '3',
        timeAgo: '6時間前',
        fullContent: {
          introduction: 'Simon WillisonのLLM CLIツールが大幅アップデート。全主要プロバイダー（OpenAI, Anthropic, Gemini, Ollama）でツール呼び出し（Function Calling）が使えるようになりました。ターミナルからAIにカスタム関数を実行させることができます。',
          sections: [
            {
              heading: 'LLM CLIとは？',
              content: 'Simon Willisonが開発するオープンソースのコマンドラインAIツール。一つのCLIから複数のAIプロバイダーを統一インターフェースで使える。ローカルモデル（Ollama）にも対応しており、プライバシーを保ちながら高機能なCLI体験が可能。',
              code: '# インストール\npip install llm\n\n# APIキー設定\nllm keys set openai\n\n# 基本的な使い方\nllm "こんにちは"\n\n# Ollamaローカルモデルで使用\nllm -m ollama/llama3.2 "こんにちは"'
            },
            {
              heading: '新機能：関数呼び出し（Function Calling）',
              content: 'Python関数をデコレータで定義するだけで、AIが自動的に呼び出せるツールになります。WebサイトのスクレイピングやDBクエリ、外部APIの呼び出しなど、AIに実際の処理をさせることができます。',
              code: 'import llm\n\n@llm.hookimpl\ndef register_tools(register):\n    @register\n    def get_weather(city: str) -> str:\n        """指定都市の天気を取得する"""\n        # 実際のAPI呼び出し\n        return f"{city}は晴れ、気温22度です"\n\n# 使い方\n# llm --tool get_weather "東京の天気は？"'
            },
            {
              heading: 'プラグインとしてバンドル',
              content: 'ツールをPythonパッケージとして配布することも可能。チームで共有したりPyPIに公開して一般配布できます。',
              steps: [
                'llm-plugin パッケージとして作成',
                'pyproject.tomlでエントリポイントを設定',
                'pip install llm-my-plugin でインストール可能に',
                'PyPIに公開してコミュニティと共有'
              ]
            }
          ],
          keyTakeaways: [
            'OpenAI/Anthropic/Gemini/Ollamaを統一CLIで操作可能',
            'Pythonデコレータで簡単にカスタムツールを定義',
            'ローカルモデル（Ollama）でも関数呼び出し対応',
            'プラグインとして配布・共有が可能'
          ],
          sourceUrl: 'https://x.com/simonw/status/1890234567890123456',
          relatedLinks: [
            { title: 'LLM GitHub リポジトリ', url: 'https://github.com/simonw/llm' },
            { title: 'Simon Willison Blog', url: 'https://simonwillison.net' }
          ]
        }
      }
    ],

    middle: [
      {
        id: 'gemini-flash-dev-guide',
        category: 'Gemini',
        categoryClass: 'gemini',
        gradient: 'linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)',
        headline: 'Gemini 2.0 Flash完全活用ガイド：無料枠でここまでできる',
        summary: '無料ティアで100万トークン/分、Grounding with Google Search付き。個人開発者が本番利用できるレベルの速度と品質を実現。APIキー取得からアプリ統合まで30分で完了。',
        author: 'Rohan Paul (@RohanPaul_AI)',
        readTime: '8',
        fullContent: {
          introduction: 'Gemini 2.0 Flash が正式に一般公開。無料ティアでもマルチモーダル対応・Google検索グラウンディング付きで使えるため、個人開発者にとって最もコスパの高いAPIのひとつになりました。',
          sections: [
            {
              heading: '無料ティアのスペック（2026年現在）',
              content: 'Gemini 2.0 Flashの無料枠は1分間100万トークン（RPM）、1日あたり1500リクエスト。小中規模のアプリなら実質無料で本番運用できます。',
              steps: [
                '入力: 1分間1,000,000トークン（無料）',
                '1日: 1,500リクエスト（無料）',
                '画像・音声・動画入力にも対応',
                'Google検索グラウンディング（無料枠で利用可）',
                'コンテキストウィンドウ: 100万トークン（最大クラス）'
              ]
            },
            {
              heading: 'API統合：5分で動かす',
              content: 'Google AI Studioでキーを取得してすぐ使えます。',
              code: 'pip install google-generativeai\n\nimport google.generativeai as genai\n\ngenai.configure(api_key="YOUR_API_KEY")\nmodel = genai.GenerativeModel("gemini-2.0-flash-exp")\n\nresponse = model.generate_content("最新のAIトレンドを教えて")\nprint(response.text)'
            },
            {
              heading: 'Google検索グラウンディング活用',
              content: '最新情報が必要なアプリにはグラウンディングが強力。GeminiがリアルタイムでGoogle検索を引きながら回答を生成します。ニュース要約やリサーチツールの構築に最適。',
              code: 'response = model.generate_content(\n    "今日のAI関連ニュースをまとめて",\n    tools="google_search_retrieval"\n)'
            }
          ],
          keyTakeaways: [
            '無料で1分100万トークン（本番レベルの速度）',
            'Google検索グラウンディングで常に最新情報が得られる',
            'コンテキスト100万トークンは他モデルの圧倒的優位',
            '個人開発のプロトタイプ〜MVP段階はGeminiが最適解'
          ],
          sourceUrl: 'https://x.com/GoogleAI/status/1890901234567890123',
          relatedLinks: [
            { title: 'Google AI Studio（APIキー取得）', url: 'https://aistudio.google.com' },
            { title: 'Gemini API ドキュメント', url: 'https://ai.google.dev/docs' }
          ]
        }
      },
      {
        id: 'indie-dev-ai-saas-success',
        category: '個人開発',
        categoryClass: 'indie',
        gradient: 'linear-gradient(135deg, #c07000 0%, #e09020 100%)',
        headline: '1人でMRR $8K達成：Claude APIとNext.jsで作るAI SaaSの全手順',
        summary: 'Marc Louが語る個人開発の現実。アイデア検証から課金実装まで2週間、Claude APIをコアに据えたSaaS構築の具体的なステップ。「作りすぎるな、まず売れ」の原則。',
        author: 'Marc Lou (@marc_louvion)',
        readTime: '10',
        fullContent: {
          introduction: '個人開発者がAI SaaSを立ち上げMRR $8,000を達成した具体的なプロセス。Claude APIを中心に据えたシンプルな構成で、2週間でMVPをリリース。「機能は後から、まず課金できる状態にする」という逆算の考え方を公開。',
          sections: [
            {
              heading: 'Week 1：アイデア検証（ランディングページのみ）',
              content: 'コードを書く前に、課金意思を確認することが最重要。LPだけ作って事前登録を取る。100人集まれば作る価値あり。',
              steps: [
                'Webflowで48時間以内にLPを作成',
                '"早期アクセスで50%オフ"の事前登録フォームを設置',
                'ProductHuntとTwitterで告知',
                '100人の事前登録を目標に2日間プロモーション',
                '→ 147人登録でGOサインを確認'
              ]
            },
            {
              heading: 'Week 2：MVP実装（機能は最小限）',
              content: 'MVP = 「お金を払ってもいい核心的な価値」だけ実装。CLaude APIを呼ぶ処理+Stripe決済の2つだけ。',
              code: '// Claude API呼び出しの核心部分\nconst response = await anthropic.messages.create({\n  model: "claude-3-5-sonnet-20241022",\n  max_tokens: 2000,\n  messages: [{\n    role: "user",\n    content: buildPrompt(userInput)  // ここがプロダクトの差別化\n  }]\n});\n\n// Stripe決済はCheckout Sessionsで最速実装\nconst session = await stripe.checkout.sessions.create({\n  price_data: { unit_amount: 2900, currency: "usd",\n    recurring: { interval: "month" } },\n  mode: "subscription",\n  success_url: "/dashboard"\n});'
            },
            {
              heading: 'Claude API選択の理由',
              content: 'GPT-4oやGeminiも試したが、最終的にClaudeを採用。理由はアウトプットの安定性と、プロンプト調整のしやすさ。',
              steps: [
                '出力の一貫性が高く、プロダクトの品質が安定',
                '長文生成でのハルシネーションが少ない',
                'System promptの制御がしやすい',
                'Batches APIでコスト50%削減（非リアルタイム処理に活用）'
              ]
            },
            {
              heading: 'MRR成長の軌跡',
              content: 'リリース後の数字の推移。',
              steps: [
                'Day 1（リリース日）: $0 → 事前登録者に無料アクセス',
                'Week 1: $400（14人の有料転換）',
                'Month 1: $2,200（口コミとProduct Hunt効果）',
                'Month 3: $8,000（SEOとTwitter継続発信）',
                '現在: $8,400、チャーン率 4%/月'
              ]
            }
          ],
          keyTakeaways: [
            'コードより先にLP→事前登録で需要検証が鉄則',
            'MVPはClaude API呼び出し＋Stripe決済の2つだけで十分',
            'Claude APIは出力安定性でGPT/Geminiより個人開発に向く',
            '2週間でリリース、改善は課金ユーザーの声を聞いてから'
          ],
          sourceUrl: 'https://x.com/marc_louvion/status/1890987654321098765',
          relatedLinks: [
            { title: 'ShipFast（Marc LouのNext.jsボイラープレート）', url: 'https://shipfa.st' },
            { title: 'Claude Batches API', url: 'https://docs.anthropic.com/en/docs/build-with-claude/message-batches' }
          ]
        }
      },
      {
        id: 'ios-ai-integration-swiftui',
        category: 'iOS開発',
        categoryClass: 'mobile',
        gradient: 'linear-gradient(135deg, #0f4c75 0%, #1b6ca8 100%)',
        headline: 'SwiftUI × Claude API：デバイスAIの限界を超える実装パターン',
        summary: 'Core MLのオンデバイス処理とClaude APIのクラウド処理を使い分けるハイブリッドアーキテクチャ。プライバシーとパフォーマンスを両立するiOSアプリ設計の決定版。',
        author: 'Paul Hudson (@twostraws)',
        readTime: '9',
        fullContent: {
          introduction: 'iOSアプリでAIを活用する際の最重要判断：「オンデバイス（Core ML）」か「クラウドAPI（Claude/GPT/Gemini）」か。この二択を適切に使い分けるハイブリッドアーキテクチャが2026年のiOS AI実装のスタンダードになっています。',
          sections: [
            {
              heading: 'オンデバイスvsクラウドAPIの判断基準',
              content: 'どちらを使うかの判断はシンプル。レイテンシ・プライバシー・コストのトレードオフで決まります。',
              steps: [
                'オンデバイス（Core ML）: 顔認証、画像分類、テキスト分類 → 低レイテンシ必須・プライバシー最重要',
                'クラウドAPI: 自然言語生成、複雑な推論、マルチターン対話 → 精度最重要',
                'ハイブリッド: まずCore MLで判定→複雑な場合はAPIにエスカレーション',
                '課金モデル: API呼び出し回数をユーザーに紐付け、Stripeで管理'
              ]
            },
            {
              heading: 'Claude API × SwiftUI実装',
              content: 'Anthropic公式iOSライブラリはないが、URLSessionで直接叩くのがシンプル。',
              code: 'import SwiftUI\n\nstruct ChatView: View {\n    @State private var response = ""\n    \n    func callClaude(_ message: String) async {\n        let url = URL(string: "https://api.anthropic.com/v1/messages")!\n        var request = URLRequest(url: url)\n        request.httpMethod = "POST"\n        request.setValue("application/json", forHTTPHeaderField: "Content-Type")\n        request.setValue(apiKey, forHTTPHeaderField: "x-api-key")\n        request.setValue("2023-06-01", forHTTPHeaderField: "anthropic-version")\n        \n        let body: [String: Any] = [\n            "model": "claude-3-5-sonnet-20241022",\n            "max_tokens": 1024,\n            "messages": [["role": "user", "content": message]]\n        ]\n        // ...\n    }\n}'
            },
            {
              heading: 'Streaming対応でUXを向上',
              content: 'Claude APIのStreamingを使えば、ChatGPT風のリアルタイムテキスト表示が実装できます。',
              steps: [
                'URLSessionDataTaskでSSE（Server-Sent Events）を受信',
                'data: {...}形式のチャンクをJSONデコード',
                '@Publishedプロパティに逐次追加してSwiftUIを更新',
                'delta.textを@StateObjectで管理'
              ]
            },
            {
              heading: 'App Store提出時の注意点',
              content: 'AIを使ったアプリのApp Store審査では追加の配慮が必要です。',
              steps: [
                'プライバシーマニフェスト（PrivacyInfo.xcprivacy）にAPI送信を明記',
                'AIが生成したコンテンツには明示的なラベルを表示（App Store guideline 2.5.2）',
                '有害コンテンツフィルタリングの実装を証明できる準備を',
                'APIキーはキーチェーンに保存、絶対にソースコードに直書きしない'
              ]
            }
          ],
          keyTakeaways: [
            'Core ML（オンデバイス）とクラウドAPIのハイブリッドが最適解',
            'Claude APIはURLSessionで直接叩ける（専用ライブラリ不要）',
            'Streaming実装でChatGPT風のUXが実現可能',
            'App Store審査でAI関連の追加配慮が必要（プライバシーマニフェスト必須）'
          ],
          sourceUrl: 'https://x.com/twostraws/status/1891012345678901234',
          relatedLinks: [
            { title: 'Hacking with Swift', url: 'https://www.hackingwithswift.com' },
            { title: 'Apple Core ML ドキュメント', url: 'https://developer.apple.com/documentation/coreml' },
            { title: 'Claude API リファレンス', url: 'https://docs.anthropic.com/en/api/messages' }
          ]
        }
      }
    ],

    briefs: [
      { headline: 'DeepSeek-R1がOllamaで利用可能に', text: 'ollama run deepseek-r1 のワンコマンドで動作。1.5B〜70Bまでサイズ選択可能。' },
      { headline: 'GPT-5 API、Plusユーザーから段階的ロールアウト開始', text: '既存コードの変更不要。model: "gpt-5" に変えるだけで移行可。' },
      { headline: 'Gemini 2.0 Flashが全ユーザーに一般公開', text: '無料枠で100万RPM達成。Google検索グラウンディング付きで個人開発者に朗報。' },
      { headline: 'Xcode 17、AI補完機能をデフォルト有効化', text: 'Appleが独自の開発者向けAI機能を強化。SwiftUI開発の生産性が大幅改善の見込み。' }
    ],

    opinions: [
      {
        id: 'opinion-indie-dev-2026',
        authorLabel: '分析：',
        author: 'Pieter Levels (@levelsio)',
        headline: '2026年の個人開発はAIエージェントを「チームメンバー」として雇う時代へ',
        excerpt: '今の1人開発者は実質チームを持っている。Claude CodeでコードをレビューしてもらいながらOpenClawで作業を自動化し、Cursorで実装する。月$100以下のAIサブスクでエンジニア1人分の仕事量を超えている。',
        fullContent: {
          introduction: 'Pieter Levels（@levelsio）が語る2026年の個人開発の現実。月$100以下のAIサブスクで、かつては5人チームが必要だった仕事を1人でこなせる時代になった。その具体的なツール構成と働き方を解説。',
          sections: [
            {
              heading: '1人開発者の現実のAIスタック',
              content: 'Pieterが実際に使っている月次コスト$97のAIツール構成。',
              steps: [
                'Claude Code $20/月: コーディング・レビュー・リファクタリング担当',
                'Cursor Pro $20/月: IDEレベルの補完・マルチファイル編集',
                'OpenClaw $27/月: 定型作業の自動化・スケジュール実行',
                'Perplexity $20/月: リサーチ・競合分析',
                'ChatGPT Plus $20/月: ブレインストーミング・コピーライティング',
                '合計: $107/月 ≈ エンジニア1人月の1/500のコスト'
              ]
            },
            {
              heading: '個人開発での役割分担',
              content: 'それぞれのAIを「専門スタッフ」として扱う思考法が生産性を最大化する。',
              steps: [
                'Claude Code = シニアエンジニア（コードレビュー・設計相談）',
                'Cursor = ジュニアエンジニア（実装・テスト）',
                'OpenClaw = 総務・秘書（定型作業・スケジュール管理）',
                'ChatGPT = マーケター（コピー・LPテキスト生成）',
                'Perplexity = リサーチャー（競合・市場調査）'
              ]
            },
            {
              heading: '2026年のインディーハッカーへのアドバイス',
              content: 'AIを使った個人開発を始めるなら今がベストタイミング。しかし落とし穴もある。',
              steps: [
                '✅ まずシンプルな課題を解く：複雑なAIプロダクトより単純な自動化ツールの方が売れる',
                '✅ AIコスト = バリアブルコスト：最初は無料枠・安価なモデルで検証',
                '❌ 多機能化の罠：AIで何でもできる≠何でも作るべき',
                '❌ 技術偏重：プロンプト設計より顧客獲得に時間を使え',
                '🎯 目標：6ヶ月でMRR $1K、その後スケール判断'
              ]
            }
          ],
          keyTakeaways: [
            '月$100のAIスタックでかつての5人チーム相当の生産性',
            '各AIを「役割を持つスタッフ」として使い分けるのが鍵',
            '複雑なAIプロダクトより単純な自動化ツールの方が売れる',
            '技術より顧客獲得に時間を使うことが個人開発成功の鉄則'
          ],
          sourceUrl: 'https://x.com/levelsio/status/1891098765432109876'
        }
      },
      {
        id: 'opinion-android-ai-dev',
        authorLabel: 'コラム：',
        author: 'Rudrank Riyam (@rudrankriyam)',
        headline: 'SwiftUI開発者がAndroidに挑戦：AIコーディングで学習コストが激変',
        excerpt: 'SwiftUI歴3年の開発者がClaude Codeを使ってJetpack Compose未経験からAndroidアプリをリリースするまでの60日間。AIアシスタントなしでは不可能だった横断開発が現実になった。',
        fullContent: {
          introduction: 'SwiftUI歴3年のiOSデベロッパーがClaude Codeを使って全くの未経験からAndroidアプリをリリースするまでの60日間の記録。「AIがなければ半年かかった」と語る、2026年のクロスプラットフォーム開発の新しい現実。',
          sections: [
            {
              heading: '開始時のスペック',
              content: 'SwiftUI/iOS: 3年、Kotlin/Android: ゼロ。Jetpack Composeは名前を知っている程度。',
            },
            {
              heading: 'Day 1-14：Claude Codeによる「翻訳」学習',
              content: 'SwiftUIのコードをJetpack Composeに変換してもらいながら、パターンを学ぶ手法が最も効率的だった。',
              code: '// SwiftUIで書いたコードをClaudeに貼り付けて質問\n// "このSwiftUIコードをJetpack Composeに変換して、\n// 各行の対応関係も説明してください"\n\n// SwiftUI（自分が知っている）\nstruct ContentView: View {\n    @State private var text = ""\n    var body: some View {\n        TextField("入力", text: $text)\n    }\n}\n\n// Jetpack Compose（Claudeが変換）\n@Composable\nfun ContentView() {\n    var text by remember { mutableStateOf("") }\n    OutlinedTextField(value = text,\n        onValueChange = { text = it },\n        label = { Text("入力") })\n}'
            },
            {
              heading: 'Day 30-60：実際のアプリ開発',
              content: 'iOSアプリと同じ機能セットをAndroidで実装。Claude Codeがコードレビュー・デバッグを担当。',
              steps: [
                'Architecture: MVI + Hilt（Claudeが推奨、理由も説明してくれた）',
                'API通信: Retrofit + Kotlinx Serialization',
                'テスト: Compose UIテストのコードを全てClaude Codeが生成',
                'Play Storeの審査要件もClaudeに確認しながら対応',
                'Day 58: 初回審査通過、App Storeと同日リリース成功'
              ]
            },
            {
              heading: 'iOS vs Android：AIで見えた違い',
              content: 'AIで両OS開発して見えた本質的な違い。',
              steps: [
                'デバッグ難易度: AndroidはLogcatが詳細 → Claudeとのデバッグセッションが効率的',
                '端末多様性: Androidは画面サイズ対応が複雑 → Claudeに具体的なデバイス名で質問',
                '審査: Google PlayはiOSより審査が緩め（ただし最近厳格化傾向）',
                'マーケット: 日本ではiOS優位、東南アジアはAndroid優位'
              ]
            }
          ],
          keyTakeaways: [
            'SwiftUI知識をベースにJetpack Composeを「翻訳」学習するのが最速',
            'Claude Codeはコードレビューより「理由の説明」に価値がある',
            '未経験から60日でクロスプラットフォームリリースが現実になった',
            'AIなしでは半年以上かかる学習を大幅に圧縮できた'
          ],
          sourceUrl: 'https://x.com/rudrankriyam/status/1891123456789012345',
          relatedLinks: [
            { title: 'Jetpack Compose 公式ドキュメント', url: 'https://developer.android.com/compose' },
            { title: 'SwiftUI to Compose 対応表', url: 'https://www.jetpackcompose.app/compare-to-swiftui' }
          ]
        }
      }
    ]
  };
}

function main() {
  // --edition morning|noon|evening の引数を受け取る
  const args = process.argv.slice(2);
  const editionArg = args.find(a => a.startsWith('--edition=') || a === '--edition');
  let edition = 'default';
  if (editionArg) {
    edition = editionArg.startsWith('--edition=')
      ? editionArg.split('=')[1]
      : (args[args.indexOf('--edition') + 1] || 'default');
  }

  let data;
  if (edition === 'morning') {
    const { generateMorningData } = require('./editions/morning');
    data = generateMorningData();
    console.log('🌅 朝刊モード：AIモデル最新動向');
  } else if (edition === 'noon') {
    const { generateNoonData } = require('./editions/noon');
    data = generateNoonData();
    console.log('☀️ 昼刊モード：実践Tips・ツール活用');
  } else if (edition === 'evening') {
    const { generateEveningData } = require('./editions/evening');
    data = generateEveningData();
    console.log('🌙 夕刊モード：個人開発・iOS/Android事例');
  } else {
    console.log('📰 デフォルトモード（混合）');
    data = generateMockData();
  }

  const date = new Date().toISOString().split('T')[0];
  const editionSuffix = edition !== 'default' ? `-${edition}` : '';
  const outputPath = path.join(OUTPUT_DIR, `${date}${editionSuffix}.json`);

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`✅ 生成完了: ${outputPath}`);
  console.log(`📊 データサマリ:`);
  console.log(`   - Hero: ${data.hero.headline.substring(0, 40)}...`);
  console.log(`   - Sidebar: ${data.sidebar.length} 件`);
  console.log(`   - Middle: ${data.middle.length} 記事`);
  console.log(`   - Briefs: ${data.briefs.length} 件`);
  console.log(`   - Opinions: ${data.opinions.length} コラム`);
  return outputPath;
}

if (require.main === module) {
  const outputPath = main();
  console.log(`\n📰 次のステップ: ${outputPath} からHTMLを生成`);
}

module.exports = { generateMockData, generateSparkline, calculateReadPercent, getReadLabel, getCategoryClass };
