
import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Container, Header, Item, Content, Button, Input, Left, Right, Body, Icon, Card, CardItem } from 'native-base';

class EventsFormModal extends Component {
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#ffffff' }}>
          <Left />
          <Body>
            <Text style={{ fontSize: 25 }}>Create Event</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text style={styles.textStyle}>Title</Text>
          <Item rounded>
            <Input style={{ borderWidth: 5 }} />
          </Item>
          <Button block dark>
            <Text style={{ color: 'white' }}>Close Modal</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  cardStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  }
});
export default EventsFormModal;
