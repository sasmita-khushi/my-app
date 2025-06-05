import MyToggleButton from "@/src/ui/toggle-btn";
import { act, fireEvent, render } from "@testing-library/react-native";

describe("Testing MyToggleButton component", () => {
  const offset = 3;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("should render a toggle button without error", () => {
    const ToggleButton = render(
      <MyToggleButton toggle={false} onToggle={() => {}} />,
    );
    const toggleButton = ToggleButton.getByTestId("toggleButton");
    expect(toggleButton).toBeOnTheScreen();
  });

  // it("should toggle the button state false when pressed", () => {
  //   const handleToggle = jest.fn();
  //   const ToggleButton = render(
  //     <MyToggleButton toggle={false} onToggle={handleToggle} />,
  //   );
  //   const toggleButton = ToggleButton.getByTestId("toggleButton");

  //   expect(handleToggle).not.toHaveBeenCalled();

  //   fireEvent.press(toggleButton);
  //   expect(handleToggle).toHaveBeenCalledWith(true);
  // });

  // it("should toggle the button state true when pressed", () => {
  //   const handleToggle = jest.fn();
  //   const ToggleButton = render(
  //     <MyToggleButton toggle={true} onToggle={handleToggle} />,
  //   );
  //   const toggleButton = ToggleButton.getByTestId("toggleButton");

  //   expect(handleToggle).not.toHaveBeenCalled();

  //   fireEvent.press(toggleButton);
  //   expect(handleToggle).toHaveBeenCalledTimes(1);
  //   expect(handleToggle).toHaveBeenCalledWith(false);
  // });

  // it("should animate the toggle button when pressed", () => {
  //   const handleToggle = jest.fn();
  //   const ToggleButton = render(
  //     <MyToggleButton toggle={false} onToggle={handleToggle} />,
  //   );
  //   const toggleButton = ToggleButton.getByTestId("toggleButton");
  //   const circle = ToggleButton.getByTestId("circle");

  //   expect(circle).toHaveStyle({ transform: [{ translateX: offset }] });

  //   fireEvent.press(toggleButton);
  //   expect(handleToggle).toHaveBeenCalledWith(true);

  //   act(() => {
  //     jest.advanceTimersByTime(300);
  //   });
  // });
});
