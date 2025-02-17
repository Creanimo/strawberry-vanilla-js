const createId = (length = 8) => {
  return [...crypto.getRandomValues(new Uint8Array(length))]
    .map(byte => byte.toString(36).padStart(2, '0'))
    .join('')
    .slice(0, length);
};

export { createId };
