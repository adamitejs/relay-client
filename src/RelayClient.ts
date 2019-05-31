import * as io from "socket.io-client";
import * as querystring from "querystring";
import { RelayClientConfig } from "./RelayTypes";
import { EventEmitter } from "events";

class RelayClient extends EventEmitter {
  public config: RelayClientConfig;

  public socket: any;

  constructor(config: RelayClientConfig) {
    super();
    this.config = config;
    this.socket = io(this.url);
    this.subscribeToEvents();
  }

  get url() {
    const qs = querystring.stringify({
      secret: this.config.secret,
      key: this.config.apiKey,
      token: this.config.jwt
    });

    return `${this.config.url}?${qs}`;
  }

  invoke(name: string, args: any) {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        "command",
        {
          name: `${this.config.service}.${name}`,
          args: args
        },
        ({ error, ...response }: { error: any }) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(response);
        }
      );
    });
  }

  public updateJwt(jwt: string | undefined) {
    this.socket.emit("authStateChange", {
      token: jwt
    });
  }

  private subscribeToEvents() {
    this.socket.on("connect", () => {
      this.emit("connect");
    });

    this.socket.on("disconnect", (r: any) => {
      this.emit("disconnect", r);
    });

    this.socket.on("error", (r: any) => {
      this.emit("error", r);
    });
  }
}

export default RelayClient;
