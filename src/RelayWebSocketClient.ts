import RelayClient from "./RelayClient";
import WebSocketClient from "@gamestdio/websocket";
import * as uuid from "uuid";
import { EventEmitter } from "events";

export default class RelayWebSocketClient extends EventEmitter {
  public client: RelayClient;

  public webSocketClient?: WebSocketClient;

  constructor(client: RelayClient) {
    super();
    this.client = client;
  }

  connect(connectionConfig: any) {
    this.webSocketClient = new WebSocketClient(connectionConfig.url);
    this.webSocketClient.onopen = args => this.emit("open", args);
    this.webSocketClient.onclose = args => this.emit("close", args);
    this.webSocketClient.onerror = args => this.emit("error", args);
    this.webSocketClient.onmessage = args => this.emit("message", args);
  }

  invokeCommand(serviceName: string, commandName: string, commandData: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.webSocketClient) {
        return reject(`Client is not connected.`);
      }

      const returnId = uuid.v4();

      const messageEventHandler = (message: any) => {
        const { type, returnId, returnValue, returnError } = JSON.parse(message.data);
        if (type !== "return") return;
        if (returnId !== returnId) return;

        if (returnError) {
          reject(returnError);
        } else {
          resolve(returnValue);
        }

        this.removeListener("message", messageEventHandler);
      };

      this.on("message", messageEventHandler);

      this.webSocketClient.send(
        JSON.stringify({
          type: "invoke",
          serviceName,
          commandName,
          commandData,
          returnId
        })
      );
    });
  }
}
