import 'js/web.jsx';

final class _Main {
  static const canvas_width = 300;
  static const canvas_height = 300;

  static function main(args : string[]) : void {
    //initialize canvas
    var canvas = dom.id('stage') as HTMLCanvasElement;
    assert canvas != null;
    canvas.width = _Main.canvas_width;
    canvas.height = _Main.canvas_height;
    var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    assert ctx != null;

    //message handler for websocket
    var onmessage = function(e: Event): void {
      var me = e as MessageEvent;
      var message_array = (me.data as string).split(":");
      var width = message_array[0] as int;
      var height = message_array[1] as int;
      var cell_width = _Main.canvas_width / width;
      var cell_height = _Main.canvas_height / height;
      var board_data_array = (message_array[2]).split("");

      ctx.clearRect(0, 0, _Main.canvas_width, _Main.canvas_height);
      for(var i = 0; i < board_data_array.length; ++i) {
        if (board_data_array[i] == '+') {
          ctx.fillRect(
            cell_width * (i % width),
            cell_height * Math.floor(i / width),
            cell_width,
            cell_height
          );
        }
      }
    };

    //initialize websocket
    var ws = new WebSocket("ws://localhost:8080/ws/");
    ws.onmessage = onmessage;
    dom.window.addEventListener(
      'unload',
      function(e: Event) {
        ws.close();
        ws = null;
      },
      false
    );

    //main loop after websocket open
    var tick = function(): void {
      ws.send("hi");
      dom.window.setTimeout(tick, 1000);
    };
    ws.onopen = function(e: Event){tick();};
  }
}
