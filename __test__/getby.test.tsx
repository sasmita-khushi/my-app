import { render, screen } from "@testing-library/react-native";
import MyPage from "@/src/app/getby-page";

describe("MyPage Component", () => {
  it("should render without crashing", () => {
    render(<MyPage />);
    const welcomeText = screen.getAllByTestId("welcome");
    expect(welcomeText).toBeTruthy();
  });
  it("gets multiple elements using getAllByText", () => {
    render(<MyPage />);
    const welcomeTexts = screen.getByText("Welcome to My App");
    const hello = screen.queryByTestId("hello");
    expect(hello).toBeTruthy();
    expect(welcomeTexts).toBeTruthy();
  });
});
