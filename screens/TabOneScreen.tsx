import React, { useState } from 'react';
import {
  StyleSheet,
  // Button
} from 'react-native';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { Button } from "@rneui/themed";



import GridElement from '../components/GridElement';
import { MIDI_HTTP_Service } from '../services/MIDI_HTTP_Service';
const midiService = new MIDI_HTTP_Service("192.168.0.13", "4848"); //THIS SHOULD EVENTUALLY BE A PROP FOR ALL TABS






export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {


  const [isPlayMode, setIsPlayMode] = useState(true);





  return (
    <View style={styles.container}>

      <View style={styles.sampleButtonKeyboard} >
        <GridElement MIDI_HTTP_Service={midiService} defaultName="C Note" defaultNoteNumber={0} isPlayMode={isPlayMode}></GridElement>
        <GridElement MIDI_HTTP_Service={midiService} defaultName="Db Note" defaultNoteNumber={1} isPlayMode={isPlayMode}></GridElement>
        <GridElement MIDI_HTTP_Service={midiService} defaultName="D Note" defaultNoteNumber={2} isPlayMode={isPlayMode}></GridElement>
        <GridElement MIDI_HTTP_Service={midiService} defaultName="Eb Note" defaultNoteNumber={3} isPlayMode={isPlayMode}></GridElement>
      </View>
      <View style={styles.sampleButtonKeyboard} >
        <GridElement MIDI_HTTP_Service={midiService} defaultName="E Note" defaultNoteNumber={4} isPlayMode={isPlayMode}></GridElement>
        <GridElement MIDI_HTTP_Service={midiService} defaultName="F Note" defaultNoteNumber={5} isPlayMode={isPlayMode}></GridElement>
        <GridElement MIDI_HTTP_Service={midiService} defaultName="Gb Note" defaultNoteNumber={6} isPlayMode={isPlayMode}></GridElement>
        <GridElement MIDI_HTTP_Service={midiService} defaultName="G Note" defaultNoteNumber={7} isPlayMode={isPlayMode}></GridElement>
      </View>
      <View style={styles.sampleButtonKeyboard} >
        <GridElement MIDI_HTTP_Service={midiService} defaultName="Ab Note" defaultNoteNumber={8} isPlayMode={isPlayMode}></GridElement>
        <GridElement MIDI_HTTP_Service={midiService} defaultName="A Note" defaultNoteNumber={9} isPlayMode={isPlayMode}></GridElement>
        <GridElement MIDI_HTTP_Service={midiService} defaultName="Bb Note" defaultNoteNumber={10} isPlayMode={isPlayMode}></GridElement>
        <GridElement MIDI_HTTP_Service={midiService} defaultName="B Note" defaultNoteNumber={11} isPlayMode={isPlayMode}></GridElement>

      </View>
      <Button onPress={() => { setIsPlayMode(!isPlayMode) }}>TOGGLE PLAY MODE</Button>




      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 12
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
  sampleButtonKeyboard: {
    flex: 1,
    flexDirection: 'row',
    // height: 3,
    width: 1234,
  }
});
