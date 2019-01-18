import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import data from '../assets/quest';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  GetStart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    padding: 10,
  },
  Content: {
    flex: 1,
    padding: 10,
    paddingLeft: 30,
  },
  topicContent: {
    flexDirection: 'row',
    padding: 10,
  },
  anwserContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '梦幻答题',
  };

  state = {
    start: false,
    arr: [],
    checkedArr: [],
  };

  componentWillMount() {
    const arr = data.map((v, i) => {
      return { title: v[0], option: v.slice(1, 5).sort(), anwser: v[5] };
    });
    this.setState({ arr });
  }

  loookAnwser = (i) => {
    let checkedArr = this.state.checkedArr;
    checkedArr[i] = true;
    console.log(checkedArr, '@@@@');
    this.setState({ checkedArr });
  }
  hiddenAnwser = (i) => {
    let checkedArr = this.state.checkedArr;
    checkedArr[i] = false;
    console.log(checkedArr, '@@@@');
    this.setState({ checkedArr });
  }

  render() {
    const { start, arr, checkedArr } = this.state;
    return (
      <View style={styles.container}>
        {!start &&
          <View style={styles.GetStart}>
            <Button title='GetStart' onPress={() => this.setState({ start: true })} />
          </View>
        }
        <ScrollView>
          {
            start &&
            arr.map((v, i) => {
              const { title = '', option = [], anwser = '' } = v;
              return (
                <View key={i} style={styles.Content}>
                  <View style={styles.topicContent}>
                    <Text style={{ fontSize: 26 }}>题目：{title}</Text>
                  </View>
                  <View>
                    {option.map((item, index) => {
                      return (
                        <Text key={index}>{index + '. ' + item}</Text>
                      );
                    })}
                  </View>
                  <View style={{ flex: 1 }}></View>
                  <View style={styles.anwserContent}>
                    <Text>答案：</Text>
                    {
                      !checkedArr[i] ?
                        <TouchableOpacity onPress={() => this.loookAnwser(i)} ><Icon name='eye-slash' type='font-awesome' /></TouchableOpacity> :
                        <TouchableOpacity onPress={() => this.hiddenAnwser(i)} ><Icon name='eye' type='font-awesome' /></TouchableOpacity>
                    }
                    {
                      checkedArr[i] &&
                      <Text style={{ marginLeft: 10 }}>{anwser}</Text>
                    }
                  </View>
                </View>
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}

