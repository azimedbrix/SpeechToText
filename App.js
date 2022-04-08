import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, Text, View, Image, TouchableHighlight,
  ScrollView, CardItem, Pressable,Modal
} from 'react-native';
import translate from 'translate-google-api';
import Voice from 'react-native-voice';
import { Dropdown } from 'react-native-element-dropdown';
import { Dimensions } from 'react-native';
import LanguageJSON from './Src/Helper/LanguageJSON';
import Constant from './Src/Helper/Constant';
import Toast from 'react-native-simple-toast'
import Tts from 'react-native-tts';
import Clipboard from '@react-native-clipboard/clipboard';
import { KeyboardAvoidingView } from 'react-native';


class App extends Component {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    Start: false,
    started: 'stop',
    results: [
    ],
    LangResult1: '',
    LangResult2: '',
    partialResults: [],
    status: 'Start to Spe',
    DefaultLang: 'Select Lang',
    LangName1: 'English',
    LangName2: 'English',
    LangCode1: 'en',
    LangCode2: 'en',
    Voicemessgae: '',
    LangList: LanguageJSON.LangList,
    ClearButton: false,
    modalVisible : false
  };

  constructor(props) {
    super();
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    //destroy the process after switching the screen
    Voice.destroy().then(Voice.removeAllListeners);
  }
  resultLang = (val) => {
    console.log("val-----" + val)
    console.log("this.state.LangCode2" + this.state.LangCode2)
    translate(val, { to: this.state.LangCode2 }).then(res => {
      console.log(res);
      this.setState({
        results: res, Voicemessgae: res[0], LangResult2: res[0],
      });

    }).catch(err => {
      console.error(err);
    });
    this.setState({ started: "stop", ClearButton: true , modalVisible : false})
    this._stopRecognizing
  }

  _onRecordVoice = () => {
    if (isRecord) {
      Voice.stop();
    } else {
      Voice.start('en-US');
    }
    setIsRecord(!isRecord);
  };

  onSpeechStart = (e) => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    this.setState({
      started: 'start',
      status: 'Listening ...'
    });
  };

  onSpeechRecognized = (e) => {
    //Invoked when speech is recognized
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = (e) => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    this.setState({
      started: 'start',
      status: ''
    });
  };

  onSpeechError = (e) => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    Toast.show(e)
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);
    this.setState({
      started: 'stop',
      status: 'Start to Speak',
    });
    this.resultLang(e.value[0])
    this.setState({
      results: e.value[0], LangResult1: e.value[0]
    });
  };

  onSpeechPartialResults = (e) => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      started: 'start',
      status: 'Translating ... '
    });
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e) => {
    //Invoked when pitch that is recognized changed
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '1',
      results: [],
      partialResults: [],
      end: '',
      status: 'Start to Speak'
    });

    try {
      //await Voice.start('hi-IN');
      await Voice.start(this.state.LangCode1);
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    //Stops listening for speech
    this.setState({
      started: 'stop',
      status: 'Start to Speak',
    });

    try {
      await Voice.stop();

    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    //Cancels the speech recognition
    this.setState({
      started: 'stop',
      status: 'Start to Speak'
    });

    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: 'stop',
      results: [],
      partialResults: [],
      end: '',
      status: 'Start to Speak',
      ClearButton: false,
      LangResult1: '',
    });

    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
  };

  VoiceChange() {
    console.log(this.state.Voicemessgae)
    Tts.speak(this.state.Voicemessgae, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  }

  validation = async () => {
    if (this.state.LangName1.length > 1 && this.state.LangName2.length > 1) {
      this.state.started === 'stop' ? this._startRecognizing() : this._cancelRecognizing()
    } else {
      Toast.show('Please select language');
    }

  };
  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Speech to Text
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: Constant.width / 1 }}>
          <Dropdown
            style={[{
              width: Constant.width / 3,
              height: 50,
      
              backgroundColor: "white",
              marginTop: 15,
              borderRadius: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,

            }]}
            search={true}
            selectedTextStyle={{ fontSize: 13, marginLeft: 15 }}
            placeholderStyle={{ fontSize: 13 }}
            data={this.state.LangList}
            value={this.state.LangName1}
            maxHeight={Constant.height / 3}
            labelField="language"
            valueField="language"
            placeholder='  Select Language'
            onChange={item => {
              console.log(item.language)
              this.setState({ LangName1: item.language, LangCode1: item.code })
            }}
          />
          <Image
            style={{ height: Dimensions.get("screen").height / 20, width: Dimensions.get("screen").width / 20, marginTop: 10 }}
            source={require('./Images/RightArrow.png')}
            resizeMode="contain"
          />
          <Dropdown
            style={[{
              width: Constant.width / 3,
              height: 50,
              backgroundColor: "white",
              marginTop: 15,
              borderRadius: 5,
              shadowColor: "#00000076",

              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,

            }]}
            search={true}
            selectedTextStyle={{ fontSize: 13, marginLeft: 15 }}
            placeholderStyle={{ fontSize: 13 }}
            data={this.state.LangList}
            value={this.state.LangName2}
            maxHeight={Constant.height / 2.5}
            labelField="language"
            valueField="language"
            placeholder='  Select Language'
            onChange={item => {
              console.log(item.language)
              this.setState({ LangName2: item.language, LangCode2: item.code })
              if (this.state.LangResult1 != '') {
                // this.setState({ modalVisible : true})
                setTimeout(() => {
                  this.resultLang(this.state.LangResult1)
                }, 100);
              }

            }}
          />
        </View>

        <TouchableHighlight>
          <Image
            style={styles.imageButton}
            source={this.state.started === 'stop' ? require('./Images/1.png') : require('./Images/sound.gif')}
          />
        </TouchableHighlight>

        <Text style={styles.textWithSpaceStyle}>
          {`${this.state.status}`}
        </Text>



        {
          this.state.results.length > 0 ?
              <View style={{
                marginTop: 30,
                paddingHorizontal: 20,
                width: Dimensions.get("window").width / 1.1,
                marginHorizontal: 20,
                borderRadius: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,

                elevation: 2,
              }}>
                <Text style={styles.textStyleResults}>
                  Results
                </Text>
                <View style={{  flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{ fontSize: 10 }}>
                    {this.state.LangName1}
                  </Text>
                  <Text
                    style={styles.Lang1textStyle}>
                    {this.state.LangResult1}
                  </Text>

                </View>
                <View style={{  flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{ fontSize: 10 }}>
                    {this.state.LangName2}
                  </Text>
                  <Text
                    style={styles.Lang1textStyle}>
                    {this.state.LangResult2}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, }}>
                  <Pressable onPress={() => this.VoiceChange()}>
                    <Image
                      style={{ width: 35, height: 35 }}

                      source={require('./Images/play.png')}
                      resizeMode="contain"
                    />
                  </Pressable>
                  <Pressable onPress={() => {
                    Clipboard.setString(this.state.LangResult2)
                    Toast.show('Text Copied');
                  }

                  }>
                    <Image
                      style={{ width: 35, height: 35 }}
                      source={require('./Images/copy.png')}
                      resizeMode="contain"
                    />
                  </Pressable>

                </View>
              </View>
            : null
        }

        <View style={styles.horizontalView}>
          {
            this.state.ClearButton === false ?
              this.state.started === "stop" ?
                <TouchableHighlight
                  onPress={() => this.validation()}
                  style={styles.buttonStyle}>

                  <Text style={styles.buttonTextStyle}>
                    {this.state.started === 'stop' ? "Start" : "Pause"}
                  </Text>
                </TouchableHighlight> : null
              :
              <TouchableHighlight
                onPress={this._destroyRecognizer}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>
                  Clear All
                </Text>
              </TouchableHighlight>
          }
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 20
  },
  buttonStyle: {
    flex: 1,
    height: Constant.height / 18,
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#4A26A5',
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 30
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
  },
  horizontalView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    marginStart: 20,
    marginEnd: 20
  },
  Lang1textStyle: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  Lang2textStyle: {
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    flex: 1
  },
  textStyleResults: {
    textAlign: 'center',
    padding: 12,
    marginTop: "5%",
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageButton: {
    width: Constant.width / 7,
    height: Constant.height / 10,
    margin: 20
  },
  textWithSpaceStyle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#B0171F',
  },
});

export default App;







