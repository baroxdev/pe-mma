import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Heart } from "lucide-react-native";
import useFavorite from "@/hooks/useFavorite";

export default function TabLayout() {
  const { favoriteIds } = useFavorite();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title:
            "Favorites " +
            (favoriteIds.size > 0 ? `(${favoriteIds.size})` : ""),
          tabBarIcon: ({ color, focused }) => (
            <Heart
              fill={focused ? color : "none"}
              // name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
