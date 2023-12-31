import { vi } from 'vitest'
import * as dataModule from '../../../../data'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import BoardContainer from '../../Board.container'
import { createManyCards } from '../../../../data/card/factory'

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
  it('deleting selected card works correctly when pressing Backspace when card content is empty', async () => {
    vi.spyOn(dataModule, 'findCards').mockResolvedValue([])
    const createCardSpy = vi
      .spyOn(dataModule.CardModel.prototype, 'create')
      .mockResolvedValue()
    const deleteCardSpy = vi
      .spyOn(dataModule.CardModel.prototype, 'delete')
      .mockResolvedValue()
    render(<BoardContainer />)
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button'))
      const newCard = screen.getByText('Click to start noting')
      fireEvent.click(newCard)
      fireEvent.keyPress(screen.getByRole('textbox'), {
        key: 'Backspace',
        code: 'Backspace',
      })
      expect(newCard).not.toBeInTheDocument()
    })
    expect(createCardSpy).toHaveBeenCalledTimes(1)
  })
  it("pressing Backspace is not deleting card when it's content is not empty", async () => {
    vi.spyOn(dataModule, 'findCards').mockResolvedValue([])
    const createCardSpy = vi
      .spyOn(dataModule.CardModel.prototype, 'create')
      .mockResolvedValue()
    const deleteCardSpy = vi
      .spyOn(dataModule.CardModel.prototype, 'delete')
      .mockResolvedValue()
    render(<BoardContainer />)
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button'))
      const newCard = screen.getByText('Click to start noting')
      fireEvent.click(newCard)
      const textbox = screen.getByRole('textbox') as HTMLTextAreaElement
      fireEvent.change(textbox, {
        target: { value: 'new card value' },
      })
      expect(textbox.textContent).toBe('new card value')
      textbox.setSelectionRange(textbox.value.length, textbox.value.length)
      fireEvent.keyDown(textbox, {
        key: 'Backspace',
        code: 'Backspace',
      })
      expect(textbox).toBeInTheDocument()
    })
    expect(createCardSpy).toHaveBeenCalledTimes(1)
    expect(deleteCardSpy).not.toHaveBeenCalled()
  })
  it('tests displaying cards', async () => {
    const mockedGetCards = vi
      .spyOn(dataModule, 'findCards')
      .mockResolvedValue(createManyCards(10))
    render(<BoardContainer />)
    await waitFor(() => {
      expect(screen.getByTestId('board')).toBeInTheDocument()
      expect(screen.getByTestId('board').children).toHaveLength(11)
    })
    expect(mockedGetCards).toHaveBeenCalled()
  })
})
