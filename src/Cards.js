import React from "react";
import { Box, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Card({ card }) {
  return (
    <Link to={`/card/${card.id}`} key={card.id}>
      <Box w='150px'className="yugioh-card">
        <Image src={card.card_images[0].image_url}/>
        <Heading as='h2'size='sm'>
        {card.name}
        </Heading>
      </Box>
    </Link>
  )
}

export default Card;