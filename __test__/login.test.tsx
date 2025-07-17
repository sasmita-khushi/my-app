import { render, screen, fireEvent } from "@testing-library/react-native";

import LoginForm from "@/src/ui/login-form";

describe("MyLoginPage", () => {
  it("renders username and password inputs and login button", () => {
    render(<LoginForm isLoggedIn={true} />);

    const username = screen.getByLabelText("Username");
    const password = screen.getByLabelText("Password");
    const loginButton = screen.getByLabelText("Login Button");

    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
    expect(loginButton).toBeTruthy();

    const placeholderUsernameText = screen.getByPlaceholderText(
      "Enter your username",
    );
    const placeholderPasswordText = screen.getByPlaceholderText(
      "Enter your password",
    );

    expect(placeholderUsernameText).toBeTruthy();
    expect(placeholderPasswordText).toBeTruthy();
  });

  it("allows typing in username and password fields", () => {
    render(<LoginForm isLoggedIn={true} />);
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.changeText(usernameInput, "testuser");
    fireEvent.changeText(passwordInput, "testpass");

    expect(usernameInput.props.value).toBe("testuser");
    expect(passwordInput.props.value).toBe("testpass");
  });

  it("does not render username and password inputs and login button if isLoggedIn is false", () => {
    render(<LoginForm isLoggedIn={false} />);
    const username = screen.queryByLabelText("Username");
    const password = screen.queryByLabelText("Password");
    const loginButton = screen.queryByLabelText("Login Button");

    expect(username).toBeNull();
    expect(password).toBeNull();
    expect(loginButton).toBeNull();

    const placeholderUsernameText = screen.queryByPlaceholderText(
      "Enter your username",
    );

    const placeholderPasswordText = screen.queryByPlaceholderText(
      "Enter your password",
    );

    expect(placeholderUsernameText).toBeNull();
    expect(placeholderPasswordText).toBeNull();
  });
});
