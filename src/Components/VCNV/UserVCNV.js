import React, { Component } from "react";
import io from "socket.io-client";
import "../../App.css";
import "./VCNV.css";
import port from "../../port.json";
import $ from "jquery";
const socket = io.connect(port.port); //change when change wif
let check = true;
let check1 = 0;
let onVCNV = false;
class UserVCNV extends Component {
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
    };
  }
  componentDidMount() {
    if (localStorage.getItem("Disable") == "true") {
      $(".col-11").hide();
    }

    this.setState({
      questions: this.props.questions,
      data: this.props.data,
      current: this.props.current[0] ? this.props.current[0].current : 0,
    });
    //   score: this.state.data[this.state.current]
    //     ? this.state.data[this.state.current].score

    socket.on("choose ques", (ques) => {
      localStorage.setItem("submitVCNV", 1);
      this.setState({
        question: ques.ques,
      });
      this.setState({ answerVCNV: "" });
      localStorage.setItem("submitVCNV", 1);
    });

    // socket.on("add point ok", (data) => {
    //   this.setState({
    //     score: data.point,
    //     current: data.stt - 1,
    //   });
    //   if (data.data != null) this.setState({ data: data.data });
    // });

    socket.on("choose ques", (ques) => {
      this.setState({
        question: ques.ques,
      });
      $(".answerVCNV").show(200);
      $(".submitVCNV").show(200);
      setTimeout(function () {
        if (check) {
          $("#progressBar").css("background-color", "#cfd6d9");
          $(".bar").css("background-color", "#428bca");
          progress(15, 15, $("#progressBar"));
          check = false;
        }
      }, 7000);
      $(".around").removeClass("CircleActive");
      $(".around")
        .eq(ques.id - 1)
        .addClass("CircleActive");
    });

    socket.on("disable", (dis) => {
      if (check1 == 0 && dis) {
        if (dis.id == localStorage.tooken) {
          $(".col-11").hide();
          localStorage.setItem("Disable", true);
        }
      }
    });
  }
  AddScore = (name, scoreAdd, id) => {
    let data = this.state.data;
    if (data[id]) {
      data[id].score += scoreAdd;
      console.log(data);
      this.setState({ data: data });
      socket.emit("Add score", {
        name: name,
        score: data[id].score,
        data: data,
      });
    }
  };

  //========================================================
  onAnswerVCNV = (e) => {
    this.setState({ answerVCNV: e.target.value });
  };
  onSubmitAnswerVCNV = (e) => {
    e.preventDefault();
    $(".alert").css("right", "0");
    setTimeout(() => {
      $(".alert").css("right", "-60%");
    }, 2000);
    if (localStorage.submitVCNV) {
      let { answerVCNV } = this.state;
      answerVCNV = answerVCNV.toUpperCase();
      this.setState({
        answerVCNV: answerVCNV,
      });
      socket.emit("on send answer", {
        id: localStorage.tooken ? localStorage.tooken : 0,
        answer: answerVCNV,
      });
      localStorage.setItem("submitVCNV", 0);
    } else {
      alert("BẠN CHỈ CÓ THỂ GỬI 1 LẦN");
    }
  };
  onVCNV = () => {
    if (onVCNV == false) {
      let name = this.state.data[localStorage.tooken]
          ? this.state.data[localStorage.tooken].name
          : "admin",
        id = localStorage.tooken ? localStorage.tooken : 0;
      //this.AddScore(name, 50, id);
      socket.emit("on VCNV", {
        name: name,
        id: id,
      });
      onVCNV = true;
    }
  };
  render() {
    //$(".names").removeClass("CrName");
    // $(".names").eq(this.state.current).addClass("CrName");
    return (
      <div className="App">
        <div className="App-header">
          {/* <table id="NameList">
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
          </table> */}
          {/* <p>
            {this.state.data[this.state.current]
              ? this.state.data[this.state.current].name
              : "ngu"}
          </p> */}
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
              <button
                type="button"
                name=""
                id=""
                class="btn btn-danger btn-lg btn-block BestAnswer"
                onClick={this.onVCNV}
              >
                TRẢ LỜI CHƯỚNG NGẠI VẬT
              </button>
              <div id="showAnswerVCNV">
                CÂU TRẢ LỜI ĐÃ GỬI : {this.state.answerVCNV.toUpperCase()}
              </div>
            </div>
          </div>

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

export default UserVCNV;

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
    $(".answerVCNV").hide();
    $(".submitVCNV").hide();
    check = true;
  }
}
