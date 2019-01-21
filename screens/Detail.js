import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import data from '../assets/quest';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyContent: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerT: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '得分',
  };

  state = {
  };

  componentWillMount() {
    const arr = data.map((v, i) => {
      return { title: v[0], option: v.slice(1, 5).sort(), anwser: v[5] };
    });
    this.setState({ arr });
  }

  restart = () => {
    this.props.navigation.pop();
  }

  render() {
    const { grade, useTime } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.bodyContent}>
          <Text>您总共对了： {grade}道题</Text>
          <Text>总共花了： {useTime}</Text>
        </View>
        <TouchableOpacity style={styles.footerT} onPress={this.restart}>
          <Text>重新答题</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

