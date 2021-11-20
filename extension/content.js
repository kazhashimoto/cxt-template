(function(process) {
  let options = {};

  const from_extension = (typeof chrome !== 'undefined' && chrome.extension);
  if (document.body.classList.contains('_cxt-template')) {
    if (!from_extension) {
      const script_src = document.currentScript.src;
      const el = document.querySelectorAll(`script[src="${script_src}"]`);
      if (el.length) {
        const last = el[el.length - 1];
        last.remove();
      }
    }
    document.body.classList.toggle('_cxt-template-done');
    return;
  }

  init_options();
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

  function init_options() {
    options.preset = true;
  }

  function start() {
    document.body.classList.add('_cxt-template', '_cxt-template-done');
    process(options);
  }
})(function(options) {
  console.log('### start process ###', options);
});
