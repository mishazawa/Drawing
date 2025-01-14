import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(drawing)" options={{ headerShown: false }} />
    </Stack>
  );
}
