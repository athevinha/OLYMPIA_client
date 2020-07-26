import React, { Component } from "react";
import logo from "../logo.svg";
import io from "socket.io-client";
import "../App.css";
import $ from "jquery";
import "./css/Content.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
const socket = io.connect("http://192.168.1.151:5000"); //change when change wifi
let check = true;
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gmail: "",
      password: "",
      data: [],
      question: "",
      score: 0,
      current: 1,
    };
  }
  componentDidMount() {
    this.setState({
      data: this.props.data,
      current: this.props.current[0] ? this.props.current[0].current : 0,
    });
    // this.setState({
    //   score: this.state.data[this.state.current]
    //     ? this.state.data[this.state.current].score
    //     : "gasg",
    // });
    if (
      this.props.data[localStorage.tooken] &&
      this.props.data[localStorage.tooken].vip == "1"
    ) {
    }

    socket.on("choose ques", (ques) => {
      this.setState({
        question: ques,
      });
    });

    socket.on("add point ok", (data) => {
      this.setState({
        score: data.point,
        current: data.stt - 1,
      });
      if (data.data != null) this.setState({ data: data.data });
    });
    socket.on("change pp", (qwef) => {
      if (check == true) {
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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <table id="NameList">
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
          </table>
          {/* <p>
            {this.state.data[this.state.current]
              ? this.state.data[this.state.current].name
              : "ngu"}
          </p> */}
          <div className="questions col-11">
            <p className="question">{this.state.question}</p>
          </div>
          <div className="question score col-4">{this.state.score}</div>
          <div id="progressBar">
            <div class="bar"></div>
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
    check = true;
  }
}
