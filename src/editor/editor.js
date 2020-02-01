import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends Component {
	constructor() {
		super();
		this.state = {
			text: '',
			title: '',
			id: '',
		};
	}

	componentDidMount() {
		this.setState({
			text: this.props.selectedNote.body,
			title: this.props.selectedNote.title,
			id: this.props.selectedNote.id,
		});
	}

	componentDidUpdate() {
		if (this.props.selectedNote.id !== this.state.id) {
			this.setState({
				text: this.props.selectedNote.body,
				title: this.props.selectedNote.title,
				id: this.props.selectedNote.id,
			});
		}
	}

	updateBody = async value => {
		await this.setState({ text: value });
		this.update();
	};

	update = debounce(() => {
		this.props.updateNote(this.state.id, {
			title: this.state.title,
			text: this.state.text,
		});
	}, 1500);

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.editorContainer}>
				<ReactQuill value={this.state.text} onChange={this.updateBody} />
			</div>
		);
	}
}

export default withStyles(styles)(EditorComponent);
