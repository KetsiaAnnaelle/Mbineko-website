import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../hooks/useAuth'
import RegisterPage from '../pages/RegisterPage'

describe('RegisterPage (integration)', () => {
  it('renders Register form inside AuthProvider without crashing', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </AuthProvider>
    )
    expect(screen.getByText(/Carte interactive/i)).toBeInTheDocument()
  })
})
