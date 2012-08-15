import 'js/web.jsx';

final class _Main {
  static function main(args : string[]) : void {
    var ws = new WebSocket("ws://localhost:8080/ws/");
    ws.onmessage = function(e: Event): void {
        var em = e as MessageEvent;
        dom.window.alert(em.data as string);
    };

    dom.window.addEventListener(
      'unload',
      function(e: Event) {
        ws.close();
        ws = null;
      },
      false
    );

    dom.window.setTimeout(function(){ws.send("hi");}, 1000);
  }
}
