import React, { Component } from "react";
import logo from "../../logo.svg";
import io from "socket.io-client";
import "../../App.css";
import $ from "jquery";
import port from "../../port.json";
import PointQues from "./Img/PointQues.PNG";
import "./VD.css";
const socket = io.connect(port.port); //change when change wifi

let thisd;
let check = true;
let dispute = false,
  isStar = false,
  choosePointQues = 0;
let SttQuesUser = 0;
let ques10 = [],
  ques20 = [],
  ques30 = [];
let Stt10 = 0;
let Stt20 = 0;
let Stt30 = 0;
//==need to reset====''
let QuesUserChoose = [];

class AdminVD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gmail: "",
      password: "",
      data: [],
      questions: [],
      question: "",
      questionGoingOn: [],
      currentQues: 0,
      currentUser: 0,
      examUser: 0,
      score: 0,
    };
  }

  componentDidMount() {
    $(".ChoosePointVD").show();
    thisd = this;
    this.setState({
      questions: this.props.questions,
      data: this.props.data,
      //currentUser: this.props.current[0] ? this.props.current[0].current : 0,
    });

    socket.on("on send VD", (ques) => {
      if (ques && dispute == true) {
        console.log(ques.id);
        socket.emit("send VD", ques);
        $(".names").removeClass("onAlertVD");
        $(".names").eq(ques.id).addClass("onAlertVD");
        dispute = false;
      }
    });
  }
  //

  OnChooseUser = (name, id, point) => {
    //e.preventDefault();
    this.setState({ currentUser: id });
    console.log(point);
  };

  NextQuesVD() {
    isStar = false;
    let { currentQues } = thisd.state;
    $(".names").removeClass("onAlertVD");
    dispute = false;
    currentQues++;
    thisd.setState({
      currentQues: currentQues,
      //  question: thisd.state.questions[currentQues],
    });
    let { questions } = thisd.state;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].point == 10) {
        ques10.push(questions[i]);
      } else if (questions[i].point == 20) {
        ques20.push(questions[i]);
      } else if (questions[i].point == 30) {
        ques30.push(questions[i]);
      }
    }

    if (QuesUserChoose[SttQuesUser]) {
      if (QuesUserChoose[SttQuesUser] == 10) {
        console.log(ques10[Stt10]);
        socket.emit("choose ques", ques10[Stt10].ques);
        thisd.setState({ question: ques10[Stt10] });
        Stt10++;
      } else if (QuesUserChoose[SttQuesUser] == 20) {
        console.log(ques20[Stt20]);
        socket.emit("choose ques", ques20[Stt20].ques);
        thisd.setState({ question: ques20[Stt20] });
        Stt20++;
      } else if (QuesUserChoose[SttQuesUser] == 30) {
        console.log(ques30[Stt30]);
        socket.emit("choose ques", ques30[Stt30].ques);
        thisd.setState({ question: ques30[Stt30] });
        Stt30++;
      }
    }
    SttQuesUser++;
    // socket.emit("choose ques", thisd.state.questions[currentQues].ques);
  }

  CheckAnsVD(TrueOrFalse) {
    let name = thisd.state.data[thisd.state.currentUser]
      ? thisd.state.data[thisd.state.currentUser].name
      : "";
    let nameLess = thisd.state.data[thisd.state.examUser]
      ? thisd.state.data[thisd.state.examUser].name
      : "";
    let PointAdd = thisd.state.question ? thisd.state.question.point : 0;
    if (TrueOrFalse == true) {
      socket.emit("check ans vd", true);
      if (this.state.currentUser != this.state.examUser) {
        thisd.AddScore(nameLess, -PointAdd, this.state.examUser);
        thisd.AddScore(name, PointAdd, this.state.currentUser);
        console.log(
          nameLess + "bị trừ" + PointAdd + " " + name + "được cộng " + PointAdd
        );
      } // 5s true...............................
      else {
        if (isStar == true) {
          let point = PointAdd * 2;
          thisd.AddScore(name, point, this.state.examUser);
        } //==Star True........................
        else {
          thisd.AddScore(name, PointAdd, this.state.examUser);
        }
      }
      //===================================================================
    }
    //==========================================================================
    else if (TrueOrFalse == false) {
      socket.emit("check ans vd", false);
      if (isStar == true) {
        thisd.AddScore(name, -PointAdd, this.state.examUser);
      } else {
        thisd.AddScore(name, -PointAdd / 2, this.state.currentUser);
      }
    }
  }

  TimerVD(time) {
    console.log(time);
    $("#progressBar").css("background-color", "#cfd6d9");
    $(".bar").css("background-color", "#428bca");
    progress(time, time, $("#progressBar"));
    socket.emit("time VD", time);
  }

  disputeAns() {
    console.log("who answer fastest !!");
    //=========Timer 5s========
    dispute = true;
    isStar = false;
    $("#progressBar").css("background-color", "#cfd6d9");
    $(".bar").css("background-color", "#428bca");

    progress(5, 5, $("#progressBar"));
    socket.emit("time VD", 5);
  }

  ChooseStar() {
    isStar = true;
    console.log(isStar);
    socket.emit("choose Star", true);
  }

  FinishVD() {
    QuesUserChoose = [];
    SttQuesUser = 0;
    let { examUser } = thisd.state;
    examUser++;
    $(".names").removeClass("activeNameVD");
    $(".names").eq(examUser).addClass("activeNameVD");
    console.log(examUser);
    thisd.setState({ examUser: examUser });
    $(".ChoosePointVD").show(1000);
    //reset....................................
    $(".TickVD").html("");
    choosePointQues = 0;
    isStar = false;
    socket.emit("next pp vd", examUser);
  }
  TongKet = (e) => {
    e.preventDefault();
    console.log(this.state.data);
    socket.emit("TongKetDiem", this.state.data);
  };
  OnChoosePoint(e, test) {
    choosePointQues++;

    if (choosePointQues >= 4) {
      $(".ChoosePointVD").hide(1000);
      socket.emit("close choose quesVD", "qeg");
    } else {
      QuesUserChoose.push(test);
      console.log(QuesUserChoose);
      socket.emit("open choose quesVD", e.target.id);
      e.target.innerHTML = "✔";
    }
  }
  //✔
  render() {
    //console.log(this.state.currentQues);
    // if (document.getElementsByClassName("ques")[this.state.currentQues]) {
    //   document.getElementsByClassName("ques")[
    //     this.state.currentQues
    //   ].innerHTML = "current";
    //}
    //  console.log(this.state.data[0] ? this.state.data[0].score : "????????");
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
                    <td
                      className={
                        id == 0 ? "names activeNameVD pointer" : "names pointer"
                      }
                      key={id}
                      onClick={() =>
                        this.OnChooseUser(user.name, id, user.score)
                      }
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
              <p className="question quess">
                {this.state.question ? this.state.question.ques : ""}{" "}
              </p>
            </div>
            <div className="score col-4">
              {this.state.data[this.state.examUser]
                ? this.state.data[this.state.examUser].score
                : 0}
            </div>
          </div>
          <button
            className="btn btn-info NextQuesVD timeVD abso"
            onClick={this.NextQuesVD}
          >
            ▶▶
          </button>
          <button
            className="btn btn-dark TrueAnsVD abso"
            onClick={() => this.CheckAnsVD(true)}
          >
            ✅
          </button>
          <button
            className="btn btn-dark FalseAnsVD  abso"
            onClick={() => this.CheckAnsVD(false)}
          >
            ❌
          </button>
          <button
            className="btn btn-warning Muois timeVD abso"
            onClick={() => this.TimerVD(10)}
          >
            🕐10
          </button>
          <button
            className="btn btn-warning MuoiLams timeVD abso"
            onClick={() => this.TimerVD(15)}
          >
            🕑15
          </button>
          <button
            className="btn btn-warning HaiMuois timeVD abso"
            onClick={() => this.TimerVD(20)}
          >
            🕒20
          </button>
          <button
            className="btn btn-danger fiveVD timeVD abso"
            onClick={this.disputeAns}
          >
            5s
          </button>
          <button
            className="btn btn-warning StarVD abso"
            onClick={this.ChooseStar}
          >
            ⭐
          </button>
          <button
            className="btn btn-success FinishVD abso"
            onClick={this.FinishVD}
          >
            FINISH ⏩⏩
          </button>

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
                <div
                  className="TickVD"
                  id="Tick1"
                  onClick={(e) => this.OnChoosePoint(e, 10)}
                ></div>
                <div
                  className="TickVD"
                  id="Tick2"
                  onClick={(e) => this.OnChoosePoint(e, 10)}
                ></div>
                <div
                  className="TickVD"
                  id="Tick3"
                  onClick={(e) => this.OnChoosePoint(e, 10)}
                ></div>
              </div>
              <div className="TwoTen">
                <p className="TwoText">20</p>
                <div
                  className="TickVD"
                  id="Tick4"
                  onClick={(e) => this.OnChoosePoint(e, 20)}
                ></div>
                <div
                  className="TickVD"
                  id="Tick5"
                  onClick={(e) => this.OnChoosePoint(e, 20)}
                ></div>
                <div
                  className="TickVD"
                  id="Tick6"
                  onClick={(e) => this.OnChoosePoint(e, 20)}
                ></div>
              </div>
              <div className="ThreeTen">
                <p className="ThreeText">30</p>
                <div
                  className="TickVD"
                  id="Tick7"
                  onClick={(e) => this.OnChoosePoint(e, 30)}
                ></div>
                <div
                  className="TickVD"
                  id="Tick8"
                  onClick={(e) => this.OnChoosePoint(e, 30)}
                ></div>
                <div
                  className="TickVD"
                  id="Tick9"
                  onClick={(e) => this.OnChoosePoint(e, 30)}
                ></div>
              </div>
            </div>
          </div>
          {/* <img src={PointQues}></img> */}
          <div id="progressBar" className="progressBarVD ">
            <div className="bar barVD"></div>
          </div>
          <button
            onClick={this.TongKet}
            className="btn btn-danger TongKetButton TongKetButtonVD"
          >
            ENDING ROUND
          </button>
        </div>
      </div>
    );
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
}

export default AdminVD;
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
//progress(15, 15, $("#progressBar"));
//The Anh :4203
//Ngguyen Huu Truong :5226
//Vinh : 4177
//ducga321@
