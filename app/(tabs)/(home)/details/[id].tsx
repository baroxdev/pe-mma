import useFavorite from "@/hooks/useFavorite";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Heart, Star } from "lucide-react-native";
import React, { useEffect } from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";

function OrchidDetail() {
  const { isFavorite, addFavorite, removeFavorite } = useFavorite();
  const { id, data } = useLocalSearchParams();
  const orchidData = JSON.parse((data as any) || "{}");
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: orchidData?.name,
    });
  }, [orchidData]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={{
          uri: orchidData?.image,
        }}
        style={{
          width: "100%",
          height: 200,
        }}
      />
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: "#fff",
          height: "100%",
        }}
      >
        {orchidData?.isTopOfTheWeek && (
          <View
            style={{
              width: 100,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "semibold",
                paddingTop: 8,
                backgroundColor: "#fff",
              }}
            >
              Top of the week
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              paddingTop: 8,
            }}
          >
            {orchidData?.name}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Star color={"yellow"} fill={"yellow"} />
            <Text>({orchidData?.rating})</Text>
          </View>
          <Pressable
            style={{
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
              borderRadius: 10,
            }}
            onPress={() => {
              if (isFavorite(orchidData?.name)) {
                removeFavorite(orchidData?.name);
              } else {
                addFavorite(orchidData?.name);
              }
            }}
          >
            {isFavorite(orchidData?.name) ? (
              <Heart color={"red"} fill={"red"} />
            ) : (
              <Heart />
            )}
          </Pressable>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        ></View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text>Color:</Text>
          <Text>{orchidData?.color}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text>Weight:</Text>
          <Text>{orchidData?.weight}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text>Bonus:</Text>
          <Text>{orchidData?.bonus}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text>Origin:</Text>
          <Text>{orchidData?.origin}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default OrchidDetail;
