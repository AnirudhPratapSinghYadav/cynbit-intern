export default function SandboxFramePage() {
  return (
    <html>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  var TIMEOUT = 2000;
  window.addEventListener("message", function(e) {
    if (e.data && e.data.type === "run") {
      var blob = new Blob([\`
self.onmessage = function(ev) {
  try {
    var fn = new Function(ev.data.code + "\\n" + ev.data.tests);
    var results = fn();
    var capped = Array.isArray(results) ? results.slice(0, 50) : [];
    self.postMessage({ type: "results", results: capped });
  } catch(err) {
    self.postMessage({ type: "error", message: String(err.message || err) });
  }
}
\`], { type: "application/javascript" });
      var url = URL.createObjectURL(blob);
      var worker = new Worker(url);
      var timer = setTimeout(function() {
        worker.terminate();
        URL.revokeObjectURL(url);
        e.source.postMessage({ type: "timeout" }, e.origin || "*");
      }, TIMEOUT);
      worker.onmessage = function(ev) {
        clearTimeout(timer);
        worker.terminate();
        URL.revokeObjectURL(url);
        e.source.postMessage(ev.data, e.origin || "*");
      };
      worker.onerror = function() {
        clearTimeout(timer);
        worker.terminate();
        URL.revokeObjectURL(url);
        e.source.postMessage({ type: "error", message: "Worker crashed" }, e.origin || "*");
      };
      worker.postMessage({ code: e.data.code, tests: e.data.tests });
    }
  });
})();
`,
          }}
        />
      </head>
      <body />
    </html>
  )
}
