import index from "../src/index";
import RelayClient from "../src/RelayClient";
jest.mock("../src/RelayClient");

describe("index", () => {
  it("should return an RelayClient instance", () => {
    const mockConfig = { url: "", service: "", apiKey: "" };
    const server = index(mockConfig);
    expect(RelayClient).toHaveBeenCalledWith(mockConfig);
    expect(server).toBe((RelayClient as any).mock.instances[0]);
  });
});
