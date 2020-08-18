import React, { Component } from "react";
import logo from "../../logo.svg";
import { Howl, Howler } from "howler";
import io from "socket.io-client";
import "../../App.css";
import "./VCNV.css";
import port from "../../port.json";
import OnVCNV from "./Music/ObstacleRowRightAnswer.mp3";
import second from "./Music/15sAdven.wav";
import ObsGranted from "./Music/ObsGranted.wav";
import RowShow from "./Music/ObstacleRowShow.mp3";
import ImgShow from "./Music/ObstacleShowImage.mp3";
import Img from "./Img/VCNVIMG.png";
import Show from "./Img/show.png";
import $, { data } from "jquery";
//==============import img============================
import Pie1 from "./Img/Pie1.png";
import Pie2 from "./Img/Pie2.png";
import Pie3 from "./Img/Pie3.png";
import Pie4 from "./Img/Pie4.png";
import PieCen from "./Img/PieCen.png";
const socket = io.connect(port.port); //change when change wifi
let check = true;
class ContentVCNV extends Component {
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
    $(".TongKetBar").hide();
    $(".ShowAns").hide();
    this.setState({
      data: this.props.data,
      questions: this.props.questions,
    });

    socket.on("show list VCNV", (show) => {
      console.log("Show");
      if (this.state.toogle == 0) {
        $(".ShowAns").show(1000);
        this.setState({ toogle: 1 });
      } else {
        $(".ShowAns").hide(1000);
        this.setState({ toogle: 0 });
      }
      this.soundPlay(RowShow);
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
          thisd.soundPlay(second);
          progress(15, 15, $("#progressBar"));
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
    socket.on("TongKetDiem", (data) => {
      if (data) {
        $(".TongKetBar").show(500);

        this.setState({ Ending: data });
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
  }

  render() {
    // $(".names").removeClass("CrName");
    // $(".names").eq(this.state.current).addClass("CrName");
    return (
      <div className="App">
        <div className="App-header">
          <ul className="circle">
            <div className="around">
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
            </div>
            <div className="around">
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
            </div>
            <div className="around smallVCNV">
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>

              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>

              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>

              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>

              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
            </div>

            <div className="around">
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
              <li className="black-circle"> &#9679;</li>
            </div>
          </ul>
          <div>
            <img className="VCNVimgContent" src={Img}></img>
            <img className="pie1 pie" src={Pie1}></img>
            <img className="pie2 pie" src={Pie2}></img>
            <img className="pie3 pie" src={Pie3}></img>
            <img className="pie4 pie" src={Pie4}></img>
            <img className="pieCen pie" src={PieCen}></img>
          </div>
          <div className="sttVCNV">
            <button className="btn btn-success buttonVCNV">1</button>
            <button className="btn btn-primary buttonVCNV">2</button>
            <button className="btn btn-danger buttonVCNV">3</button>
            <button className="btn btn-light buttonVCNV">4</button>
          </div>
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
          <div className="questionsVCNV col-11">
            <div>
              <p className="questionVCNV quessVCNV">
                {this.state.question ? this.state.question.ques : ""}{" "}
              </p>
            </div>
            {/* <div className="score col-4">{this.state.score}</div> */}
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
          <ul className="ShowAns">
            <img src={Show} className="backgroundVCNV"></img>
            {this.state.ListShowContentVCNV.map((user, id) => {
              return (
                <li className="Ans" className={"diff" + id} key={id}>
                  <span className="nameVCNV" className={"e" + id + "1"}>
                    {user.name}
                  </span>
                  <br />
                  <span className="ansVCNV " className={"e" + id + "2"}>
                    {user.answer}
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

export default ContentVCNV;
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
