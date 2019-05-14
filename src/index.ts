import RelayClient from "./RelayClient";

export default function(app: any, config: any) {
  return new RelayClient(app, config);
}
