import React, { Component } from 'react';
import { FlatList, View, Text, TextInput, Button } from 'react-native';
import firebase from 'react-native-firebase';

import Event from '../components/Event';

class Events extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('events');
    this.unsubscribe = null;

    this.state = {
      textInput: '',
      loading: true,
      events: [],
    };
  }
componentDidMount() {
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
}

componentWillUnmount() {
  this.unsubscribe();
}

  updateTextInput(value) {
    this.setState({ textInput: value});
  }

  onCollectionUpdate = (querySnapshot) => {
    const events = [];


  querySnapshot.forEach((doc) => {
    const { title } = doc.data();

    events.push({
      key: doc.id,
      doc,
      title,
    });
  });

  this.setState({
    events,
    loading: false,
  });
}
  addEvent() {
    this.ref.add({
      title: this.state.textInput,
    });
    this.setState({
      textInput: '',
    });
  }
  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.events}
          renderItem={({ item }) => <Event {...item} />}
        / >
        <TextInput
          placeholder={'Add Event'}
          value={this.state.textInput}
          onChangeText={(text) => this.updateTextInput(text)}
        />
        <Button
          title={'Add Event'}
          disabled={!this.state.textInput.length}
          onPress={() => this.addEvent()}Event
        />
      </View>
    );
  }
}

export default Events;
