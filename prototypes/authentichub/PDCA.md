# PDCA Evaluation: AuthenticHub (Human-Verified BTS Engine)

## 1. Plan: アイデア概要
AI生成コンテンツが氾濫する2026年、視聴者が求めているのは「加工されていない真実（Behind The Scenes: BTS）」である。 AuthenticHubは、クリエイターの「制作過程」を自動的に記録・検証し、編集された本編動画と紐づけることで、そのコンテンツが「人間によって作られた本物であること（Proof of Human）」を証明するプラットフォーム。

- **解決する課題:** AI生成コンテンツへの不信感、BTSコンテンツ制作の手間、人間としてのブランド価値の証明。
- **ターゲット:** ソロプレナー、映像作家、アーティスト、信頼を重視するインフルエンサー。
- **コア機能:** 
  - **Auto-BTS Capture**: PC画面、カメラ、音声のメタデータを定期的に記録（カメラ・トゥ・クラウド連携）。
  - **Authenticity Badge**: 「人間が制作した証」を、本編動画のメタデータやQRコードで付与。
  - **Verified Timeline**: 本編の特定のシーンが「どのツールで、どのくらいの時間をかけて」作られたかを可視化するダッシュボード。

## 2. Do: 市場性・技術実現性・独自性の評価

### 評価基準 (1-10)
1. **市場ニーズ (Market Fit): 9.0/10** (2026年、AI不信感はピークに達し、"人間性"が最大の差別化要因になる)
2. **技術実現性 (Feasibility): 8.0/10** (Screen recording API, WebVTT, OAuth, Blockchain-based timestampingを活用)
3. **独自性 (Uniqueness): 8.5/10** (単なるBTSではなく「検証可能性」にフォーカスしたツールは未開拓)
4. **収益性 (Profitability): 7.5/10** (サブスクリプション + 企業向けAPI + 認証バッジ発行手数料)

**総合スコア: 8.25/10** (基準値7.5をクリア)

## 3. Check: フィードバックと改善 (Iteration 1)
- **懸念点:** 常に画面を記録することによるプライバシーとリソース負荷。
- **改善策:** 「常時記録」ではなく「クリエイティブツールの使用時のみ」または「特定のトリガー（録画開始）」に限定。さらに、記録データをAIが要約し、プライバシー情報をマスキングした「検証用タイムラプス」を自動生成する。

## 4. Act: 実装フェーズへ
- **UI/UX:** AI感のない、ミニマルで「道具」としての信頼感があるプロフェッショナルなデザイン。
- **プロトタイプ:** Next.js + Tailwind CSSで構築。ダッシュボード、検証用タイムライン、認証バッジのUIを実装。

---

## 定量評価 (Quantitative Scoring)
- **PUGEF Score: 8.3/10** (P:9, U:8, G:8, E:9, F:7.6)
- **ICE Score: 8.5/10** (Impact:9, Confidence:8, Ease:8.5)
- **Market Score: 23/30** (Size:8, Comp:7, Monetization:8)
- **Advantage Score: 24/30** (Unique:9, Barrier:8, Scalability:7)

**Total Adjusted Score: 8.25** ✅ (Next Step: Prototype)
