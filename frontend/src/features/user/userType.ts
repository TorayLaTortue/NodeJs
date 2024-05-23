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