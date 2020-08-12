import React, { Component } from "react";
import logo from "../../logo.svg";
import io from "socket.io-client";
import "../../App.css";
import $ from "jquery";
import port from "../../port.json";
import "./VD.css";
const socket = io.connect(port.port); //change when change wifi
class AdminVD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gmail: "",
      password: "",
      data: [],
      questions: [],
      currentQues: 0,
      currentUser: 0,
    };
  }

  componentDidMount() {
    this.setState({
      questions: this.props.questions,
      data: this.props.data,
      currentUser: this.props.current[0] ? this.props.current[0].current : 0,
    });
    socket.on("on send VD", (ques) => {
      if (ques) console.log(this.state.data[ques.id]);
    });
  }
  checkKey = (e) => {
    e.preventDefault();
    e = e || window.event;
    let { currentQues } = this.state;
    if (e.keyCode == "38") {
      // up arrow
      currentQues--;
      this.setState({ currentQues: currentQues });
      socket.emit("choose ques", this.state.questions[currentQues].ques);
      $(document).scrollTop($(document).scrollTop() - 50);
    } //==============================================================================================================
    else if (e.keyCode == "40") {
      // down arrow
      currentQues++;
      this.setState({ currentQues: currentQues });
      $(document).scrollTop($(document).scrollTop() + 50);
      socket.emit("choose ques", this.state.questions[currentQues].ques);
    } //==============================================================================================================
    else if (e.keyCode == "52") {
      // right arrow
      //alert("right");
      this.nextUser(3);
    }
  };

  //
  nextUser = (stt) => {
    this.setState({ currentUser: stt });
    console.log(this.state.data);
    let a = this.state.data[this.state.currentUser].score;
    let userss = this.state.data;
    userss[this.state.currentUser].score = a;
    this.setState({ data: userss });
    socket.emit("add point", {
      name: this.state.data[this.state.currentUser].name,
      point: this.state.data[this.state.currentUser].score,
      stt: stt,
    });
    socket.emit("change people");
  };

  handleKeyDown = (e) => {
    // arrow up/down button should select next/previous list element
    this.checkKey(e);
  };
  OnChooseUser = (e) => {
    e.preventDefault();
    console.log(e.id);
  };
  render() {
    //console.log(this.state.currentQues);
    // if (document.getElementsByClassName("ques")[this.state.currentQues]) {
    //   document.getElementsByClassName("ques")[
    //     this.state.currentQues
    //   ].innerHTML = "current";
    //}
    $(".ques").removeClass("active");
    $(".ques").eq(this.state.currentQues).addClass("active");

    return (
      <div className="App row">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <table id="NameList">
            <tbody>
              <tr>
                {this.state.data.map((user, id) => {
                  return (
                    <td className="names" key={id} onClick={this.OnChooseUser}>
                      {user.name} ({user.score})
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>

          <div className="questions col-11">
            <div>
              <p className="question quess">{this.state.question} </p>
            </div>
            <div className="score col-4">{this.state.score}</div>
          </div>

          <div id="progressBar">
            <div className="bar"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminVD;
