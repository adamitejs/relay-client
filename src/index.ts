import RelayClient from "./RelayClient";
import { RelayClientConfig } from "./RelayTypes";

export default function(config: RelayClientConfig) {
  return new RelayClient(config);
}
