import 'js/web.jsx';

final class _Main {
  static function main(args : string[]) : void {
    //initialize websocket
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

    //main loop after websocket open
    ws.onopen = function(e: Event){
      ws.send("hi");
    };
  }
}
