import index from "../src/index";
import RelayClient from "../src/RelayClient";
jest.mock("../src/RelayClient");

describe("index", () => {
  it("should return an RelayClient instance", () => {
    const mockApp = { app: "1234" };
    const mockConfig = { abc: "123" };
    const server = index(mockApp, mockConfig);
    expect(RelayClient).toHaveBeenCalledWith(mockApp, mockConfig);
    expect(server).toBe((RelayClient as any).mock.instances[0]);
  });
});
