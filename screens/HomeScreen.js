import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { createForm } from 'rc-form';
import { Toast } from 'antd-mobile';
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
  }
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '梦幻答题',
  };

  state = {
    start: false,
    arr: [],
    i: 0,
  };

  componentWillMount() {
    const arr = data.map((v, i) => {
      return { title: v[0], option: v.slice(1, 5).sort(), anwser: v[5] };
    });
    this.setState({ arr });
  }

  checkMyGrade = () => {
    const { checkedArr } = this.state;
    this.props.navigation.navigate('Details', {
      checkedArr,
    });
  }

  nextPage = (i) => {
    this.props.form.validateFields((error, value) => {
      if (!error) {
        console.log(value, '@@@');
      }
    });
  }

  render() {
    const { start, arr, i } = this.state;
    const { form } = this.props;
    const v = arr[i];
    const { title = '', option = [], anwser = '' } = v;
    return (
      <View style={styles.container}>
        {!start &&
          <View style={styles.GetStart}>
            <TouchableOpacity onPress={() => this.setState({ start: true })} >开始答题</TouchableOpacity>
          </View>
        }
        {start &&
          <ScrollView>
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


export default createForm()(HomeScreen);