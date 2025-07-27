import Menu from "../src/ui/menu";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react-native";

describe("Testing Menu", () => {
  it("header should be on screen", () => {
    render(<Menu />);
    const header = screen.getByTestId("header");
    expect(header).toBeOnTheScreen();
  });

  it("login user icon should be on screen", () => {
    render(<Menu />);
    const loginUser = screen.getByTestId("loginuser");
    expect(loginUser).toBeOnTheScreen();
  });

  it("when press ionicon menulist appear", () => {
    render(<Menu />);
    const loginUser = screen.getByTestId("loginuser");
    act(() => {
      fireEvent.press(loginUser);
    });
    const menuList = screen.getByTestId("menulist");
    expect(menuList).toBeOnTheScreen();
  });

  it("disappear menulist when press ionicon again", async () => {
    render(<Menu />);
    const loginUser = screen.getByTestId("loginuser");

    act(() => {
      fireEvent.press(loginUser); // Open menu
      fireEvent.press(loginUser); // Close menu
    });

    await waitFor(() => {
      const menuList = screen.queryByTestId("menulist");
      expect(menuList).toBeNull();
    });
  });
});
