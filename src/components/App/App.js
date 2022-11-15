import React, { Component } from 'react';
import './App.css';
import { getUrls, addUrlPost } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      urls: []
    }
  }

  addUrl = (newUrl) => {
    addUrlPost(newUrl)
    .then(getUrls()
    .then(newUrlUpdates => this.setState({ urls: newUrlUpdates.urls }) )
    )
  }

  componentDidMount() {
    getUrls().then(data => {this.setState({ 
      urls: data.urls
    })
  }
  )}

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl}/>
        </header>
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
