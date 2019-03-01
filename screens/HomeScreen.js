import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import data from '../assets/quest';
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
    height: 55,
    position: 'absolute',
    left: '32%',
    top: '34%',
  },
  SecondBtn: {
    width: 90,
    height: 18,
    position: 'absolute',
    top: 64,
    left: 20,
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
  normalOption: {
    width: 128,
    height: 40,
    marginTop: 6,
    marginLeft: 49,
    borderRadius: 5,
    justifyContent: 'center',
  },
  normalOption2: {
    width: 128,
    height: 40,
    marginTop: 5,
    marginLeft: 36,
    borderRadius: 5,
    justifyContent: 'center',
  },
  CloseBtn: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 1,
    top: 1,
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
    page: '1',
    useTime: '',
    grade: '',
  };

  componentWillMount() {
    const arr = data.map((v, i) => {
      return { title: v[0], option: v.slice(1, 5).sort(), anwser: v[5] };
    });
    this.setState({ arr });
  }

  begin = () => {
    const startTime = new Date();
    this.setState({ page: '2', startTime });
  }

  checkMyGrade = () => {
    const { selectAnwser, arr, startTime } = this.state;
    const endTime = new Date();
    const time = endTime - startTime;
    let useTime = '';
    if (time < 1000) {
      useTime = '小于1秒钟！';
    } else if (time > 1000 && time < 60000) {
      useTime = (time / 1000).toFixed(1) + '秒';
    } else if (time > 60000 && time < 3600000) {
      useTime = Math.floor(time / 60000) + '分钟' + (time % 60).toFixed(1) + '秒';
    } else {
      useTime = '超过一个小时了，你也太慢了8。。';
    }
    let grade = 0;
    arr.map((v, i) => {
      const { anwser = '' } = v;
      if (anwser === selectAnwser[i]) {
        grade++;
      } else {
        console.log(useTime, '@@');
      }
    });
    this.setState({ page: '4', useTime, grade });
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

  reStart = () => {
    this.setState({ i: 0, selectAnwser: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], startTime: new Date(), page: '1' });
  }

  render() {
    const { page, arr, i, grade, useTime } = this.state;
    const v = arr[i];
    const { title = '', option = [] } = v;
    return (
      <View style={styles.container}>
        {page === '1' &&
          <ImageBackground source={first} style={styles.FirstView}>
            <TouchableOpacity style={styles.StartBtn} onPress={this.begin} >
            </TouchableOpacity>
          </ImageBackground>
        }
        {page === '2' &&
          <ImageBackground source={second} style={styles.FirstView}>
            <View style={styles.Dialog}>
              <TouchableOpacity style={styles.SecondBtn} onPress={() => this.setState({ page: '3' })} >
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
                    <Text style={{ fontSize: 14 }}>题目：{title}</Text>
                  </View>
                  <View style={styles.Option}>
                    {option.map((item, index) => {
                      const first = index % 2 === 0 ? true : false;
                      return (
                        <TouchableOpacity style={first ? styles.normalOption : styles.normalOption2} key={index} onPress={() => this.selectAnwser(item, index)}>
                          <Text style={{ fontSize: 10 }} key={index}> {item} </Text>
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
              <View>
                <Text style={{ fontSize: 20, marginTop: 10, color: 'white' }}>
                  您已答完10道题，共答对（{grade}）道
                </Text>
                <Text style={{ fontSize: 20, marginTop: 10, color: 'white' }}>
                  用时：{useTime}
                </Text>
              </View>
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