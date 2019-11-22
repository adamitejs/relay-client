import RelayWebSocketClient from "./RelayWebSocketClient";

export default class RelayClient {
  public ws: RelayWebSocketClient;

  constructor() {
    this.ws = new RelayWebSocketClient(this);
  }

  connect(connectionConfig: any) {
    this.ws.connect(connectionConfig.ws);
  }
}
