"use client";
import getImagePath from "@/lib/getImagePath";
import { Series } from "@/typings";
import Image from "next/image";
import { Ramabhadra } from "next/font/google";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";

import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

const ramabhadra = Ramabhadra({ weight: "400", subsets: ["latin"] });

function TVCard({ series }: { series: Series }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  // console.log("series: ", series);

  return (
    <>
      <div
        onClick={onOpen}
        className="relative flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-[#1A1C29]/80 z-10" />
        <div className={ramabhadra.className}>
          <p className="absolute z-20 bottom-5 left-5 text-white text-[12px] md:text-[14px]">
            {series.original_name}
          </p>
        </div>
        <Image
          className="w-fit max-w-[210px] h-64 sm:max-w-[230px] sm:h-66 md:max-w-[280px] md:h-67 object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl rounded-sm"
          src={getImagePath(series.backdrop_path || series.poster_path)}
          // alt={series.title}
          alt="series poster"
          width={1920}
          height={1080}
          key={series.id}
        />
      </div>

      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "90%", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent bgGradient="linear(to-b, #010048, #090088 )">
          <CloseButton
            alignSelf="flex-end"
            position="relative"
            left={-3}
            top={2}
            onClick={onClose}
            mb={3}
            size="sm"
            color="brand.100"
            _hover={{ background: "blue", color: "white" }}
          />
          <Flex justifyContent="center" alignItems="center">
            <Card maxW={{ base: "90%", md: "md" }} bgGradient="linear(to-b, #010048, #090088 )">
              <CardBody>
                <Image
                  src={getImagePath(series.backdrop_path || series.poster_path)}
                  alt={series.title}
                  width={1920}
                  height={1080}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md" color="brand.100">
                    {series.original_name}
                  </Heading>
                  <Text color="brand.100">{series.overview}</Text>
                </Stack>
              </CardBody>
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button
                    color="brand.100"
                    bgGradient="linear(to-b, #B5B7BB, #CCCCCC)"
                    _hover={{ background: "blue", color: "white" }}
                  >
                    Watch Now
                  </Button>
                  <Button
                    color="brand.100"
                    bgGradient="linear(to-r, #FFCC00, #200461)"
                    _hover={{ background: "blue", color: "white" }}
                  >
                    Trailer
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TVCard;
