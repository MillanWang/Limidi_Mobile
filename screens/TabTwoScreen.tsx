import React, { useState } from 'react';
import { StyleSheet } from 'react-native';


import GridElement from '../components/GridElement';

import { Button } from "@rneui/themed";
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  const [isPlayMode, setIsPlayMode] = useState(true);

  return (
    <View style={styles.container}>
      <GridElement defaultName="First" isPlayMode={isPlayMode}></GridElement>
      <Button onPress={() => { setIsPlayMode(!isPlayMode) }}>TOGGLE PLAY MODE</Button>
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
