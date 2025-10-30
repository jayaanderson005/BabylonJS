import {
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Mesh,
  PointLight,
  DirectionalLight,
  Light,
  SpotLight,
  ShadowGenerator,
  Camera,
  Engine,
  StandardMaterial,
  Color3,
  Texture,
} from "@babylonjs/core";

export interface SceneData {
    scene: Scene;
    box?: Mesh;
    light?: Light;
    sphere?: Mesh;
    cylinder?: Mesh;
    cone?: Mesh;
    triangle?: Mesh;
    ground?: Mesh;
    camera?: Camera;
    lightBulb?: PointLight,
    lightSpot?: SpotLight,
    lightD?: DirectionalLight,
    lightHemispheric?: HemisphericLight,
    shadowGenerator?: ShadowGenerator,
}
