export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

export function validatePassword(password: string): { isValid: boolean; message?: string } {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' }
  }
  if (password.length > 128) {
    return { isValid: false, message: 'Password is too long' }
  }
  return { isValid: true }
}

export function validateName(name?: string): boolean {
  if (!name) return true // Name is optional
  return name.length <= 100 && name.trim().length > 0
}

export function sanitizeInput(input: string): string {
  return input.trim().slice(0, 1000) // Prevent extremely long inputs
}

export function validateBookData(data: any): { isValid: boolean; message?: string } {
  if (!data.bookId || typeof data.bookId !== 'string') {
    return { isValid: false, message: 'Invalid book ID' }
  }
  if (!data.bookTitle || typeof data.bookTitle !== 'string') {
    return { isValid: false, message: 'Invalid book title' }
  }
  if (data.bookTitle.length > 500) {
    return { isValid: false, message: 'Book title is too long' }
  }
  if (data.bookAuthor && typeof data.bookAuthor !== 'string') {
    return { isValid: false, message: 'Invalid book author' }
  }
  if (data.bookAuthor && data.bookAuthor.length > 200) {
    return { isValid: false, message: 'Book author name is too long' }
  }
  return { isValid: true }
}