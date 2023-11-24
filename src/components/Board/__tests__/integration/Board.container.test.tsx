import { vi } from "vitest"
import * as dataModule from '../../../../data'
import { render, waitFor, screen, fireEvent } from "@testing-library/react"
import BoardContainer from "../../Board.container"

describe('BoardContainer integration tests', () => {
  it("if clicking on <AddNewCard /> adds new card to database, and displays it correctly in <Board />", async() => {
    vi.spyOn(dataModule, 'findCards').mockResolvedValue([])
    const createCardSpy = vi
      .spyOn(dataModule.CardModel.prototype, 'create')
      .mockResolvedValue()
    render(<BoardContainer/>)
    await waitFor(() => {
      const addBtn = screen.getByRole("button", {
        name: "Add new card"
      })
      fireEvent.click(addBtn)
      expect(screen.getByText("Click to start noting")).toBeInTheDocument()
    })
    expect(createCardSpy).toHaveBeenCalledTimes(1)
  })

})
