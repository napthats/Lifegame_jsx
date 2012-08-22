var JSX = {};
(function () {

/**
 * copies the implementations from source interface to target
 */
function $__jsx_merge_interface(target, source) {
	for (var k in source.prototype)
		if (source.prototype.hasOwnProperty(k))
			target.prototype[k] = source.prototype[k];
}

/**
 * defers the initialization of the property
 */
function $__jsx_lazy_init(obj, prop, func) {
	function reset(obj, prop, value) {
		delete obj[prop];
		obj[prop] = value;
		return value;
	}

	Object.defineProperty(obj, prop, {
		get: function () {
			return reset(obj, prop, func());
		},
		set: function (v) {
			reset(obj, prop, v);
		},
		enumerable: true,
		configurable: true
	});
}

/**
 * sideeffect().a /= b
 */
function $__jsx_div_assign(obj, prop, divisor) {
	return obj[prop] = (obj[prop] / divisor) | 0;
}

/*
 * global functions called by JSX
 * (enamed so that they do not conflict with local variable names)
 */
var $__jsx_parseInt = parseInt;
var $__jsx_parseFloat = parseFloat;
var $__jsx_isNaN = isNaN;
var $__jsx_isFinite = isFinite;

var $__jsx_encodeURIComponent = encodeURIComponent;
var $__jsx_decodeURIComponent = decodeURIComponent;
var $__jsx_encodeURI = encodeURI;
var $__jsx_decodeURI = decodeURI;

var $__jsx_ObjectToString = Object.prototype.toString;
var $__jsx_ObjectHasOwnProperty = Object.prototype.hasOwnProperty;

/*
 * profiler object, initialized afterwards
 */
function $__jsx_profiler() {
}

/*
 * public interface to JSX code
 */
JSX.require = function (path) {
	var m = $__jsx_classMap[path];
	return m !== undefined ? m : null;
};

JSX.profilerIsRunning = function () {
	return $__jsx_profiler.getResults != null;
};

JSX.getProfileResults = function () {
	return ($__jsx_profiler.getResults || function () { return {}; })();
};

JSX.postProfileResults = function (url) {
	if ($__jsx_profiler.postResults == null)
		throw new Error("profiler has not been turned on");
	return $__jsx_profiler.postResults(url);
};
/**
 * class _Main extends Object
 * @constructor
 */
function _Main() {
}

_Main.prototype = new Object;
/**
 * @constructor
 */
function _Main$() {
};

_Main$.prototype = new _Main;

/**
 * @param {!number} x
 * @param {!number} y
 * @return {Object.<string, undefined|!number>}
 */
_Main.position_to_cell_ord$NN = function (x, y) {
	/** @type {!number} */
	var width_ord;
	/** @type {!number} */
	var height_ord;
	width_ord = Math.floor(x / 600 * 60 - 1);
	height_ord = Math.floor(y / 600 * 60 - 1);
	return { x: width_ord, y: height_ord };
};

var _Main$position_to_cell_ord$NN = _Main.position_to_cell_ord$NN;

/**
 * @param {!number} base_x
 * @param {!number} base_y
 * @param {!number} object_type
 * @return {Array.<undefined|Object.<string, undefined|!number>>}
 */
_Main.get_object_positions$NNN = function (base_x, base_y, object_type) {
	switch (object_type) {
	case 0:
		return [ { x: base_x, y: base_y } ];
	case 1:
		return [ { x: base_x, y: base_y }, { x: base_x + 1, y: base_y }, { x: base_x, y: base_y + 1 }, { x: base_x + 1, y: base_y + 1 } ];
	case 2:
	case 3:
		return [ { x: base_x, y: base_y }, { x: base_x + 1, y: base_y }, { x: base_x, y: base_y + 1 }, { x: base_x + 2, y: base_y + 1 }, { x: base_x + 2, y: base_y + 2 }, { x: base_x + 2, y: base_y + 3 }, { x: base_x + 3, y: base_y + 3 } ];
	case 4:
		return [ { x: base_x + 1, y: base_y }, { x: base_x + 2, y: base_y }, { x: base_x, y: base_y + 1 }, { x: base_x + 1, y: base_y + 1 }, { x: base_x + 1, y: base_y + 2 } ];
	case 5:
		return [ { x: base_x + 4, y: base_y }, { x: base_x + 5, y: base_y + 1 }, { x: base_x, y: base_y + 2 }, { x: base_x + 5, y: base_y + 2 }, { x: base_x + 1, y: base_y + 3 }, { x: base_x + 2, y: base_y + 3 }, { x: base_x + 3, y: base_y + 3 }, { x: base_x + 4, y: base_y + 3 }, { x: base_x + 5, y: base_y + 3 } ];
	case 6:
		return [ { x: base_x + 25, y: base_y }, { x: base_x + 22, y: base_y + 1 }, { x: base_x + 23, y: base_y + 1 }, { x: base_x + 24, y: base_y + 1 }, { x: base_x + 25, y: base_y + 1 }, { x: base_x + 13, y: base_y + 2 }, { x: base_x + 21, y: base_y + 2 }, { x: base_x + 22, y: base_y + 2 }, { x: base_x + 23, y: base_y + 2 }, { x: base_x + 24, y: base_y + 2 }, { x: base_x + 34, y: base_y + 2 }, { x: base_x + 35, y: base_y + 2 }, { x: base_x + 12, y: base_y + 3 }, { x: base_x + 14, y: base_y + 3 }, { x: base_x + 21, y: base_y + 3 }, { x: base_x + 24, y: base_y + 3 }, { x: base_x + 34, y: base_y + 3 }, { x: base_x + 35, y: base_y + 3 }, { x: base_x, y: base_y + 4 }, { x: base_x + 1, y: base_y + 4 }, { x: base_x + 11, y: base_y + 4 }, { x: base_x + 15, y: base_y + 4 }, { x: base_x + 16, y: base_y + 4 }, { x: base_x + 21, y: base_y + 4 }, { x: base_x + 22, y: base_y + 4 }, { x: base_x + 23, y: base_y + 4 }, { x: base_x + 24, y: base_y + 4 }, { x: base_x, y: base_y + 5 }, { x: base_x + 1, y: base_y + 5 }, { x: base_x + 11, y: base_y + 5 }, { x: base_x + 15, y: base_y + 5 }, { x: base_x + 16, y: base_y + 5 }, { x: base_x + 22, y: base_y + 5 }, { x: base_x + 23, y: base_y + 5 }, { x: base_x + 24, y: base_y + 5 }, { x: base_x + 25, y: base_y + 5 }, { x: base_x + 11, y: base_y + 6 }, { x: base_x + 15, y: base_y + 6 }, { x: base_x + 16, y: base_y + 6 }, { x: base_x + 25, y: base_y + 6 }, { x: base_x + 12, y: base_y + 7 }, { x: base_x + 14, y: base_y + 7 }, { x: base_x + 13, y: base_y + 8 } ];
	default:
	}
};

var _Main$get_object_positions$NNN = _Main.get_object_positions$NNN;

/**
 * @param {Array.<undefined|!string>} args
 */
_Main.main$AS = function (args) {
	/** @type {HTMLCanvasElement} */
	var canvas;
	/** @type {CanvasRenderingContext2D} */
	var ctx;
	var onmessage_handler;
	/** @type {WebSocket} */
	var ws;
	var mousedown_handler;
	var mousemove_handler;
	var keydown_handler;
	var tick;
	canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })((function (o) { return o instanceof HTMLElement ? o : null; })(dom.document.getElementById('stage')));
	canvas.width = 600;
	canvas.height = 600;
	ctx = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(canvas.getContext("2d"));
	onmessage_handler = (function (e) {
		/** @type {MessageEvent} */
		var me;
		/** @type {Array.<undefined|!string>} */
		var message_array;
		/** @type {!number} */
		var width;
		/** @type {!number} */
		var height;
		/** @type {!number} */
		var cell_width;
		/** @type {!number} */
		var cell_height;
		/** @type {Array.<undefined|!string>} */
		var board_data_array;
		/** @type {!number} */
		var i;
		me = (function (o) { return o instanceof MessageEvent ? o : null; })(e);
		message_array = (me.data + "").split(":");
		width = message_array[0] | 0;
		height = message_array[1] | 0;
		cell_width = 600 / width;
		cell_height = 600 / height;
		board_data_array = message_array[2].split("");
		ctx.clearRect(0, 0, 600, 600);
		_Main.prev_data = board_data_array;
		for (i = 0; i < board_data_array.length; ++ i) {
			if (board_data_array[i] == '+') {
				ctx.fillRect(cell_width * (i % width), cell_height * Math.floor(i / width), cell_width, cell_height);
			}
		}
		if (_Main.prev_data[_Main.selected_cell.x + 60 * _Main.selected_cell.y] == '+') {
			ctx.clearRect(cell_width * _Main.selected_cell.x, cell_height * Math.floor(_Main.selected_cell.y), cell_width, cell_height);
			ctx.fillRect(cell_width * _Main.selected_cell.x + 1, cell_height * Math.floor(_Main.selected_cell.y) + 1, cell_width - 2, cell_height - 2);
		} else {
			ctx.fillRect(cell_width * _Main.selected_cell.x, cell_height * Math.floor(_Main.selected_cell.y), cell_width, cell_height);
			ctx.clearRect(cell_width * _Main.selected_cell.x + 1, cell_height * Math.floor(_Main.selected_cell.y) + 1, cell_width - 2, cell_height - 2);
		}
	});
	ws = new WebSocket("ws://napthats.com:8080/ws/");
	ws.onmessage = onmessage_handler;
	dom.window.addEventListener('unload', (function (e) {
		ws.close();
		ws = null;
	}), false);
	mousedown_handler = (function (e) {
		/** @type {MouseEvent} */
		var me;
		/** @type {Object.<string, undefined|!number>} */
		var base_pos;
		/** @type {Array.<undefined|Object.<string, undefined|!number>>} */
		var pos_array;
		/** @type {!number} */
		var ord;
		me = (function (o) { return o instanceof MouseEvent ? o : null; })(e);
		base_pos = _Main$position_to_cell_ord$NN(me.clientX, me.clientY);
		pos_array = _Main$get_object_positions$NNN(base_pos.x, base_pos.y, _Main.selected_object);
		for (ord in pos_array) {
			if (pos_array[ord].x < 60 && pos_array[ord].y < 60) {
				ws.send("#" + (pos_array[ord].x + "") + ":" + (pos_array[ord].y + ""));
			}
		}
	});
	dom.window.document.body.addEventListener('mousedown', mousedown_handler, false);
	mousemove_handler = (function (e) {
		/** @type {MouseEvent} */
		var me;
		/** @type {Object.<string, undefined|!number>} */
		var ord;
		me = (function (o) { return o instanceof MouseEvent ? o : null; })(e);
		ord = _Main$position_to_cell_ord$NN(me.clientX, me.clientY);
		if (ord.x < 60 && ord.y < 60) {
			_Main.selected_cell = ord;
		}
	});
	dom.window.document.body.addEventListener('mousemove', mousemove_handler, false);
	keydown_handler = (function (e) {
		/** @type {KeyboardEvent} */
		var ke;
		ke = (function (o) { return o instanceof KeyboardEvent ? o : null; })(e);
		switch (ke.keyCode) {
		case 48:
			_Main.selected_object = 0;
			break;
		case 49:
			_Main.selected_object = 1;
			break;
		case 50:
			_Main.selected_object = 2;
			break;
		case 51:
			_Main.selected_object = 3;
			break;
		case 52:
			_Main.selected_object = 4;
			break;
		case 53:
			_Main.selected_object = 5;
			break;
		case 54:
			_Main.selected_object = 6;
			break;
		case 109:
			ws.send("clear");
		default:
			break;
		}
	});
	dom.window.document.body.addEventListener('keydown', keydown_handler, false);
	tick = (function () {
		ws.send("show");
		dom.window.setTimeout(tick, 100);
	});
	ws.onopen = (function (e) {
		tick();
	});
};

