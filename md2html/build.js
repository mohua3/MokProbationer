const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

const src = '/workspace/design/影视编导策划智能体-综合技术文档.md';
const out = '/workspace/design/影视编导策划智能体-综合技术文档.html';

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

const text = fs.readFileSync(src, 'utf8');
const body = md.render(text);

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>影视编导策划智能体 · 综合技术文档</title>
<style>
:root{
  --bg:#0e1116; --panel:#161b23; --panel2:#1d242f;
  --ink:#e6edf3; --muted:#8b98a9; --line:#2a3340;
  --brand:#8b5cf6; --brand2:#a78bfa; --amber:#f59e0b; --cyan:#22d3ee;
  --serif:'Georgia','Songti SC','STSong',serif; --sans:'PingFang SC','Microsoft YaHei',system-ui,sans-serif;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);line-height:1.75}
.layout{display:flex;min-height:100vh}
/* 侧栏 */
.toc{width:300px;flex:none;background:var(--panel);border-right:1px solid var(--line);padding:22px 18px;position:sticky;top:0;height:100vh;overflow-y:auto;font-size:13px}
.toc-brand{font-family:var(--serif);font-size:15px;font-weight:700;color:var(--ink);letter-spacing:.5px;padding-bottom:14px;border-bottom:1px solid var(--line);margin-bottom:14px}
.toc-brand span{color:var(--brand2)}
.toc a{display:block;color:var(--muted);text-decoration:none;padding:6px 8px;border-radius:6px;margin:1px 0;border-left:2px solid transparent}
.toc a:hover{color:var(--ink);background:var(--panel2)}
.toc a.h2{font-weight:600;color:var(--ink)}
.toc a.h3{padding-left:22px}
/* 主内容 */
.doc{flex:1;max-width:900px;margin:0 auto;padding:40px 48px 80px}
.hero{border-bottom:1px solid var(--line);padding-bottom:26px;margin-bottom:34px}
.hero .tag{display:inline-block;font-size:11px;letter-spacing:.12em;color:var(--amber);border:1px solid var(--line);padding:3px 10px;border-radius:20px;margin-bottom:14px;background:#0a0e14}
.hero h1{font-family:var(--serif);font-size:30px;margin:0 0 8px;line-height:1.3}
.hero .sub{color:var(--muted);font-size:15px}
.doc h1{font-family:var(--serif);font-size:25px;border-bottom:1px solid var(--line);padding-bottom:12px;margin:44px 0 18px;scroll-margin-top:20px}
.doc h1::before{content:'';display:inline-block;width:8px;height:22px;background:var(--brand);margin-right:12px;border-radius:2px;vertical-align:-3px}
.doc h2{font-size:19px;margin:30px 0 12px;color:#eef2f7;scroll-margin-top:20px}
.doc h3{font-size:16px;margin:24px 0 10px;color:var(--brand2);scroll-margin-top:20px}
.doc p{margin:10px 0}
.doc ul,.doc ol{margin:10px 0;padding-left:24px}
.doc li{margin:5px 0}
.doc strong{color:#fff}
.doc code{background:var(--panel2);border:1px solid var(--line);border-radius:5px;padding:2px 6px;font-size:13px;font-family:'JetBrains Mono','SF Mono',Consolas,monospace;color:var(--cyan)}
.doc pre{background:#0b0f15;border:1px solid var(--line);border-radius:10px;padding:16px;overflow-x:auto;margin:14px 0}
.doc pre code{background:none;border:none;padding:0;color:#c9d1d9;font-size:13px;line-height:1.6}
.doc blockquote{border-left:3px solid var(--brand);background:var(--panel);margin:14px 0;padding:10px 16px;color:var(--muted);border-radius:0 8px 8px 0}
.doc table{border-collapse:collapse;width:100%;margin:14px 0;font-size:13.5px}
.doc th,.doc td{border:1px solid var(--line);padding:8px 12px;text-align:left}
.doc th{background:var(--panel2);color:var(--ink)}
.doc tr:nth-child(even) td{background:#12171f}
mark{background:#3b2f10;color:var(--amber);padding:0 4px;border-radius:3px}
a{color:var(--brand2)}
/* 顶部进度条 */
.progress{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--brand),var(--amber));width:0;z-index:99}
@media(max-width:900px){.toc{display:none}.doc{padding:24px 20px}}
</style>
</head>
<body>
<div class="progress" id="pb"></div>
<div class="layout">
  <nav class="toc" id="toc"><div class="toc-brand">影视编导智能体 <span>· 技术文档</span></div><div id="tocBody"></div></nav>
  <main class="doc">
    <div class="hero">
      <span class="tag">综合技术基线 · v1.0</span>
      <h1>影视编导策划智能体 · 综合技术文档</h1>
      <div class="sub">小说→剧本→分镜→提示词→电影级分镜编排 · 桌面应用智能体 · 复盘沉淀与训练闭环</div>
    </div>
    ${body}
  </main>
</div>
<script>
// build toc
const heads=document.querySelectorAll('.doc h1');
const tocBody=document.getElementById('tocBody');
heads.forEach(h=>{
  const id=h.textContent.trim().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g,'-');
  h.id=id;
  const a=document.createElement('a');
  a.href='#'+id; a.textContent=h.textContent; a.className='h2';
  tocBody.appendChild(a);
});
// scroll progress
const pb=document.getElementById('pb');
addEventListener('scroll',()=>{const d=document.documentElement;const max=(d.scrollHeight-d.clientHeight)||1;pb.style.width=(d.scrollTop/max*100)+'%';});
</script>
</body>
</html>`;
fs.writeFileSync(out, html, 'utf8');
console.log('written:', out, path.basename(out));