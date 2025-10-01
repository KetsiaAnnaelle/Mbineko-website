import { useState, useMemo } from "react"
import { useI18n } from "@/i18n"
import { Search, Archive, Trash2, RotateCcw, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  hasKit: boolean
  archived: boolean
  kitDetails?: {
    sensorBoxNumber?: string
    droneNumber?: string
  }
}

// Mock data - replace with actual API call
const mockUsers: User[] = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    role: "user",
    hasKit: true,
    archived: false,
    kitDetails: { sensorBoxNumber: "SB-001", droneNumber: "DR-001" },
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Martin",
    email: "marie.martin@example.com",
    role: "user",
    hasKit: false,
    archived: false,
  },
  {
    id: "3",
    firstName: "Pierre",
    lastName: "Bernard",
    email: "pierre.bernard@example.com",
    role: "admin",
    hasKit: true,
    archived: false,
    kitDetails: { sensorBoxNumber: "SB-002", droneNumber: "DR-002" },
  },
  {
    id: "4",
    firstName: "Sophie",
    lastName: "Dubois",
    email: "sophie.dubois@example.com",
    role: "user",
    hasKit: false,
    archived: true,
  },
]

export default function UserManagement() {
  const { t } = useI18n()
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [users, searchQuery])

  const stats = useMemo(() => {
    return {
      total: users.filter((u) => !u.archived).length,
      withKit: users.filter((u) => u.hasKit && !u.archived).length,
      archived: users.filter((u) => u.archived).length,
    }
  }, [users])

  const handleDelete = (user: User) => {
    setSelectedUser(user)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter((u) => u.id !== selectedUser.id))
      setDeleteDialogOpen(false)
      setSelectedUser(null)
    }
  }

  const handleArchive = (user: User) => {
    setSelectedUser(user)
    setArchiveDialogOpen(true)
  }

  const confirmArchive = () => {
    if (selectedUser) {
      setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, archived: !u.archived } : u)))
      setArchiveDialogOpen(false)
      setSelectedUser(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t("admin.totalUsers", "Total Users")}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <Package className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t("admin.usersWithKit", "Users with KIT")}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.withKit}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t("admin.archivedUsers", "Archived Users")}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.archived}</p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
              <Archive className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder={t("admin.searchUsers", "Search user...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-900">
              <TableHead className="text-gray-700 dark:text-gray-300">{t("admin.name", "Name")}</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">{t("admin.email", "Email")}</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">{t("admin.role", "Role")}</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">{t("admin.kit", "KIT")}</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">{t("admin.status", "Status")}</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">{t("admin.actions", "Actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <TableCell className="font-medium text-gray-900 dark:text-white">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.hasKit
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {user.hasKit ? t("admin.yes", "Yes") : t("admin.no", "No")}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.archived
                        ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}
                  >
                    {user.archived ? t("admin.archived", "Archived") : t("admin.active", "Active")}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleArchive(user)}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {user.archived ? <RotateCcw className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(user)}
                      className="hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-white">{t("admin.delete", "Delete")}</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              {t("admin.confirmDelete", "Are you sure you want to delete this user?")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
              {t("test.cancel", "Cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              {t("admin.delete", "Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Archive Confirmation Dialog */}
      <AlertDialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-white">
              {selectedUser?.archived ? t("admin.restore", "Restore") : t("admin.archive", "Archive")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              {t("admin.confirmArchive", "Are you sure you want to archive this user?")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
              {t("test.cancel", "Cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmArchive} className="bg-green-600 hover:bg-green-700 text-white">
              {selectedUser?.archived ? t("admin.restore", "Restore") : t("admin.archive", "Archive")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
