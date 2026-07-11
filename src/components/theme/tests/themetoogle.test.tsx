import ThemeToogle from "@/components/theme/themeToogle";
import { COLORS } from "@/constants/colors";
import { fireEvent, render } from "@testing-library/react-native";

let mockThemeState = "dark";

const mockToggleTheme = jest.fn(() => {
  mockThemeState = mockThemeState === "light" ? "dark" : "light";
});

jest.mock("@/store/useThemeStore", () => ({
  useThemeStore: () => ({
    theme: mockThemeState,
    toggleTheme: mockToggleTheme,
  }),
}));

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    mockThemeState = "dark";
    jest.clearAllMocks();
  });

  it("should render correctly in light mode initially", () => {
    const { getByText } = render(<ThemeToogle />);

    const textElement = getByText("the current theme is light");

    expect(textElement).toBeTruthy();
    expect(textElement.props.style.color).toBe(COLORS.light.accentLight);
  });

  it("should toggle from light to dark", () => {
    const { getByTestId, getByText, rerender } = render(<ThemeToogle />);

    expect(getByText("the current theme is light")).toBeTruthy();

    fireEvent.press(getByTestId("theme-toggle"));

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);

    rerender(<ThemeToogle />);

    expect(getByText("the current theme is dark")).toBeTruthy();
  });

  it("should toggle back from dark to light", () => {
    mockThemeState = "dark";

    const { getByTestId, getByText, rerender } = render(<ThemeToogle />);

    expect(getByText("the current theme is dark")).toBeTruthy();

    fireEvent.press(getByTestId("theme-toggle"));

    rerender(<ThemeToogle />);

    expect(getByText("the current theme is light")).toBeTruthy();
  });
});
