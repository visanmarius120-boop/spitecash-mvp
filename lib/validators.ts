export function requiredString(value: FormDataEntryValue | null): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error("Missing required field");
  }

  return value.trim();
}

export function optionalString(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }

  return value.trim();
}

export function requiredBoolean(value: FormDataEntryValue | null): boolean {
  if (value === "true") return true;
  if (value === "false") return false;

  throw new Error("Invalid boolean field");
}

export function checkboxBoolean(value: FormDataEntryValue | null): boolean {
  return value === "on" || value === "true";
}

export function requiredNumber(value: FormDataEntryValue | null): number {
  const raw = requiredString(value);
  const parsed = Number(raw);

  if (!Number.isFinite(parsed)) {
    throw new Error("Invalid number field");
  }

  return parsed;
}

export function optionalNumber(value: FormDataEntryValue | null): number | null {
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error("Invalid optional number field");
  }

  return parsed;
}

export function requiredFile(value: FormDataEntryValue | null): File {
  if (!(value instanceof File) || value.size === 0) {
    throw new Error("Missing required file");
  }

  return value;
}

export function safeFilename(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

const MAX_EVIDENCE_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB per file
const MAX_TOTAL_EVIDENCE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB total

const ALLOWED_EVIDENCE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

const ALLOWED_EVIDENCE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".pdf",
];

export function validateEvidenceFile(file: File, label = "Evidence file"): void {
  if (!(file instanceof File)) {
    throw new Error(`${label} is required.`);
  }

  if (file.size <= 0) {
    throw new Error(`${label} is empty.`);
  }

  if (file.size > MAX_EVIDENCE_FILE_SIZE_BYTES) {
    throw new Error(`${label} is too large. Maximum size is 5MB.`);
  }

  const mimeType = file.type.toLowerCase();
  const filename = file.name.toLowerCase();

  if (!ALLOWED_EVIDENCE_MIME_TYPES.has(mimeType)) {
    throw new Error(
      `${label} has an unsupported file type. Please upload JPG, PNG, WEBP, or PDF.`
    );
  }

  const hasAllowedExtension = ALLOWED_EVIDENCE_EXTENSIONS.some((extension) =>
    filename.endsWith(extension)
  );

  if (!hasAllowedExtension) {
    throw new Error(
      `${label} has an unsupported file extension. Please upload JPG, PNG, WEBP, or PDF.`
    );
  }
}

export function validateTotalEvidenceSize(files: File[]): void {
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  if (totalSize > MAX_TOTAL_EVIDENCE_SIZE_BYTES) {
    throw new Error(
      "Total evidence upload is too large. Maximum total size is 15MB."
    );
  }
}