import React, { Component } from 'react';
import { FlatList, View, Text, TextInput, Modal, Alert, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';
import { Container,Card, Button } from 'native-base';

import Event from '../components/Event';
import EventsFormModal from '../components/EventsFormModal';

class Events extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('events');
    this.unsubscribe = null;

    this.state = {
      textInput: '',
      loading: true,
      events: [],
      modalVisible: false,
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

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onAccept() {
  const { uid } = this.props.navigation.state.params.dog;

  const navigationProps = this.props.navigation;
  this.props.dogDelete({ uid, navigationProps });
  this.props.userDogDelete({ uid, navigationProps });
}

onDecline() {
  this.setState({ showModal: false });
}
  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <View>
        <Modal
          animationType= "slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed');
          }}>
          <View>
            <View>
              <Text>Hello World</Text>
              <Button rounded danger
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </Button>
              <EventsFormModal
          />
            </View>
          </View>
        </Modal>

        <Button rounded info
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </Button>
      </View>



    );
  }
}

export default Events;
