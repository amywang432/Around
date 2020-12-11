import React, {Component} from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import blueMarkerUrl from '../assets2/image/blue-marker.svg';

class AroundMarker extends Component {
    state = {
        isOpen: false,
    }

    render() {
        const { user, message, url, location,type } = this.props.post;
        const { lat, lon } = location;
        const isImagePost = type === 'image';
        const customIcon = isImagePost ? undefined : {
            url: blueMarkerUrl,
            scaledSize: new window.google.maps.Size(26, 41),
        };

        return (
            <Marker
                position={{ lat, lng: lon }}
                onClick={isImagePost ? undefined: this.handleToggle}
                icon={customIcon}
                onMouseOver={isImagePost ? this.handleToggle : undefined}
                onMouseOut={isImagePost ? this.handleToggle : undefined}
            >
                {this.state.isOpen ? (
                    <InfoWindow>
                        <div>
                            {isImagePost
                                ? <img src={url} alt={message} className="around-marker-image"/>
                                : <video src={url} controls className="around-marker-video"/>}
                            <p>{`${user}: ${message}`}</p>
                        </div>
                    </InfoWindow>
                ) : null}


            </Marker>
        );
    }
    handleToggle = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    }

}

export default AroundMarker;