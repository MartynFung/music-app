"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  JSX,
} from "react";

type FavoritesContextType = {
  favorites: Set<string>;
  toggleFavorite: (item: string) => void;
};

type FavoritesProviderProps = {
  children: ReactNode;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({
  children,
}: FavoritesProviderProps): JSX.Element {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const savedFavorites = new Set<string>(
      JSON.parse(localStorage.getItem("favorites") as string) || []
    );
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = (item: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(item)) {
        newFavorites.delete(item);
      } else {
        newFavorites.add(item);
      }
      return new Set(newFavorites);
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
