import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import useFavorite from "@/hooks/useFavorite";
import { Heart } from "lucide-react-native";
import { useEffect, useState } from "react";
import { API_URL, resources } from "../../services";
import OrchidCard from "@/components/OrchidCard";
import { useOrchids } from "@/context/orchid-context";

export const toSectionList = (orchids: any[]) => {
  return orchids.map((orchid) => {
    return {
      title: orchid.name,
      data: orchid?.items,
    };
  });
};

export default function HomeScreen() {
  const { orchids, isReady, orchidsAsSectionList } = useOrchids();

  return (
    <SafeAreaView>
      <SectionList
        sections={orchidsAsSectionList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          return <OrchidCard item={item} />;
        }}
        renderSectionHeader={({ section: { title } }) => {
          return (
            <View style={styles.section}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                {title}
              </Text>
            </View>
          );
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
