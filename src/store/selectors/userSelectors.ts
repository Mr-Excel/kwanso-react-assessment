import type {
  User,
  Location,
  Login,
  DateInfo,
  Id,
  Picture,
} from "@interface/index";
import type { RootState } from "../store";
// Basic state selectors
export const selectUsers = (state: RootState): User[] => state.user.users;
export const selectApiInfo = (state: RootState) => state.user.apiInfo;
export const selectLoading = (state: RootState): boolean => state.user.loading;
export const selectError = (state: RootState): string | null =>
  state.user.error;
export const selectSelectedUser = (state: RootState): User | null =>
  state.user.selectedUser;

// Derived selectors - User counts and status
export const selectUserCount = (state: RootState): number =>
  state.user.users.length;
export const selectHasUsers = (state: RootState): boolean =>
  state.user.users.length > 0;
export const selectIsLoading = (state: RootState): boolean =>
  state.user.loading;
export const selectHasError = (state: RootState): boolean =>
  state.user.error !== null;

// User filtering selectors
export const selectUsersByGender =
  (gender: string) =>
  (state: RootState): User[] =>
    state.user.users.filter((user) => user.gender === gender);

export const selectUsersByNationality =
  (nat: string) =>
  (state: RootState): User[] =>
    state.user.users.filter((user) => user.nat === nat);

export const selectUsersByCountry =
  (country: string) =>
  (state: RootState): User[] =>
    state.user.users.filter((user) => user.location.country === country);

// User search selectors
export const selectUsersBySearchTerm =
  (searchTerm: string) =>
  (state: RootState): User[] => {
    if (!searchTerm.trim()) return state.user.users;
    const term = searchTerm.toLowerCase();
    return state.user.users.filter(
      (user) =>
        user.name.first.toLowerCase().includes(term) ||
        user.name.last.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.login.username.toLowerCase().includes(term) ||
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(term)
    );
  };

// Single user selectors
export const selectUserById =
  (uuid: string) =>
  (state: RootState): User | undefined =>
    state.user.users.find((user) => user.login.uuid === uuid);

export const selectUserByEmail =
  (email: string) =>
  (state: RootState): User | undefined =>
    state.user.users.find((user) => user.email === email);

export const selectUserByUsername =
  (username: string) =>
  (state: RootState): User | undefined =>
    state.user.users.find((user) => user.login.username === username);

// Name selectors
export const selectUserFullName =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user ? `${user.name.first} ${user.name.last}` : undefined;
  };

export const selectUserTitle =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.name.title;
  };

export const selectUserFirstName =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.name.first;
  };

export const selectUserLastName =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.name.last;
  };

// Location selectors
export const selectUserLocation =
  (uuid: string) =>
  (state: RootState): Location | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.location;
  };

export const selectUserCity =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.location.city;
  };

export const selectUserState =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.location.state;
  };

export const selectUserCountry =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.location.country;
  };

export const selectUserPostcode =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.location.postcode;
  };

export const selectUserFullAddress =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    if (!user) return undefined;
    return `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}, ${user.location.country}`;
  };

// Login selectors
export const selectUserLogin =
  (uuid: string) =>
  (state: RootState): Login | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.login;
  };

export const selectUserUuid =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.login.uuid;
  };

export const selectUserUsername =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.login.username;
  };

// Contact selectors
export const selectUserEmail =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.email;
  };

export const selectUserPhone =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.phone;
  };

export const selectUserCell =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.cell;
  };

// Date selectors
export const selectUserDob =
  (uuid: string) =>
  (state: RootState): DateInfo | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.dob;
  };

export const selectUserAge =
  (uuid: string) =>
  (state: RootState): number | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.dob.age;
  };

export const selectUserRegistered =
  (uuid: string) =>
  (state: RootState): DateInfo | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.registered;
  };

// Picture selectors
export const selectUserPicture =
  (uuid: string) =>
  (state: RootState): Picture | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.picture;
  };

export const selectUserPictureLarge =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.picture.large;
  };

export const selectUserPictureMedium =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.picture.medium;
  };

export const selectUserPictureThumbnail =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.picture.thumbnail;
  };

// ID selectors
export const selectUserId =
  (uuid: string) =>
  (state: RootState): Id | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.id;
  };

// Nationality selectors
export const selectUserNationality =
  (uuid: string) =>
  (state: RootState): string | undefined => {
    const user = state.user.users.find((user) => user.login.uuid === uuid);
    return user?.nat;
  };

// Aggregated data selectors
export const selectUniqueNationalities = (state: RootState): string[] => {
  const nationalities = state.user.users.map((user) => user.nat);
  return Array.from(new Set(nationalities)).sort();
};

export const selectUniqueCountries = (state: RootState): string[] => {
  const countries = state.user.users.map((user) => user.location.country);
  return Array.from(new Set(countries)).sort();
};

export const selectUniqueGenders = (state: RootState): string[] => {
  const genders = state.user.users.map((user) => user.gender);
  return Array.from(new Set(genders));
};

export const selectUsersByAgeRange =
  (minAge: number, maxAge: number) =>
  (state: RootState): User[] =>
    state.user.users.filter(
      (user) => user.dob.age >= minAge && user.dob.age <= maxAge
    );

// API Info selectors
export const selectSeed = (state: RootState): string | undefined =>
  state.user.apiInfo?.seed;

export const selectResultsCount = (state: RootState): number | undefined =>
  state.user.apiInfo?.results;

export const selectPage = (state: RootState): number | undefined =>
  state.user.apiInfo?.page;

export const selectApiVersion = (state: RootState): string | undefined =>
  state.user.apiInfo?.version;
