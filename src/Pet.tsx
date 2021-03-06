import React from "react";
import { Link } from "@reach/router";
import { PetPhoto, PetMedia } from "petfinder-client";

interface Props {
	name: string,
	animal: string,
	breed: string,
	media: PetMedia,
	location: string,
	id: string
}
class Pet extends React.Component<Props> {
	public render() {
		// destructuring here - pulling things out of the object. For clarity?
		const { name, animal, breed, media, location, id } = this.props;

		let photos: PetPhoto[] = [];
		if (media && media.photos && media.photos.photo) {
			photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
		}

		// handle void photos
		const hero = photos[0]
			? photos[0].value
			: "https://fillmurray.com/g/300/300";

		return (
			<Link to={`/details/${id}`} className="pet">
				<div className="image-container">
					<img src={hero} alt={name} />
				</div>
				<div className="info">
					<h1>{name}</h1>
					<h2>{`${animal} — ${breed} — ${location}`}</h2>
				</div>
			</Link>
		);
	}
}

export default Pet;
