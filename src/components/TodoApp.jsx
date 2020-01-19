import React from "react";
import CheckButton from "./CheckButton";
import EditButton from "./EditButton";
import RemoveButton from "./RemoveButton";
import Loader from "./Loader";

class TodoApp extends React.Component {
  state = {
    items: [],
    text: "",
    textEdit: "",
    id: 0,
    showList: "All",
    number: 5,
    showLoader: false
  };

  render = () => {
    return (
      <div>
        <div id="main">
          <h1>Todo App</h1>
          {!this.state.items.length && !this.state.showLoader ? (
            <h3>Oops.. You have no tasks!</h3>
          ) : (
            <div>
              <h2>{this.countItems()}</h2>
              <input
                id="searchInput"
                placeholder="Type to search"
                onChange={this.handleChangeSearch}
                onFocus={this.searchInputFocus}
              />
              <label className="container">
                <input
                  type="radio"
                  name="radio"
                  id="allInput"
                  defaultChecked
                  onClick={this.showListChange}
                />
                <span className="checkmark" id="allButton">
                  All
                </span>
              </label>
              <label className="container">
                <input
                  type="radio"
                  name="radio"
                  id="activeInput"
                  onClick={this.showListChange}
                />
                <span className="checkmark" id="activeButton">
                  Active
                </span>
              </label>
              <label className="container">
                <input
                  type="radio"
                  name="radio"
                  id="doneInput"
                  onClick={this.showListChange}
                />
                <span className="checkmark" id="doneButton">
                  Done
                </span>
              </label>
            </div>
          )}
          <ul>
            {this.state.items.map(elem =>
              elem.display === true && this.state.showList === "All" ? (
                <li
                  key={elem.id}
                  className={elem.done === true ? "doneItem" : ""}
                >
                  {elem.edit === true ? (
                    <form onSubmit={e => this.handleSubmitEdit(e, elem.id)}>
                      <input
                        className="editInput"
                        value={this.state.textEdit}
                        onChange={this.handleChangeEdit}
                        onBlur={e => this.handleSubmitEdit(e, elem.id)}
                        id={elem.id}
                        autoFocus
                      />
                    </form>
                  ) : (
                    elem.text
                  )}
                  <span className="optionButtons">
                    <CheckButton id={elem.id} check={this.checkItem} />
                    <EditButton id={elem.id} edit={this.editItem} />
                    <RemoveButton id={elem.id} remove={this.removeItem} />
                  </span>
                </li>
              ) : elem.display === true &&
                elem.done === false &&
                this.state.showList === "Active" ? (
                <li
                  key={elem.id}
                  className={elem.done === true ? "doneItem" : ""}
                >
                  {elem.edit === true ? (
                    <form onSubmit={e => this.handleSubmitEdit(e, elem.id)}>
                      <input
                        className="editInput"
                        value={this.state.textEdit}
                        onChange={this.handleChangeEdit}
                        onBlur={e => this.handleSubmitEdit(e, elem.id)}
                        id={elem.id}
                        autoFocus
                      />
                    </form>
                  ) : (
                    elem.text
                  )}
                  <span className="optionButtons">
                    <CheckButton id={elem.id} check={this.checkItem} />
                    <EditButton id={elem.id} edit={this.editItem} />
                    <RemoveButton id={elem.id} remove={this.removeItem} />
                  </span>
                </li>
              ) : elem.display === true &&
                elem.done === true &&
                this.state.showList === "Done" ? (
                <li
                  key={elem.id}
                  className={elem.done === true ? "doneItem" : ""}
                >
                  {elem.text}
                  <span className="optionButtons">
                    <CheckButton id={elem.id} check={this.checkItem} />
                    <EditButton id={elem.id} edit={this.editItem} />
                    <RemoveButton id={elem.id} remove={this.removeItem} />
                  </span>
                </li>
              ) : null
            )}
          </ul>
          {this.state.showLoader && <Loader />}
          <form onSubmit={this.handleSubmit}>
            <input
              id="addInput"
              placeholder="I have to do..."
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button id="addButton">ADD</button>
          </form>
          <form onSubmit={this.handleSubmitJson}>
            <input
              id="addInputJson"
              type="number"
              max="200"
              onChange={this.handleChangeJson}
              value={this.state.number}
            />
            <button id="addButtonJson">Get from JSONPlaceholder</button>
          </form>
        </div>
        <footer>
          © 2019 VitalyaZaebalsya. All rights for govnokod reserved
        </footer>
      </div>
    );
  };

