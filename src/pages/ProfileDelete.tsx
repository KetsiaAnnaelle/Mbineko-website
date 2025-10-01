import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

export default function ProfileDelete() {
  const { user, logout } = useAuth()

  const handleDelete = async () => {
    // TODO: Call delete profile API
    alert('Delete profile not yet implemented')
    logout()
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Delete Profile</h1>
      <p className="mb-6">This action will permanently remove the account for {user?.email}.</p>
      <Button variant="destructive" onClick={handleDelete}>Delete my account</Button>
    </div>
  )
}
