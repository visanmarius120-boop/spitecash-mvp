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
