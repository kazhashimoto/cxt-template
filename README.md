# cxt-template
自作のChrome拡張機能を作り始める時のベースとなるテンプレートファイルです。[Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)に対応しています。cxt-templateは以下のカストマイズ可能なUIおよび機能を提供します。
- UI: オプションページ
- UI: アクションボタンのトグル（ON/OFF表示）
- オプション項目の設定値の保存と読み込み
- [ユーザー定義](#User-defined-Script)scriptの実行
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
| [activeTab](https://developer.chrome.com/docs/extensions/mv3/manifest/activeTab/) | ユーザーが拡張を呼び出した時、現在アクティブなタブへのアクセス権を一時的に与えるため。 |
| scripting | [chrome.scripting]()APIを使用して、ターゲットのWebページのコンテンツにスクリプトやスタイルシートを挿入するため |
| storage | [chrome.storage](https://developer.chrome.com/docs/extensions/reference/storage/) APIを使用して、optionの設定値を保存・読み込みするため　|

## User-defined Script
ユーザー定義scriptの組み込み方法です。
