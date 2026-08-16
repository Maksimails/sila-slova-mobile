import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { FloatingActionButton } from '@/components/floating-action-button';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';

function TabIcon({ glyph, focused }: { glyph: string; focused: boolean }) {
  return (
    <ThemedText type="subtitle" style={{ opacity: focused ? 1 : 0.4 }}>
      {glyph}
    </ThemedText>
  );
}

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.text,
          tabBarInactiveTintColor: Colors.textSecondary,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarShowLabel: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Лента',
            tabBarIcon: ({ focused }) => <TabIcon glyph="◎" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            title: 'Открытые',
            tabBarIcon: ({ focused }) => <TabIcon glyph="✦" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Профиль',
            tabBarIcon: ({ focused }) => <TabIcon glyph="●" focused={focused} />,
          }}
        />
      </Tabs>
      <FloatingActionButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: Colors.bg,
    borderTopColor: Colors.line,
    height: 84,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});
