import React, { useState } from 'react';
import { StyleSheet } from 'react-native';


import GridElement from '../components/GridElement';
import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
import { Button } from "@rneui/themed";
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  const [isPlayMode, setIsPlayMode] = useState(true);

  const midiService = new MIDI_HTTP_Service("192.168.0.13", "4848"); //THIS SHOULD EVENTUALLY BE A PROP FOR ALL TABS


  return (
    <View style={styles.container}>
      <GridElement MIDI_HTTP_Service={midiService} defaultName="First" defaultNoteNumber={0} isPlayMode={isPlayMode}></GridElement>

      <GridElement MIDI_HTTP_Service={midiService} defaultName="Second" defaultNoteNumber={3} isPlayMode={isPlayMode}></GridElement>

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
