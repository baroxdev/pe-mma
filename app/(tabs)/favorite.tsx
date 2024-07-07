import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  Alert,
  SafeAreaView,
  SectionList,
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useFavorite from "@/hooks/useFavorite";
import { useEffect, useState } from "react";
import { API_URL, resources } from "../services";
import { Heart } from "lucide-react-native";
import { toSectionList } from "./(home)";
import OrchidCard from "@/components/OrchidCard";
import { useOrchids } from "@/context/orchid-context";

export default function TabTwoScreen() {
  const { isFavorite, removeFavorite } = useFavorite();
  const { orchids, isReady, orchidsAsSectionList, orchidsInFavorites } =
    useOrchids();
  const sectionList = toSectionList(orchidsInFavorites)?.filter(
    (section) => section.data.length > 0
  );
  const flatList = orchidsInFavorites.map((orchid) => orchid.items).flat();
  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          padding: 16,
        }}
      >
        Favorite list
      </Text>
      <FlatList
        data={flatList}
        style={{
          gap: 16,
        }}
        keyExtractor={(item) => item?.name}
        renderItem={({ item }) => {
          if (!isFavorite(item?.name)) {
            return <></>;
          }
          return <OrchidCard item={item} />;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  section: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    fontWeight: "bold",
    fontSize: 18,
  },
  card: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowOpacity: 0.03,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  cardThumb: {
    width: "100%",
    height: 230,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  colorSquare: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  topBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
});
