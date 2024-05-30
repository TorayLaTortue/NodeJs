export enum Roles {
    admin = "admin",
    manager ="manager",
    user ="user"
  }

export type UserType = {
    displayName: string;
    email: string;
    role: Roles;
    photoURL: string;
    uid: string;
    // All others field
};

export const nullUserType: UserType = {
    displayName: '',
    email: '',
    role: Roles.user,
    photoURL: '',
    uid: ''
    // All others field
};