declare module "MeshLine";
declare module "MeshLineMaterial";
declare module "MeshLineRaycast";
declare module "canvas-sketch-util/random";
declare module "canvas-sketch-util/math";
declare module "nice-color-palettes";
// declare module "three-stdlib";
declare module "glslify";
declare module "Glitchpass";
declare module "Waterpass";

declare module "*.glsl" {
	const value: string;
	export default value;
}

declare module "*.frag" {
	const value: string;
	export default value;
}

declare module "*.vert" {
	const value: string;
	export default value;
}