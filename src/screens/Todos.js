import React, { Component } from 'react';
import { FlatList, View, Text, TextInput, Button } from 'react-native';
import firebase from 'react-native-firebase';

import Todo from '../Todo';

class Todos extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('todos');
    this.unsubscribe = null;

    this.state = {
      textInput: '',
      loading: true,
      todos: [],
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
    const todos = [];


  querySnapshot.forEach((doc) => {
    const { title, complete } = doc.data();

    todos.push({
      key: doc.id,
      doc,
      title,
      complete
    });
  });

  this.setState({
    todos,
    loading: false,
  });
}
  addTodo() {
    this.ref.add({
      title: this.state.textInput,
      complete: false,
    });
    this.setState({
      textInput: '',
    })
  }
  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.todos}
          renderItem={({ item }) => <Todo {...item} />}
        / >
        <TextInput
          placeholder={'Add TODO'}
          value={this.state.textInput}
          onChangeText={(text) => this.updateTextInput(text)}
        />
        <Button
          title={'Add TODO'}
          disabled={!this.state.textInput.length}
          onPress={() => this.addTodo()}
        />
      </View>
    );
  }
}

export default Todos;
