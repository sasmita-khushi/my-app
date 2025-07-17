import MyCounter from "@/src/ui/counter";
import { render, screen, fireEvent, act } from "@testing-library/react-native";

describe("MyCounter Component", () => {
  it("should render with initial count", () => {
    render(<MyCounter />);
    const countText = screen.getByText("Count: 0");
    expect(countText).toBeTruthy();
  });

  it("should increment count when button is pressed", () => {
    render(<MyCounter />);

    const button = screen.getByText("Increment");
    act(() => {
      fireEvent.press(button);
    });

    const countText = screen.getByText("Count: 1");
    expect(countText).toBeTruthy();
  });

  it("should decrement count when button is pressed", () => {
    render(<MyCounter />);

    const decrementButton = screen.getByText("Decrement");
    act(() => {
      fireEvent.press(decrementButton);
    });

    const countText2 = screen.getByText("Count: -1");
    expect(countText2).toBeTruthy();
  });

  it("increments and then decrements correctly", () => {
    render(<MyCounter />);

    const incrementButton = screen.getByText("Increment");
    const decrementButton = screen.getByText("Decrement");

    act(() => {
      fireEvent.press(incrementButton);
      fireEvent.press(incrementButton);
      fireEvent.press(decrementButton);
    });

    const countText = screen.getByText("Count: 1");
    expect(countText).toBeTruthy();
  });
});
