'use strict';
const dialog = document.querySelector('#info-dialog');
const title = document.querySelector('#dialog-title');
const body = document.querySelector('#dialog-body');
const showDialog = (heading, content) => {
  title.textContent = heading;
  body.replaceChildren();
  if (typeof content === 'string') body.innerHTML = content;
  else body.append(content);
  dialog.showModal();
};
document.querySelectorAll('.url-form').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const input = form.elements.url;
    input.setCustomValidity('');
    let url;
    try {
      url = new URL(input.value);
      if (!['https:', 'http:'].includes(url.protocol) || !url.hostname.includes('.')) throw new Error('URL');
    } catch {
      input.setCustomValidity('https:// から始まる公開サイトのURLを入力してください。');
      input.reportValidity();
      return;
    }
    const fragment = document.createDocumentFragment();
    const intro = document.createElement('p');
    intro.textContent = 'URLの入力を確認しました。';
    const address = document.createElement('p');
    address.className = 'submitted-url';
    address.textContent = url.href;
    const note = document.createElement('p');
    note.textContent = '現在はデザインプレビューです。診断APIは未接続のため、AIっぽさの解析やスコアの算出は行いません。入力したURLは外部に送信・保存されません。';
    const contact = document.createElement('a');
    contact.href = 'mailto:contact@onebe-create.com?subject=' + encodeURIComponent('Webサイト改善のご相談');
    contact.textContent = 'サイト改善についてOneBeに相談する →';
    fragment.append(intro, address, note, contact);
    showDialog('診断のプレビュー', fragment);
  });
  form.elements.url.addEventListener('input', () => form.elements.url.setCustomValidity(''));
});
document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.dialog === 'flow') {
    showDialog('診断の流れ', '<ol><li>公開されているWebサイトのURLを入力します。</li><li>文章・デザイン・写真や画像・UIの4つの視点で確認します。</li><li>自社らしさが伝わる表現を考えるきっかけにします。</li></ol><p>現在は画面と操作を確認するためのデザインプレビューです。実際の解析機能は未接続です。</p>');
  } else {
    showDialog('料金・プラン', '<p>このデザインプレビューは無料でご覧いただけます。</p><p>クリエイティブ制作やサイト改善は、ご相談内容に応じて個別にご案内します。</p><p><a href="mailto:contact@onebe-create.com?subject=制作のご相談">制作について相談する →</a></p>');
  }
}));
document.querySelectorAll('.dialog-close,.dialog-ok').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
const menu = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const closeMenu = () => { mobileNav.hidden = true; menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'メニューを開く'); };
menu.addEventListener('click', () => { const expanded = menu.getAttribute('aria-expanded') === 'true'; mobileNav.hidden = expanded; menu.setAttribute('aria-expanded', String(!expanded)); menu.setAttribute('aria-label', expanded ? 'メニューを開く' : 'メニューを閉じる'); });
mobileNav.querySelectorAll('a,button').forEach(item => item.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if(event.key === 'Escape') closeMenu(); });
document.querySelector('.all-faq').addEventListener('click', event => {
  const items = [...document.querySelectorAll('.faq details')];
  const shouldOpen = items.some(item => !item.open);
  items.forEach(item => item.open = shouldOpen);
  event.currentTarget.firstChild.textContent = shouldOpen ? 'すべての質問を閉じる ' : 'すべての質問を見る ';
});
document.querySelectorAll('a[href="#diagnosis"]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('#diagnosis input').focus({preventScroll:true});
  document.querySelector('#top').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}));
