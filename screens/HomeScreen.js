import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { TextareaItem, Modal } from '@ant-design/react-native'
import data from '../assets/quest';
import Arr from '../assets/activing';
import first from '../assets/images/第一界面.png';
import second from '../assets/images/第二界面.png';
import background from '../assets/images/李世民.png';
import finished from '../assets/images/答完题界面.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  FirstView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 485,
    height: 300,
  },
  Dialog: {
    width: 420,
    height: 150,
    marginLeft: 5,
    marginTop: -120,
  },
  StartBtn: {
    width: 25,
    height: 70,
    position: 'absolute',
    left: '32%',
    top: '32%',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  SecondBtn: {
    width: 90,
    height: 18,
    position: 'absolute',
    top: 64,
    left: 20,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  Content: {
    flex: 1,
    height: 450,
  },
  MainBody: {
    flexDirection: 'row',
    width: 485,
    height: 300,
  },

  Left: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Right: {
    flex: 3,
  },
  topicContent: {
    flexDirection: 'row',
    height: 150,
    paddingHorizontal: 30,
    paddingLeft: 50,
    alignItems: 'center',
  },
  Option: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    paddingTop: 13,
  },
  normalOption0: {
    width: 150,
    height: 40,
    marginTop: 8,
    marginLeft: 28,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 21,
  },
  normalOption1: {
    width: 150,
    height: 40,
    marginTop: 5,
    marginLeft: 15,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 21,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  normalOption2: {
    width: 150,
    height: 40,
    marginTop: 3,
    marginLeft: 28,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 21,
  },
  normalOption3: {
    width: 150,
    height: 40,
    marginTop: 3,
    marginLeft: 15,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 21,
  },
  CloseBtn: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 1,
    top: 1,
  },
});

