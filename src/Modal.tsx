import React from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

class Modal extends React.Component {
	private el = document.createElement("div");

	public componentDidMount() {
		if(modalRoot) {
			modalRoot.appendChild(this.el);
		}
	}

	// if you don't do this you'll have memory leaks
	public componentWillUnmount() {
		if(modalRoot) {
			modalRoot.removeChild(this.el);
		}
	}

	public render() {
		return createPortal(this.props.children, this.el);
	}
}

export default Modal;
