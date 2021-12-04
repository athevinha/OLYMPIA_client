import React, { Component } from "react";
import logo from "../../logo.svg";
import io from "socket.io-client";
import "../../App.css";
import $ from "jquery";
import port from "../../port.json";
import AdminService from "../../service/admin.service";
import adminService from "../../service/admin.service";
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
      currentUser: 0,
      // this.props.current[0] ? this.props.current[0].current : 0,
    });
  }
  checkKey = (e) => {
    e.preventDefault();
    e = e || window.event;
    let { currentQues } = this.state;
    if (e.keyCode == "38") {
      console.log("gihihiuhui");
      currentQues--;
      this.setState({ currentQues: currentQues });
      socket.emit("choose ques", this.state.questions[currentQues].ques);
      $(document).scrollTop($(document).scrollTop() - 40);
    } //=============================================================================================================
    else if (e.keyCode == "40") {
      // down arrow
      currentQues++;
      this.setState({ currentQues: currentQues });
      $(document).scrollTop($(document).scrollTop() + 40);

      socket.emit("choose ques", this.state.questions[currentQues].ques);
    } //==============================================================================================================
    else if (e.keyCode == "13") {
      let a = this.state.data[this.state.currentUser].score;
      a += 10;
      let userss = this.state.data;

      userss[this.state.currentUser].score = a;
      this.setState({ data: userss });
      // console.log(this.state.data[this.state.currentUser].score)
      socket.emit("add point", {
        name: this.state.data[this.state.currentUser].name,
        point: this.state.data[this.state.currentUser].score,
        stt: this.state.currentUser,
      });
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
    } else if (e.keyCode == "8") {
      // right arrow
      socket.emit("Wrong Answer", "false");
    }
  };

  //
  nextUser = (stt) => {
    console.log(stt);
    this.setState({ currentUser: stt });
    console.log(this.state.data);
    let a = this.state.data[this.state.currentUser].score;
    let userss = this.state.data;
    userss[this.state.currentUser].score = a;
    this.setState({ data: userss });
    socket.emit("add point", {
      name: this.state.data[stt].name,
      point: this.state.data[stt].score,
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
      <div className="">
        <form className="" onSubmit={this.onSubmit} style={{textAlign:"center"}}>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <input
            onKeyDown={this.handleKeyDown}
            style={{left:'40vw',position:"fixed",top:'50vh'}}
          />
          <br/> <br/> <br/> <br/> <br/> <br/>
          {/* <p></p> */}
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
