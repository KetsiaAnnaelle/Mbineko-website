import Swal from 'sweetalert2'

declare global {
  interface Window {
    Swal?: typeof Swal
  }
}

// Assigne SweetAlert2 à window
if (!window.Swal) {
  window.Swal = Swal
}

export function alertSuccess(title: string, text?: string) {
  if (window.Swal) {
    return window.Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonColor: '#228B22',
    })
  }
  // fallback
  alert(`${title}${text ? `\n${text}` : ''}`)
}

export function alertError(title: string, text?: string) {
  if (window.Swal) {
    return window.Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: '#d33',
    })
  }
  alert(`${title}${text ? `\n${text}` : ''}`)
}

export function alertInfo(title: string, text?: string) {
  if (window.Swal) {
    return window.Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonColor: '#3085d6',
    })
  }
  alert(`${title}${text ? `\n${text}` : ''}`)
}
