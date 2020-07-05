import { isNode } from './isNode';

function getViewportSize(name: 'Width' | 'Height') {
  let size;
  const _name = name.toLowerCase();
  const document = window.document;
  const documentElement = document.documentElement;

  // IE6 & IE7 don't have window.innerWidth or innerHeight
  if (window['inner' + name] === undefined) {
    size = documentElement['client' + name];
  } else if (window['inner' + name] !== documentElement['client' + name]) {
    // WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy
    // Insert markup to test if a media query will match document.doumentElement["client" + Name]
    const bodyElement = document.createElement('body');
    bodyElement.id = 'vpw-test-b';
    bodyElement.style.cssText = 'overflow:scroll';
    const divElement = document.createElement('div');
    divElement.id = 'vpw-test-d';
    divElement.style.cssText = 'position:absolute;top:-1000px';
    // Getting specific on the CSS selector so it won't get overridden easily
    divElement.innerHTML =
      '<style>@media(' +
      _name +
      ':' +
      documentElement['client' + name] +
      'px){body#vpw-test-b div#vpw-test-d{' +
      _name +
      ':7px!important}}</style>';
    bodyElement.appendChild(divElement);
    documentElement.insertBefore(bodyElement, document.head);

    if (divElement['offset' + name] === 7) {
      // Media query matches document.documentElement["client" + Name]
      size = documentElement['client' + name];
    } else {
      // Media query didn't match, use window["inner" + Name]
      size = window['inner' + name];
    }
    // Cleanup
    documentElement.removeChild(bodyElement);
  } else {
    // Default to use window["inner" + Name]
    size = window['inner' + name];
  }

  return size;
}


export function getDimension(wMin, hMin, wMax, hMax) {
  let width = isNode ? 1024 : getViewportSize('Width');
  let height = isNode ? 768 : getViewportSize('Height');

  width = wMin ? (width < wMin ? wMin : width) : width;
  width = wMax ? (width > wMax ? wMax : width) : width;
  height = hMin ? (height < hMin ? hMin : height) : height;
  height = hMax ? (height > hMax ? hMax : height) : height;

  return { width, height };
}
