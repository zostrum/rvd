import React from 'react';

const MovieForm = ({match, history}) => {
    return ( 
        <div>
            <h1>This is the movie ID {match.params.id}.</h1>
            <button className="btn btn-primary" onClick={() => history.push("/movies")}>Save</button>
        </div>
    );
}
 
export default MovieForm;
