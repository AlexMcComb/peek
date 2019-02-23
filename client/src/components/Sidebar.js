import React from "react";
import Filter from "./Filter";

const Sidebar = props => {
  return (
    <ul className="sidebar">
      <Filter
        handleSubmit={props.handleSubmit}
        handleChange={props.handleChange}
      />
      {props.trails.map(item => (
        <li key={item.id} className="polaroid">
          <img src={item.imgMedium} alt="park" />
          <h2
            onClick={() => {
              props.mapItem(item);
            }}
          >
            {item.name}
          </h2>
          <input id={item.id} className="toggle" type="checkbox" />
          <label htmlFor={item.id} className="lbl-toggle">
            More Info
          </label>
          <div className="collapsible-content">
            <div className="content-inner">
              <p>{item.summary}</p>
            </div>
            <button
              disabled={props.disabled.indexOf(item.id) !== -1}
              onClick={() => {
                props.disableButton(item);
              }}

              //   let todos = [...this.state.todos];
              //   todos.push({ id: item.id, name: item.name });
              //   this.setState({
              //     todos,
              //     disabled: [...this.state.disabled, item.id]
              //   });
              //
              // }}
            >
              Add to Wishlist
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
