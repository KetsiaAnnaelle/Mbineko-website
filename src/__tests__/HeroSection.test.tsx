import { render, screen } from '@testing-library/react'
import HeroSection from '../../reusable-components/LandingPage/HeroSection'

describe('HeroSection', () => {
  it('renders title and CTAs', () => {
    render(<HeroSection />)
    expect(screen.getByText(/LA FORET/i)).toBeInTheDocument()
    expect(screen.getByText(/TELECHARGER L'APPLICATION MOBILE/i)).toBeInTheDocument()
    expect(screen.getByText(/COMMANDER LE KIT/i)).toBeInTheDocument()
  })
})
