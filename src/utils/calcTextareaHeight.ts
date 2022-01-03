// Thanks to
// https://github.com/andreypopp/react-textarea-autosize/

// let hiddenTextarea;
//
// const HIDDEN_STYLE = `
//     height:0 !important;
//     min-height:0 !important;
//     max-height:none !important;
//     visibility:hidden !important;
//     overflow:hidden !important;
//     position:absolute !important;
//     z-index:-1000 !important;
//     top:0 !important;
//     right:0 !important
// `;
//
// const CONTEXT_STYLE = [
//     'letter-spacing',
//     'line-height',
//     'padding-top',
//     'padding-bottom',
//     'font-family',
//     'font-weight',
//     'font-size',
//     'text-rendering',
//     'text-transform',
//     'width',
//     'text-indent',
//     'padding-left',
//     'padding-right',
//     'border-width',
//     'box-sizing'
// ];
//
// function calculateNodeStyling(node) {
//     const style = window.getComputedStyle(node);
//
//     const boxSizing = style.getPropertyValue('box-sizing');
//
//     const paddingSize = (
//         parseFloat(style.getPropertyValue('padding-bottom')) +
//         parseFloat(style.getPropertyValue('padding-top'))
//     );
//
//     const borderSize = (
//         parseFloat(style.getPropertyValue('border-bottom-width')) +
//         parseFloat(style.getPropertyValue('border-top-width'))
//     );
//
//     const contextStyle = CONTEXT_STYLE
//         .map(name => `${name}:${style.getPropertyValue(name)}`)
//         .join(';');
//
//     return {contextStyle, paddingSize, borderSize, boxSizing};
// }
//
// export default function calcTextareaHeight(targetNode, minRows = null, maxRows = null) {
//     if (!hiddenTextarea) {
//         hiddenTextarea = document.createElement('textarea');
//         document.body.appendChild(hiddenTextarea);
//     }
//
//     let {
//         paddingSize,
//         borderSize,
//         boxSizing,
//         contextStyle
//     } = calculateNodeStyling(targetNode);
//
//     hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
//     hiddenTextarea.value = targetNode.value || targetNode.placeholder || '';
//
//     let height = hiddenTextarea.scrollHeight;
//     let minHeight = -Infinity;
//     let maxHeight = Infinity;
//     let overflowY;
//
//     if (boxSizing === 'border-box') {
//         height = height + borderSize;
//     } else if (boxSizing === 'content-box') {
//         height = height - paddingSize;
//     }
//
//     hiddenTextarea.value = '';
//     let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
//
//     if (minRows !== null) {
//         minHeight = singleRowHeight * minRows;
//         if (boxSizing === 'border-box') {
//             minHeight = minHeight + paddingSize + borderSize;
//         }
//         height = Math.max(minHeight, height);
//     }
//     if (maxRows !== null) {
//         maxHeight = singleRowHeight * maxRows;
//         if (boxSizing === 'border-box') {
//             maxHeight = maxHeight + paddingSize + borderSize;
//         }
//         overflowY = height > maxHeight ? '' : 'hidden';
//         height = Math.min(maxHeight, height);
//     }
//
//     if (!maxRows) {
//         overflowY = 'hidden';
//     }
//
//     return {
//         height: `${height}px`,
//         minHeight: `${minHeight}px`,
//         maxHeight: `${maxHeight}px`,
//         overflowY
//     };
// }

const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`

const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
]

const computedStyleCache: any = {}
let hiddenTextarea: any

function calculateNodeStyling(node: any, useCache = false) {
  const nodeRef = (
    node.getAttribute('id') ||
    node.getAttribute('data-reactid') ||
    node.getAttribute('name'))

  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef]
  }

  const style = window.getComputedStyle(node)

  const boxSizing = (
    style.getPropertyValue('box-sizing') ||
    style.getPropertyValue('-moz-box-sizing') ||
    style.getPropertyValue('-webkit-box-sizing')
  )

  const paddingSize = (
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'))
  )

  const borderSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))
  )

  const sizingStyle = SIZING_STYLE
    .map(name => `${name}:${style.getPropertyValue(name)}`)
    .join(';')

  const nodeInfo = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing
  }

  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo
  }

  return nodeInfo
}

export default function calcTextareaHeight(uiTextNode: any, minRows = null, maxRows = null, useCache = false) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea')
    document.body.appendChild(hiddenTextarea)
  }

  // Fix wrap="off" issue
  // https://github.com/ant-design/ant-design/issues/6577
  if (uiTextNode.getAttribute('wrap')) {
    hiddenTextarea.setAttribute('wrap', uiTextNode.getAttribute('wrap'))
  } else {
    hiddenTextarea.removeAttribute('wrap')
  }

  // Copy all CSS properties that have an impact on the height of the content in
  // the textbox
  const {
    paddingSize, borderSize,
    boxSizing, sizingStyle
  } = calculateNodeStyling(uiTextNode, useCache)

  // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content
  hiddenTextarea.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`)
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || ''

  let minHeight = Number.MIN_SAFE_INTEGER
  let maxHeight = Number.MAX_SAFE_INTEGER
  let height = hiddenTextarea.scrollHeight
  let overflowY

  if (boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    height = height + borderSize
  } else if (boxSizing === 'content-box') {
    // remove padding, since height = content
    height = height - paddingSize
  }

  if (minRows !== null || maxRows !== null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = ' '
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows!
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize
      }
      height = Math.max(minHeight, height)
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows!
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize
      }
      overflowY = height > maxHeight ? '' : 'hidden'
      height = Math.min(maxHeight, height)
    }
  }
  // Remove scroll bar flash when autosize without maxRows
  if (!maxRows) {
    overflowY = 'hidden'
  }

  return {
    height: `${height}px`,
    minHeight: `${minHeight}px`,
    maxHeight: `${maxHeight}px`,
    overflowY
  }
}
