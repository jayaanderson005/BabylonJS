import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
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

function getMaterial(scene: Scene) {
  const myMaterial = new StandardMaterial("material", scene);

  myMaterial.diffuseColor = new Color3(1, 0, 1);
  myMaterial.ambientColor = new Color3(5, 0, 0.5);
  myMaterial.emissiveColor = new Color3(4, 5, 0.85);
  myMaterial.specularColor = new Color3(7, 10, 4.66);
  myMaterial.ambientTexture = new Texture("assets/bloc.jpg", scene);
  return myMaterial;
}

function createHemisphericLight(scene: Scene) {
  const light: HemisphericLight = new HemisphericLight("light", new Vector3(1, 10, 0), scene);
  light.intensity = 0.3;
  light.diffuse = new Color3(1, 0, 0);
  light.specular = new Color3(0, 1, 0);
  light.groundColor = new Color3(0, 1, 0);
  return light;
}

function createPointLight(scene: Scene) {
  const light = new PointLight("light", new Vector3(-1, 1, 0), scene);
  light.position = new Vector3(5, 20, 10);
  light.intensity = 0.3;
  light.diffuse = new Color3(0.5, 1, 1);
  light.specular = new Color3(0.8, 1, 1);
  return light;
}

function createDirectionalLight(scene: Scene) {
  const lightD = new DirectionalLight("light", new Vector3(0.2, -1, 0.2), scene);
  lightD.position = new Vector3(20, 40, 20);
  lightD.intensity = 0.7;
  lightD.diffuse = new Color3(1, 0, 0);
  lightD.specular = new Color3(0, 1, 0);
  return lightD;
}

function createSpotLight(scene: Scene ){
    const light = new SpotLight("light", new Vector3(1, 5, -3), 
        new Vector3(0, -1, 0), Math.PI / 3, 20, scene);
    light.intensity = 0.5;
    light.diffuse = new Color3(1, 0, 0);
    light.specular = new Color3(0, 1, 0);
    return light;
}

function createShadows(light: DirectionalLight, sphere: Mesh, box: Mesh) {
  const shadower = new ShadowGenerator(1024, light);
  const sm: any = shadower.getShadowMap();
  sm.renderList.push(sphere, box);

  shadower.setDarkness(0.2);
  shadower.useBlurExponentialShadowMap = true;
  shadower.blurScale = 4;
  shadower.blurBoxOffset = 1;
  shadower.useKernelBlur = true;
  shadower.blurKernel = 64;
  shadower.bias = 0;
  return shadower;
}


function createSphere(scene: Scene) {
  let sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene,

  );

  sphere.position.x = 0;
  sphere.position.y = 1;
  return sphere;
}

function createBox(scene: Scene, myMaterial: any) {
  let box = MeshBuilder.CreateBox("box", { size: 1 }, scene);
  box.position.x = 3;
  box.position.y = 1;
  box.material = myMaterial;
  return box;
}

function createCylinder(scene: Scene) {
  const cylinder = MeshBuilder.CreateCylinder("cylinder", {}, scene);
  cylinder.position.x = 5;
  cylinder.position.y = 1;
  return cylinder;
}

function createCone(scene: Scene) {
  const cone = MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0, diameterBottom: 1, height: 2 }, scene);
  cone.position.x = 7;
  cone.position.y = 1;
  return cone;
}

function createTriangle(scene: Scene) {
  const triangle = MeshBuilder.CreateCylinder("cylinder", { diameterTop: 0, diameterBottom: 1, height: 2 }, scene);
  triangle.position.x = 5;
  triangle.position.y = 1;
  return triangle;
}


function createLight(scene: Scene) {
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;
  return light;
}



function createGround(scene: Scene) {
  let ground = MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    scene,
  );
  ground.receiveShadows = true;
  return ground;
}

function createArcRotateCamera(scene: Scene) {
  let camAlpha = -Math.PI / 2,
    camBeta = Math.PI / 2.5,
    camDist = 10,
    camTarget = new Vector3(0, 0, 0);
  let camera = new ArcRotateCamera(
    "camera1",
    camAlpha,
    camBeta,
    camDist,
    camTarget,
    scene,
  );
  camera.attachControl(true);
  return camera;
}

export default function createStartScene(engine: Engine) {
  interface SceneData {
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

  let that: SceneData = { scene: new Scene(engine) };
  that.scene.debugLayer.show();

  const mat1 = getMaterial(that.scene);
  createHemisphericLight(that.scene);
  createPointLight(that.scene);
  that.lightD = createDirectionalLight(that.scene);
 that.box = createBox(that.scene, mat1);
  createLight(that.scene);
  createSpotLight;
that.sphere = createSphere(that.scene);
  createCylinder(that.scene);
  createCone(that.scene);
  createTriangle(that.scene);
  createGround(that.scene);
  createArcRotateCamera(that.scene);
    createShadows(that.lightD, that.sphere, that.box);
  return that;
}
