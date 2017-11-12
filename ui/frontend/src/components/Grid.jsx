import React from "react";
import { Flex, Box } from "grid-styled";

export const Row = props => <Flex {...props} mx={-3} />;
export const Column = props => <Box {...props} px={3} flex="1 1 auto" />;
