/* eslint-disable eqeqeq */
import React from 'react';
import './App.css';
import { dataset } from './dataset';

class App extends React.Component {
  state = {
    responseReady: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('clicked');
    const searchVal = e.currentTarget.searchBox.value;
    console.log('value:', searchVal);
    //do lookup and get answer and update state (responseValue & responseReady:true);
    const result = this.search(dataset, searchVal);
    const resMsg = `The value ${searchVal} was found in ${result} attempts`;
    this.setState({ resultMsg: resMsg, responseReady: true });
  };

  data = dataset.map((item, i) => <p key={i}>{item}</p>);

  //indexOf - find index of element containing value
  linearSearch = (array, value) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] == value) {
        return i;
      }
    }
    return -1;
  };

  binarySearch = (array, value, start = 0, end = array.length, count = 0) => {
    // var start = start === undefined ? 0 : start;
    // var end = end === undefined ? array.length : end;
    // var count = count === undefined ? 0 : count;

    count++;

    if (start > end) {
      return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    console.log(start, end, count);
    if (item == value) {
      return index;
    } else if (item < value) {
      return this.binarySearch(array, value, index + 1, end, count);
    } else if (item > value) {
      return this.binarySearch(array, value, start, index - 1, count);
    }
  };

  //TODO Just switch search implementation
  search = this.linearSearch;
  //search = binarySearch;

  renderResponse = () => {
    if (this.state.responseReady) {
      return <h3>{this.state.resMsg}</h3>;
    }
    return '';
  };

  render() {
    return (
      <div className="App">
        <h1>DSA Searching</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label className="form-item" htmlFor="searchBox">
            Search For:
          </label>
          <input
            className="form-item"
            type="text"
            id="searchBox"
            name="searchBox"
          />
          <input className="form-item" type="submit" />
        </form>
        <div className="response">
          {/* 
        <h3>Dataset:</h3>
        {data}
        */}
          {this.renderResponse()}
        </div>
      </div>
    );
  }
}

export default App;
