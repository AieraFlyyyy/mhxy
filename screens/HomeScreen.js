import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
// import { Toast } from 'antd-mobile';
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
  footerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  normalOption: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  },
  selectedOption: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: 'red',
  },
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '梦幻答题',
  };

  state = {
    start: false,
    arr: [],
    selectAnwser: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    i: 0,
    time: '',
  };

  componentWillMount() {
    const arr = data.map((v, i) => {
      return { title: v[0], option: v.slice(1, 5).sort(), anwser: v[5] };
    });
    this.setState({ arr });
  }

  begin = () => {
    const startTime = new Date();
    this.setState({ start: true, startTime });
  }

  checkMyGrade = () => {
    const { selectAnwser, arr, startTime } = this.state;
    const endTime = new Date();
    const time = endTime - startTime;
    let grade = 0;
    arr.map((v, i) => {
      const { anwser = '' } = v;
      if (anwser === selectAnwser[i]) {
        grade++;
      }
    });
    this.props.navigation.push('Detail', {
      grade, time,
    });
    console.log(grade, "@@@", time.toLocaleString());
  }

  selectAnwser = (select) => {
    const { i } = this.state;
    const selectAnwser = this.state.selectAnwser;
    this.state.selectAnwser.splice(i, 1, select);
    console.log(this.state.selectAnwser, '==arr', select, '===select', i, '===index');
    this.setState({ selectAnwser });
  }

  preViewPage = (i) => {
    this.setState({ i: i - 1 });
  }

  nextPage = (i) => {
    this.setState({ i: i + 1 })
  }

  reStart = () => {
    this.setState({ i: 0 });
  }

  render() {
    const { start, arr, i, selectAnwser } = this.state;
    const v = arr[i];
    const { title = '', option = [], anwser = '' } = v;
    return (
      <View style={styles.container}>
        {!start &&
          <View style={styles.GetStart}>
            <TouchableOpacity onPress={this.begin} >
              <Text>开始答题</Text>
            </TouchableOpacity>
          </View>
        }
        {start &&
          <ScrollView>
            <View style={styles.Content}>
              <View style={styles.topicContent}>
                <Text style={{ fontSize: 26 }}>题目：{title}</Text>
              </View>
              <View>
                {option.map((item, index) => {
                  const selected = selectAnwser[i] === item ? true : false;
                  return (
                    <TouchableOpacity style={selected ? styles.selectedOption : styles.normalOption} key={index} onPress={() => this.selectAnwser(item, index)}>
                      <Text style={{ fontSize: 18 }} key={index}>{index + '. ' + item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={{ flex: 1 }}></View>
              <View style={styles.footerContent}>
                {i < 9 ?
                  <TouchableOpacity
                    onPress={() => this.nextPage(i, anwser)}
                  >
                    <Text>下一页</Text>
                  </TouchableOpacity> :
                  <TouchableOpacity
                    onPress={this.checkMyGrade}
                  >
                    <Text>查看分数</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          </ScrollView>
        }
      </View>
    );
  }
}


export default (HomeScreen);