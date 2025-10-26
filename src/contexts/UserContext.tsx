import { createContext, useContext, useState, ReactNode } from "react";

type Mode = "dating" | "friends";

// This is where I would use a backend API to persist user preferences
interface UserContextType {
  shareGPA: boolean;
  setShareGPA: (value: boolean) => void;
  gpa: string;
  setGPA: (value: string) => void;
  mode: Mode;
  setMode: (value: Mode) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [shareGPA, setShareGPA] = useState(false);
  const [gpa, setGPA] = useState("3.80");
  const [mode, setMode] = useState<Mode>("dating");

  return (
    <UserContext.Provider value={{ shareGPA, setShareGPA, gpa, setGPA, mode, setMode }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
