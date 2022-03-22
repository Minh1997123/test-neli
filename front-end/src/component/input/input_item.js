import React, { useRef } from "react";
import axios from "axios";
function Input_item(props) {
  return (
    <div className={props.className}>
      <div style={{ display: "flex", width: "100%" }}>
        <input type="text" ref={props.Ref} />
        <button onClick={props.create}>+</button>
      </div>
      <div
        style={{
          width: "100%",
          margin: "8px",
          display: "flex",
          justifyContent: "center",
          minHeight: "1rem",
        }}
      >
        {props.hide ? (
          <p style={{ margin: "0px", color: "red", height: "1rem" }}>
            Hãy điền đẩy đủ thông tin
          </p>
        ) : null}
      </div>
    </div>
  );
}
export default Input_item;
