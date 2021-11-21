(function(classname, init_options, process) {
  const CLASSNAME = classname;
  let options = {};

  const from_extension = (typeof chrome !== 'undefined' && chrome.extension);
  if (document.body.classList.contains(CLASSNAME)) {
    if (!from_extension) {
      const script_src = document.currentScript.src;
      const el = document.querySelectorAll(`script[src="${script_src}"]`);
      if (el.length) {
        const last = el[el.length - 1];
        last.remove();
      }
    }
    document.body.classList.toggle(`${CLASSNAME}-active`);
    return;
  }

  options.preset = true;
  init_options(options);
  if (from_extension) {
    chrome.storage.sync.get('options', function(result) {
      if ('options' in result) {
        options = Object.assign({}, result.options);
        options.preset = false;
      }
      start();
    });
  } else {
    start();
  }

  function start() {
    document.body.classList.add(CLASSNAME, `${CLASSNAME}-active`);
    process(options);
  }
})('_example',   // [1] <body>に追加するclass名
function(options) {
  // [2] オプションの初期値を設定するコードをここに書く ---
  options.items = {item1: true, item2: true};
  options.colors = {color1: '#ff0000', color2: '#0000ff'};
  // --- ここまで [2]
},
function(options) {
  // [3] 機能を実装するコードの本体をここに書く ---
  console.log('### start process ###', options);
  // --- ここまで [3]
});
