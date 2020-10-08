import React, { Component } from "react";
import logo from "../../logo.svg";
import { Howl, Howler } from "howler";
import ReactHowler from "react-howler";
import io from "socket.io-client";
import "../../App.css";
import $ from "jquery";
import "./css/Content.css";
import second from "./Music/60s.mp3";
import StartFinish from "./Music/StartFinish.mp3";
import StartFinish2 from "./Music/StartFinish2.mp3";
import Warmup from "./Video/WarmupVideo.mp4";
import StartRight from "./Music/StartRight.wav";
import StartWrong from "./Music/StartWrong.wav";
import port from "../../port.json";
const socket = io.connect(port.port); //change when change wifi
let check = true,
  SoundTime = true;
let thisd;
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gmail: "",
      password: "",
      data: [],
      question: "",
      Ending: [],
      score: 0,
      current: 0,
    };
  }
  soundPlay = (src) => {
    const sound = new Howl({ src });

    console.log(sound);
    sound.play();
  };
  soundStop = (src) => {
    const sound = new Howl({ src });
    sound.stop();
  };
  componentDidMount() {
    thisd = this;
    $(".TongKetBar").hide();
    this.setState({
      data: this.props.data,
      current: this.props.current[0] ? this.props.current[0].current : 0,
    });
    // this.setState({
    //   score: this.state.data[this.state.current]
    //     ? this.state.data[this.state.current].score
    //     : "gasg",
    // });

    socket.on("choose ques", (ques) => {
      this.setState({
        question: ques,
      });
    });
    socket.on("Wrong Answer", (ques) => {
      this.soundPlay(StartWrong);
    });
    socket.on("TongKetDiem", (data) => {
      if (data) {
        $(".TongKetBar").show(500);

        this.setState({ Ending: data });

        setTimeout(function () {
          $(".EndingUser").eq(0).addClass("AnimationEndingUser");
          thisd.soundPlay(StartFinish);
        }, 1000);
        setTimeout(function () {
          $(".EndingUser").eq(1).addClass("AnimationEndingUser");
        }, 3500);
        setTimeout(function () {
          $(".EndingUser").eq(2).addClass("AnimationEndingUser");
        }, 6000);
        setTimeout(function () {
          $(".EndingUser").eq(3).addClass("AnimationEndingUser");
        }, 8500);
      }
    });
    socket.on("add point ok", (data) => {
      this.soundPlay(StartRight);
      this.setState({
        score: data.point,
        current: data.stt,
      });
      if (data.data != null) this.setState({ data: data.data });
    });

    socket.on("change pp", (qwef) => {
      if (check == true) {
        this.soundPlay(second);
        if (SoundTime == false) {
          this.soundStop(second);
        }
        $("#progressBar").css("background-color", "#cfd6d9");
        $(".bar").css("background-color", "#428bca");
        progress(60, 60, $("#progressBar"));
        check = false;
      }
    });
  }
  //qweg
  render() {
    $(".names").removeClass("CrName");
    $(".names").eq(this.state.current).addClass("CrName");
    return (
      <div className="App row">
        <ReactHowler src="./Music/60s.mp3" playing={true} />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <table id="NameList">
            <tbody>
              <tr>
                {this.state.data.map((user, id) => {
                  return (
                    <td className="names" key={id}>
                      {user.name} ({user.score})
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
          {/* <p>
            {this.state.data[this.state.current]
              ? this.state.data[this.state.current].name
              : "ngu"}
          </p> */}
          <div className="questions col-11">
            <div>
              <p className="question quess">{this.state.question} </p>
            </div>
            <div className="score col-4">{this.state.score}</div>
          </div>

          <div id="progressBar">
            <div className="bar"></div>
          </div>
          <div className="TongKetBar">
            <div className="BlackTongKetBar">
              <ul>
                {this.state.Ending.map((user, id) => {
                  return (
                    <li className="EndingUser" key={id}>
                      {user.name} : {user.score}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
function progress(timeleft, timetotal, $element) {
  var progressBarWidth = (timeleft * $element.width()) / timetotal;
  $element
    .find("div")
    .animate({ width: progressBarWidth }, 500)
    .html(Math.floor(timeleft / 60) + ":" + (timeleft % 60));
  if (timeleft > 0) {
    setTimeout(function () {
      progress(timeleft - 1, timetotal, $element);

      //$(".bar").css("background-color", "red");
    }, 1000);
  } else {
    $("#progressBar").css("background-color", "red");
    $(".bar").css("background-color", "red");
    SoundTime = false;
    check = true;
    thisd.soundPlay(StartFinish2);
  }
}
