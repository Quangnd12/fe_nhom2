// Chakra imports
import { Text, useColorModeValue } from "@chakra-ui/react";
// Assets
import Project1 from "../../../../assets/img/profile/denvau1.jpg";
import Project2 from "../../../../assets/img/profile/denvau2.jpg";
import Project3 from "../../../../assets/img/profile/denvau3.jpg";
// Custom components
import Card from "../../../../components/card/Card.js";
import React from "react";
import Project from "./Project";

export default function Projects(props) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("black.900", "white");
  const textColorSecondary = "gray.500";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        All albums
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Tất cả album của đen vâu và các bài hát được lưu bên dưới.
      </Text>
      <Project
        boxShadow={cardShadow}
        mb='20px'
        image={Project1}
        ranking='1'
        link='#'
        title='Trời hôm nay nhiều mây cực!'
      />
      <Project
        boxShadow={cardShadow}
        mb='20px'
        image={Project2}
        ranking='2'
        link='#'
        title='KOBUKOVU'
      />
      <Project
        boxShadow={cardShadow}
        image={Project3}
        ranking='3'
        link='#'
        title='Lối Nhỏ'
      />
    </Card>
  );
}
