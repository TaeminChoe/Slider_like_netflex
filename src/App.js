import React from "react";
import "./App.css";
import Scroll from "./components/Slider";

function App() {
	return (
		<div className="App">
			<h1>Slider like netflex</h1>
			<Scroll show={4} />
		</div>
	);
}

export default App;
