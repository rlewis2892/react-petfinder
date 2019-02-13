//these components are akin to classes. This is a function component
import React from "react";

export const Pet = props => {
	// return React.createElement("div", {}, [
	// 	React.createElement("h1", {}, props.name),
	// 	React.createElement("h2", {}, props.animal),
	// 	React.createElement("h2", {}, props.breed)
	// ]);

	// JSX version of the above
	return (
		<div className="my-class">
			<h1>{ props.name }</h1>
			<h2>{ props.animal }</h2>
			<h2>{ props.breed }</h2>
		</div>
	);
};

export default Pet;