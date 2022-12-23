import React from "react";
import {useState, useEffect} from "react";
import { Box, Heading, SimpleGrid, Text, Image, Stack, HStack, VStack, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function Detail() {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const DetailPage = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
        const data = await response.json();
        setDetail(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    DetailPage();
  }, [id]);
   const setCard =detail?.data[0].card_sets.map((sets)=>{
    return(
      <Box borderWidth='1px' borderRadius='lg'>
        <Text fontSize='sm'>Name: {sets.set_name}</Text>
        <Text fontSize='sm'>Code: {sets.set_code}</Text>
        <Text fontSize='sm'>Rarity: {sets.set_rarity}</Text>
        <Text fontSize='sm'>Price: {sets.set_price}</Text>
      </Box>
    )
  })
  return (
    <div>
      {loading?<Heading as='h1'>Loading...</Heading>:
    <Stack>
      <Link to='/'>
        <Button>Back</Button>
      </Link>
      <Box >
        <Stack direction='row'>
          <Image w='15%' src={detail?.data[0].card_images[0].image_url}/>
          <Stack>
            <Heading size='md'>{detail?.data[0].name}</Heading>
            <Text>Level: {detail?.data[0].level}</Text>
            <Text>{detail?.data[0].attribute}</Text>
            <Text>ATK/{detail?.data[0].atk} DEF/{detail?.data[0].def}</Text>
            <Text>[ {detail?.data[0].type} / {detail?.data[0].race} ]</Text>
            <Text>{detail?.data[0].desc}</Text>
          </Stack>
        </Stack>
          <VStack>
            <Heading size='lg'>Card Set</Heading>
              <SimpleGrid columns={5} >
                {setCard}
              </SimpleGrid>
        </VStack>
      </Box>
    </Stack>
      }
    </div>
  ) // TODO: replace this
}

export default Detail;
// export default Detail;