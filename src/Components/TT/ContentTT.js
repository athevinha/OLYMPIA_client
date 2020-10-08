import React, { Component } from "react";
import { Howl, Howler } from "howler";
import io from "socket.io-client";
import "../../App.css";
import "./TT.css";
import { Player } from "video-react";
import port from "../../port.json";
import AccelerationRightAnswer from "./Music/StartFinish.mp3";
import OnVCNV from "./Music/ObstacleRowRightAnswer.mp3";
import second from "./Music/30sAdven.mp3";
import ObsGranted from "./Music/ObsGranted.wav";
import RowShow from "./Music/OpenRow.mp3";
import ImgShow from "./Music/ObstacleShowImage.mp3";
import FormQues from "./Img/FormQuestion.png";
import Show from "./Img/ShowPoint.png";
import $, { data } from "jquery";
import Ques1 from "./Video/Ques1.mp4";
import Ques2 from "./Img/Ques2.PNG";
import Ques3 from "./Video/Ques3.mp4";
// import Ques32 from "./Img/Ques32.PNG";
import Ques4 from "./Img/Ques4.PNG";
//==============import img============================
window.onload = function () {
  // Setup all node
};
const socket = io.connect(port.port); //change when change wifi
let check = true;
let oneMusic = 0,
  OnlyOne = 0,
  players,
  players3;
class ContentTT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gmail: "",
      password: "",
      data: [],
      questions: [],
      question: "",
      Ending: [],
      currentQues: 0,
      currentUser: 0,
      ListShowContentVCNV: [],
      toogle: 0,
    };
  }
  soundPlay = (src) => {
    const sound = new Howl({ src });
    sound.play();
  };
  soundStop = (src) => {
    const sound = new Howl({ src });
    sound.stop();
  };
  componentDidMount() {
    Howler.ctx = new AudioContext();
    Howler.ctx.resume();
    $(".ShowAnsTT").hide();
    $(".QuesImgTT").hide();
    $(".TongKetBar").hide();

    this.setState({
      data: this.props.data,
      questions: this.props.questions,
    });
    socket.on("play sound TT", (crr) => {
      if (oneMusic == 0) {
        this.soundPlay(OnVCNV);
        oneMusic = 1;
      }
    });
    socket.on("Add score TT", (crr) => {
      if (crr != []) {
        this.setState({ data: crr.data });
        oneMusic = 0;
        console.log(crr.data);
      }
    });
    socket.on("show list TT", (show) => {
      if (this.state.toogle == 0) {
        $(".ShowAnsTT").show(1000);
        this.setState({ toogle: 1 });
        console.log("showw");
        this.soundPlay(RowShow);
      } else {
        this.soundStop(RowShow);

        console.log("hide");
        $(".ShowAnsTT").hide(1000);
        this.setState({ toogle: 0 });
      }

      this.setState({ ListShowContentVCNV: show.list });
    });
    socket.on("show answervcnv", (show) => {
      console.log(
        this.state.questions[this.state.currentQues]
          ? this.state.questions[this.state.currentQues].answer
          : ""
      );
      if (this.state.currentQues != 0)
        $(".around")
          .eq(show.stt - 1 ? show.stt - 1 : 0)
          .html(
            this.state.questions[this.state.currentQues]
              ? this.state.questions[this.state.currentQues].answer
              : ""
          )
          .css({ "font-size": "50px" });
    });

    socket.on("choose ques", (ques) => {
      $(".QuesImgTT").hide();
      //===========================HIDE BUTTON==============
      $(".video-react-control-bar").hide();
      $(".video-react-control-text").hide();
      $(".video-react-big-play-button").hide();
      //========================================
      $(ques.src).show(500);
      console.log(ques.src);
      this.soundPlay(ImgShow);
      let thisd = this;
      this.setState({
        question: ques.ques,
        currentQues: ques.id,
      });
      $(".around").removeClass("CircleActive");
      $(".around")
        .eq(ques.id - 1)
        .addClass("CircleActive");
      setTimeout(function () {
        if (check) {
          players.play();
          players3.play();
          //===========================================
          $("#progressBar").css("background-color", "#cfd6d9");
          $(".bar").css("background-color", "#428bca");
          thisd.soundPlay(second);
          progress(30, 30, $("#progressBar"));
          console.log("ok");
          check = false;
        }
      }, 5000);
    });
    socket.on("Add score", (crr) => {
      if (crr != []) {
        this.setState({ data: crr.data });
      }
    });
    socket.on("on VCNV", (data) => {
      this.soundPlay(ObsGranted);
      $(".names").addClass("label danger");
      alert(data ? data.name : "ngu");
    });
    socket.on("TongKetDiem", (data) => {
      if (OnlyOne == 0) {
        this.soundPlay(AccelerationRightAnswer);

        OnlyOne = 1;
      }
      if (data) {
        $(".TongKetBar").show(500);

        this.setState({ Ending: data });
        setTimeout(function () {
          $(".EndingUser").eq(0).addClass("AnimationEndingUser");
        }, 1000);
        setTimeout(function () {
          $(".EndingUser").eq(1).addClass("AnimationEndingUser");
        }, 2500);
        setTimeout(function () {
          $(".EndingUser").eq(2).addClass("AnimationEndingUser");
        }, 5000);
        setTimeout(function () {
          $(".EndingUser").eq(3).addClass("AnimationEndingUser");
        }, 7500);
        OnlyOne = 1;
      }
    });
    socket.on("Open Picture", (data) => {
      if (data) {
        $(data).hide(1000);
      }
    });
  }

  render() {
    // $".names").removeClass("CrName");
    // $(".names").eq(this.state.crrent).addClass("CrName");
    return (
      <div className="App">
        <div className="App-header">
          {/* <table id="NameList">
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
            </tbod>
          </table> */}
          {/* <img src={FormQues} className="backgroundTT"></img> */}

          <div className="backgroundTT"></div>

          <div className="aroundTT">
            {/* <img src={Ques1} className="QuesImgTT Ques1" alt=""></img> */}
            <Player
              ref={(player) => {
                players = player;
                console.log(players);
              }}
              src={Ques1}
              className="QuesImgTT Ques1"
              muted
            />
          </div>
          <div className="aroundTT">
            <img src={Ques2} className="QuesImgTT Ques2" alt=""></img>
          </div>
          <div className="aroundTT">
            {/* <img src={Ques3} className="QuesImgTT Ques3" alt=""></img> */}
            <Player
              ref={(player) => {
                players3 = player;
              }}
              src={Ques3}
              className="QuesImgTT Ques3"
              muted
            />
          </div>
          <div className="aroundTT">
            <img src={Ques4} className="QuesImgTT Ques4" alt=""></img>
          </div>

          <div className="questionsTT col-11">
            <p className="questionTT quessTT">
              {this.state.question ? this.state.question.ques : ""}{" "}
            </p>
          </div>

          <div id="progressBar" className="ContentTTprogress">
            <div className="bar barTTprogress"></div>
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
          <ul className="ShowAnsTT">
            {/* <img src={Show} className="backgroundVCNV" alt=""></img> */}
            {this.state.ListShowContentVCNV.map((user, id) => {
              return (
                <li
                  className="Ans ShowTT"
                  className={"ShowTT diffTT" + id}
                  key={id}
                >
                  <span className={"nameTT eTT" + id + "1"}>{user.name}</span>
                  <br />
                  <span className={"AnsTT eTT" + id + "2"}>{user.answer}</span>
                  <span className={"AnsTimeTT eTT" + id + "3"}>
                    {user.time}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default ContentTT;
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
    check = true;
  }
}
