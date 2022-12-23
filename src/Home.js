import React from "react";
import Card from "./Cards"
import { Center, Select, Grid, GridItem, Heading, SimpleGrid, Tr, Table, Td, Image, Stack } from "@chakra-ui/react";
import {useState, useEffect} from "react";

function Home() {
  const [datacard, setdatacard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorter, setsorter] = useState('name')
  const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4'

  const getdataCard = () => {
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      setdatacard(json.data);
      setLoading(false);
    })
  }
  useEffect(() => {
    getdataCard()
  }, []);
  
  const optionSorter = event =>{
    setsorter(event.target.value)
  }
  function sortData(type) {
    if(sorter==='name'){
      const sortingName = type.sort((a,b)=>a.name>b.name?1:-1)
      return sortingName
    }
    else if(sorter==='attack'){
      const sortingAttack = type.sort((a,b)=>a.atk>b.atk?1:-1)
      return sortingAttack
    }
    else if(sorter==='defence'){
      const sortingDefence = type.sort((a,b)=>a.def>b.def?1:-1)
      return sortingDefence
    }
  }
  const cardHomed = sortData(datacard).map((mycards)=>{
    return(
      <Card card={mycards}/>
    )
  })
  return (
    <Stack>
      {loading?<h1>Loading...</h1>:
      <Stack>
        <Select onChange={optionSorter} name="sort">
          <option value='name'>Name</option>
          <option value='attack'>Attack</option>
          <option value='defence'>Defence</option>
        </Select>
        <Center>
          <SimpleGrid columns={4}spacing={3}>
            {cardHomed}
          </SimpleGrid>
        </Center>
    </Stack>
    }
    </Stack>
  )
}

export default Home;