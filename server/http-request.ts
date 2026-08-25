const JSON_MEDIA_TYPE = 'application/json';

/**
 * Checks the HTTP media type while allowing ordinary parameters such as a
 * UTF-8 charset. User-authored and generated prose still travels inside JSON.
 */
export function hasJsonContentType(request: Request): boolean {
  const contentType = request.headers.get('content-type');
  if (!contentType) {
    return false;
  }

  const [mediaType] = contentType.split(';', 1);
  return mediaType.trim().toLowerCase() === JSON_MEDIA_TYPE;
}
