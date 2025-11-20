export type ApiFormat =
  | "json"
  | "pretty"
  | "prettyJSON"
  | "csv"
  | "yaml"
  | "xml";

export type Gender = "male" | "female";

export type Nationality =
  | "AU"
  | "BR"
  | "CA"
  | "CH"
  | "DE"
  | "DK"
  | "ES"
  | "FI"
  | "FR"
  | "GB"
  | "IE"
  | "IN"
  | "IR"
  | "MX"
  | "NL"
  | "NO"
  | "NZ"
  | "RS"
  | "TR"
  | "UA"
  | "US";

export type FieldToInclude =
  | "gender"
  | "name"
  | "location"
  | "email"
  | "login"
  | "registered"
  | "dob"
  | "phone"
  | "cell"
  | "id"
  | "picture"
  | "nat";

export interface FetchUsersParams {
  results?: number; // 1-5000, default: 1
  gender?: Gender;
  password?: string; // Format: "CHARSETS,MIN-MAX" or "CHARSETS,MAX"
  seed?: string;
  format?: ApiFormat;
  version?: string; // e.g., "1.4"
  nat?: Nationality | Nationality[]; // Single or comma-separated list
  page?: number; // 1-based index
  inc?: FieldToInclude[]; // Fields to include
  exc?: FieldToInclude[]; // Fields to exclude
  dl?: boolean; // Download flag
  noinfo?: boolean; // Exclude info object
  callback?: string; // JSONP callback name
}

