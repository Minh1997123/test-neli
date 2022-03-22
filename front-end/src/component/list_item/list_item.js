import React from "react";
import axios from "axios";

function List_item(props) {
  const [input, setInput] = React.useState(true);
  const [check, setCheck] = React.useState(props.status);
  const [text, setText] = React.useState(props.value);
  const Ref = "Div" + props.Id;
  function edit(e) {
    e.preventDefault();

    if (input) {
      setInput(false);
    } else if (document.getElementById(props.Id).value === "") {
      setInput(true);
    } else {
      axios
        .put(`http://localhost:3005/todolist/${props.Id}`, {
          value: document.getElementById(props.Id).value,
          status: check,
          id: props.Id,
        })
        .then((res) => {
          console.log(res.data);
        });
      setText(document.getElementById(props.Id).value);
      setInput(true);
      document.getElementById(props.Id).value = "";
    }
  }
  function deLete(e) {
    e.preventDefault();
    console.log(props.Id);
    axios.delete(`http://localhost:3005/todolist/${props.Id}`).then((res) => {
      console.log(res.data);
    });
    document.getElementById(Ref).remove();
  }

  function onckeck(e) {
    e.preventDefault();
    setCheck(!check);
    axios
      .put(`http://localhost:3005/todolist/${props.Id}`, {
        value: text,
        status: e.target.getAttribute("value") === "false",
        id: props.Id,
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  return (
    <div className={props.className} id={Ref}>
      {!input ? (
        <div className="List__item__edit">
          <input
            id={props.Id}
            placeholder="mời nhập vào đây để thay đổi"
          ></input>
        </div>
      ) : (
        <div className="List__item__text">
          {check ? (
            <div
              onClick={onckeck}
              className="List__item__text__check"
              value="true"
            ></div>
          ) : (
            <div
              onClick={onckeck}
              className="List__item__text__check--false"
              value="false"
            ></div>
          )}
          <p>{text}</p>
        </div>
      )}

      <div className="List__item__button">
        <button onClick={edit}>Sửa</button>
        <button onClick={deLete}>Xóa</button>
      </div>
    </div>
  );
}
export default List_item;
