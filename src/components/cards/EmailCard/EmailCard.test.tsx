import { render, screen, fireEvent } from "@testing-library/react";
import { Email } from "@/types/types";
import { describe, it, expect, vi } from "vitest";
import { formatDate } from "@/utils";
import EmailCard from "./EmailCard";
import "@testing-library/jest-dom";

const mockEmail: Email = {
  id: "1",
  from: { name: "John Doe", email: "john.doe@example.com" },
  subject: "Test Subject",
  short_description: "This is a short description.",
  date: 1730409600000,
};

describe("EmailCard Component", () => {
  it("renders email card content correctly", () => {
    const handleSelectEmail = vi.fn();

    render(
      <EmailCard
        email={mockEmail}
        handleSelectEmail={handleSelectEmail}
        selectedMail={null}
      />
    );

    expect(screen.getByTestId("email-card")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-fallback")).toHaveTextContent("J");
    expect(screen.getByTestId("email-from")).toHaveTextContent(
      "John Doe john.doe@example.com"
    );
    expect(screen.getByTestId("email-subject")).toHaveTextContent(
      "Test Subject"
    );
    expect(screen.getByTestId("email-description")).toHaveTextContent(
      "This is a short description."
    );
    expect(screen.getByTestId("email-date")).toHaveTextContent(
      formatDate(mockEmail.date)
    );
  });

  it("calls handleSelectEmail on card click", () => {
    const handleSelectEmail = vi.fn();

    render(
      <EmailCard
        email={mockEmail}
        handleSelectEmail={handleSelectEmail}
        selectedMail={null}
      />
    );

    fireEvent.click(screen.getByTestId("email-card"));
    expect(handleSelectEmail).toHaveBeenCalledWith(mockEmail);
  });
});
