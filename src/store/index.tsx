import create, { GetState, SetState } from 'zustand'

import Random from 'canvas-sketch-util/random';

const randInst = Random.createRandom(1);

const useStore = create((set) => ({
random: randInst
}));

export default useStore;