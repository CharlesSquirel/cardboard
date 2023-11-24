import { vi } from 'vitest'
import * as dataModule from '../../../../data'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import BoardContainer from '../../Board.container'

describe('BoardContainer integration tests', () => {
  it('if clicking on <AddNewCard /> adds new card to database, and displays it correctly in <Board />', async () => {
    vi.spyOn(dataModule, 'findCards').mockResolvedValue([])
    const createCardSpy = vi
      .spyOn(dataModule.CardModel.prototype, 'create')
      .mockResolvedValue()
    render(<BoardContainer />)
    await waitFor(() => {
      const addBtn = screen.getByRole('button', {
        name: 'Add new card',
      })
      fireEvent.click(addBtn)
      expect(screen.getByText('Click to start noting')).toBeInTheDocument()
    })
    expect(createCardSpy).toHaveBeenCalledTimes(1)
  })
  it('update selected card content correctly', async () => {
    const mockedNewText = 'new text'

    // Mock necessary functions
    vi.spyOn(dataModule, 'findCards').mockResolvedValue([])
    const createCardSpy = vi
      .spyOn(dataModule.CardModel.prototype, 'create')
      .mockResolvedValue()
    const updateCardSpy = vi
      .spyOn(dataModule.CardModel.prototype, 'update')
      .mockResolvedValue()
    render(<BoardContainer />)
    const addBtn = screen.getByRole('button', {
      name: 'Add new card',
    })
    fireEvent.click(addBtn)
    await waitFor(() => {
      const card = screen.getByText('Click to start noting')
      fireEvent.click(card)

      const textarea = screen.getByRole('textbox')
      fireEvent.change(textarea, {
        target: {
          value: mockedNewText,
        },
      })
      const newCard = screen.getByText(mockedNewText)
      expect(newCard).toBeInTheDocument()
      fireEvent.blur(newCard)
    })
    expect(createCardSpy).toHaveBeenCalledTimes(1)
    expect(updateCardSpy).toHaveBeenCalledTimes(1)
  })
})
