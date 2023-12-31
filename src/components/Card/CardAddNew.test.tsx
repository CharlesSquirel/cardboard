import { fireEvent, render, screen } from "@testing-library/react"
import { CardAddNew } from "./CardAddNew"
import { vi } from "vitest"

describe('CardAddNew component unit tests', () => {
  it("if clicking on <CardAddNew /> fires onAddCard handler when component is not disabled", () => {
    const mockedOnAddCard = vi.fn()
    render(<CardAddNew onAddCard={mockedOnAddCard}/>)
    const btnAddCard = screen.getByRole("button")
    expect(btnAddCard).not.toBeDisabled()
    fireEvent.click(btnAddCard)
    expect(mockedOnAddCard).toHaveBeenCalled()
  })
  it("if clicking on <CardAddNew /> fires onAddCard handler when component is disabled", () => {
    const mockedOnAddCard = vi.fn()
    render(<CardAddNew onAddCard={mockedOnAddCard} disabled={true}/>)
    const btnAddCard = screen.getByRole("button")
    expect(btnAddCard).toBeDisabled()
    fireEvent.click(btnAddCard)
    expect(mockedOnAddCard).toHaveBeenCalledTimes(0)
  })
})
