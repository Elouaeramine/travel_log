import * as React from 'react';
import { useState , useEffect} from 'react';
import ReactMapGL from 'react-map-gl';

import { listLogEntries } from './API';


const App = () =>{

  const token = 'pk.eyJ1IjoiZWxvdWFlcmFtaW5lIiwiYSI6ImNraDhiNzlmbzB1MnYydm56Ynk4aDJjY2kifQ.xGzXUbNDHEKmI_s9juRUEA';

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 5
  });

  useEffect()

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={token}
      mapStyle ='mapbox://styles/elouaeramine/ckh8ycua100w51aoadw6s7jbi'
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}

export default App; 
