/**
 * Chuyển link chia sẻ Google Drive thành link ảnh có thể dùng trong thẻ <img>.
 * File trên Drive cần được đặt quyền "Bất kỳ ai có đường liên kết".
 */
export function toDisplayImageUrl(url) {
  if (!url || !url.includes('drive.google.com')) {
    return url
  }

  const fileId =
    url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1] ||
    url.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1]

  return fileId
    ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`
    : url
}

export function toDisplayImageUrls(input) {
  return input
    .split(',')
    .map((url) => toDisplayImageUrl(url.trim()))
    .filter(Boolean)
}
