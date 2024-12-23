describe("AppError", () => {
  const AppError = require("./AppError");

  test("should create an instance of AppError with message", () => {
    const message = "Error message";
    const sut = new AppError(message);

    expect(sut).toBeInstanceOf(Error);
    expect(sut.message).toBe(message);
  });

  test("should have a static property dependencies", () => {
    expect(AppError.dependencies).toBe("Dependency not provided");
  });
});
