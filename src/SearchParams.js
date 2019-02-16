import React from "react";
import pf, {ANIMALS} from "petfinder-client";

const petfinder = pf({
	key: process.env.API_KEY,
	secret: process.env.API_SECRET
});

class SearchParams extends React.Component {
	state = {
		location: "Albuquerque, NM",
		animal: "",
		breed: "",
		breeds: []
	};

	// handles input change event - data coming in from search field
	handleLocationChange = event => {
		this.setState({
			location: event.target.value
		})
	};

	// def use arrow fns w/ event handling! For optmization! (bind is too expensive!)
	handleAnimalChange = event => {
		this.setState({
			animal: event.target.value,
			breed: ""
		}, this.getBreeds);
	};

	handleBreedChange = event => {
		this.setState({
			breed: event.target.value
		});
	};

	getBreeds() {
		if(this.state.animal) {
			petfinder.breed.list({animal: this.state.animal})
				.then(data => {
					if(
						data.petfinder &&
						data.petfinder.breeds &&
						Array.isArray(data.petfinder.breeds.breed)
					) {
						this.setState({
							breeds: data.petfinder.breeds.breed
						})
					} else {
						this.setState({breeds: []});
					}
				})
		} else {
			this.setState({breeds: []});
		}
	}

	render() {
		return (
			<div className="search-params">
				<label htmlFor="location">
					Location
					<input
						onChange={this.handleLocationChange}
						id="location"
						value={this.state.location}
						placeholder="enter a location..."
					/>
				</label>
				<label htmlFor="animal">
					Animal
					<select
						id="animal"
						value={this.state.animal}
						onChange={this.handleAnimalChange}
						onBlur={this.handleAnimalChange}
					>
						<option value="">All Animals</option>

						{
							ANIMALS.map(animal => (
								<option key={animal} value={animal}>{animal}</option>
							))
						}
					</select>
				</label>
				<label htmlFor="breed">
					Breed
					<select
						id="breed"
						value={this.state.breed}
						onChange={this.handleBreedChange}
						onBlur={this.handleBreedChange}
						disabled={this.state.breeds.length === 0}
					>
						<option value="">All Breeds</option>

						{this.state.breeds.map(breed => (
							<option key={breed} value={breed}>{breed}</option>
						))}
					</select>
				</label>
				<button>Submit</button>
			</div>
		);
	}
}

export default SearchParams;