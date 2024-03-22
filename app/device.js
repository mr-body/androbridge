const { ipcRenderer } = require('electron');

class Device extends React.Component {
	render() {
		return (
			<div className="device">
				<section className="display" onClick={() => btnClick()} >
					<div className="touch">
						<h1>SANSUNG</h1>
						<h3>HSUAS61719</h3>
					</div>
				</section>
			</div>
		)
	}
}

function btnClick()
{
    ipcRenderer.send('button-click', 'textInput');
}