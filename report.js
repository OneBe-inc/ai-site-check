'use strict';
// The fragment is local to the browser and is never included in HTTP requests.
// All report data remains the supplied VAIZO design example until an API is connected.
const submitted = new URLSearchParams(location.hash.slice(1)).get('url');
if (submitted) {
  try {
    const url = new URL(submitted);
    if (['http:', 'https:'].includes(url.protocol)) {
      const notice = document.querySelector('#submitted-notice');
      notice.textContent = '入力したURL：' + url.href + ' ｜ 現在はVAIZOのサンプルレポートを表示しています。入力サイトの解析は行っていません。';
      notice.hidden = false;
    }
  } catch { /* An invalid fragment does not alter the sample report. */ }
}
