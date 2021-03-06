import React from "react";
import pf, { PetResponse, PetMedia } from "petfinder-client";
import {navigate, RouteComponentProps} from "@reach/router";
import Carousel from "./Carousel";
import Modal from "./Modal";

//type refinement required for ts
if(!process.env.API_KEY || !process.env.API_SECRET) {
	throw new Error("no api keys!");
}
const petfinder = pf({
	key: process.env.API_KEY,
	secret: process.env.API_SECRET
});

class Details extends React.Component<RouteComponentProps<{id: string}>> {
	// we removed the constructor since babel will allow it
	public state = {
		loading: true,
		showModal: false
	};

	public toggleModal = () => {
		this.setState({ showModal: !this.state.showModal });
	};

	public componentDidMount() {
		if(!this.props.id) {
			return;
		}

		petfinder.pet
			.get({
				output: "full",
				id: this.props.id
			})
			.then(data => {
				if(!data.petfinder.pet) {
					navigate("/");
					return;
				}
				let breed;
				const pet = data.petfinder.pet;

				if (Array.isArray(pet.breeds.breed)) {
					breed = pet.breeds.breed.join(", ");
				} else {
					breed = pet.breeds.breed;
				}

				this.setState({
					name: pet.name,
					animal: pet.animal,
					location: `${pet.contact.city}, ${pet.contact.state}`,
					description: pet.description,
					media: pet.media,
					breed,
					loading: false
				});
			})
			.catch(err => {
				navigate("/");
			});
	}

	public render() {
		if (this.state.loading) {
			return <h1>Loading...</h1>;
		}

		const {
			name,
			animal,
			breed,
			location,
			description,
			media,
			showModal
		} = this.state;

		/* setup modal markup */
		let modal;
		if (showModal) {
			modal = (
				<Modal>
					<h1>Would you like to adopt {name}?</h1>
					<div className="buttons">
						<button onClick={this.toggleModal}>Yes</button>
						<button onClick={this.toggleModal}>Hell Yes! :D</button>
					</div>
				</Modal>
			);
		} else {
			modal = null;
		}

		/* this console logs the h1 element for ref example. see line 84 */
		console.log(this.myH1);

		return (
			<div className="details">
				<Carousel media={media} />
				<div>
					{/* see line 84 for an example of ref usage */}
					<h1 ref={el => (this.myH1 = el)}>{name}</h1>
					<h2>
						{animal} - {breed} - {location}
					</h2>
					<button onClick={this.toggleModal}>Adopt {name}</button>
					<p>{description}</p>
					{modal}
				</div>
			</div>
		);
	}
}

export default Details;
