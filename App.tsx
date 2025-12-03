/**
 * FindYour11 - Main App Entry Point
 * 
 * Cricket team management and turf booking application
 * Supports web, Android, and iOS platforms
 * 
 * Architecture:
 * - Theme Provider: Global theme management
 * - Navigation: Type-safe React Navigation
 * - Folders: Organized by feature (screens, components, services, etc.)
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/theme';
import { RootNavigator } from './src/navigation';

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <RootNavigator />
    </ThemeProvider>
  );
}
