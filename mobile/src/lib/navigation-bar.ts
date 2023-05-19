import * as NavigationBar from 'expo-navigation-bar'
import { Platform } from 'react-native'

export function setNavigationBarColor(color: string) {
  if (Platform.OS === 'android') {
    NavigationBar.setBackgroundColorAsync(color)
  }
}
