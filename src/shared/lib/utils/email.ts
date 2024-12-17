/**
 * Safely extracts username from email address
 * @param email - The email address to extract username from
 * @returns The username part of the email or undefined if invalid
 */
export const getUsernameFromEmail = (
  email: string | null | undefined,
): string | undefined => {
  return email?.split('@')[0]
}
