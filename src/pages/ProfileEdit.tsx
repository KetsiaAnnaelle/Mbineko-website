import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

export default function ProfileEdit() {
  const { user } = useAuth()
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [organization, setOrganization] = useState(user?.organization || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Call profile update API
    alert('Profile update not yet implemented')
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm mb-1">First name</label>
          <input className="w-full border rounded px-3 py-2" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Last name</label>
          <input className="w-full border rounded px-3 py-2" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Organization</label>
          <input className="w-full border rounded px-3 py-2" value={organization} onChange={(e) => setOrganization(e.target.value)} />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </div>
  )
}
