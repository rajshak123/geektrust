import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { resetGame } from '../Actions/gameActions';
import { AppState } from '../Reducers/initialState';
import '../App.css'


class Result extends React.Component {

    render() {
        const { result } = this.props;
        return ( 
            <div>
                {result.status === 'success'
                ? <div>
                     <h4>Success! Congratulations on Finding Falcone. King Shan is mighty pleased</h4>
                     {/* <div> Time taken: {state.time_taken}</div> */}
                     <div> Planet: {result.planet_name} </div>
                </div>
                : <div> <h4> Better luck next time! </h4></div>  }
                <button className='button' onClick={this.props.resetGame}><Link to="/">Start Again</Link></button>
            </div>
        ); 
    }
}

function mapStateToProps(state: AppState, ownProps: {} ) {
   return state ;
}

function mapDispatchToProps(dispatch) {
   return {
    resetGame: () => dispatch(resetGame())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);