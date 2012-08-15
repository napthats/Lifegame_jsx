import 'js/web.jsx';


final class WebSockets {
  var MESSAGE_WEBSOCKET_DISABLE = 'WebsSocket disable';

  static function connect(url: string, onMessageListener: (Event) -> void): (string) -> void {
//    if (!dom.window.WebSocket && !dom.window.MozWebSocket) {
//      dom.window.alert(WebSocket.MESSAGE_WEBSOCKET_DISABLE);
//      return null;
//    }
    
//    //connect WebSocket
//    var ws = dom.window.MozWebSocket ? new dom.window.MozWebSocket(url) : new WebSocket(url);
    var ws = new WebSocket(url);
    
    //add 'message' EventListener
    if (onMessageListener) {
      ws.addEventListener('message', onMessageListener, false);
    }
    
    //for finalize WebSocket
    dom.window.addEventListener('unload', (function(e: Event){
      ws.close();
      ws = null;
    }), false);
    
    return function(msg){ws.send(msg);};
  }
}