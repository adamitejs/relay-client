import AdamiteClient from "./AdamiteClient";

export default function(app: any, config: any) {
  return new AdamiteClient(app, config);
}
