class Loading extends React.Component {
	render() {
		return (
			<div>
				<div className="NoDevices">
					<div className="header">
						<h1>Helena Scrcpy</h1>
					</div>
					<a className="BtnHelp">How can you activate USB Debugging</a>
					<img src="../images/topbanner.png" alt="Not connected"/>
					<h1>Devices not known, try adjusting the cable or verifying if USB Debugging is active</h1>
				</div>
			</div>
		)
	}
}