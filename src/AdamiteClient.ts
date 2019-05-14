import * as io from "socket.io-client";
import querystring from "querystring";

class AdamiteClient {
  public app: any;

  public config: any;

  public socket: any;

  constructor(app: any, config: any) {
    this.app = app;
    this.config = config;
    this.socket = io(this.url);
    this._subscribeToEvents();
  }

  get url() {
    const qs = querystring.stringify({
      key: this.app.config.apiKey,
      token: this.app.plugins.auth && this.app.auth().currentUser && this.app.auth().currentUser.jwt,
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

  _subscribeToEvents() {
    if (this.app.plugins.auth) {
      this.app.auth().onAuthStateChange((authState: any) => {
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

export default AdamiteClient;
