/* eslint-disable react/jsx-pascal-case */
import Sidebar from "./component/sidebar/index.js";
import Input_item from "./component/input/input_item.js";
import List_item from "./component/list_item/list_item.js";
import { useRef, useState } from "react";
import "./component/css/app.css";
import axios from "axios";
function App() {
  const [hide, setHide] = useState(false);
  const [list, setList] = useState([]);
  const input = useRef();

  if (list.length === 0) {
    axios
      .get("http://localhost:3005/todolist")
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function create(e) {
    e.preventDefault();
    if (input.current.value === "") {
      setHide(true);
      return;
    } else {
      setHide(false);
      let inputValue = input.current.value;
      axios
        .post("http://localhost:3005/todolist", {
          value: inputValue,
          status: false,
          id: list.length,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setList(() => {
        return [
          ...list,
          {
            value: inputValue,
            status: false,
            id: list.length,
          },
        ];
      });
      input.current.value = "";
    }
  }
  function edit(e) {
    e.preventDefault();
  }
  return (
    <div className="Div">
      <Sidebar className="Div__Sidebar" />
      <form className="Div__from">
        <Input_item
          create={create}
          Ref={input}
          className="Div__input"
          hide={hide}
        />

        {list.length === 0 ? null : (
          <div className="List">
            {list.map((e, i) => {
              return (
                <List_item
                  value={e.value}
                  className="List__item"
                  edit={edit}
                  Id={e.id}
                  status={e.status}
                />
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
}
export default App;
