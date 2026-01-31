import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";

describe("Home page", () => {
    it("shows the login screen by default", () => {
        render(<Home />);
        expect(screen.getByText("Welcome back")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    });

    it("allows signing in with demo credentials", async () => {
        render(<Home />);
        await userEvent.type(screen.getByPlaceholderText("user"), "user");
        await userEvent.type(screen.getByPlaceholderText("password"), "password");
        await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

        expect(screen.getByText("Kanban Studio")).toBeInTheDocument();
    });
});
