import { fireEvent, render, screen } from '@testing-library/react'
import { createCard } from '../../data/card/factory'
import { Card } from './Card'
import {vi} from "vitest"

describe('Card component unit tests', () => {
  const mockedCard = createCard({
    content: 'test content',
  })
  it('if clicking on <Card /> enters edit mode', () => {
    render(<Card {...mockedCard} />)
    const card = screen.getByText('test content')
    fireEvent.click(card)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
  })
  it("if clicking outside edit mode exits edit mode", () => {
    render(<Card {...mockedCard} />)
    const card = screen.getByText('test content')
    fireEvent.click(card)
    fireEvent.blur(screen.getByRole("textbox"))
    expect(card).not.toBeInTheDocument()
  })
  it("if onUpdateCard is being fired when exiting edit mode", () => {
    const mockUpdateCard = vi.fn()
    render(<Card {...mockedCard} onUpdateCard={mockUpdateCard}/>)
    const card = screen.getByText('test content')
    fireEvent.click(card)
    fireEvent.blur(screen.getByRole("textbox"))
    expect(mockUpdateCard).toHaveBeenCalled()
  })
  it("if value on textarea is being set when firing change event in edit mode", () => {
    const mockedNewText = "new content";
    render(<Card {...mockedCard} />)
    const card = screen.getByText('test content')
    fireEvent.click(card)
    const textarea = screen.getByRole("textbox")
    fireEvent.change(textarea,{target:{value: mockedNewText}})
    expect(textarea.textContent).toBe(mockedNewText)
  })
})
