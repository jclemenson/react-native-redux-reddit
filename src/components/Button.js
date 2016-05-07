import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={styles.container}>
        <View style={[styles.button, this.props.style, this.props.selected && styles.selected]}>
          <Text style={styles.text}>
            {this.props.label}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 5,
    margin: 2
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  selected: {
    backgroundColor: '#aaa'
  }
});


Button.propTypes = {
  onPress: React.PropTypes.func,
  label: React.PropTypes.string,
  selected: React.PropTypes.bool
};
