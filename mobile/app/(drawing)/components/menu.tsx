import { Link } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export function Menu() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingBottom: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Menu</Text>
        <TimeModeValues />
        <Link href="/viewer" asChild>
          <Pressable>
            <Text>Start</Text>
          </Pressable>
        </Link>
        <Link href="/viewer2" asChild>
          <Pressable>
            <Text>Start2</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

export const TIME_CONFIG: Array<[string, number]> = [
  ["30 seconds", 30],
  ["60 seconds", 60],
  ["2 minutes", 120],
  ["5 minutes", 300],
  ["10 minutes", 600],
  ["custom", -1],
];

function TimeValue({ item }: { item: [string, number] }) {
  return (
    <View>
      <Text>{item[0]}</Text>
    </View>
  );
}

function TimeModeValues() {
  return (
    <View>
      <FlatList
        data={TIME_CONFIG}
        keyExtractor={(i) => i[0]}
        renderItem={TimeValue}
      />
    </View>
  );
}
