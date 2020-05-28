import { LitElement, html, css } from 'lit-element/';
import selectors from "../store/selectors";
import connect from "../store/connect";
import actions from "../store/actions";
import styles from "../styles/components/test.scss";

class Test extends LitElement {
	static get styles() {
		return css([styles]);
	}

	static get properties(){
		return {
			init: {attribute: false},
		}
	}

	constructor() {
		super();
	}

	handleClick() {
		this.initApp();
	}

  render() {
		return html`
			<p class="app-intro">
				This is a test, ${this.init}
			</p>
			<button @click=${this.handleClick}>Click me</button>
		`;
	}
}

const mapStateToProps = state => {
	return {
		init: selectors.getAppInit(state)
	}
}

const mapDispatchToEvents = dispatch => {
	return {
		initApp: () => dispatch(actions.initApp())
	}
}


export default () => customElements.define('c-test', connect(mapStateToProps, mapDispatchToEvents)(Test));