export type RegisterParams = {
    userFirstName: string;
    userLastName: string;
    userPhone: string;
    userEmail: string;
    username: string;
    password: string;
    // optional
    locale?: string; // the language code, example: en-US, fr-CA, etc...
    address?: string;
    // custom
    city?: string;
    state?: string;
    zip?: string;
};
export type LoginParams = {
    username: string;
    password: string;
};
export type UserParams = {
  name?: string;
  email?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  phone_number?: string;
  given_name?: string;
  family_name?: string;
};

export type ChangePasswordParams = {
  oldPassword: string;
  newPassword: string;
}