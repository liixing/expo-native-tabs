import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useMemo } from "react";
import { Platform, StyleSheet } from "react-native";

import { ExternalLink } from "@/components/external-link";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type ListItem = {
  id: string;
  type: "header" | "description" | "collapsible";
  title?: string;
  content?: React.ReactNode;
};

export default function TabTwoScreen() {
  const colorScheme = useColorScheme() ?? "light";

  const listData = useMemo<ListItem[]>(
    () => [
      {
        id: "header",
        type: "header",
      },
      {
        id: "description",
        type: "description",
      },
      {
        id: "routing",
        type: "collapsible",
        title: "File-based routing",
        content: (
          <>
            <ThemedText>
              This app has two screens:{" "}
              <ThemedText type="defaultSemiBold">
                app/(tabs)/index.tsx
              </ThemedText>{" "}
              and{" "}
              <ThemedText type="defaultSemiBold">
                app/(tabs)/explore.tsx
              </ThemedText>
            </ThemedText>
            <ThemedText>
              The layout file in{" "}
              <ThemedText type="defaultSemiBold">
                app/(tabs)/_layout.tsx
              </ThemedText>{" "}
              sets up the tab navigator.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <ThemedText type="link">Learn more</ThemedText>
            </ExternalLink>
          </>
        ),
      },
      {
        id: "platforms",
        type: "collapsible",
        title: "Android, iOS, and web support",
        content: (
          <ThemedText>
            You can open this project on Android, iOS, and the web. To open the
            web version, press <ThemedText type="defaultSemiBold">w</ThemedText>{" "}
            in the terminal running this project.
          </ThemedText>
        ),
      },
      {
        id: "images",
        type: "collapsible",
        title: "Images",
        content: (
          <>
            <ThemedText>
              For static images, you can use the{" "}
              <ThemedText type="defaultSemiBold">@2x</ThemedText> and{" "}
              <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to
              provide files for different screen densities
            </ThemedText>
            <Image
              source={require("@/assets/images/react-logo.png")}
              style={{ width: 100, height: 100, alignSelf: "center" }}
            />
            <ExternalLink href="https://reactnative.dev/docs/images">
              <ThemedText type="link">Learn more</ThemedText>
            </ExternalLink>
          </>
        ),
      },
      {
        id: "themes",
        type: "collapsible",
        title: "Light and dark mode components",
        content: (
          <>
            <ThemedText>
              This template has light and dark mode support. The{" "}
              <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText>{" "}
              hook lets you inspect what the user&apos;s current color scheme
              is, and so you can adjust UI colors accordingly.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <ThemedText type="link">Learn more</ThemedText>
            </ExternalLink>
          </>
        ),
      },
      {
        id: "animations",
        type: "collapsible",
        title: "Animations",
        content: (
          <>
            <ThemedText>
              This template includes an example of an animated component. The{" "}
              <ThemedText type="defaultSemiBold">
                components/HelloWave.tsx
              </ThemedText>{" "}
              component uses the powerful{" "}
              <ThemedText
                type="defaultSemiBold"
                style={{ fontFamily: Fonts.mono }}
              >
                react-native-reanimated
              </ThemedText>{" "}
              library to create a waving hand animation.
            </ThemedText>
            {Platform.select({
              ios: (
                <ThemedText>
                  The{" "}
                  <ThemedText type="defaultSemiBold">
                    components/ParallaxScrollView.tsx
                  </ThemedText>{" "}
                  component provides a parallax effect for the header image.
                </ThemedText>
              ),
            })}
          </>
        ),
      },
    ],
    []
  );

  const renderItem = ({ item }: { item: ListItem }) => {
    switch (item.type) {
      case "header":
        return (
          <ThemedView style={styles.headerContainer}>
            <ThemedView
              style={[
                styles.headerBackground,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "#353636" : "#D0D0D0",
                },
              ]}
            >
              <IconSymbol
                size={310}
                color="#808080"
                name="chevron.left.forwardslash.chevron.right"
                style={styles.headerImage}
              />
            </ThemedView>
            <ThemedView style={styles.titleContainer}>
              <ThemedText
                type="title"
                style={{
                  fontFamily: Fonts.rounded,
                }}
              >
                Explore
              </ThemedText>
            </ThemedView>
          </ThemedView>
        );
      case "description":
        return (
          <ThemedView style={styles.contentContainer}>
            <ThemedText>
              This app includes example code to help you get started.
            </ThemedText>
          </ThemedView>
        );
      case "collapsible":
        return (
          <ThemedView style={styles.contentContainer}>
            <Collapsible title={item.title!}>{item.content}</Collapsible>
          </ThemedView>
        );
      default:
        return null;
    }
  };

  const getItemType = (item: ListItem) => {
    return item.type;
  };

  return (
    <FlashList
      data={listData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      getItemType={getItemType}
      contentContainerStyle={styles.listContent}
      contentInsetAdjustmentBehavior="never"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 32,
  },
  headerContainer: {
    marginBottom: 16,
  },
  headerBackground: {
    height: 250,
    overflow: "hidden",
    position: "relative",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 32,
    paddingTop: 16,
  },
  contentContainer: {
    paddingHorizontal: 32,
    paddingBottom: 16,
    gap: 16,
  },
});
