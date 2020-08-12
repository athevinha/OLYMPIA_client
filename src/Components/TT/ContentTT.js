import React, { Component } from "react";
import logo from "../../logo.svg";
import { Howl, Howler } from "howler";
import io from "socket.io-client";
import "../../App.css";
import "./TT.css";
import port from "../../port.json";
import OnVCNV from "./Music/ObstacleRowRightAnswer.mp3";
import second from "./Music/30sAdven.mp3";
import ObsGranted from "./Music/ObsGranted.wav";
import RowShow from "./Music/OpenRow.mp3";
import ImgShow from "./Music/ObstacleShowImage.mp3";
import FormQues from "./Img/FormQuestion.png";
import Show from "./Img/ShowPoint.png";
import $, { data } from "jquery";
import Ques1 from "./Img/Ques1.PNG";
import Ques2 from "./Img/Ques2.PNG";
import Ques31 from "./Img/Ques31.PNG";
import Ques32 from "./Img/Ques32.PNG";
import Ques33 from "./Img/Ques33.PNG";
import Ques4 from "./Img/Ques4.PNG";
//==============import img============================

const socket = io.connect(port.port); //change when change wifi
let check = true;
class ContentTT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gmail: "",
      password: "",
      data: [],
      questions: [],
      question: "",
      currentQues: 0,
      currentUser: 0,
      ListShowContentVCNV: [],
      toogle: 0,
    };
  }
  soundPlay = (src) => {
    const sound = new Howl({ src });
    sound.volume = 0.1;
    sound.play();
  };
  soundStop = (src) => {
    const sound = new Howl({ src });
    sound.stop();
  };
  componentDidMount() {
    $(".ShowAnsTT").hide();
    $(".QuesImgTT").hide();
    this.setState({
      data: this.props.data,
      questions: this.props.questions,
    });

    socket.on("show list TT", (show) => {
      if (this.state.toogle == 0) {
        $(".ShowAnsTT").show(1000);
        this.setState({ toogle: 1 });
        this.soundPlay(RowShow);
      } else {
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
      $(ques.src).show(500);
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
      //console.log(ques.id);
      setTimeout(function () {
        if (check) {
          $("#progressBar").css("background-color", "#cfd6d9");
          $(".bar").css("background-color", "#428bca");

          progress(30, 30, $("#progressBar"));
          thisd.soundPlay(second);
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
    socket.on("Open Picture", (data) => {
      //this.soundPlay(RowShow);
      if (data) {
        $(data).hide(1000);
      }
    });
  }

  render() {
    // $(".names").removeClass("CrName");
    // $(".names").eq(this.state.current).addClass("CrName");
    return (
      <div className="App">
        <div className="App-header">
          <img src={FormQues} className="backgroundTT"></img>
          {/* <ul className="circle"></ul>

          <table id="NameList">
            <tbody>
              <tr>
                {this.state.data.map((user, id) => {
                  if (id != 0)
                    return (
                      <td className="names" key={id}>
                        {user.name} ({user.score})
                      </td>
                    );
                })}
              </tr>
            </tbody>
          </table>
           <p>
            {this.state.data[this.state.current]
              ? this.state.data[this.state.current].name
              : "ngu"}
          </p> 
          */}
          <div className="aroundTT">
            <img src={Ques1} className="QuesImgTT Ques1"></img>
          </div>
          <div className="aroundTT">
            <img src={Ques2} className="QuesImgTT Ques2"></img>
          </div>
          <div className="aroundTT">
            <img src={Ques31} className="QuesImgTT Ques3"></img>
          </div>
          <div className="aroundTT">
            <img src={Ques4} className="QuesImgTT Ques4"></img>
          </div>

          <div className="questionsTT col-11">
            <p className="questionTT quessTT">
              {this.state.question ? this.state.question.ques : ""}{" "}
            </p>
          </div>

          <div id="progressBar" className="ContentTTprogress">
            <div className="bar barTTprogress"></div>
          </div>

          <ul className="ShowAnsTT">
            <img src={Show} className="backgroundVCNV"></img>
            {this.state.ListShowContentVCNV.map((user, id) => {
              return (
                <li className="Ans" className={"diffTT" + id} key={id}>
                  <span className="nameVCNV" className={"eTT" + id + "1"}>
                    {user.name}
                  </span>
                  <br />
                  <span className="ansVCNV " className={"eTT" + id + "2"}>
                    {user.answer}
                  </span>
                  <span className="ansVCNV " className={"eTT" + id + "3"}>
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
