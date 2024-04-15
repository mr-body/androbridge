const { ipcRenderer } = require('electron');

class Device extends React.Component {
  btnClick(textInput) {
    ipcRenderer.send('button-click', textInput);
  }

  render() {
    const { devices } = this.props;
    return (
      <div>
        <h2>Dispositivos Conectados:</h2>
        <ul>
          {devices.map((device, index) => (
            <li key={index} onClick={() => this.btnClick(device.id)}>
              <strong>Marca:</strong> {device.brand}, <strong>Modelo:</strong> {device.model}, <strong>ID:</strong> {device.id}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
