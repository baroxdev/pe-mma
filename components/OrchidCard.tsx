import useFavorite from "@/hooks/useFavorite";
import { useNavigation } from "@react-navigation/native";
import { Link, useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface OrchidCardProps {
  item: any;
  gridMode?: boolean;
}

function OrchidCard({ item, gridMode }: OrchidCardProps) {
  const router = useRouter();
  const { isFavorite, addFavorite, removeFavorite } = useFavorite();
  const detailHref = `(home)/details/[id]`;
  return (
    <View
      style={{
        ...styles.card,
        width: gridMode ? "48%" : "100%",
        position: "relative",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: detailHref,
            params: { id: item?.name, data: JSON.stringify(item) },
          });
        }}
        style={styles.cardThumb}
      >
        <Image
          style={styles.cardThumb}
          source={{
            uri: item?.image,
          }}
          alt={item?.name}
        />
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          paddingBottom: 8,
        }}
      >
        <View
          style={{
            ...styles.colorSquare,
            backgroundColor: item?.color,
          }}
        />
        <Link
          href={{
            pathname: detailHref,
            params: { id: item?.name },
          }}
        >
          <Text style={styles.cardTitle}>{item?.name}</Text>
        </Link>
      </View>

      {item?.isTopOfTheWeek && (
        <View
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            borderRadius: 4,
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: "#fff",
          }}
        >
          <Text
            style={{
              color: `orange`,
              fontWeight: "semibold",
            }}
          >
            Top of week
          </Text>
        </View>
      )}
      <Pressable
        style={{
          position: "absolute",
          top: 32,
          right: 32,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          borderRadius: 10,
        }}
        onPress={() => {
          if (isFavorite(item?.name)) {
            removeFavorite(item?.name);
          } else {
            addFavorite(item?.name);
          }
        }}
      >
        {isFavorite(item?.name) ? (
          <Heart color={"red"} fill={"red"} />
        ) : (
          <Heart />
        )}
      </Pressable>
    </View>
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

export default OrchidCard;
