import { render, screen } from '@testing-library/react'
import ImpactsSection from '../../reusable-components/LandingPage/PrototypeSection'

describe('ImpactsSection', () => {
  it('renders impacts header and at least one ODD image', () => {
    render(<ImpactsSection />)
    expect(screen.getByText(/IMPACTS/i)).toBeInTheDocument()
    const imgs = screen.getAllByRole('img')
    expect(imgs.length).toBeGreaterThan(0)
  })
})
