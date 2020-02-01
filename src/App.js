import React, { Component } from 'react';
import './App.css';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

const firebase = require('firebase');

class App extends Component {
	constructor() {
		super();
		this.state = {
			selectedNoteIndex: null,
			selectedNote: null,
			notes: null,
		};
	}

	componentDidMount() {
		firebase
			.firestore()
			.collection('notes')
			.onSnapshot(serverUpdate => {
				const notes = serverUpdate.docs.map(_doc => {
					const data = _doc.data();
					data['id'] = _doc.id;
					return data;
				});
				console.log(notes);
				this.setState({ notes });
			}); // whenever 'notes' is updated, fn in onSnapshot is called
	}

	selectNote = (note, index) => {
		this.setState({ selectedNoteIndex: index, selectedNote: note });
	};

	deleteNote = async note => {
		const noteIndex = this.state.notes.indexOf(note);
		await this.setState({
			notes: this.state.notes.filter(_note => _note !== note),
		});
		if (this.state.selectedNoteIndex === noteIndex) {
			this.setState({
				selectedNoteIndex: null,
				selectedNote: null,
			});
		} else {
			this.state.notes.length > 1
				? this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1)
				: this.setState({
						selectedNoteIndex: null,
						selectedNote: null,
				  });
		}

		firebase
			.firestore()
			.collection('notes')
			.doc(note.id)
			.delete();
	};

	newNote = async title => {
		const note = {
			title,
			body: '',
		};
		const newFromDB = await firebase
			.firestore()
			.collection('notes')
			.add({
				title: note.title,
				body: note.body,
				timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
			});
		const newId = newFromDB.id;
		await this.setState({ notes: [this.state.notes, note] });
		const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newId)[0]);
		this.setState({ selectNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
	};

	updateNote = (id, noteObj) => {
		firebase
			.firestore()
			.collection('notes')
			.doc(id)
			.update({
				title: noteObj.title,
				body: noteObj.text,
				timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
			});
		console.log(id, noteObj);
	};

	render() {
		return (
			<div className="app-container">
				<SidebarComponent
					selectNote={this.selectNote}
					deleteNote={this.deleteNote}
					newNote={this.newNote}
					selectedNoteIndex={this.state.selectedNoteIndex}
					notes={this.state.notes}
				/>
				{this.state.selectedNote ? (
					<EditorComponent
						updateNote={this.updateNote}
						selectedNote={this.state.selectedNote}
						selectedNoteIndex={this.state.selectedNoteIndex}
						notes={this.state.notes}
					/>
				) : null}
			</div>
		);
	}
}

export default App;
