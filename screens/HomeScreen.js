import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
// import { Toast } from 'antd-mobile';
import data from '../assets/quest';
import img from '../assets/images/魏征.png';
import topic from '../assets/images/背景.png';

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
    height: 450,
  },
  topicContent: {
    width: 260,
    height: 150,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anwserContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerContent: {
    position: 'absolute',
    bottom: 1,
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  normalOption: {
    width: 100,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#d5d5e0',
  },

  Left: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Right: {
    flex: 3
  },
  Option: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#bbb8e2',
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
    checkAnwser: [false, false, false, false, false, false, false, false, false, false],
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
    let useTime = '';
    if (time < 1000) {
      useTime = '小于1秒钟！';
    } else if (time > 1000 && time < 60000) {
      useTime = Math.floor(time / 1000) + '秒';
    } else if (time > 60000 && time < 3600000) {
      useTime = Math.floor(time / 60000) + '分钟' + Math.floor(time % 60000) + '秒';
    } else {
      useTime = '超过一个小时了，你也太慢了8。。';
    }
    let grade = 0;
    arr.map((v, i) => {
      const { anwser = '' } = v;
      if (anwser === selectAnwser[i]) {
        grade++;
      }
    });
    this.props.navigation.push('Detail', {
      grade, useTime,
    });
  }

  selectAnwser = (select) => {
    const { i } = this.state;
    if (i < 9) {
      const selectAnwser = this.state.selectAnwser;
      this.state.selectAnwser.splice(i, 1, select);
      this.setState({ selectAnwser, i: i + 1 });
      return;
    }
    this.checkMyGrade(); // 第十题选择完自动跳转
  }

  checkAnwser = () => {
    const { i } = this.state;
    const checkAnwser = this.state.checkAnwser;
    this.state.checkAnwser.splice(i, 1, true);
    this.setState({ checkAnwser });
  }

  reStart = () => {
    this.setState({ i: 0, selectAnwser: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], startTime: new Date(), checkAnwser: [false, false, false, false, false, false, false, false, false, false] });
  }

  render() {
    const { start, arr, i, checkAnwser } = this.state;
    const v = arr[i];
    const checked = checkAnwser[i];
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
              <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#2c3644' }}>
                <View style={styles.Left}>
                  <Image source={img} style={{ width: 120, height: 150 }}></Image>
                </View>
                <View style={styles.Right}>
                  <ImageBackground source={topic} style={styles.topicContent}>
                    <Text style={{ fontSize: 14 }}>题目：{title}</Text>
                  </ImageBackground>
                  <View style={styles.Option}>
                    {option.map((item, index) => {
                      // const selected = selectAnwser[i] === item ? true : false;
                      const option = index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : index === 3 ? 'D' : '';
                      return (
                        // <TouchableOpacity style={selected ? styles.selectedOption : styles.normalOption} key={index} onPress={() => this.selectAnwser(item, index)}></TouchableOpacity>
                        <TouchableOpacity style={styles.normalOption} key={index} onPress={() => this.selectAnwser(item, index)}>
                          <Text style={{ fontSize: 13 }} key={index}>
                            <Text style={{ color: 'blue', fontSize: 18 }}>{option}</Text>{'    ' + item}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>
              <View style={styles.footerContent}>
                <TouchableOpacity onPress={this.checkAnwser}>
                  <Text>查看答案</Text>
                </TouchableOpacity>
                {
                  checked &&
                  <Text>{anwser}</Text>
                }
                {i === 9 &&
                  <TouchableOpacity
                    onPress={this.reStart}
                    style={{ marginTop: 30 }}
                  >
                    <Text>重新答题</Text>
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