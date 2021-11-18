(function() {
  let options = {};

  const from_extension = (typeof chrome !== 'undefined' && chrome.extension);
  if (document.body.classList.contains('_cxt-template')) {
    if (!from_extension) {
      const el = document.querySelectorAll('script[src*="content.js"]');
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
      process();
    });
  } else {
    process();
  }

  function init_options() {
    options.preset = true;
  }

  function process() {
  }

})();
