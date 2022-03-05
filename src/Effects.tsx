import * as THREE from 'three';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { extend, useThree, useFrame, ReactThreeFiber } from '@react-three/fiber';
// import { mapRange } from 'canvas-sketch-util/math';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
// @ts-ignore
import { GlitchPass } from './post/Glitchpass';
// @ts-ignore
import { WaterPass } from './post/Waterpass';

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  WaterPass,
  UnrealBloomPass,
  FilmPass,
  GlitchPass,
});

declare global {
  namespace JSX {
    interface IntrinsicElements {
      unrealBloomPass: ReactThreeFiber.Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>
      waterPass: ReactThreeFiber.Object3DNode<WaterPass, typeof WaterPass>
      effectComposer: ReactThreeFiber.Object3DNode<EffectComposer, typeof EffectComposer>
      renderPass: ReactThreeFiber.Object3DNode<RenderPass, typeof RenderPass>
      filmPass: ReactThreeFiber.Object3DNode<FilmPass, typeof FilmPass>
    }
  }
}

export function Effects() {
  const composer = useRef<EffectComposer>(null);
  const bloomPass = useRef<UnrealBloomPass>(null);
  const {width, height, fps} = useVideoConfig();
  const frame = useCurrentFrame();

  const { scene, gl, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(width, height), []);

  useEffect(() => {
    if (!composer || !composer.current) return;
    composer.current.setSize(width, height)
  },[width, height])

  const bassRef = useRef<number>(0.2);
  const glitchFactor =  1;
  const distortFactor = 0.5;


  // useFrame(() => {
  //   if (!composer || !composer.current) return; 
  //   if (bloomPass.current && bassRef.current) {
  //     bloomPass.current.strength = interpolate(bassRef.current, [0,0.25], [1.75,2.5], {extrapolateRight: "clamp", extrapolateLeft: "clamp"});
  //   }

  //   composer.current.render();
  // }, 1);

  useEffect(() => {
    if (!composer || !composer.current) return;
    if (bloomPass.current && bassRef.current) {
    bloomPass.current.strength = interpolate(bassRef.current, [0,0.25], [1.75,2.5], {extrapolateRight: "clamp", extrapolateLeft: "clamp"});
    }

    composer.current.render();
  }, [frame]);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <waterPass attachArray="passes" factor={distortFactor} />
      <unrealBloomPass
        ref={bloomPass}
        attachArray="passes"
        args={[aspect, 2, 1, 0]}
      />
      {/* <filmPass attachArray="passes" args={[0.05, 2, 1, 0]} /> */}
      
      {/* <glitchPass glitchPass attachArray="passes" factor={glitchFactor} /> */}
    </effectComposer>
  );
}