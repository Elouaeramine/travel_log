import * as React from 'react';
import { useState , useEffect} from 'react';
import ReactMapGL ,{ Marker } from 'react-map-gl';

import { listLogEntries } from './API';


const App = () =>{

  const token = 'pk.eyJ1IjoiZWxvdWFlcmFtaW5lIiwiYSI6ImNraDhiNzlmbzB1MnYydm56Ynk4aDJjY2kifQ.xGzXUbNDHEKmI_s9juRUEA';
  const [logEntries , setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 5
  });

  useEffect(()=>{
    (async ()=> {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={token}
      mapStyle ='mapbox://styles/elouaeramine/ckh8ycua100w51aoadw6s7jbi'
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {logEntries.map( entry => {
        return(
         <Marker
          key = {entry._id}
          latitude={entry.latitude}
          longitude={entry.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >

         <div>
         <svg 
          className= 'marker'
          viewBox="0 0 24 24" 
          width= '24px'
          height= '24px'
          stroke="currentColor" 
          stroke-width="1.5"
          fill="none" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
        >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
         </svg>
         </div>
        </Marker>
      
      )})}
    </ReactMapGL>
  );
}

export default App; 
