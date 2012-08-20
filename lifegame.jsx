import 'js/web.jsx';

final class _Main {
  static const canvas_width = 600;
  static const canvas_height = 600;
  static var selected_cell = {x: 0, y: 0};
  static const board_width = 60;
  static const board_height = 60;
  //TODO: initialize with safe data
  static var prev_data = [""];

  static function position_to_cell_ord(x: number, y: number): Map.<number> {
    //TODO: decide gameboard width/height from server messages
    //TODO: ajust position with canvas position
    var width_ord = Math.floor((x / _Main.canvas_width) * _Main.board_width - 1);
    var height_ord = Math.floor((y / _Main.canvas_height) * _Main.board_height - 1);
    return {x: width_ord, y: height_ord};
  }

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
      _Main.prev_data = board_data_array;
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

      if (_Main.prev_data[_Main.selected_cell['x'] + _Main.board_width * _Main.selected_cell['y']] == '+') {
        ctx.clearRect(
          cell_width * (_Main.selected_cell['x']),
          cell_height * Math.floor(_Main.selected_cell['y']),
          cell_width,
          cell_height
        );
        ctx.fillRect(
          cell_width * (_Main.selected_cell['x']) + 1,
          cell_height * Math.floor(_Main.selected_cell['y']) + 1,
          cell_width - 2,
          cell_height - 2
        );
      }
      else {
        ctx.fillRect(
          cell_width * (_Main.selected_cell['x']),
          cell_height * Math.floor(_Main.selected_cell['y']),
          cell_width,
          cell_height
        );
        ctx.clearRect(
          cell_width * (_Main.selected_cell['x']) + 1,
          cell_height * Math.floor(_Main.selected_cell['y']) + 1,
          cell_width - 2,
          cell_height - 2
        );
      }
    };

    //initialize websocket
//    var ws = new WebSocket("ws://localhost:8080/ws/");
    var ws = new WebSocket("ws://napthats.com:8080/ws/");
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
      var ord = _Main.position_to_cell_ord(me.clientX, me.clientY);
      if (ord['x'] < _Main.board_width && ord['y'] < _Main.board_height) {
        ws.send("#" + (ord['x'] as string) + ":" + (ord['y'] as string));
      }
    };
    dom.window.document.body.addEventListener('mousedown', mousedown_handler, false);
    var mousemove_handler = function(e: Event): void {
      var me = e as MouseEvent;
      var ord = _Main.position_to_cell_ord(me.clientX, me.clientY);
      if (ord['x'] < _Main.board_width && ord['y'] < _Main.board_height) {
        //TODO: extract draw function
/*        var cell_width = _Main.canvas_width / _Main.board_width;
        var cell_height = _Main.canvas_height / _Main.board_height;
        if (_Main.prev_data[_Main.selected_cell['x'] + _Main.board_width * _Main.selected_cell['y']] == '+') {
          ctx.fillRect(
            cell_width * (_Main.selected_cell['x']),
            cell_height * Math.floor(_Main.selected_cell['y']),
            cell_width,
            cell_height
          );
        }
        else {
          ctx.clearRect(
            cell_width * (_Main.selected_cell['x']),
            cell_height * Math.floor(_Main.selected_cell['y']),
            cell_width,
            cell_height
          );
        }
        if (_Main.prev_data[ord['x'] + cell_width * ord['y']] == '+') {
          ctx.clearRect(
            cell_width * (ord['x']),
            cell_height * Math.floor(ord['y']),
            cell_width,
            cell_height
          );
          ctx.fillRect(
            cell_width * (ord['x']) + 1,
            cell_height * Math.floor(ord['y']) + 1,
            cell_width - 2,
            cell_height - 2
          );
        }
        else {
          ctx.fillRect(
            cell_width * (ord['x']),
            cell_height * Math.floor(ord['y']),
            cell_width,
            cell_height
          );
          ctx.clearRect(
            cell_width * (ord['x']) + 1,
            cell_height * Math.floor(ord['y']) + 1,
            cell_width - 2,
            cell_height - 2
          );
        }*/
        _Main.selected_cell = ord;
      }
    };
    dom.window.document.body.addEventListener('mousemove', mousemove_handler, false);

    //main loop after websocket open
    var tick = function(): void {
      ws.send("show");
      dom.window.setTimeout(tick, 100);
    };
    ws.onopen = function(e: Event){tick();};
  }
}
