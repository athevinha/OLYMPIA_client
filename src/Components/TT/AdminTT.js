import React, { Component } from "react";
import logo from "../../logo.svg";
import io from "socket.io-client";
import "../../App.css";
import $, { data } from "jquery";
import port from "../../port.json";
import "./TT.css";
const socket = io.connect(port.port); //change when change wifi

class AdminTT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gmail: "",
      password: "",
      data: [],
      questions: [],
      currentQues: 0,
      currentUser: 0,
      ListShowContentVCNV: [],
      problem: 40,
    };
  }
  componentWillUnmount() {}
  //==================================================================================================================
  componentDidMount() {
    console.log(this.props.questions)
    this.setState({
      questions: this.props.questions,
      data: this.props.data,
      currentUser: this.props.current[0] ? this.props.current[0].current : 0,
    });
    socket.on("on send answer", (UserAns) => {
      let { ListShowContentVCNV } = this.state;
      //console.log(ListShowContentVCNV.length);
      if (ListShowContentVCNV.length == 0) {
        for (let i = 0; i < this.state.data.length; i++) {
          ListShowContentVCNV.push({
            name: this.state.data[i].name,
            answer: "",
            time: 0,
          });
        }
        this.setState({ ListShowContentVCNV: ListShowContentVCNV });
        //if (UserAns) console.log(UserAns.time);
      }

      let Ans = this.state.questions[this.state.currentQues]
        ? this.state.questions[this.state.currentQues].answer
        : "";
      //==========================================
      if (Ans != "") {
        if (UserAns.answer == Ans) {
          //alert(UserAns.answer);
          let name = this.state.data[UserAns.id]
            ? this.state.data[UserAns.id].name
            : " ";
          //==========================================
          //==============q=========================
          for (let i = 0; i < ListShowContentVCNV.length; i++) {
            if (ListShowContentVCNV[i].name == name) {
              ListShowContentVCNV[i].answer = UserAns.answer;
              ListShowContentVCNV[i].time = UserAns.time;
            }
          }
          //  this.AddScore(name, 10, UserAns.id);
          //====
          this.setState({
            ListShowContentVCNV: ListShowContentVCNV,
          });
          //=======================================
        } else {
          //alert(UserAns.answer);
          let name = this.state.data[UserAns.id]
            ? this.state.data[UserAns.id].name
            : " ";
          //==========================================
          let { ListShowContentVCNV } = this.state;
          //=======================================
          for (let i = 0; i < ListShowContentVCNV.length; i++) {
            if (ListShowContentVCNV[i].name == name) {
              ListShowContentVCNV[i].answer = UserAns.answer;
              ListShowContentVCNV[i].time = UserAns.time;
            }
          }

          //this.AddScore(name, 20, UserAns.id);
          //====
          this.setState({
            ListShowContentVCNV: ListShowContentVCNV,
          });
        }
        //===========================================
      }
      //===========================================
    });
  }
  TongKet = (e) => {
    e.preventDefault();
    console.log(this.state.data);
    socket.emit("TongKetDiem", this.state.data);
  };
  // AddScore = (name, scoreAdd, id) => {
  //   let data = this.state.data;
  //   if (data[id]) {
  //     data[id].score += scoreAdd;
  //     console.log(data);
  //     this.setState({ data: data });
  //     socket.emit("Add score", {
  //       name: name,
  //       score: data[id].score,
  //       data: data,
  //     });
  //   }
  // };
  // //==================================================================================================================
  checkKey = (e) => {
    e.preventDefault();
    let { problem } = this.state;
    e = e || window.event;

    let { currentQues } = this.state;
    if (e.keyCode == "49") {
      socket.emit("Open Picture", ".pie1");
    } else if (e.keyCode == "50") {
      socket.emit("Open Picture", ".pie2");
    } else if (e.keyCode == "51") {
      socket.emit("Open Picture", ".pie3");
    } else if (e.keyCode == "52") {
      socket.emit("Open Picture", ".pie4");
    } else if (e.keyCode == "53") {
      socket.emit("Open Picture", ".pieCen");
    } else if (e.keyCode == "112") {
      this.ChooseQuesTT(1, ".Ques1");
    } //==============================================================================================================
    else if (e.keyCode == "113") {
      this.ChooseQuesTT(2, ".Ques2");
    } //==============================================================================================================
    else if (e.keyCode == "114") {
      // right arrow
      this.ChooseQuesTT(3, ".Ques3");
    } //==============================================================================================================
    else if (e.keyCode == "115") {
      // right arrow
      this.ChooseQuesTT(4, ".Ques4");
      // this.setState({ problem: problem - 20 });
    } else if (e.keyCode == "116") {
      // right arrow
      this.ChooseQuesTT(5);
      //this.setState({ problem: 10 });
    } else if (e.keyCode == "8") {
      // delete to show list
      let { ListShowContentVCNV } = this.state;
      if (ListShowContentVCNV.length != 0) {
        let SortArr = [];
        for (let i = 0; i < ListShowContentVCNV.length; i++) {
          SortArr.push(ListShowContentVCNV[i].time);
          console.log(SortArr);
        }
        //===========================================
        let tg;
        for (let i = 0; i < SortArr.length - 1; i++) {
          for (let j = i + 1; j < SortArr.length; j++) {
            if (SortArr[i] > SortArr[j]) {
              // HoSortArrn vi 2 so SortArr[i] vSortArr SortArr[j]
              tg = SortArr[i];
              SortArr[i] = SortArr[j];
              SortArr[j] = tg;
            }
          }
        }

        //=========================================================
        console.log(SortArr);
        let { data } = this.state;
        for (let i = 0; i < ListShowContentVCNV.length; i++) {
          for (let k = 0; k < ListShowContentVCNV.length; k++) {
            if (SortArr[i] == ListShowContentVCNV[k].time) {
              let tog = ListShowContentVCNV[k];
              let Togdata = data[k];
              ListShowContentVCNV[k] = ListShowContentVCNV[i];
              ListShowContentVCNV[i] = tog;
              data[k] = data[i];
              data[i] = Togdata;
            }
          }
        }
        console.log("rasdgsdgasdgasdgasdgadga");
        this.setState({
          ListShowContentVCNV: ListShowContentVCNV,
          data: data,
        });
        console.log(data);
        console.log(ListShowContentVCNV);
        //==========================================Add=====
      }
      // let arr = [];
      // for (let i = 0; i < ListShowContentVCNV.length; i++) {
      //   arr.push(ListShowContentVCNV[i]);
      // }
      socket.emit("show list TT", {
        list: ListShowContentVCNV ? ListShowContentVCNV : [],
        answer: this.state.questions[this.state.currentQues]
          ? this.state.questions[this.state.currentQues].answer
          : "",
        stt: this.state.currentQues,
      });
    }
  };
  //==================================================================================================================
  AddScore = (name, scoreAdd, id) => {
    let { data } = this.state;
    if (data[id]) {
      data[id].score += scoreAdd;
      this.setState({ data: data });
      socket.emit("Add score TT", {
        name: name,
        score: data[id].score,
        data: data,
      });
    }
  };

  //==================================================================================================================
  ChooseQuesTT = (stt, ShowImg) => {
    this.setState({
      currentQues: stt,
      ListShowContentVCNV: [],
      problem: 40,
    });
    socket.emit("choose ques", {
      ques: this.state.questions[stt],
      id: stt,
      src: ShowImg,
    });
  };
  //==================================================================================================================
  handleKeyDown = (e) => {
    // arrow up/down buton should select next/previous list element
    this.checkKey(e);
  };
  //==================================================================================================================
  OnAddPoint = (e) => {
    e.preventDefault();
    let Ans = this.state.questions[this.state.currentQues]
      ? this.state.questions[this.state.currentQues].answer
      : "??";
    let { problem } = this.state;
    for (let i = 0; i < this.state.ListShowContentVCNV.length; i++) {
      if (this.state.ListShowContentVCNV[i].answer == Ans) {
        this.AddScore(this.state.ListShowContentVCNV[i].name, problem, i);
        socket.emit("play sound TT", "he he");
        console.log(
          "Đã Cộng " + this.state.ListShowContentVCNV[i].name + " " + problem
        );
        problem -= 10;
        this.setState({ problem: problem });
      }
    }
    console.log(this.state.data);
  };
  //=================================================================================================================

  //==================================================================================================================
  //True answer VCNV
  DisableUser = (e) => {
    e.preventDefault();

    let obj = {
      name: localStorage.name,
      id: localStorage.id,
    };
    console.log(obj);
    socket.emit("disable", obj);
  };
  ShowList = (e) => {
    e.preventDefault();
    console.log("qwef");
    socket.emit("show answervcnv", {
      list: this.state.ListShowContentVCNV
        ? this.state.ListShowContentVCNV
        : [],
      answer: this.state.questions[this.state.currentQues]
        ? this.state.questions[this.state.currentQues].answer
        : "",
      stt: this.state.currentQues,
    });
  };
  //==================================================================================================================
  //Wrong answer
  render() {
    $(".ques").removeClass("active");
    $(".ques").eq(this.state.currentQues).addClass("active");

    return (
      <div className="App">
        <form className="App-header" onSubmit={this.onSubmit}>
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            {this.state.ListShowContentVCNV
              ? this.state.ListShowContentVCNV.map((user, id) => {
                  return (
                    <p key={id}>
                      {user.name} : {user.answer} = {user.time}
                    </p>
                  );
                })
              : "ngu"}
          </div>
          <div className="SubmitAdminVCNV">
            <input onKeyDown={this.handleKeyDown} />

            <button
              className="btn btn-danger btn-block nothing"
              onClick={this.OnAddPoint}
            >
              Add Point
            </button>
            {/* <button
              className="btn btn-success btn-block  nothing"
              onClick={this.ShowList}
            >
              OPEN CIRCLE
            </button> */}
            <button
              onClick={this.TongKet}
              className="btn btn-danger TongKetButton"
            >
              ENDING ROUND
            </button>
          </div>
          <div>
            {this.state.questions.map((ques, id) => {
              if (id == 0)
                return (
                  <p key={id} className="ques active">
                    {ques.ques}
                  </p>
                );
              else
                return (
                  <p key={id} className="ques">
                    {ques.ques}
                  </p>
                );
            })}
          </div>
        </form>
      </div>
    );
  }
}

export default AdminTT;
