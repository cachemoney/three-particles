import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { lerp, mapRange } from 'canvas-sketch-util/math';
import {Mesh, ShaderMaterial, Material} from 'three';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';

import useStore  from './store';
// import {noise1D} from './util';
import './SilkyMaterial';

//http://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/

export const Planet: React.FC<{
  distortionScale: number
}> = ({ distortionScale }) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const Random = useStore((state) => state.random);
  const planet = useRef<Mesh>();
  const { size } = useThree();

  const distortFactor = 1;

  const melodyRef = useRef<number>(0.2);


  useEffect(() => {
    const elapsedTime = frame/fps;
    if (planet.current) {
      planet.current.material.uniforms.u_resolution.value = [
        width,
        height,
      ];
      planet.current.material.uniforms.u_music.value =
        distortionScale * (Math.sin(elapsedTime)/20);
      // distortionScale * melodyRef.current;

      planet.current.material.uniforms.u_time.value = elapsedTime;
      planet.current.material.uniforms.u_distort.value = distortFactor;

      const off = Random.noise1D(elapsedTime, 0.25);
      // const off = noise1D(elapsedTime, 0.25, 1, 1)

      // const tOff = mapRange(off, -1, 1, 0, 1);
      const tOff = interpolate(off, [-1, 1], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
      planet.current.rotation.x = lerp(0.1, 0.8, tOff);
      planet.current.rotation.y = lerp(0.4, 1.2, tOff);
      planet.current.rotation.z = lerp(0.8, 1.6, tOff);
    }
  }, [frame]);

  return (
    <mesh ref={planet} scale={[10, 10, 10]}>
      <icosahedronBufferGeometry args={[1, 60]} />
      <silkyMaterial />
    </mesh>
  );
}