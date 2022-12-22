import { renderHook } from "@testing-library/react";
import { useRouter } from "next/router";
import { testUser } from "../test-utils/testData";
import { useIsAuth } from "../utils/hooks/useIsAuth";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("useIsAuth", () => {
  const mockRouter = {
    replace: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should redirect to login page if user is not logged in", () => {
    renderHook(() =>
      useIsAuth({
        fetching: false,
        data: { me: null },
        stale: false,
      })
    );
    expect(mockRouter.replace).toHaveBeenCalledWith("/account/login");
  });

  it("should not redirect if user is logged in", () => {
    renderHook(() =>
      useIsAuth({
        fetching: false,
        data: { me: testUser },
        stale: false,
      })
    );
    expect(mockRouter.replace).not.toHaveBeenCalled();
  });

  it("should not redirect if fetching user data", () => {
    renderHook(() =>
      useIsAuth({
        fetching: true,
        data: { me: null },
        stale: false,
      })
    );
    expect(mockRouter.replace).not.toHaveBeenCalled();
  });
});
