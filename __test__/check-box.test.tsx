import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import CheckBox from "../src/ui/check-box";

describe("Testing CheckBox component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  it("should render checkbox without error", () => {
    render(<CheckBox isChecked={false} />);
    const checkBox = screen.getByTestId("checkBox");
    const checkmarkIcon = screen.queryByTestId("checkmarkIcon");
    expect(checkBox).toBeOnTheScreen();
    expect(checkmarkIcon).not.toBeOnTheScreen();
  });

  it("should render checkmark icon when isChecked is true", async () => {
    render(<CheckBox isChecked={true} />);
    await waitFor(() => {
      const checkmarkIcon = screen.getByTestId("checkmarkIcon");
      expect(checkmarkIcon).toBeOnTheScreen();
    });
  });

  it("must call onChange when checkbox is pressed", () => {
    const handleOnChange = jest.fn();
    render(<CheckBox isChecked={false} onChange={handleOnChange} />);
    const checkBox = screen.getByTestId("checkBox");
    fireEvent.press(checkBox);
    expect(handleOnChange).toHaveBeenCalled();
  });
  it.skip("should animate the ripple effect when pressed", async () => {
    render(<CheckBox isChecked={false} />);
    const checkBox = screen.getByTestId("checkBox");
    const rippleCircle = screen.getByTestId("rippleCircle");
    expect(rippleCircle).toHaveStyle({ transform: [{ scale: 0 }] });
    fireEvent.press(checkBox);
    jest.advanceTimersByTime(400); // Advance time to allow animation to complete

    expect(rippleCircle).toHaveAnimatedStyle({
      transform: [{ scale: 1 }],
      opacity: 0,
    });
  });
});
