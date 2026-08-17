import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { FloatingActionButton } from '@/components/floating-action-button';
import { Gradients, Radius, type GradientName } from '@/constants/theme';

const TAB_DARK = '#141416';

function TabIcon({
  name,
  focused,
  gradient,
}: {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  gradient: GradientName;
}) {
  if (focused) {
    return (
      <LinearGradient
        colors={Gradients[gradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.iconChip}
      >
        <Ionicons name={name} size={18} color="#ffffff" />
      </LinearGradient>
    );
  }
  return (
    <View style={styles.iconChip}>
      <Ionicons name={name} size={18} color="rgba(255,255,255,0.45)" />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.45)',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarShowLabel: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Лента',
            tabBarIcon: ({ focused }) => <TabIcon name="albums-outline" focused={focused} gradient="blue" />,
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            title: 'Открытые',
            tabBarIcon: ({ focused }) => <TabIcon name="compass-outline" focused={focused} gradient="purple" />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Профиль',
            tabBarIcon: ({ focused }) => <TabIcon name="person-outline" focused={focused} gradient="orange" />,
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
    backgroundColor: TAB_DARK,
    borderTopWidth: 0,
    height: 84,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  iconChip: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
