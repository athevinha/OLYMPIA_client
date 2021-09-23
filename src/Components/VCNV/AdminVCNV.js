import React, { Component } from "react";
import logo from "../../logo.svg";
import io from "socket.io-client";
import "../../App.css";
import $, { data } from "jquery";
import port from "../../port.json";
import "./VCNV.css";
const socket = io.connect(port.port); //change when change wifi
let check1 = 0,
  Anss = "",
  tog = 0,
  Current = 0;
class AdminVCNV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gmail: "",
      password: "",
      data: [],
      questions: [],
      currentQues: 0,
      // currentUser: 0,
      ListShowContentVCNV: [],
      ArrPointer: [],
      problem: 100,
      Faster: [],
    };
  }
  //==================================================================================================================
  componentWillUnmount() {}
  //==================================================================================================================
  componentDidMount() {
    localStorage.setItem("Faster", false);
    this.setState({
      questions: this.props.questions,
      data: this.props.data,
      // currentUser: this.props.current[0] ? this.props.current[0].current : 0,
    });
    console.log(this.props.questions)
    socket.on("on send answer", (UserAns) => {
      console.log(UserAns)
      let { ListShowContentVCNV } = this.state;
      console.log(ListShowContentVCNV.length);
      if (ListShowContentVCNV.length == 0) {
        for (let i = 0; i < this.state.data.length; i++) {
          ListShowContentVCNV.push({
            name: this.state.data[i].name,
            answer: "",
          });
        }
        this.setState({ ListShowContentVCNV: ListShowContentVCNV });
        console.log(ListShowContentVCNV);
      }

      let Ans = this.state.questions[this.state.currentQues]
        ? this.state.questions[this.state.currentQues].answer
        : "";

      //==========================================
      if (Ans != "") {
        Anss = Ans;
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
            }
          }

          //this.AddScore(name, 10, UserAns.id);
          let { ArrPointer } = this.state;

          console.log(ListShowContentVCNV);
          ArrPointer = ListShowContentVCNV;
          // ArrPointer.push({
          //   name: name,
          //   id: UserAns.id,
          // });
          this.setState({
            ArrPointer: ArrPointer,
          });
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
    socket.on("on VCNV", (data) => {
      if (check1 == 0) {
        localStorage.setItem("Faster", true);
        console.log(localStorage.Faster);
        // if (localStorage.DisListVCNV) {
        //   localStorage.setItem("DisListVCNV", []);
        // }
        localStorage.setItem("name", data.name);
        localStorage.setItem("id", data.id);
        let { Faster } = this.state;
        Faster.push({
          name: localStorage.name,
          id: localStorage.id,
        });
        this.setState({ Faster:Faster });
        console.log(Faster);
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
  //==================================================================================================================
  checkKey = (e) => {
    e.preventDefault();
    let { problem } = this.state;
    e = e || window.event;
    console.log(e.keyCode)
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
      this.ChooseQuesVCNV(1);
    } //==============================================================================================================
    else if (e.keyCode == "113") {
      this.ChooseQuesVCNV(2);
    } //Trả lời chướng ngại vật ==============================================================================================================
    else if (e.keyCode == "114") {
      // right arrow
      this.ChooseQuesVCNV(3);
    } //==============================================================================================================
    else if (e.keyCode == "115") {
      // right arrow
      this.ChooseQuesVCNV(4);
      // this.setState({ problem: problem - 20 });
    } else if (e.keyCode == "116") {
      // right arrow
      this.ChooseQuesVCNV(5);
      //this.setState({ problem: 10 });
    } else if (e.keyCode == "117") {
      // right arrow
      this.ChooseQuesVCNV(6);
      //this.setState({ problem: 10 });
    } else if (e.keyCode == "8") {
      // delete to show list
      let { ListShowContentVCNV } = this.state;
      if (ListShowContentVCNV[0]) {
        if (data[0]) {
          for (let i = 0; i < this.state.data.length(); i++)
            ListShowContentVCNV.push({
              name: data[i].name,
              answer: data[i].answer,
            });
        }
      }
      let { ArrPointer } = this.state;
      if (tog == 0) {
        for (let i = 0; i < ListShowContentVCNV.length; i++) {
          if (ListShowContentVCNV[i].answer == Anss)
            this.AddScore(ListShowContentVCNV[i].name, 10, i);
        }
        tog = 1;
      }

      console.log(ArrPointer);
      socket.emit("show list VCNV", {
        list: this.state.ListShowContentVCNV
          ? this.state.ListShowContentVCNV
          : [],
        answer: this.state.questions[this.state.currentQues]
          ? this.state.questions[this.state.currentQues].answer
          : "",
        stt: this.state.currentQues,
      });
      this.setState({ ArrPointer: [] });
    }
  };
  //==================================================================================================================
  AddScore = (name, scoreAdd, id) => {
    let data = this.state.data;
    if (data[id]) {
      data[id].score += scoreAdd;
      this.setState({ data: data });
      socket.emit("Add score", {
        name: name,
        score: data[id].score,
        data: data,
      });
    }
  };

  //==================================================================================================================
  ChooseQuesVCNV = (stt) => {
    tog = 0;
    this.setState({
      currentQues: stt,
      ListShowContentVCNV: [],
      ArrPointer: [],
    });
    console.log(this.state.questions[stt])
    socket.emit("choose ques", {
      ques: this.state.questions[stt],
      id: stt,
    });
  };
  TongKet = (e) => {
    e.preventDefault();
    console.log(this.state.data);
    socket.emit("TongKetDiem", this.state.data);
  };
  //=================================================================================================================
  handleKeyDown = (e) => {
    // arrow up/down button should select next/previouslielement
    this.checkKey(e);
  };
  //==================================================================================================================
  OnAddPoint = (e) => {
    this.setState({ problem: e.target.value });
  };
  //==================================================================================================================
  AddGrantedPoint = (e) => {
    e.preventDefault();
    socket.emit("play sound VCNV", "hehe");
    let { Faster } = this.state;
    let obj = {
      name: Faster[Current]?.name,
      id: Faster[Current]?.id,
    };
    this.AddScore(obj.name, parseInt(this.state.problem), obj.id);
  };
  //==================================================================================================================
  DisableUser = (e) => {
    e.preventDefault();

    localStorage.setItem("Faster", false);
    let { Faster } = this.state;
    let obj = {
      name: Faster[Current]?.name,
      id: Faster[Current]?.id,
    };

    console.log(obj);

    socket.emit("disable", obj);

    Current++;
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
                      {user.name} : {user.answer}
                    </p>
                  );
                })
              : "ngu"}
          </div>
          <div className="SubmitAdminVCNV">
            <input onKeyDown={this.handleKeyDown} />
            <input
              onChange={this.OnAddPoint}
              type="text"
              placeholder="Add Point"
            />
            <button
              className="btn btn-primary btn-block nothingVCNV"
              onClick={this.AddGrantedPoint}
            >
              ADD POINT
            </button>
            <button
              className="btn btn-danger btn-block  nothingVCNV"
              onClick={this.DisableUser}
            >
              BLOCK USER
            </button>
            <button
              className="btn btn-success btn-block  nothingVCNV"
              onClick={this.ShowList}
            >
              OPEN CIRCLE
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

export default AdminVCNV;
