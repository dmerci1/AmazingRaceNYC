import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

export default class Event extends React.PureComponent {

  render() {
    return (
      <TouchableHighlight>
      <View style={{ flex: 1,
                     height: 48,
                     flexDirection: 'row',
                     alignItems: 'center'
                  }}
      >
        <View style={{ flex: 8 }}>
          <Text>{this.props.title}</Text>
        </View>
      </View>
    </TouchableHighlight>
    );
  }
}