var _Main$main$AS = _Main.main$AS;

/**
 * class dom extends Object
 * @constructor
 */
function dom() {
}

dom.prototype = new Object;
/**
 * @constructor
 */
function dom$() {
};

dom$.prototype = new dom;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.id$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.document.getElementById(id));
};

var dom$id$S = dom.id$S;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.getElementById$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.document.getElementById(id));
};

var dom$getElementById$S = dom.getElementById$S;

/**
 * @param {!string} tag
 * @return {HTMLElement}
 */
dom.createElement$S = function (tag) {
	return dom.document.createElement(tag);
};

var dom$createElement$S = dom.createElement$S;

/**
 * class js extends Object
 * @constructor
 */
function js() {
}

js.prototype = new Object;
/**
 * @constructor
 */
function js$() {
};

js$.prototype = new js;

_Main.canvas_width = 600;
_Main.canvas_height = 600;
$__jsx_lazy_init(_Main, "selected_cell", function () {
	return { x: 0, y: 0 };
});
_Main.board_width = 60;
_Main.board_height = 60;
$__jsx_lazy_init(_Main, "prev_data", function () {
	return [ "" ];
});
_Main.selected_object = 0;
$__jsx_lazy_init(dom, "window", function () {
	return js.global.window;
});
$__jsx_lazy_init(dom, "document", function () {
	return js.global.document;
});
js.global = (function () { return this; })();

var $__jsx_classMap = {
	"lifegame.jsx": {
		_Main: _Main,
		_Main$: _Main$
	},
	"system:lib/js/js/web.jsx": {
		dom: dom,
		dom$: dom$
	},
	"system:lib/js/js.jsx": {
		js: js,
		js$: js$
	}
};


})();
