import React, { useState } from 'react';
import {
  StyleSheet,
  // Button
} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { Button } from "@rneui/themed";


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [sampleText, setSampleText] = useState("hey");

  const x = () => {
    console.log("BRUH2");
    setSampleText(sampleText + "i")
  }
  return (
    <View style={styles.container}>
      <Button title="Nice Button" onPress={x} />
      <Text style={styles.title}>{sampleText}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
