const { exec } = require('child_process');

function getConnectedDevices(callback) {
  exec('adb devices', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar o comando: ${error}`);
      return;
    }

    const devices = stdout.split('\n').slice(1).map(line => {
      const [device, state] = line.split('\t');
      return { id: device, state };
    });

    const connectedDevices = devices.filter(device => device.state === 'device');

    Promise.all(connectedDevices.map(device => getDeviceInfo(device)))
      .then(deviceInfo => {
        callback(deviceInfo.filter(info => info !== null));
      })
      .catch(err => {
        console.error('Erro ao obter informações do dispositivo:', err);
        callback([]);
      });
  });
}

function getDeviceInfo(device) {
  return new Promise((resolve, reject) => {
    exec(`adb -s ${device.id} shell getprop ro.product.brand`, (error, stdout, stderr) => {
      if (error) {
        // Se houver um erro ao obter informações do dispositivo, considera-se que o dispositivo foi desconectado
        resolve(null);
      } else {
        const brand = stdout.trim();
        exec(`adb -s ${device.id} shell getprop ro.product.model`, (error, stdout, stderr) => {
          if (error) {
            // Se houver um erro ao obter informações do dispositivo, considera-se que o dispositivo foi desconectado
            resolve(null);
          } else {
            const model = stdout.trim();
            resolve({ ...device, brand, model });
          }
        });
      }
    });
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: null,
      loading: true
    };
  }

  componentDidMount() {
    this.getDevicesInterval = setInterval(() => {
      getConnectedDevices(devices => {
        this.setState({ devices, loading: false });
      });
    }, 1000); // Consulta a cada 5 segundos
  }

  componentWillUnmount() {
    clearInterval(this.getDevicesInterval);
  }

  render() {
    const { devices, loading } = this.state;

    return (
      <div>
        {loading ? <Loading /> : null}
        {devices ? <Device devices={devices} /> : null}
        {!loading && !devices && <Loading />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
