import Timer from "@/src/ui/clock";
import { render, screen, fireEvent, act } from "@testing-library/react-native";

describe("Timer Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-07-17T04:51:00"));
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders correctly", () => {
    render(<Timer />);
    expect(screen.getByTestId("timer-text")).toBeTruthy();
    expect(screen.getByTestId("start-button")).toBeTruthy();
    expect(screen.getByTestId("stop-button")).toBeTruthy();
  });

  it("starts timer when Start button is pressed", () => {
    render(<Timer />);
    const startButton = screen.getByTestId("start-button");

    fireEvent.press(startButton);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId("timer-text")).toHaveTextContent(
      "Time: 4:51:01 AM",
    );
  });

  it("stops timer when Stop button is pressed", () => {
    render(<Timer />);
    const startButton = screen.getByTestId("start-button");
    const stopButton = screen.getByTestId("stop-button");

    fireEvent.press(startButton);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId("timer-text")).toHaveTextContent(
      "Time: 4:51:03 AM",
    );
    fireEvent.press(stopButton);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByTestId("timer-text")).toHaveTextContent(
      "Time: 4:51:03 AM",
    );
    fireEvent.press(startButton);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByTestId("timer-text")).toHaveTextContent(
      "Time: 4:51:10 AM",
    );
  });
});
