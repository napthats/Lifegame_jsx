import 'js/web.jsx';

final class _Main {
  static const canvas_width = 600;
  static const canvas_height = 600;
  static var selected_cell_array = [{x: 0, y: 0}];
    //TODO: decide gameboard width/height from server messages
  static const board_width = 60;
  static const board_height = 60;
  //TODO: initialize with safe data
  static var prev_data = [""];
  static var selected_object = 0;
  static var current_position = {x: 0, y: 0};

  static function position_to_cell_ord(x: number, y: number): Map.<number> {
    //TODO: ajust position with canvas position
    var width_ord = Math.floor((x / _Main.canvas_width) * _Main.board_width - 1);
    var height_ord = Math.floor((y / _Main.canvas_height) * _Main.board_height - 1);
    return {x: width_ord, y: height_ord};
  }

  static function get_object_positions(base_x: number, base_y: number, object_type: number): Array.<Map.<number>> {
    //TODO: separate data of each object from logic
    switch (object_type) {
      case 0:
        //normal
        return [{x: base_x, y: base_y}];
      case 1:
        //block
        return [{x: base_x, y: base_y}, {x: base_x + 1, y: base_y}, {x: base_x, y: base_y + 1}, {x: base_x + 1, y: base_y + 1}];
      case 2:
        //glider
        return [{x: base_x + 1, y: base_y}, {x: base_x + 2, y: base_y + 1}, {x: base_x, y: base_y + 2}, {x: base_x + 1, y: base_y + 2}, {x: base_x + 2, y: base_y + 2}];
      case 3:
        //eater
        return [
          {x: base_x, y: base_y}, {x: base_x + 1, y: base_y},
          {x: base_x, y: base_y + 1}, {x: base_x + 2, y: base_y + 1},
          {x: base_x + 2, y: base_y + 2},
          {x: base_x + 2, y: base_y + 3}, {x: base_x + 3, y: base_y + 3}
        ];
      case 4:
        //r-pentomino
        return [{x: base_x + 1, y: base_y}, {x: base_x + 2, y: base_y}, {x: base_x, y: base_y + 1}, {x: base_x + 1, y: base_y + 1}, {x: base_x + 1, y: base_y + 2}];
      case 5:
        //middleweight spaceship
        return [
          {x: base_x + 4, y: base_y},
          {x: base_x + 5, y: base_y + 1},
          {x: base_x, y: base_y + 2}, {x: base_x + 5, y: base_y + 2},
          {x: base_x + 1, y: base_y + 3}, {x: base_x + 2, y: base_y + 3}, {x: base_x + 3, y: base_y + 3}, {x: base_x + 4, y: base_y + 3}, {x: base_x + 5, y: base_y + 3}          
        ];
      case 6:
        //glider gun
        return [
          {x: base_x + 25, y: base_y},
          {x: base_x + 22, y: base_y + 1}, {x: base_x + 23, y: base_y + 1}, {x: base_x + 24, y: base_y + 1}, {x: base_x + 25, y: base_y + 1},
          {x: base_x + 13, y: base_y + 2}, {x: base_x + 21, y: base_y + 2}, {x: base_x + 22, y: base_y + 2}, {x: base_x + 23, y: base_y + 2}, {x: base_x + 24, y: base_y + 2}, {x: base_x + 34, y: base_y + 2}, {x: base_x + 35, y: base_y + 2},
          {x: base_x + 12, y: base_y + 3}, {x: base_x + 14, y: base_y + 3}, {x: base_x + 21, y: base_y + 3}, {x: base_x + 24, y: base_y + 3}, {x: base_x + 34, y: base_y + 3}, {x: base_x + 35, y: base_y + 3},
          {x: base_x +  0, y: base_y + 4}, {x: base_x +  1, y: base_y + 4}, {x: base_x + 11, y: base_y + 4}, {x: base_x + 15, y: base_y + 4}, {x: base_x + 16, y: base_y + 4}, {x: base_x + 21, y: base_y + 4}, {x: base_x + 22, y: base_y + 4}, {x: base_x + 23, y: base_y + 4}, {x: base_x + 24, y: base_y + 4},
          {x: base_x +  0, y: base_y + 5}, {x: base_x +  1, y: base_y + 5}, {x: base_x + 11, y: base_y + 5}, {x: base_x + 15, y: base_y + 5}, {x: base_x + 16, y: base_y + 5}, {x: base_x + 22, y: base_y + 5}, {x: base_x + 23, y: base_y + 5}, {x: base_x + 24, y: base_y + 5}, {x: base_x + 25, y: base_y + 5},
          {x: base_x + 11, y: base_y + 6}, {x: base_x + 15, y: base_y + 6}, {x: base_x + 16, y: base_y + 6}, {x: base_x + 25, y: base_y + 6},
          {x: base_x + 12, y: base_y + 7}, {x: base_x + 14, y: base_y + 7},
          {x: base_x + 13, y: base_y + 8}
        ];
      case 7:
        //pulsar seed
        return [{x: base_x, y: base_y}, {x: base_x + 1, y: base_y}, {x: base_x + 2, y: base_y}, {x: base_x + 3, y: base_y}, {x: base_x + 4, y: base_y}, {x: base_x, y: base_y + 1}, {x: base_x + 4, y: base_y + 1}];
      default:
        assert false;
    }
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
      //TODO: extract draw function
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

      for (var i in _Main.selected_cell_array) {
        var selected_cell = _Main.selected_cell_array[i];
        if (selected_cell['x'] < _Main.board_width && selected_cell['y'] < _Main.board_height) {
      if (_Main.prev_data[selected_cell['x'] + _Main.board_width * selected_cell['y']] == '+') {
        ctx.clearRect(
          cell_width * (selected_cell['x']),
          cell_height * Math.floor(selected_cell['y']),
          cell_width,
          cell_height
        );
        ctx.fillRect(
          cell_width * (selected_cell['x']) + 1,
          cell_height * Math.floor(selected_cell['y']) + 1,
          cell_width - 2,
          cell_height - 2
        );
      }
      else {
        ctx.fillRect(
          cell_width * (selected_cell['x']),
          cell_height * Math.floor(selected_cell['y']),
          cell_width,
          cell_height
        );
        ctx.clearRect(
          cell_width * (selected_cell['x']) + 1,
          cell_height * Math.floor(selected_cell['y']) + 1,
          cell_width - 2,
          cell_height - 2
        );
      }
        }
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

    //message handler for mouse and keyboard
    var mousedown_handler = function(e: Event): void {
      var me = e as MouseEvent;
      var base_pos = _Main.position_to_cell_ord(me.clientX, me.clientY);
      var pos_array = _Main.get_object_positions(base_pos['x'], base_pos['y'], _Main.selected_object);
      for (var ord in pos_array) {
        if (pos_array[ord]['x'] < _Main.board_width && pos_array[ord]['y'] < _Main.board_height) {
          ws.send("#" + (pos_array[ord]['x'] as string) + ":" + (pos_array[ord]['y'] as string));
        }
      }
    };
    dom.window.document.body.addEventListener('mousedown', mousedown_handler, false);
    var mousemove_handler = function(e: Event): void {
      var me = e as MouseEvent;
      var base_pos = _Main.position_to_cell_ord(me.clientX, me.clientY);
      _Main.current_position = base_pos;
      _Main.selected_cell_array =
        _Main.get_object_positions(base_pos['x'], base_pos['y'], _Main.selected_object);
    };
    dom.window.document.body.addEventListener('mousemove', mousemove_handler, false);
    var keydown_handler = function(e: Event): void {
      var ke = e as KeyboardEvent;
      switch (ke.keyCode) {
        case 48://0 key
          _Main.selected_object = 0;//normal
          break;
        case 49://1 key
          _Main.selected_object = 1;//block
          break;
        case 50://2 key
          _Main.selected_object = 2;//glider
          break;
        case 51://3 key
          _Main.selected_object = 3;//eater
          break;
        case 52://4 key
          _Main.selected_object = 4;//r-pentomino
          break;
        case 53://5 key
          _Main.selected_object = 5;//middleweight spaceship
          break;
        case 54://6 key
          _Main.selected_object = 6;//glider gun
          break;        
        case 55://7 key
          _Main.selected_object = 7;//pulsar seed
          break;        
        case 109://- key
          ws.send("clear");
        default:
//          dom.window.alert(ke.keyCode.toString());
          break;
      }
      _Main.selected_cell_array =
        _Main.get_object_positions(
          _Main.current_position['x'],
          _Main.current_position['y'],
          _Main.selected_object
        );
    };
    dom.window.document.body.addEventListener('keydown', keydown_handler, false);

    //main loop after websocket open
    var tick = function(): void {
      ws.send("show");
      dom.window.setTimeout(tick, 100);
    };
    ws.onopen = function(e: Event){tick();};
  }
}
