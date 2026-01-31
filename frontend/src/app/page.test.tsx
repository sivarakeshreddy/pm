import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Home from "@/app/page";

const mockBoard = {
    board: { id: "1", title: "My Board" },
    columns: [
        { id: "1", title: "Backlog", position: 0, cardIds: [] },
    ],
    cards: {},
};

describe("Home page", () => {
    it("shows the login screen by default", () => {
        render(<Home />);
        expect(screen.getByText("Welcome back")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    });

    it("allows signing in with demo credentials", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => mockBoard,
            text: async () => "",
        } as Response);

        render(<Home />);
        await userEvent.type(screen.getByPlaceholderText("user"), "user");
        await userEvent.type(screen.getByPlaceholderText("password"), "password");
        await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

        expect(await screen.findByText("Kanban Studio")).toBeInTheDocument();
        vi.restoreAllMocks();
    });
});
