# cxt-template
自作のChrome拡張機能を作り始める時のベースとなるテンプレートファイルです。[Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)に対応しています。cxt-templateは以下のカストマイズ可能なUIおよび機能を提供します。
- UI: オプションページ
- UI: Chromeツールバーに表示される拡張アイコンのトグル（ON/OFF表示）
- オプション項目の設定値の保存と読み込み
- [ユーザー定義](#user-defined-script)scriptの実行
- ユーザー定義CSSのコンテンツへの挿入

## Installation
適当なディレクトリにリポジトリをcloneします。もしくはzipファイルをダウンロードして解凍します。
```
$ git clone https://github.com/kazhashimoto/cxt-template.git
```

Chromeを起動して、以下の手順でcxt-templateを拡張機能として読み込みます。
1. ```chrome://extensions/```にアクセスし、拡張機能の管理ページを開きます。（画面の詳細は[こちら](https://developer.chrome.com/docs/extensions/mv3/getstarted/)）
1. 「デベロッパーモード」をONにします。
1. 「パッケージ化されていない拡張機能を読み込む」をクリックします。
1. ファイル読み込みのダイアログで、ローカルに展開したリポジトリの```./cxt-template/extension```ディレクトリを選択します。


## Files
テンプレートのファイル一式は、extensionフォルダにあります。ファイル構成は下表のとおりです。

| ファイル名 | 説明 |
| --- | --- |
| background.js | Chrome拡張のservice workerに使われる[backgroundスクリプト](https://developer.chrome.com/docs/extensions/mv3/service_workers/)です。|
| content.css | Chrome拡張からターゲットのWebページのコンテンツに挿入されるスタイルシートでです。 |
| content.js | Chrome拡張からターゲットのWebページのコンテンツに挿入されるJavaScriptプログラムです。 |
| manifest.json | Chrome拡張の[manifest](https://developer.chrome.com/docs/extensions/mv3/manifest/)ファイルです。 |
| options.css | オプションページのスタイルシートです。 |
| options.html | Chrome拡張の[オプションページ](https://developer.chrome.com/docs/extensions/mv3/options/)のHTMLファイルです。 |
| options.js | オプションページのロジックを実装するJavaScriptファイルです。 |

## Permissions
manifest.jsonで指定しているpermissionは以下の３つです。
```
"permissions": [
  "activeTab", "scripting", "storage"
],
```

| permission | 目的
| --- | --- |
| [activeTab](https://developer.chrome.com/docs/extensions/mv3/manifest/activeTab/) | ユーザーが拡張アイコンをクリックして呼び出した時、現在アクティブなタブへのアクセス権を一時的に与えるため。 |
| scripting | [chrome.scripting]()APIを使用して、ターゲットのWebページのコンテンツにスクリプトやスタイルシートを挿入するため |
| storage | [chrome.storage](https://developer.chrome.com/docs/extensions/reference/storage/) APIを使用して、optionの設定値を保存・読み込みするため　|

## User-defined Script
ユーザー定義scriptの組み込み方法です。
content.jsは以下の構造になっています。機能の組み込みにコーディングが必要な箇所は、コメントに示した[1],[2],[3]の部分です。
```
(function(classname, init_options, process) {
  // ....
})('_example',   // [1] <body>に追加するclass名
function(options) {
  // [2] オプションの初期値を設定するコードをここに書く
},
function(options, active) {
  // [3] 機能を実装するコードの本体をここに書く
  if (!active) {
    // アイコンの状態がOFFになって呼ばれた時
    // OFFの時の処理をここに書く
    return;
  }
  // 以下、アイコンの状態がONの時のコード
});
```

class名[1]は次のようにbody要素に設定されます。
表示中のタブについて、ユーザーが拡張アイコンを最初にクリックした時、もしくは状態がOFF表示のアイコンをクリックした時：
```
<body class="_example _example-active">
```
状態がON表示のアイコンをクリックした時：
```
<body class="_example">
```