  handleChange = e => {
    if (!this.state.text && e.target.value === " ") return;
    else this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.text.length) return;
    let newItem = {
      text: this.state.text,
      id: this.state.id,
      done: false,
      edit: false,
      display: true,
      open: false
    };
    this.setState(state => ({
      items: [...state.items, newItem],
      text: "",
      id: (state.id += 1)
    }));
  };

  countItems = () => {
    let done = 0;
    let undone = 0;
    this.state.items.map(elem => (elem.done ? (done += 1) : (undone += 1)));
    return `${undone} left, ${done} done`;
  };

  checkItem = id => () => {
    this.setState(state => ({
      items: state.items.map(elem =>
        elem.id === id && elem.edit === false
          ? { ...elem, done: !elem.done }
          : elem
      )
    }));
  };

  editItem = id => () => {
    this.setState(state => ({
      items: state.items.map(elem => {
        if (this.state.items.some(element => element.edit)) {
          if (elem.id === id && elem.edit) {
            return { ...elem, edit: !elem.edit };
          } else return elem;
        } else {
          if (elem.id === id && elem.done) {
            return { ...elem, done: !elem.done };
          } else if (elem.id === id) {
            return { ...elem, edit: !elem.edit };
          } else return elem;
        }
      }),
      textEdit: state.items.find(elem => elem.id === id).text
    }));
  };

  removeItem = id => () => {
    this.setState(state => ({
      items: state.items.filter(elem => elem.id !== id)
    }));
  };

  handleChangeEdit = e => {
    if (!this.state.textEdit && e.target.value === " ") return;
    else this.setState({ textEdit: e.target.value });
  };

  handleSubmitEdit = (e, id) => {
    e.preventDefault();
    if (!this.state.textEdit.length) return;
    const textedit = this.state.textEdit;

    this.setState(state => ({
      items: state.items.map(elem =>
        elem.id === id ? { ...elem, text: textedit } : elem
      ),
      textEdit: ""
    }));
    this.editItem(id)();
  };

  handleChangeSearch = e => {
    let str = String(e.target.value).toUpperCase();
    this.setState(state => ({
      items: state.items.map(elem =>
        String(elem.text)
          .toUpperCase()
          .includes(str)
          ? { ...elem, display: true }
          : { ...elem, display: false }
      )
    }));
  };

  searchInputFocus = () => {
    this.setState(state => ({
      items: state.items.map(elem => (true ? { ...elem, edit: false } : elem))
    }));
  };

  showListChange = () => {
    const allInput = document.getElementById("allInput").checked;
    const activeInput = document.getElementById("activeInput").checked;
    const doneInput = document.getElementById("doneInput").checked;

    if (allInput) {
      this.setState({
        showList: "All"
      });
    } else if (activeInput) {
      this.setState({
        showList: "Ative"
      });
    } else if (doneInput) {
      this.setState({
        showList: "Done"
      });
    }
  };

  handleChangeJson = e => {
    if (e.target.value !== " ") {
      this.setState({ number: parseInt(e.target.value) });
    }
  };

  handleSubmitJson = e => {
    e.preventDefault();
    if (!this.state.number || this.state.number > 200) return;
    this.setState({
      showLoader: true
    });

    fetch(
      `https://jsonplaceholder.typicode.com/todos?_limit=${this.state.number}`
    )
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          data.map(element => {
            let newItem = {
              text: element.title,
              id: this.state.id,
              done: false,
              edit: false,
              display: true,
              open: false
            };
            this.setState(state => ({
              showLoader: false,
              items: [...state.items, newItem],
              text: "",
              id: state.id + 1
            }));
            return element;
          });
        }, 1000);
      });
  };
}

export default TodoApp;