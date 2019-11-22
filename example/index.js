const { RelayClient } = require("../");

const client = new RelayClient();
client.connect({ ws: { url: "ws://localhost:9000" } });

client.ws.on("open", async () => {
  const returnValue = await client.ws.invokeCommand("example", "sayHello", { name: "Jesse" });
  console.log(returnValue);
});
