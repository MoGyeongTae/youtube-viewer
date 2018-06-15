
class LeftBox extends React.Component {
  constructor(props) {
    super(props);

    this.frame = React.createRef();

    this.state = {
      currentPlayIdx : 0,
      playing:false
    }
  }

  stopVideo = () => {
    this.frame.current.contentWindow.postMessage('{"event" : "command", "func" : "pauseVideo", "args" : ""}',"*")
  }

  startVideo = () => {
    this.frame.current.contentWindow.postMessage('{"event" : "command", "func" : "playVideo", "args" : ""}', "*")
  }

  skipVideo = () => {

  }

  componentDidUpdate() {
     this.chkVideo();
     console.log(this.frame.current.contentWindow.postMessage('{"event" : "command", "func" : "getPlayerState", "args" : ""}', "*"))
  }

  chkVideo = () => {
    if(!this.props.musicList[0]) {
      return;
    }

    if(this.props.musicList[0] && !this.state.playing) {
      this.frame.current.src = `https://www.youtube.com/embed/${this.props.musicList[0].id.videoId}?autoplay=1&version=3&enablejsapi=1&playerapiid=ytplayer`
      this.setState({
        playing : true
      })
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="leftBox">
        <div className="title">Youtube Viewer</div>
        <div className="musicListBox">
          <div className="musicList">
            <table>
              <thead>
                <tr>
                  <th width="20%" height="70">#</th>
                  <th width="80%" height="70">Title</th>
                </tr>
              </thead>
              <tbody>
              {
                this.props.musicList.map(
                  (item,idx) => (
                    <tr key={idx} className={this.state.currentPlayIdx == idx ? "currentPlaying" : ""}>
                      <td width="20%" height="50">{idx + 1}</td>
                      <td width="80%" height="50">{item.snippet.title}</td>
                    </tr>
                  )
                )
              }
              </tbody>
            </table>
          </div>
        </div>
        <div className="frameBox">
          <iframe frameBorder="0" src="" ref={this.frame}>
          </iframe>
        </div>
        <div className="buttonBox">
          <button onClick={this.stopVideo}>||</button>
          <button onClick={this.startVideo}>▶</button>
          <button onClick={this.skipVideo}>Skip</button>
        </div>
      </div>
    )
  }
}

class RightBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list : [],
      key : ""
    }
  }

  searchChange = e => {
    this.setState({
      key : e.target.value
    })
  }

  search = () => {
    axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyBKb3i3heKckuSAHP32TmeBqSRczXukJQo&part=snippet&q=${this.state.key}`)
    .then(data => {
      this.setState({
        list : data.data.items
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  musicAdd = idx => {
    var data = this.state.list[idx];
    this.props.musicAdd(data);
  }

  render() {
    return (
      <div className="rightBox">
        <div className="searchBox">
          <input type="text" onChange={this.searchChange} value={this.state.key}/>
          <button onClick={this.search}>검색</button>
        </div>
        <div className="listBox">
          {
            this.state.list.map(
              (item, idx) => (
                <div className="searchList" key={idx}>
                  <div className="searchListImg">
                    <img src={item.snippet.thumbnails.medium.url}/>
                  </div>
                  <div className="searchTitle">
                    <p>{item.snippet.title}</p>
                  </div>
                  <div className="musicAdd">
                    <button onClick={() => this.musicAdd(idx)}>추가</button>
                  </div>
                </div>
              )
            )
          }
        </div>
      </div>
    )
  }
}

// Main Component
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMusicList : []
    }
  }

  musicAdd = data => {
    this.setState(prevState => ({
      currentMusicList : [...prevState.currentMusicList, data]
    }))
  }

  render() {
    return (
      <div className="wrap">
        <LeftBox musicList={this.state.currentMusicList}/>
        <RightBox musicAdd={this.musicAdd}/>
      </div>
    )
  }
}

window.onload = () => {
  const root = document.getElementById("root")
  ReactDOM.render(<App />, root);
}
