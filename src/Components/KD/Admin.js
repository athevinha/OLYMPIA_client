import React, { Component } from "react";
import logo from "../../logo.svg";
import io from "socket.io-client";
import "../../App.css";
import $ from "jquery";
import port from "../../port.json";
const socket = io.connect(port.port); //change when change wifi
class Admin extends Component {
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
    // socket.on("choose ques", (ques) => {
    //   console.log(ques);
    // });
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
    else if (e.keyCode == "13") {
      let a = this.state.data[this.state.currentUser].score;
      a += 10;
      let userss = this.state.data;
      userss[this.state.currentUser].score = a;
      this.setState({ data: userss });
      socket.emit("add point", {
        name: this.state.data[this.state.currentUser].name,
        point: this.state.data[this.state.currentUser].score,
        stt: this.state.currentUser,
        users: this.state.data,
      });
      //console.log(this.state.data[this.state.currentUser].score);
      // left arrow
      //alert("left");
    } //==============================================================================================================
    else if (e.keyCode == "49") {
      this.nextUser(0);
      // right arrow
      //alert("right");
    } //==============================================================================================================
    else if (e.keyCode == "50") {
      // right arrow
      //alert("right");
      this.nextUser(1);
    } //==============================================================================================================
    else if (e.keyCode == "51") {
      // right arrow
      //alert("right");
      this.nextUser(2);
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

  TongKet = (e) => {
    e.preventDefault();
    console.log(this.state.data);
    socket.emit("TongKetDiem", this.state.data);
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
      <div className="App">
        <form className="App-header" onSubmit={this.onSubmit}>
          <img src={logo} className="App-logo" alt="logo" />
          <p></p>
          <input onKeyDown={this.handleKeyDown} />
          <div>
            {this.state.questions.map((ques, id) => {
              return (
                <p key={id} className="ques active">
                  {ques.ques}
                </p>
              );
            })}
          </div>
          <button
            onClick={this.TongKet}
            className="btn btn-danger TongKetButton"
          >
            ENDING ROUND
          </button>
        </form>
      </div>
    );
  }
}

export default Admin;
