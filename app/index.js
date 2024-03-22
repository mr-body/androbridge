class App extends React.Component {
  render() {
    return (
      <div>
        <Loading />
        <Device />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))