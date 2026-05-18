/**
 * Tách chữ cái đầu từ tên người dùng để hiển thị avatar.
 * Lấy tối đa 2 chữ cái đầu của 2 từ cuối cùng trong tên.
 */
export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
