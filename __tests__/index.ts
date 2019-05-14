import index from "../src/index";
import AdamiteClient from "../src/AdamiteClient";
jest.mock("../src/AdamiteClient");

describe("index", () => {
  it("should return an AdamiteClient instance", () => {
    const mockApp = { app: "1234" };
    const mockConfig = { abc: "123" };
    const server = index(mockApp, mockConfig);
    expect(AdamiteClient).toHaveBeenCalledWith(mockApp, mockConfig);
    expect(server).toBe((AdamiteClient as any).mock.instances[0]);
  });
});
