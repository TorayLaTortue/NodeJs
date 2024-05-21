export enum Roles {
    admin = "admin",
    manager ="manager",
    user ="user"
  }

export type UserType = {
    displayName: string;
    email: string;
    role: Roles;
    uid: string;
    // All others field
};