import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface FavoriteContextState {
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  favoriteIds: Set<string>;
}

export const DEFAULT_FAVORITE_CONTEXT: FavoriteContextState = {
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
  favoriteIds: new Set(),
};

export const FavoriteContext = React.createContext<FavoriteContextState>(
  DEFAULT_FAVORITE_CONTEXT
);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favoriteIds, setFavoriteIds] = React.useState<Set<string>>(new Set());

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const ids = await AsyncStorage.getItem("favoriteIds");
    if (ids) {
      setFavoriteIds(new Set(JSON.parse(ids)));
    }
  };
  const addFavorite = (id: string) => {
    const newSet = new Set(favoriteIds);
    newSet.add(id);

    setFavoriteIds(newSet);
    AsyncStorage.setItem("favoriteIds", JSON.stringify(Array.from(newSet)));
  };

  const removeFavorite = (id: string) => {
    const newSet = new Set(favoriteIds);
    newSet.delete(id);

    setFavoriteIds(newSet);
    AsyncStorage.setItem("favoriteIds", JSON.stringify(Array.from(newSet)));
  };

  const isFavorite = (id: string) => {
    return favoriteIds.has(id);
  };

  const removeNullItemInSet = (set: Set<string>) => {
    const newSet = new Set(set);
    newSet.forEach((id) => {
      if (!id) {
        newSet.delete(id);
      }
    });
    return newSet;
  };

  return (
    <FavoriteContext.Provider
      value={{
        addFavorite,
        removeFavorite,
        isFavorite,
        favoriteIds: removeNullItemInSet(favoriteIds),
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
export const useFavorite = () => {
  const context = React.useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};
export default useFavorite;
