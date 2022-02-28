const TYPES = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

export const validateImage = (file: File) => {
  const type = file.type;
  return TYPES.includes(type);
};
