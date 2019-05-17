import * as io from "socket.io-client";
import * as querystring from "querystring";
import { App, AuthPlugin, AuthUser } from "@adamite/sdk";
import { RelayClientConfig } from "./RelayTypes";

class RelayClient {
  public app: App;

  public config: RelayClientConfig;

  public socket: any;

  constructor(app: App, config: RelayClientConfig) {
    this.app = app;
    this.config = config;
    this.socket = io(this.url);
    this.subscribeToEvents();
  }

  get url() {
    const authPlugin = this.app.plugins["auth"] as AuthPlugin;
    const currentUser = authPlugin && authPlugin.currentUser;
    const token = currentUser && currentUser.jwt;

    const qs = querystring.stringify({
      key: this.app.config.apiKey,
      token,
      ...(this.app.config.queryString || {})
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

  private subscribeToEvents() {
    if (this.app.plugins.auth) {
      this.app.auth().onAuthStateChange((authState: AuthUser) => {
        this.socket.emit("authStateChange", {
          token: authState ? authState.token : null
        });
      });
    }

    this.socket.on("connect", () => {
      this.app.log(this.config.service, "connected");
    });

    this.socket.on("disconnect", (r: any) => {
      this.app.log(this.config.service, "disconnected");
      console.log(r);
    });

    this.socket.on("error", (r: any) => {
      this.app.log(this.config.service, "error");
      console.log(r);
    });
  }
}

export default RelayClient;
