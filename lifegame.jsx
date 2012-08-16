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
    var onmessage_handler = function(e: Event): void {
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
    ws.onmessage = onmessage_handler;
    dom.window.addEventListener(
      'unload',
      function(e: Event) {
        ws.close();
        ws = null;
      },
      false
    );

    //message handler for mouse
    var mousedown_handler = function(e: Event): void {
      var me = e as MouseEvent;
      //TODO: decide gameboard width/height from server messages
      var board_width = 10;
      var board_height = 10;
      var width_ord = Math.floor((me.clientX / _Main.canvas_width) * board_width);
      var height_ord = Math.floor((me.clientY / _Main.canvas_height) * board_height);
      if (width_ord < board_width && height_ord < board_height) {
        ws.send("#" + (width_ord as string) + ":" + (height_ord as string));
      }
    };
    dom.window.document.body.addEventListener('mousedown', mousedown_handler, false);

    //main loop after websocket open
    var tick = function(): void {
      ws.send("show");
      dom.window.setTimeout(tick, 100);
    };
    ws.onopen = function(e: Event){tick();};
  }
}
