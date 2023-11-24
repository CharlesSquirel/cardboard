import { fireEvent, render, screen } from '@testing-library/react'
import { createCard } from '../../data/card/factory'
import { Card } from './Card'

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
    fireEvent.blur(card)
    expect(card).not.toBeInTheDocument()
  })
})
