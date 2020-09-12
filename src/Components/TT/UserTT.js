import React, { Component } from "react";
import io from "socket.io-client";
import "../../App.css";
import "./TT.css";
import port from "../../port.json";
import $ from "jquery";
const socket = io.connect(port.port);
let check = true,
  check1 = 0,
  myVar,
  time = 0,
  thisdd;
class UserTT extends Component {
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
      answerVCNV: "",
      time: 0,
    };
  }

  componentDidMount() {
    stopTimer();
    thisdd = this;
    if (localStorage.DisListVCNV) {
      for (let i = 0; i < localStorage.DisListVCNV.length; i++)
        if (localStorage.tooken == localStorage.DisListVCNV[i]) {
          $(".col-11").hide();
          console.log("qweg");
        }
    }

    this.setState({
      questions: this.props.questions,
      data: this.props.data,
      current: this.props.current[0] ? this.props.current[0].current : 0,
    });
    //   score: this.state.data[this.state.current]
    //     ? this.state.data[this.state.current].score
    //     : "gasg",
    // });

    socket.on("choose ques", (ques) => {
      localStorage.setItem("submitVCNV", 1);
      this.setState({
        question: ques.ques,
      });
      localStorage.setItem("submitVCNV", 1);
    });

    socket.on("Add score TT", (crr) => {
      if (crr != []) {
        this.setState({ data: crr.data });
      }
    });
    // socket.on("add point ok", (data) => {
    //   this.setState({
    //     score: data.point,
    //     current: data.stt - 1,
    //   });
    //   if (data.data != null) this.setState({ data: data.data });
    // });

    socket.on("choose ques", (ques) => {
      restartTimer();
      this.setState({
        question: ques.ques,
      });
      $(".answerVCNV").show(200);
      $(".submitVCNV").show(200);
      setTimeout(function () {
        if (check) {
          $("#progressBar").css("background-color", "#cfd6d9");
          $(".bar").css("background-color", "#428bca");
          progress(30, 30, $("#progressBar"));
          startTimer();
          check = false;
        }
      }, 2000);
      $(".around").removeClass("CircleActive");
      $(".around")
        .eq(ques.id - 1)
        .addClass("CircleActive");
    });

    socket.on("disable", (dis) => {
      if (check1 == 0) {
        let obj = {
          name: localStorage.name,
          id: localStorage.id,
        };
        socket.emit("disable", obj);
        let empity = [];
        if (localStorage.DisListVCNV == null)
          localStorage.setItem("DisListVCNV", JSON.stringify(empity));
        let dislist = JSON.parse(localStorage.DisListVCNV);
        dislist.push(localStorage.tooken);
        localStorage.setItem("DisListVCNV", JSON.stringify(dislist));
        // if (this.state.problem)
        //   this.AddScore(data.name, this.state.problem, data.id);
        check1 = 1;
        if (localStorage.tooken == (dis ? dis.id : 0)) {
          $(".col-11").hide();
        }
      }
    });
  }
  // AddScore = (name, scoreAdd, id) => {
  //   let data = this.state.data;
  //   if (data[id]) {
  //     data[id].score += scoreAdd;
  //     console.log(data);
  //     this.setState({ data: data });
  //     socket.emit("Add score TT", {
  //       name: name,
  //       score: data[id].score,
  //       data: data,
  //     });
  //   }
  // };

  //==========================================================
  onAnswerVCNV = (e) => {
    this.setState({ answerVCNV: e.target.value });
  };
  onSubmitAnswerVCNV = (e) => {
    e.preventDefault();
    $(".alert").css("right", "0");
    setTimeout(() => {
      $(".alert").css("right", "-60%");
    }, 3000);
    if (localStorage.submitVCNV) {
      let { answerVCNV } = this.state;
      answerVCNV = answerVCNV.toUpperCase();
      this.setState({
        answerVCNV: answerVCNV,
      });
      socket.emit("on send answer", {
        id: localStorage.tooken ? localStorage.tooken : 0,
        answer: answerVCNV,
        time: this.state.time,
      });
      localStorage.setItem("submitVCNV", 0);
    } else {
      alert("BẠN CHỈ CÓ THỂ GỬI 1 LẦN");
    }
  };

  render() {
    //$(".names").removeClass("CrName");
    // $(".names").eq(this.state.current).addClass("CrName");
    return (
      <div className="App">
        <div className="App-header">
          <div className="questionsVCNV col-11">
            <div>
              <p className="questionVCNV quessVCNV">
                {this.state.question.ques}{" "}
              </p>
            </div>
            {/* <div className="score col-4">{this.state.score}</div> */}
          </div>
          <p className="disableVCNV">{this.state.notifition}</p>
          <div className="col-11">
            <div class="form-group">
              <form onSubmit={this.onSubmitAnswerVCNV}>
                <input
                  type="text"
                  class="form-control answerVCNV"
                  name="answerVCNV"
                  id=""
                  aria-describedby="helpId"
                  placeholder="Your Answer..."
                  value={this.state.answerVCNV}
                  onChange={this.onAnswerVCNV}
                />
                <button
                  type="submit"
                  name=""
                  id=""
                  class="btn btn-primary btn-lg btn-block submitVCNV"
                  // onClick={this.onSubmitAnswerVCNV}
                >
                  GỬI CÂU TRẢ LỜI.
                </button>
              </form>
              <div id="showAnswerVCNV">
                CÂU TRẢ LỜI SẼ GỬI : {this.state.answerVCNV.toUpperCase()} --{" "}
                {this.state.time}
              </div>
            </div>
          </div>
          {/* <p>{this.state.time}</p> */}

          <div id="progressBar">
            <div className="bar"></div>
          </div>

          <div className="alert">
            {/* <span
              className="closebtn"
              // onClick={() => {
              //   $(".alert").hide(500);
              // }}
            >
              &times;
            </span> */}
            <strong>Success !</strong> Câu Trả Lời Đã gửi :{" "}
            {this.state.answerVCNV.toUpperCase()}
          </div>
        </div>
      </div>
    );
  }
}

export default UserTT;

function stopTimer() {
  clearInterval(myVar);
}
function startTimer() {
  myVar = setInterval(myTimer, 10);
}
function myTimer() {
  console.log("qweg");
  time = time + 0.01;
  time = Math.round((time + 0.00001) * 100) / 100;
  var d = new Date();
  if (thisdd) thisdd.setState({ time: time });
}
function restartTimer() {
  time = 0;
}
function progress(timeleft, timetotal, $element) {
  var progressBarWidth = (timeleft * $element.width()) / timetotal;
  // startTimer();
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
    stopTimer();
    $("#progressBar").css("background-color", "red");
    $(".bar").css("background-color", "red");
    $(".answerVCNV").hide();
    $(".submitVCNV").hide();
    check = true;
  }
}
