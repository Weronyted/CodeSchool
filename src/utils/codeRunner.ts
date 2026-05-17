export interface RunResult {
  output: string[]
  error: string | null
  html: string | null
}

function escapeJs(js: string): string {
  return js.replace(/<\/script(\s*>)/gi, '<\\/script$1')
}

function escapeCss(css: string): string {
  return css.replace(/<\/style(\s*>)/gi, '<\\/style$1')
}

/**
 * Builds a sandboxed srcdoc for the HTML preview iframe.
 *
 * Security guarantees:
 *  - CSP blocks all outbound network requests and nested frames.
 *  - </script> and </style> in user code are escaped to prevent tag injection.
 *  - This string is used as iframe.srcdoc — the iframe must have
 *    sandbox="allow-scripts" and NO allow-same-origin.
 */
export function buildHTMLPage(html: string, css?: string, js?: string): string {
  const safeJs  = js  ? escapeJs(js)   : ''
  const safeCss = css ? escapeCss(css) : ''
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; connect-src 'none'; frame-src 'none';">
  <style>
    body { font-family: sans-serif; margin: 16px; }
    ${safeCss}
  </style>
</head>
<body>
  ${html}
  ${safeJs ? `<script>${safeJs}<\/script>` : ''}
</body>
</html>`
}

/**
 * Run JavaScript in a hidden sandboxed iframe and collect console output.
 *
 * Uses sandbox="allow-scripts" WITHOUT allow-same-origin, so the student
 * code runs in a null origin and cannot access cookies, localStorage,
 * IndexedDB, or any Firebase credentials from the parent page.
 *
 * Returns a cleanup function; call it to abort early.
 */
export function runJavaScriptSandboxed(
  code: string,
  onOutput: (line: string, level: string) => void,
  onError: (msg: string) => void,
  onDone: () => void,
  timeoutMs = 6000,
): () => void {
  const runId = Math.random().toString(36).slice(2)
  const iframe = document.createElement('iframe')
  iframe.style.cssText =
    'position:fixed;width:0;height:0;border:0;left:-9999px;top:-9999px;visibility:hidden;'
  iframe.setAttribute('sandbox', 'allow-scripts')

  const rid      = JSON.stringify(runId)
  const safeCode = escapeJs(code)

  iframe.srcdoc = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; connect-src 'none'; frame-src 'none';">
</head>
<body>
<script>
(function(){
  var RID=${rid};
  function post(d){try{parent.postMessage(Object.assign({},d,{runId:RID}),'*')}catch(e){}}
  ['log','warn','info','error'].forEach(function(lv){
    var _o=console[lv].bind(console);
    console[lv]=function(){
      var args=Array.prototype.slice.call(arguments).map(function(x){
        if(x===null)return 'null';if(x===undefined)return 'undefined';
        try{return typeof x==='object'?JSON.stringify(x,null,2):String(x);}catch(e){return String(x);}
      });
      _o.apply(console,arguments);
      post({type:'console',level:lv,args:args});
    };
  });
  window.onerror=function(msg,_s,line,_c,_e){
    post({type:'error',message:String(msg).replace(/^[A-Za-z]*Error:\\s*/,''),lineno:line});
    return true;
  };
  window.addEventListener('unhandledrejection',function(ev){
    var r=ev.reason;
    post({type:'error',message:r?(r.message||String(r)):'Promise rejected'});
  });
  try{
    ${safeCode}
  }catch(e){
    post({type:'error',message:e&&e.message?e.message:String(e)});
  }
  post({type:'done'});
})();
<\/script>
</body>
</html>`

  let timer: ReturnType<typeof setTimeout> | null = null

  function cleanup() {
    if (timer) clearTimeout(timer)
    window.removeEventListener('message', onMsg)
    try { document.body.removeChild(iframe) } catch { /* already removed */ }
  }

  function onMsg(ev: MessageEvent) {
    if (ev.source !== iframe.contentWindow) return
    const d = ev.data
    if (!d || typeof d !== 'object' || d.runId !== runId) return

    if (d.type === 'console') {
      onOutput((d.args as string[]).join(' '), d.level as string)
    } else if (d.type === 'error') {
      onError(d.message as string)
      cleanup()
      onDone()
    } else if (d.type === 'done') {
      cleanup()
      onDone()
    }
  }

  window.addEventListener('message', onMsg)
  document.body.appendChild(iframe)

  timer = setTimeout(() => {
    cleanup()
    onError('Код работал слишком долго — возможно, бесконечный цикл')
    onDone()
  }, timeoutMs)

  return cleanup
}
