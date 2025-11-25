# MeltyFroth - VRChatイベント公式サイト

VRChat上で営業しているイベント「MeltyFroth」のキャスト紹介用ホームページです。

## 特徴

- **白×ピンク基調**の華やかなデザイン
- **BGM自動再生機能**（音量調節可能）
- **ドロップダウンメニュー**（キャスト一覧から1期生〜5期生を選択）
- **スライドギャラリー**（ボタンで操作）
- **レスポンシブデザイン**（PC・スマートフォン対応）
- **スムーススクロール**とアニメーション効果

## ページ構成

```
meltyfroth-site/
├── index.html          # ホームページ
├── event.html          # イベント詳細ページ
├── cast-1.html         # 1期生ページ
├── cast-2.html         # 2期生ページ
├── cast-3.html         # 3期生ページ
├── cast-4.html         # 4期生ページ
├── cast-5.html         # 5期生ページ
├── css/
│   └── style.css      # スタイルシート
├── js/
│   └── main.js        # JavaScript（BGM、スライドギャラリー機能）
├── images/            # 画像フォルダ
└── audio/             # 音声フォルダ
    └── bgm.mp3        # BGMファイル（追加してください）
```

## ホームページの構成

1. **ヘッダー**
   - ホーム
   - キャスト一覧（ドロップダウン：1期生〜5期生）
   - イベント詳細

2. **ヒーロー画像 + テキストオーバーレイ**
   - 画像の上にタイトルとサブタイトルを表示

3. **セクション画像**
   - もう一枚の画像を表示

4. **キャスト一覧**
   - 画像のみのグリッド表示
   - 各画像をクリックすると個人ページへ

5. **スライドギャラリー**
   - ボタンで左右にスライド
   - レスポンシブ対応（PC: 3枚、タブレット: 2枚、スマホ: 1枚）

6. **Contact**
   - Twitterアイコン×2

7. **フッター**

## セットアップ方法

### 1. 画像の追加

#### ホームページの画像
- **ヒーロー画像**: `images/hero.jpg`（実際の画像に置き換えてください）
  - index.html の `.hero-image-placeholder` を以下のように変更：
  ```html
  <img src="images/hero.jpg" alt="Hero Image" style="width: 100%; height: 100%; object-fit: cover;">
  ```

- **セクション画像**: `images/section-image.jpg`
  - index.html の `.section-image-placeholder` を同様に変更

#### キャスト画像
- キャスト一覧の画像：`images/cast1.jpg`、`images/cast2.jpg`など
  - index.html の `.cast-image-item` を以下のように変更：
  ```html
  <a href="cast-profile-1.html" class="cast-image-link">
      <img src="images/cast1.jpg" alt="キャスト1" class="cast-image-item">
  </a>
  ```

#### スライドギャラリーの画像
- `images/slide1.jpg` ~ `images/slide6.jpg`
  - index.html の `.slide-item` を同様に変更

#### Twitterアイコン
- `images/twitter-icon.png`
  - index.html の `.icon-placeholder` を以下のように変更：
  ```html
  <a href="https://twitter.com/meltyfroth1" target="_blank" class="social-icon">
      <img src="images/twitter-icon.png" alt="Twitter" style="width: 120px; height: 120px; border-radius: 20px;">
  </a>
  ```

### 2. BGMの追加

`audio/` フォルダに `bgm.mp3` という名前でBGMファイルを配置してください。

対応フォーマット：
- MP3
- WAV
- OGG

### 3. コンテンツのカスタマイズ

#### イベント詳細ページ（event.html）
- イベント紹介文
- 開催情報
- 参加方法
- 注意事項

#### 各期生ページ（cast-1.html〜cast-5.html）
- キャスト名とプロフィール
- キャストカードを追加・削除

#### Contactセクション
- TwitterのURLを変更

### 4. サイトの表示

ブラウザで `index.html` を開くか、ローカルサーバーで表示してください。

```bash
# Pythonのローカルサーバーを使う場合
cd meltyfroth-site
python -m http.server 8000

# ブラウザでアクセス
# http://localhost:8000
```

## 機能説明

### ドロップダウンメニュー

- ヘッダーの「キャスト一覧」にマウスをホバーすると、1期生〜5期生の選択肢が表示されます
- クリックすると各期生のページに移動します

### BGMプレイヤー

- 右下の丸いボタンでBGMの再生/停止
- スライダーで音量調節
- 再生中はボタンがアニメーション

### スライドギャラリー

- 左右のボタンでスライド移動
- レスポンシブ対応：
  - PC（1024px以上）: 3枚表示
  - タブレット（768px〜1024px）: 2枚表示
  - スマートフォン（768px未満）: 1枚表示

### ナビゲーション

- ヘッダーメニューをクリックで各ページへ移動
- レスポンシブデザインでスマートフォンにも対応

## カスタマイズガイド

### 色の変更

`css/style.css` の先頭にある CSS変数を編集：

```css
:root {
    --primary-pink: #ff69b4;    /* メインのピンク */
    --light-pink: #ffb6d9;      /* 薄いピンク */
    --dark-pink: #ff1493;       /* 濃いピンク */
    --white: #ffffff;           /* 白 */
    --off-white: #fef5f9;       /* オフホワイト */
}
```

### キャスト画像の数を変更

#### ホームページのキャスト一覧
`index.html` のキャストギャラリーセクションで画像を追加・削除：

```html
<a href="cast-profile-9.html" class="cast-image-link">
    <div class="cast-image-item">画像9</div>
</a>
```

#### 各期生ページ
`cast-1.html` などのキャストカードを追加・削除：

```html
<div class="cast-card">
    <div class="cast-image-placeholder">
        <span>キャスト画像</span>
    </div>
    <h3 class="cast-name">キャスト名</h3>
    <p class="cast-description">プロフィール・紹介文がここに入ります。</p>
</div>
```

### スライド数の変更

`index.html` のスライドギャラリーセクションで `.slide-item` を追加・削除してください。

## デプロイ方法

### GitHub Pages

1. GitHubリポジトリを作成
2. ファイルをアップロード
3. Settings > Pages > Source を `main` ブランチに設定

### Netlify / Vercel

ドラッグ&ドロップでフォルダをアップロードするだけでデプロイ可能

## ブラウザ対応

- Chrome（推奨）
- Firefox
- Safari
- Edge

## ライセンス

© 2025 MeltyFroth. All rights reserved.

## サポート

質問や問題がある場合は、イベント公式のお問い合わせ先までご連絡ください。
