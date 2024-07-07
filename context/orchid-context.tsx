import { API_URL, resources } from "@/app/services";
import useFavorite from "@/hooks/useFavorite";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

export interface OrchidContextState {
  isReady: boolean;
  setReady: (ready: boolean) => void;
  orchids: any[];
  orchidsAsSectionList: any[];
  orchidsInFavorites: any[];
}

export const DEFAULT_ORCHID_CONTEXT: OrchidContextState = {
  isReady: false,
  setReady: () => {},
  orchids: [],
  orchidsAsSectionList: [],
  orchidsInFavorites: [],
};

export const OrchidContext = React.createContext<OrchidContextState>(
  DEFAULT_ORCHID_CONTEXT
);

export const toSectionList = (orchids: any[]) => {
  return orchids.map((orchid) => {
    return {
      title: orchid.name,
      data: orchid?.items,
    };
  });
};

export const OrchidProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isReady, setReady] = React.useState<boolean>(false);
  const { addFavorite, isFavorite, removeFavorite, favoriteIds } =
    useFavorite();

  const [orchids, setOrchids] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [orchidsInFavorites, setOrchidsInFavorites] = useState<any[]>([]);
  console.log({ orchidsInFavorites });
  useEffect(() => {
    fetchOrchids();
  }, []);

  useEffect(() => {
    setOrchidsInFavorites(
      orchids.map((orchid) => {
        return {
          ...orchid,
          items: orchid.items.filter((item: any) => isFavorite(item?.name)),
        };
      })
    );
  }, [favoriteIds, orchids]);

  const fetchOrchids = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL + resources.categories);
      const data = await response.json();
      setOrchids(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error fetching orchids");
    }
  };

  const orchidsAsSectionList = toSectionList(orchids);

  return (
    <OrchidContext.Provider
      value={{
        isReady,
        setReady,
        orchids,
        orchidsAsSectionList,
        orchidsInFavorites,
      }}
    >
      {children}
    </OrchidContext.Provider>
  );
};

export const useOrchids = () => {
  const context = React.useContext(OrchidContext);
  if (!context) {
    throw new Error("useOrchids must be used within an OrchidProvider");
  }

  return context;
};
