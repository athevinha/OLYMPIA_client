import React, { Component } from "react";
import logo from "../../logo.svg";
import io from "socket.io-client";
import "../../App.css";
import { Howl, Howler } from "howler";
import $ from "jquery";
import port from "../../port.json";
import "./VD.css";
import s10 from "./Music/10s.mp3";
import s15 from "./Music/15s.mp3";
import s20 from "./Music/20s.mp3";
import s5 from "./Music/Finish5Seconds.mp3";
import star from "./Music/FinishStarChose.mp3";
import Finish from "./Music/FinishFinish.mp3";
import Tick from "./Music/Tick.mp3";
import FinishWrongAnswer from "./Music/FinishWrongAnswer.mp3";
import FinishRightAnswer from "./Music/FinishRightAnswer.mp3";
import Granted from "./Music/ObsGranted.wav";
import { BrowserRouter, Route, Link } from "react-router-dom";
const socket = io.connect(port.port); //change when change wifi
let check = true;
let oneTime = 0;
class ContentVD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gmail: "",
      password: "",
      data: [],
      question: "",
      Ending: [],
      score: 0,
      examUser: 0,
      current: 0,
    };
  }
  soundPlay = (src) => {
    const sound = new Howl({ src });
    if (
      src == Tick ||
      src == FinishWrongAnswer ||
      src == FinishRightAnswer ||
      src == star
    ) {
      sound.volume(0.3);
    }
    sound.play();
  };
  soundStop = (src) => {
    const sound = new Howl({ src });
    sound.stop();
  };
  componentDidMount() {
    $(".AnimationStart").hide();
    $(".TongKetBar").hide();
    $(".ChoosePointVD").hide();
    this.setState({
      data: this.props.data,
      current: this.props.current[0] ? this.props.current[0].current : 0,
    });
    socket.on("send VD", (ques) => {
      if (ques) {
        console.log(ques.id);
        $(".names").removeClass("onAlertVD");
        $(".names").eq(ques.id).addClass("onAlertVD");
        this.soundPlay(Granted);
      }
    });
    socket.on("check ans vd", (ques) => {
      if (ques == true) {
        this.soundPlay(FinishRightAnswer);
      } else if (ques == false) {
        this.soundPlay(FinishWrongAnswer);
      }
    });
    // this.setState({
    //   score: this.state.data[this.state.current]
    //     ? this.state.data[this.state.current].score
    //     : "gasg",
    // });
    socket.on("choose Star", (crr) => {
      $(".AnimationStart").show();
      $(".AnimationStart").css("top", "60%");
      this.soundPlay(star);
    });
    socket.on("open choose quesVD", (crr) => {
      if (crr) {
        $(".names").removeClass("onAlertVD");
        let nameId = "#" + crr;
        $(".ChoosePointVD").show(1000);
        console.log(nameId);
        $(nameId).html("✔");
        this.soundPlay(Tick);
      }
    });
    socket.on("close choose quesVD", (crr) => {
      $(".ChoosePointVD").hide(1000);
    });
    socket.on("next pp vd", (crr) => {
      if (crr) {
        $(".TickVD").html("");
        $(".names").removeClass("activeNameVD");
        this.setState({ examUser: crr });
        $(".names").eq(crr).addClass("activeNameVD");
      }
    });
    // socket.on("next pp vd", (crr) => {
    //   if (crr) console.log(crr);
    // });

    socket.on("Add score", (crr) => {
      if (crr != []) {
        this.setState({ data: crr.data });
      }
    });
    socket.on("TongKetDiem", (data) => {
      if (data) {
        $(".TongKetBar").show(500);

        this.setState({ Ending: data });
        this.soundPlay(Finish);
        setTimeout(function () {
          $(".EndingUser").eq(0).addClass("AnimationEndingUser");
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
    socket.on("choose ques", (ques) => {
      $(".AnimationStart").hide(500);
      $(".AnimationStart").css("top", "80%");
      $(".names").removeClass("onAlertVD");
      console.log(ques);
      this.setState({
        question: ques,
      });
      check = true;
    });
    socket.on("time VD", (time) => {
      if (check == true) {
        console.log(time);
        $("#progressBar").css("background-color", "#cfd6d9");
        $(".bar").css("background-color", "#428bca");
        progress(time, time, $("#progressBar"));
        if (time == 10) {
          this.soundPlay(s10);
        } else if (time == 15) {
          this.soundPlay(s15);
        } else if (time == 20) {
          this.soundPlay(s20);
        } else if (time == 5) {
          this.soundPlay(s5);
        }
        check = false;
      }
    });

    socket.on("add point ok", (data) => {
      this.setState({
        score: data.point,
        current: data.stt,
      });
      if (data.data != null) this.setState({ data: data.data });
    });
  }
  //qweg
  render() {
    return (
      <div className="App row">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <table id="NameList">
            <tbody>
              <tr>
                {this.state.data.map((user, id) => {
                  return (
                    <td
                      className={
                        id == 0 ? "names activeNameVD pointer" : "names pointer"
                      }
                      key={id}
                    >
                      {user.name} ({user.score})
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>

          <div className="questions col-11">
            <div>
              <p className="question quess">{this.state.question}</p>
            </div>
            <div className="score col-4">
              {this.state.data[this.state.examUser]
                ? this.state.data[this.state.examUser].score
                : 0}
            </div>
          </div>

          <p className="VDText abso" onClick={this.NextQuesVD}>
            {this.state.data[this.state.currentUser]
              ? this.state.data[this.state.currentUser].name +
                (this.state.question ? " " + this.state.question.point : "")
              : ""}
          </p>
          <div className="ChoosePointVD">
            <div className="BlackBackground">
              <div className="Ten">
                <p className="TenText">10</p>
                <div className="TickVD" id="Tick1"></div>
                <div className="TickVD" id="Tick2"></div>
                <div className="TickVD" id="Tick3"></div>
              </div>
              <div className="TwoTen">
                <p className="TwoText">20</p>
                <div className="TickVD" id="Tick4"></div>
                <div className="TickVD" id="Tick5"></div>
                <div className="TickVD" id="Tick6"></div>
              </div>
              <div className="ThreeTen">
                <p className="ThreeText">30</p>
                <div className="TickVD" id="Tick7"></div>
                <div className="TickVD" id="Tick8"></div>
                <div className="TickVD" id="Tick9"></div>
              </div>
            </div>
          </div>
          {/* <img src={PointQues}></img> */}
          <div id="progressBar" className="progressBarVD ">
            <div className="bar barVD"></div>
          </div>
          <button
            className="btn btn-warning StarVD AnimationStart abso"
            onClick={this.ChooseStar}
          >
            ⭐
          </button>
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

export default ContentVD;
function progress(timeleft, timetotal, $element) {
  var progressBarWidth = (timeleft * $element.width()) / timetotal;
  $element
    .find("div")
    .animate({ width: progressBarWidth }, 500)
    .html(timeleft % 60);
  if (timeleft > 0) {
    setTimeout(function () {
      progress(timeleft - 1, timetotal, $element);
      //$(".bar").css("background-color", "red");
    }, 1000);
  } else {
    $("#progressBar").css("background-color", "red");
    $(".bar").css("background-color", "red");
    check = true;
  }
}
