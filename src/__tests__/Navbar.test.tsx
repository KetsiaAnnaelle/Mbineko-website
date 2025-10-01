import { render, screen } from '@testing-library/react'
import Navbar from '../../reusable-components/Layout/Navbar'

describe('Navbar', () => {
  it('renders logo and menu items', () => {
    render(<Navbar />)
    expect(screen.getByAltText('MBINEKO')).toBeInTheDocument()
    expect(screen.getByText(/Accueil/i)).toBeInTheDocument()
    expect(screen.getByText(/Fonctionnalités/i)).toBeInTheDocument()
    expect(screen.getByText(/Contactez-nous/i)).toBeInTheDocument()
  })
})
