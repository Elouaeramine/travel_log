import * as React from 'react';
import { useState , useEffect} from 'react';
import ReactMapGL ,{ Marker , Popup } from 'react-map-gl';

import { listLogEntries } from './API';
import LogEntryForm from './logEntryForm';


const App = () =>{

  const token = 'pk.eyJ1IjoiZWxvdWFlcmFtaW5lIiwiYSI6ImNraDhiNzlmbzB1MnYydm56Ynk4aDJjY2kifQ.xGzXUbNDHEKmI_s9juRUEA';
  const [logEntries , setLogEntries] = useState([]);
  const [showPopup , setShowPopup] = useState({});
  const [addEntryLocation , setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 5
  });

  const getEntries = async ()=> {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  }

  useEffect(()=>{
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    // console.log(event);
    const [ longitude , latitude ] =event.lngLat;
    setAddEntryLocation ({
      latitude, 
      longitude,
    }) 
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={token}
      onDblClick={showAddMarkerPopup}
      mapStyle ='mapbox://styles/elouaeramine/ckh8ycua100w51aoadw6s7jbi'
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {logEntries.map( entry => {
        return(
        <>
         <Marker
          key = {entry._id}
          latitude={entry.latitude}
          longitude={entry.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >

         <div onClick={()=> {
          setShowPopup(
            {
              // ...showPopup,
              [entry._id] :true,
            }
          )
         }}>
          <img 
            className='marker'
            style={{
              width: `${4* viewport.zoom}px`,
              height : `${4* viewport.zoom}px`,
            }}
            src="https://i.imgur.com/y0G5YTX.png" 
            alt="marker"
          />
         </div>
        </Marker>
        {  showPopup[entry._id] ? (
        <Popup
          latitude={entry.latitude}
          longitude={entry.longitude}
          closeButton={true}
          closeOnClick={false}
          dynamicPosition={true}
          sortByDepth={true}
          onClose={() => setShowPopup(
            {
              // ...showPopup,
              // [entry._id] :false,
            }
          )}
          anchor="top" >
          <div className='popup'> 
            <h5>{entry.title}</h5>
            <p>{entry.comments}</p>
            <div className='popup-image'>
            {entry.image && <img src={entry.image} alt='image' style= {{height : '100px', width :'100px'}}/>}
            <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
            </div>
          </div>
         </Popup>
        ): null        
        }
        </>      
      )})}
      {
         addEntryLocation  ? (
         <>
         <Marker
         latitude={addEntryLocation.latitude}
         longitude={addEntryLocation.longitude}
         offsetLeft={-20}
         offsetTop={-10}
       >

        <div>
         <img 
           className='marker'
           style={{
             width: `${4* viewport.zoom}px`,
             height : `${4* viewport.zoom}px`,
           }}
           src="https://i.imgur.com/y0G5YTX.png" 
           alt="marker"
         />
        </div>
       </Marker>
        <Popup
          latitude={addEntryLocation.latitude}
          longitude={addEntryLocation.longitude}
          closeButton={true}
          closeOnClick={false}
          dynamicPosition={true}
          sortByDepth={true}
          onClose={() => setAddEntryLocation(null)}
          anchor="top" >
          <div className='popup'> 
            <h3>Add your log Entry !</h3>
            <LogEntryForm location={addEntryLocation} onClose={()=> {
              setAddEntryLocation(null);
              getEntries();
            }}/>
          </div> 
         </Popup>   
         </>):null
      }

    </ReactMapGL>
  );
}

export default App; 
