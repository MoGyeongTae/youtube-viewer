
class LeftBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="leftBox">

      </div>
    )
  }
}

class RightBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rightBox">

      </div>  
    )
  }
}

// Main Component
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrap">
        <LeftBox />
        <RightBox />
      </div>
    )
  }
}

window.onload = () => {
  const root = document.getElementById("root")
  ReactDOM.render(<App />, root);
}
