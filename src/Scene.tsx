import {AbsoluteFill, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';

import {Dust} from './Dust';
import {Planet} from './Planet';
import { Effects } from './Effects';

export const SpaceDust = () => {
	const {width, height} = useVideoConfig();
	return (
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			<ThreeCanvas
				width={width}
				height={height}
				camera={{fov: 100, position: [0, 0, 30]}}
			>
				<Planet
          distortionScale={2}
        />
				<Dust />
				<Effects />
			</ThreeCanvas>
		</AbsoluteFill>
	);
};