// 准备新开一个库来开发了，加入错题回顾，以及激活码控制使用周期
const localStorage = window.localStorage;
const limit = 2592000;

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
    page: '0',
    useTime: '',
    grade: '',
  };

  componentWillMount() {
    this.getRandomArr();
  }

  getRandomArr = () => {
    const tmpArr = this.getArrRandomly(data);
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(tmpArr[i]);
    };
    this.setState({ arr });
  }

  begin = () => {
    const startTime = new Date();
    this.setState({ page: '3', startTime });
  }

  randomNum = (max) => {
    parseInt(Math.random() * (max + 1), 10);
    Math.floor(Math.random() * (max + 1));
  }

  checkMyGrade = () => {
    const { selectAnwser, arr, startTime } = this.state;
    const endTime = new Date();
    let time = endTime - startTime;
    let useTime = '';
    let grade = 0;
    let WrongAnwser = [];
    let WrongGrade = 0;
    arr.map((v, i) => {
      const anwser = v[5];
      if (anwser === selectAnwser[i]) {
        grade++;
      } else {
        time += 10000;
        WrongGrade++;
        WrongAnwser.push({ anwser, i });
      }
    });
    console.log(arr, selectAnwser, grade, '@@');
    if (time < 1000) {
      useTime = '小于1秒钟！';
    } else if (time > 1000 && time < 60000) {
      useTime = (time / 1000).toFixed(1) + '秒';
    } else if (time > 60000 && time < 3600000) {
      useTime = Math.floor(time / 60000) + '分' + ((time - 60000) / 1000).toFixed(1) + '秒';
    } else {
      useTime = '超过一个小时了，你也太慢了8。。';
    }
    this.setState({ page: '4', useTime, grade, WrongAnwser, WrongGrade });
  }

  selectAnwser = (select) => {
    const { i } = this.state;
    if (i < 9) {
      const selectAnwser = this.state.selectAnwser;
      this.state.selectAnwser.splice(i, 1, select);
      this.setState({ selectAnwser, i: i + 1 });
      return;
    }
    const selectArray = this.state.selectAnwser;
    this.state.selectAnwser.splice(i, 1, select);
    this.setState({ selectAnwser: selectArray, i: i + 1 }, () => {
      this.checkMyGrade(); // 第十题选择完自动跳转
    });
  }

  reStart = () => {
    this.setState({ i: 0, selectAnwser: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], startTime: new Date(), page: '1' });
    this.getRandomArr();
  }

  //打乱答案顺序
  getArrRandomly = (arr) => {
    var len = arr.length;
    for (var i = len - 1; i >= 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var itemIndex = arr[randomIndex];
      arr[randomIndex] = arr[i];
      arr[i] = itemIndex;
    }
    return arr;
  }

  onTextareaItemChange = (val) => {
    console.log(val, '@@@@@');
    this.setState({ activating: val });
  }

  activating = () => {
    const { activating } = this.state;
    const aaa = Arr.find((v) => v === activating);
    if (aaa) {
      console.log(aaa, '@@@###');
      Modal.alert(
        '提示',
        '激活成功',
        [
          {
            text: '确定',
            onPress: () => {
              this.setState({ page: '1' });
              localStorage.setItem('', limit);
            },
          }
        ]
      );
    } else {
      console.log('@@@###@$%@$(@#)(@I#U');
      Modal.alert(
        '提示',
        '激活码无效，请重新输入',
        [
          {
            text: '确定',
            onPress: () => {

            },
          }
        ]
      );
    }
  }

  render() {
    const { page, arr, i, grade, useTime, WrongAnwser, WrongGrade } = this.state;
    const v = arr[i] || [];
    const title = v[0] || '';
    const option = this.getArrRandomly([v[1], v[2], v[3], v[4]]) || [];

    // console.log(WrongAnwser, WrongGrade, '@@');
    return (
      <View style={styles.container}>
        {
          page === '0' &&
          <View>
            <Text>请输入激活码</Text>
            <TextareaItem onChange={this.onTextareaItemChange} />
            <TouchableOpacity style={styles.StartBtn} onPress={this.activating} >
              <Text>提交</Text>
            </TouchableOpacity>
          </View>
        }
        {page === '1' &&
          <ImageBackground source={first} style={styles.FirstView}>
            <TouchableOpacity style={styles.StartBtn} onPress={() => this.setState({ page: '2' })} >
            </TouchableOpacity>
          </ImageBackground>
        }
        {page === '2' &&
          <ImageBackground source={second} style={styles.FirstView}>
            <View style={styles.Dialog}>
              <TouchableOpacity style={styles.SecondBtn} onPress={this.begin} >
              </TouchableOpacity>
            </View>
          </ImageBackground>
        }
        {page === '3' &&
          <ScrollView>
            <View style={styles.Content}>
              <ImageBackground source={background} style={styles.MainBody}>
                <View style={styles.Left}>
                  <View style={{ width: 120, height: 150 }}></View>
                </View>
                <View style={styles.Right}>
                  <View style={styles.topicContent}>
                    <Text style={{ fontSize: 13 }}>题目：{title}</Text>
                  </View>
                  <View style={styles.Option}>
                    {option.map((item, index) => {
                      // const first = index % 2 === 0 ? true : false;
                      return (
                        <TouchableOpacity style={styles[`normalOption${index}`]} key={index} onPress={() => this.selectAnwser(item, index)}>
                          <Text style={{ fontSize: 12 }} key={index}> {item} </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </ImageBackground>
            </View>
          </ScrollView>
        }
        {page === '4' &&
          <ImageBackground source={finished} style={styles.FirstView}>
            <View style={styles.Dialog}>
              <View style={{ marginTop: 5, marginLeft: 5 }}>
                <Text style={{ fontSize: 20, marginTop: 10, color: 'white' }}>
                  您已答完10道题，共答对（{grade}）道
                </Text>
                <Text style={{ fontSize: 20, marginTop: 10, color: 'white' }}>
                  用时：{useTime}
                </Text>
              </View>
              {
                WrongAnwser.length > 0 && WrongGrade > 0 &&
                <View style={{ padding: 5 }}>
                  <Text style={{ fontSize: 18, marginTop: 5, color: 'white' }}>您答错了（{WrongGrade}）道题</Text>
                  {
                    WrongAnwser.map((v) => {
                      const { i = '', anwser = '' } = v;
                      return (
                        <Text key={i} style={{ fontSize: 15, marginTop: 1, color: 'white' }}>第{i}道，答案：{anwser}</Text>
                      );
                    })
                  }
                </View>
              }
              <TouchableOpacity style={styles.CloseBtn} onPress={this.reStart} >
              </TouchableOpacity>
            </View>
          </ImageBackground>
        }
      </View>
    );
  }
}


export default (HomeScreen);