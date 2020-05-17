import * as React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { findFalconeResults, publishResult } from '../Actions/gameActions';
import { loadPlanets } from '../Actions/planetActions';
import { loadVehicles } from '../Actions/vehicleActions';
import '../App.css'
class FindFalcon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      btnEnable: false,
      planets:[],
      vehicles:[],
      vehicleAllocated:{},
      vehicleUnAllocated:{}
    };
    for (let i = 1; i < 5; i++) {
      this.state.destinations.push({name: `Destination${i}`, 
            planet: null,
            vehicle: {}
            });
        }
  }

  componentDidMount=()=>{
    this.props.loadPlanets();
    this.props.loadVehicles();
  }

  componentDidUpdate = (prevProps,prevState) =>{
    let { planets,vehicles } = this.props;
    let {destinations} = this.state;
    if(this.state.planets.length !== planets.length || this.state.vehicles.length !== vehicles.length) {
      let planetObj = {};
      let vehicleObj = {};

      planets.forEach((elem,idx) => {
      planetObj[elem.distance]={
       value:elem.distance,
       label:`${elem.name} - ${elem.distance}`
     }})

      vehicles.forEach((e,idx) => {
        vehicleObj[e.name]={
          value:e.name,
          label:e.name,
          total_no:e.total_no,
          max_distance:e.max_distance,
          speed:e.speed
      }})

    vehicles = vehicles.map(e=>({
       value:e.name,
       label:e.name,
       total_no:e.total_no,
       max_distance:e.max_distance,
       speed:e.speed
     }))

      let notSelectedPlanets = planetObj;

      this.setState({
        destinations,
        planets,
        vehicles,
        planetObj,
        vehicleObj,
        notSelectedPlanets
      })
    }
  }

  onChange=(evt,idx)=> {
    const newDestinations = [...this.state.destinations];
    const { vehicleObj, vehicleUnAllocated } = this.state;

    let plt = this.props.planets.filter((x) => x.distance === +evt.value); 
    newDestinations[idx].planet =  plt[0];
    
    const y = Object.values(vehicleObj).filter(e=>e.max_distance >= +evt.value && vehicleUnAllocated[e.value]!==0).map(e=>
    {
      return{
      value : e.value,
      label : e.value,
      total_no : vehicleUnAllocated[e.value]? vehicleUnAllocated[e.value] : e.total_no,
      max_distance : e.max_distance,
      speed : e.speed
    }}
    );
    newDestinations[idx].vehiclesReachable =  y;
    newDestinations[idx].vehicle = {};


    let keys1 = newDestinations.filter(e=> e.planet !== null ).map(e=> e.planet.distance.toString());
    let keys2 = Object.keys(this.state.notSelectedPlanets);
    let y2K = keys2.filter(e=> !keys1.includes(e))

    let obj = y2K.map(e=> this.state.notSelectedPlanets[e])
    let enableButton = newDestinations.filter(e=>Object.keys(e.vehicle).length===0)

    this.setState({
        planetObj:obj,
        destinations: newDestinations,
        btnEnable:enableButton.length === 0 ? true : false
      });
  }

  onRadioChange=(e,index)=>{
    let {vehicleObj} = this.state;
       const newDestinations = [...this.state.destinations];
      let val = e.target.value;

      let plt =  this.props.vehicles.filter((x) => (x.name === val));
      newDestinations[index].vehicle =  plt[0];

      let vehicleNumObj = {};
      newDestinations.forEach(e=>{

        if(Object.keys(e.vehicle).length > 0) {
            if(!vehicleNumObj[e.vehicle.name]) {
                vehicleNumObj[e.vehicle.name] = 1
                return;
            }
            if(vehicleNumObj[e.vehicle.name]) {
                vehicleNumObj[e.vehicle.name] = vehicleNumObj[e.vehicle.name]+1
                return;
            }
        }
        if(Object.keys(e.vehicle).length === 0) {
          if(vehicleNumObj[e.vehicle.name]) {
                vehicleNumObj[e.vehicle.name] = vehicleNumObj[e.vehicle.name]-1;
                return;
            }
        }
      })

      let vehicleUnAllocated = {};
      Object.keys(vehicleObj).map( key=> !vehicleNumObj[key] ? vehicleUnAllocated[key]=vehicleObj[key].total_no : vehicleUnAllocated[key] = vehicleObj[key].total_no - vehicleNumObj[key] )
      let enableButton = newDestinations.filter(e=>Object.keys(e.vehicle).length===0)

      this.setState({
        destinations: newDestinations,
        vehicleAllocated:vehicleNumObj,
        vehicleUnAllocated,
        btnEnable:enableButton.length === 0 ? true : false
      })

  }

  submitResults=()=> {
    let req = {token: '', planet_names: [], vehicle_names: []};
    this.state.destinations.forEach((x) => {
      req.planet_names.push(x.planet.name);
      req.vehicle_names.push(x.vehicle.name);
    });

    this.props.findFalconeResults(req).then(data=>{
      this.props.publishResult(data);
      this.props.history.push('/result')
    })
  }

  render() {
    const { vehicleObj, destinations , planetObj, btnEnable } = this.state;
    let cond = planetObj && vehicleObj && Object.keys(planetObj).length>0 && Object.keys(vehicleObj).length >0;
    let distance = destinations && destinations
    .filter(e=>e.planet!==null)
    .reduce((accumulator, currentValue) => {
    return accumulator + currentValue.planet.distance
      }, 0)

    let speed = destinations && destinations
    .filter(e=>Object.keys(e.vehicle).length !== 0 )
    .reduce((accumulator, currentValue) => {
    return accumulator + currentValue.vehicle.speed
      }, 0)
    return (
      cond ? <div className="App">
        <h4>Select planets you want to search in: 
        </h4>
        <h2>Total Distance : {distance}</h2>
        <h2>Total Speed : {speed}</h2>
        <h2>Average Speed : {isFinite((distance/speed).toFixed()) ? (distance/speed).toFixed():0}</h2>
        
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
        {destinations && destinations
          .map((item, idx) => {
            return <div style={{width:'25%',margin:'0.5rem'}}><Select
                isDisabled={ idx === 0 ? false : destinations[idx-1].planet === null || Object.keys(destinations[idx-1].vehicle).length === 0}
                onChange={(e)=>this.onChange(e,idx)}
                options={Object.values(planetObj)}
              />
            {item.planet ? <div style={{display:'grid',textAlign:'left'}} onChange={(e)=>this.onRadioChange(e,idx)}>
            {item.vehiclesReachable.map(opt=>(
              <label key={opt.label}>
              <input
                type="radio"
                value={opt.label}
                checked={this.state.destinations[idx]['vehicle'].name === opt.label} 
                 />{opt.label} ({opt.max_distance}) (Speed = {opt.speed}) (Left = {opt.total_no})
            </label>
            ))}
            </div> : null}
            </div>
          })}
          </div>
          <button className='button' onClick={this.submitResults} disabled={!btnEnable}> 
          Find Falcon
          </button>
      </    div>:null
    );
  }
}

function mapStateToProps(state, ownProps ) {
  return state ;
}

function mapDispatchToProps(dispatch) {
  return {
    findFalconeResults: (data) => dispatch(findFalconeResults(data)),
    loadPlanets: (data) => dispatch(loadPlanets(data)),
    loadVehicles: (data) => dispatch(loadVehicles(data)),
    publishResult: (data) => dispatch(publishResult(data))
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(FindFalcon);