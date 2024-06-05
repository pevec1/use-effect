/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './App.css'
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";


function Listing({list, state, onClick}) {
  console.log(list)
  return (
    <Box sx={{ border: 1, width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
      <List>
      {[...list].map(item => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => onClick(state, item)}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
     ))}
       </List>
</nav>
     </Box>
  )
}

function Details({state}) {
  console.log(state)
  return (
    <Box sx={{ border: 1, width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
      <List>
      <img src={state.avatar+"?" + Math.random()} />
      </List>
      <List><h1>{state.name}</h1></List>
      <List><p>City: {state?.details?.city}</p></List>
      <List><p>Company: {state?.details?.company}</p></List>
      <List><p>Position: {state?.details?.position}</p></List>
      </nav>
     </Box>

  )
}
function App() {
  const [state, setState] = useState(0);
  const [list, setList] = useState([]);

  function loadData(state, item) {
    console.log(state, item)
    if (item===0||item===undefined) {
    setTimeout(() => {
      fetch(
        "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setList(data);
        });
    }, 100);
  } else if(item.id!==state.id) {
        fetch(
      "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/" +
        String(item.id) +
        ".json"
    )
      .then((response) => response.json())
      .then((data) => setState(data))
  } else {
    setState(state) 
  }
  }

  useEffect(loadData, []); // componentDidMount
  console.log(state)
   return (
    <div className="wrapper">
      <div className="list">
        <Listing onClick={(state, item) => loadData(state, item)} list={list} state={state} />
      </div>
      <div className="description">
        {(state!==0)? (<Details state={state} />) : (<p>Loading...</p>) }
      </div>
    </div>
  );
}

export default App
