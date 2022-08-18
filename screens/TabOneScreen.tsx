import React, { useState } from 'react';
import {
  StyleSheet,
  // Button
} from 'react-native';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { Button } from "@rneui/themed";

import {
  NOTE,
  MidiMessageProps,
} from '../constants/MIDI_Notes';

import {
  DesktopAppCommunicationsProps,
} from '../constants/Communications';

import {
  sendMidiMessage
} from '../services/MIDI_HTTP_Service'

const testDesktopComms: DesktopAppCommunicationsProps = {
  ip: "192.168.0.13",
  port: "4848"
};

const makeNoteOnVelocity100 = (note: NOTE): MidiMessageProps => {
  return {
    note: note,
    octave: 5,
    velocity: 100,
    isNoteOn: true
  }

};
const killNote = async (note: NOTE) => {
  sendMidiMessage(
    testDesktopComms, {
    note: note,
    octave: 5,
    velocity: 0,
    isNoteOn: false
  })
};



export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [currentNote, setCurrentNote] = useState("Most recent note here");



  const x = (note: MidiMessageProps, msg: string) => {
    setCurrentNote(msg);
    sendMidiMessage(testDesktopComms, note);
  }


  return (
    <View style={styles.container}>

      <Text style={styles.title}>{currentNote}</Text>


      <View style={styles.sampleButtonKeyboard}>
        <Button title="C" onPressIn={() => { x(makeNoteOnVelocity100(NOTE.C), "C") }} onPressOut={() => { killNote(NOTE.C) }} />
        <Button title="Db" onPressIn={() => { x(makeNoteOnVelocity100(NOTE.Db), "Db") }} onPressOut={() => { killNote(NOTE.Db) }} />
        <Button title="D" onPressIn={() => { x(makeNoteOnVelocity100(NOTE.D), "D") }} onPressOut={() => { killNote(NOTE.D) }} />
        <Button title="Eb" onPressIn={() => { x(makeNoteOnVelocity100(NOTE.Eb), "Eb") }} onPressOut={() => { killNote(NOTE.Eb) }} />
        <Button title="E" onPressIn={() => { x(makeNoteOnVelocity100(NOTE.E), "E") }} onPressOut={() => { killNote(NOTE.E) }} />
        <Button title="F" onPressIn={() => { x(makeNoteOnVelocity100(NOTE.F), "F") }} onPressOut={() => { killNote(NOTE.F) }} />
        <Button title="Gb" onPressIn={() => { x(makeNoteOnVelocity100(NOTE.Gb), "Gb") }} onPressOut={() => { killNote(NOTE.Gb) }} />
        <Button title="G" onPressIn={() => { x(makeNoteOnVelocity100(NOTE.G), "G") }} onPressOut={() => { killNote(NOTE.G) }} />
        <Button title="Ab" onPressIn={() => { x(makeNoteOnVelocity100(NOTE.Ab), "Ab") }} onPressOut={() => { killNote(NOTE.Ab) }} />
        <Button title="A" onPressIn={() => { x(makeNoteOnVelocity100(NOTE.A), "A") }} onPressOut={() => { killNote(NOTE.A) }} />
        <Button title="Bb" onPressIn={() => { x(makeNoteOnVelocity100(NOTE.Bb), "Bb") }} onPressOut={() => { killNote(NOTE.Bb) }} />
        <Button title="B" onPressIn={() => { x(makeNoteOnVelocity100(NOTE.B), "B") }} onPressOut={() => { killNote(NOTE.B) }} />
      </View>


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
    flex: 2,
    // height: 3,
    // width: 1234,
  }
});
