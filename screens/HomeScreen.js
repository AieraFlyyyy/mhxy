import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import data from '../assets/quest';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '梦幻答题',
    headerStyle: {
      backgroundColor: 'blue',
    },
  };

  componentWillMount() {
    const arr = data.map((v, i) => {
      return { title: v[0], option: v.slice(1, 5).sort(), anwser: v[5] };
    });
    console.log(arr, '@@@@@');
  }


  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
