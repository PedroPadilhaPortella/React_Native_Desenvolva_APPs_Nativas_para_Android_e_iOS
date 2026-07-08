import React, { createContext, useContext } from "react";

import { avatarColors } from "../constants/avatarColors";
import { users as initialUsers } from "../data/users";
import { User } from "../models/User";

type UsersContextType = {
  users: User[];
  addUser: (user: Omit<User, "id">) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: number) => void;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = React.useState<User[]>(initialUsers);

  const addUser = (user: Omit<User, "id">) => {
    setUsers((currentUsers) => [...currentUsers, { ...user, id: Date.now(), color: user.color ?? avatarColors[0] }]);
  };

  const updateUser = (user: User) => {
    setUsers((currentUsers) =>
      currentUsers.map((item) => (item.id === user.id ? user : item)),
    );
  };

  const deleteUser = (userId: number) => {
    setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));
  };

  return React.createElement(
    UsersContext.Provider,
    { value: { users, addUser, updateUser, deleteUser } },
    children,
  );
}

export function useUsersManager() {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsersManager must be used within a UsersProvider");
  }

  return context;
}

export default UsersContext;