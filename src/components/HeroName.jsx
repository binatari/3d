import { Text3D } from "@react-three/drei";
import React from "react";

const HeroName = () => {
  return (
    <Text3D font={fontUrl} {...textOptions}>
      Hello world!
      <meshNormalMaterial />
    </Text3D>
  );
};

export default HeroName;
