# cxt-template
自作のChrome拡張機能を作り始める時のベースとなるテンプレートファイルです。


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
