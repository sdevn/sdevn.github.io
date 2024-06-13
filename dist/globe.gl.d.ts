import { Object3D, Material, Vector3, Vector2, WebGLRendererParameters, Light, Scene, Camera, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';

type Accessor$1<In, Out> = Out | string | ((obj: In) => Out);
type ObjAccessor$1<T> = Accessor$1<object, T>;

type HexBinAccessor<T> = Accessor$1<{ points: object[], sumWeight: number, center: { lat: number, lng: number }}, T>;

interface GeoJsonGeometry {
  type: string;
  coordinates: number[];
}

interface TypeFace {}

type LabelOrientation = 'right' | 'top' | 'bottom';

interface Rotation {
  x?: number;
  y?: number;
  z?: number;
}

interface ConfigOptions$1 {
  waitForGlobeReady?: boolean;
  animateIn?: boolean;
}

declare class ThreeGlobeGeneric<ChainableInstance> extends Object3D {
  constructor(configOptions?: ConfigOptions$1);

  // Globe layer
  globeImageUrl(): string | null;
  globeImageUrl(url: string): ChainableInstance;
  bumpImageUrl(): string | null;
  bumpImageUrl(url: string): ChainableInstance;
  showGlobe(): boolean;
  showGlobe(show: boolean): ChainableInstance;
  showGraticules(): boolean;
  showGraticules(show: boolean): ChainableInstance;
  showAtmosphere(): boolean;
  showAtmosphere(show: boolean): ChainableInstance;
  atmosphereColor(): string;
  atmosphereColor(color: string): ChainableInstance;
  atmosphereAltitude(): number;
  atmosphereAltitude(alt: number): ChainableInstance;
  globeMaterial(): Material;
  globeMaterial(globeMaterial: Material): ChainableInstance;
  onGlobeReady(callback: (() => void)): ChainableInstance;

  // Points layer
  pointsData(): object[];
  pointsData(data: object[]): ChainableInstance;
  pointLat(): ObjAccessor$1<number>;
  pointLat(latitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  pointLng(): ObjAccessor$1<number>;
  pointLng(longitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  pointColor(): ObjAccessor$1<string>;
  pointColor(colorAccessor: ObjAccessor$1<string>): ChainableInstance;
  pointAltitude(): ObjAccessor$1<number>;
  pointAltitude(altitudeAccessor: ObjAccessor$1<number>): ChainableInstance;

  pointInitAltitude(): ObjAccessor$1<number>;
  pointInitAltitude(altitudeAccessor: ObjAccessor$1<number>): ChainableInstance;

  pointRadius(): ObjAccessor$1<number>;
  pointRadius(radiusAccessor: ObjAccessor$1<number>): ChainableInstance;
  pointResolution(): number;
  pointResolution(resolution: number): ChainableInstance;
  pointsMerge(): boolean;
  pointsMerge(merge: boolean): ChainableInstance;
  pointsTransitionDuration(): number;
  pointsTransitionDuration(durationMs: number): ChainableInstance;

  // Arcs layer
  arcsData(): object[];
  arcsData(data: object[]): ChainableInstance;
  arcStartLat(): ObjAccessor$1<number>;
  arcStartLat(latitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  arcEndLat(): ObjAccessor$1<number>;
  arcEndLat(latitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  arcStartLng(): ObjAccessor$1<number>;
  arcStartLng(longitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  arcEndLng(): ObjAccessor$1<number>;
  arcEndLng(longitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  arcColor(): ObjAccessor$1<string | string[] | ((t: number) => string)>;
  arcColor(colorsAccessor: ObjAccessor$1<string | string[] | ((t: number) => string)>): ChainableInstance;
  arcAltitude(): ObjAccessor$1<number | null>;
  arcAltitude(altitudeAccessor: ObjAccessor$1<number| null>): ChainableInstance;
  arcAltitudeAutoScale(): ObjAccessor$1<number>;
  arcAltitudeAutoScale(scaleAccessor: ObjAccessor$1<number>): ChainableInstance;
  arcStroke(): ObjAccessor$1<number | null>;
  arcStroke(strokeWidthAccessor: ObjAccessor$1<number | null>): ChainableInstance;
  arcCurveResolution(): number;
  arcCurveResolution(resolution: number): ChainableInstance;
  arcCircularResolution(): number;
  arcCircularResolution(resolution: number): ChainableInstance;
  arcDashLength(): ObjAccessor$1<number>;
  arcDashLength(dashLengthAccessor: ObjAccessor$1<number>): ChainableInstance;
  arcDashGap(): ObjAccessor$1<number>;
  arcDashGap(dashGapAccessor: ObjAccessor$1<number>): ChainableInstance;
  arcDashInitialGap(): ObjAccessor$1<number>;
  arcDashInitialGap(dashGapAccessor: ObjAccessor$1<number>): ChainableInstance;
  arcDashAnimateTime(): ObjAccessor$1<number>;
  arcDashAnimateTime(durationMsAccessor: ObjAccessor$1<number>): ChainableInstance;
  arcsTransitionDuration(): number;
  arcsTransitionDuration(durationMs: number): ChainableInstance;

  // Polygons layer
  polygonsData(): object[];
  polygonsData(data: object[]): ChainableInstance;
  polygonGeoJsonGeometry(): ObjAccessor$1<GeoJsonGeometry>;
  polygonGeoJsonGeometry(geometryAccessor: ObjAccessor$1<GeoJsonGeometry>): ChainableInstance;
  polygonCapColor(): ObjAccessor$1<string>;
  polygonCapColor(colorAccessor: ObjAccessor$1<string>): ChainableInstance;
  polygonCapMaterial(): ObjAccessor$1<Material>;
  polygonCapMaterial(materialAccessor: ObjAccessor$1<Material>): ChainableInstance;
  polygonSideColor(): ObjAccessor$1<string>;
  polygonSideColor(colorAccessor: ObjAccessor$1<string>): ChainableInstance;
  polygonSideMaterial(): ObjAccessor$1<Material>;
  polygonSideMaterial(materialAccessor: ObjAccessor$1<Material>): ChainableInstance;
  polygonStrokeColor(): ObjAccessor$1<string | boolean | null>;
  polygonStrokeColor(colorAccessor: ObjAccessor$1<string | boolean | null>): ChainableInstance;
  polygonAltitude(): ObjAccessor$1<number>;
  polygonAltitude(altitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  polygonCapCurvatureResolution(): ObjAccessor$1<number>;
  polygonCapCurvatureResolution(capCurvatureResolutionAccessor: ObjAccessor$1<number>): ChainableInstance;
  polygonsTransitionDuration(): number;
  polygonsTransitionDuration(durationMs: number): ChainableInstance;

  // Paths layer
  pathsData(): object[];
  pathsData(data: object[]): ChainableInstance;
  pathPoints(): ObjAccessor$1<any[]>;
  pathPoints(pointsAccessor: ObjAccessor$1<any[]>): ChainableInstance;
  pathPointLat(): Accessor$1<any, number>;
  pathPointLat(latitudeAccessor: Accessor$1<any, number>): ChainableInstance;
  pathPointLng(): Accessor$1<any, number>;
  pathPointLng(longitudeAccessor: Accessor$1<any, number>): ChainableInstance;
  pathPointAlt(): Accessor$1<any, number>;
  pathPointAlt(altitudeAccessor: Accessor$1<any, number>): ChainableInstance;
  pathResolution(): number;
  pathResolution(resolution: number): ChainableInstance;
  pathColor(): ObjAccessor$1<string | string[] | ((t: number) => string)>;
  pathColor(colorsAccessor: ObjAccessor$1<string | string[] | ((t: number) => string)>): ChainableInstance;
  pathStroke(): ObjAccessor$1<number | null>;
  pathStroke(widthAccessor: ObjAccessor$1<number | null>): ChainableInstance;
  pathDashLength(): ObjAccessor$1<number>;
  pathDashLength(dashLengthAccessor: ObjAccessor$1<number>): ChainableInstance;
  pathDashGap(): ObjAccessor$1<number>;
  pathDashGap(dashGapAccessor: ObjAccessor$1<number>): ChainableInstance;
  pathDashInitialGap(): ObjAccessor$1<number>;
  pathDashInitialGap(dashGapAccessor: ObjAccessor$1<number>): ChainableInstance;
  pathDashAnimateTime(): ObjAccessor$1<number>;
  pathDashAnimateTime(durationMsAccessor: ObjAccessor$1<number>): ChainableInstance;
  pathTransitionDuration(): number;
  pathTransitionDuration(durationMs: number): ChainableInstance;

  // Hex Bin layer
  hexBinPointsData(): object[];
  hexBinPointsData(data: object[]): ChainableInstance;
  hexBinPointLat(): ObjAccessor$1<number>;
  hexBinPointLat(latitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  hexBinPointLng(): ObjAccessor$1<number>;
  hexBinPointLng(longitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  hexBinPointWeight(): ObjAccessor$1<number>;
  hexBinPointWeight(weightAccessor: ObjAccessor$1<number>): ChainableInstance;
  hexBinResolution(): number;
  hexBinResolution(resolution: number): ChainableInstance;
  hexMargin(): HexBinAccessor<number>;
  hexMargin(margin: HexBinAccessor<number>): ChainableInstance;
  hexAltitude(): HexBinAccessor<number>;
  hexAltitude(altitude: HexBinAccessor<number>): ChainableInstance;
  hexTopCurvatureResolution(): number;
  hexTopCurvatureResolution(resolution: number): ChainableInstance;
  hexTopColor(): HexBinAccessor<string>;
  hexTopColor(colorAccessor: HexBinAccessor<string>): ChainableInstance;
  hexSideColor(): HexBinAccessor<string>;
  hexSideColor(colorAccessor: HexBinAccessor<string>): ChainableInstance;
  hexBinMerge(): boolean;
  hexBinMerge(merge: boolean): ChainableInstance;
  hexTransitionDuration(): number;
  hexTransitionDuration(durationMs: number): ChainableInstance;

  // Heatmaps layer
  heatmapsData(): object[];
  heatmapsData(data: object[]): ChainableInstance;
  heatmapPoints(): ObjAccessor$1<object[]>;
  heatmapPoints(pointsAccessor: ObjAccessor$1<object[]>): ChainableInstance;
  heatmapPointLat(): ObjAccessor$1<number>;
  heatmapPointLat(latitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  heatmapPointLng(): ObjAccessor$1<number>;
  heatmapPointLng(longitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  heatmapPointWeight(): ObjAccessor$1<number>;
  heatmapPointWeight(weightAccessor: ObjAccessor$1<number>): ChainableInstance;
  heatmapBandwidth(): ObjAccessor$1<number>;
  heatmapBandwidth(bandwidthAccessor: ObjAccessor$1<number>): ChainableInstance;
  heatmapColorFn(): ObjAccessor$1<(t: number) => string>;
  heatmapColorFn(colorFnAccessor: ObjAccessor$1<(t: number) => string>): ChainableInstance;
  heatmapColorSaturation(): ObjAccessor$1<number>;
  heatmapColorSaturation(saturationAccessor: ObjAccessor$1<number>): ChainableInstance;
  heatmapBaseAltitude(): ObjAccessor$1<number>;
  heatmapBaseAltitude(altitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  heatmapTopAltitude(): ObjAccessor$1<number>;
  heatmapTopAltitude(altitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  heatmapsTransitionDuration(): number;
  heatmapsTransitionDuration(durationMs: number): ChainableInstance;

  // Hexed Polygons layer
  hexPolygonsData(): object[];
  hexPolygonsData(data: object[]): ChainableInstance;
  hexPolygonGeoJsonGeometry(): ObjAccessor$1<GeoJsonGeometry>;
  hexPolygonGeoJsonGeometry(geometryAccessor: ObjAccessor$1<GeoJsonGeometry>): ChainableInstance;
  hexPolygonColor(): ObjAccessor$1<string>;
  hexPolygonColor(colorAccessor: ObjAccessor$1<string>): ChainableInstance;
  hexPolygonAltitude(): ObjAccessor$1<number>;
  hexPolygonAltitude(altitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  hexPolygonResolution(): ObjAccessor$1<number>;
  hexPolygonResolution(resolutionAccessor: ObjAccessor$1<number>): ChainableInstance;
  hexPolygonMargin(): ObjAccessor$1<number>;
  hexPolygonMargin(marginAccessor: ObjAccessor$1<number>): ChainableInstance;
  hexPolygonUseDots(): ObjAccessor$1<boolean>;
  hexPolygonUseDots(useDotsAccessor: ObjAccessor$1<boolean>): ChainableInstance;
  hexPolygonCurvatureResolution(): ObjAccessor$1<number>;
  hexPolygonCurvatureResolution(resolutionAccessor: ObjAccessor$1<number>): ChainableInstance;
  hexPolygonDotResolution(): ObjAccessor$1<number>;
  hexPolygonDotResolution(resolutionAccessor: ObjAccessor$1<number>): ChainableInstance;
  hexPolygonsTransitionDuration(): number;
  hexPolygonsTransitionDuration(durationMs: number): ChainableInstance;

  // Tiles layer
  tilesData(): object[];
  tilesData(data: object[]): ChainableInstance;
  tileLat(): ObjAccessor$1<number>;
  tileLat(latitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  tileLng(): ObjAccessor$1<number>;
  tileLng(longitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  tileAltitude(): ObjAccessor$1<number>;
  tileAltitude(altitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  tileWidth(): ObjAccessor$1<number>;
  tileWidth(widthAccessor: ObjAccessor$1<number>): ChainableInstance;
  tileHeight(): ObjAccessor$1<number>;
  tileHeight(heightAccessor: ObjAccessor$1<number>): ChainableInstance;
  tileUseGlobeProjection(): boolean;
  tileUseGlobeProjection(useGlobeProjection: boolean): ChainableInstance;
  tileMaterial(): ObjAccessor$1<Material>;
  tileMaterial(materialAccessor: ObjAccessor$1<Material>): ChainableInstance;
  tileCurvatureResolution(): ObjAccessor$1<number>;
  tileCurvatureResolution(curvatureResolutionAccessor: ObjAccessor$1<number>): ChainableInstance;
  tilesTransitionDuration(): number;
  tilesTransitionDuration(durationMs: number): ChainableInstance;

  // Labels layer
  labelsData(): object[];
  labelsData(data: object[]): ChainableInstance;
  labelLat(): ObjAccessor$1<number>;
  labelLat(latitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  labelLng(): ObjAccessor$1<number>;
  labelLng(longitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  labelText(): ObjAccessor$1<string>;
  labelText(textAccessor: ObjAccessor$1<string>): ChainableInstance;
  labelColor(): ObjAccessor$1<string>;
  labelColor(colorAccessor: ObjAccessor$1<string>): ChainableInstance;
  labelAltitude(): ObjAccessor$1<number>;
  labelAltitude(altitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  labelSize(): ObjAccessor$1<number>;
  labelSize(sizeAccessor: ObjAccessor$1<number>): ChainableInstance;
  labelTypeFace(): TypeFace;
  labelTypeFace(typeface: TypeFace): ChainableInstance;
  labelRotation(): ObjAccessor$1<number>;
  labelRotation(rotationAccessor: ObjAccessor$1<number>): ChainableInstance;
  labelResolution(): number;
  labelResolution(resolution: number): ChainableInstance;
  labelIncludeDot(): ObjAccessor$1<boolean>;
  labelIncludeDot(includeAccessor: ObjAccessor$1<boolean>): ChainableInstance;
  labelDotRadius(): ObjAccessor$1<number>;
  labelDotRadius(radiusAccessor: ObjAccessor$1<number>): ChainableInstance;
  labelDotOrientation(): ObjAccessor$1<LabelOrientation>;
  labelDotOrientation(orientationAccessor: ObjAccessor$1<LabelOrientation>): ChainableInstance;
  labelsTransitionDuration(): number;
  labelsTransitionDuration(durationMs: number): ChainableInstance;

  // Rings Layer
  ringsData(): object[];
  ringsData(data: object[]): ChainableInstance;
  ringLat(): ObjAccessor$1<number>;
  ringLat(latitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  ringLng(): ObjAccessor$1<number>;
  ringLng(longitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  ringAltitude(): ObjAccessor$1<number>;
  ringAltitude(altitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  ringColor(): ObjAccessor$1<string | string[] | ((t: number) => string)>;
  ringColor(colorAccessor: ObjAccessor$1<string | string[] | ((t: number) => string)>): ChainableInstance;
  ringResolution(): number;
  ringResolution(resolution: number): ChainableInstance;
  ringMaxRadius(): ObjAccessor$1<number>;
  ringMaxRadius(radiusAccessor: ObjAccessor$1<number>): ChainableInstance;
  ringPropagationSpeed(): ObjAccessor$1<number>;
  ringPropagationSpeed(speedAccessor: ObjAccessor$1<number>): ChainableInstance;
  ringRepeatPeriod(): ObjAccessor$1<number>;
  ringRepeatPeriod(msAccessor: ObjAccessor$1<number>): ChainableInstance;

  // HTML Elements layer
  htmlElementsData(): object[];
  htmlElementsData(data: object[]): ChainableInstance;
  htmlLat(): ObjAccessor$1<number>;
  htmlLat(latitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  htmlLng(): ObjAccessor$1<number>;
  htmlLng(longitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  htmlAltitude(): ObjAccessor$1<number>;
  htmlAltitude(altitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  htmlElement(): HTMLElement | string | ((d: object) => HTMLElement);
  htmlElement(htmlElementAccessor: HTMLElement | string | ((d: object) => HTMLElement)): ChainableInstance;
  htmlTransitionDuration(): number;
  htmlTransitionDuration(durationMs: number): ChainableInstance;

  // Objects layer
  objectsData(): object[];
  objectsData(data: object[]): ChainableInstance;
  objectLat(): ObjAccessor$1<number>;
  objectLat(latitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  objectLng(): ObjAccessor$1<number>;
  objectLng(longitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  objectAltitude(): ObjAccessor$1<number>;
  objectAltitude(altitudeAccessor: ObjAccessor$1<number>): ChainableInstance;
  objectRotation(): ObjAccessor$1<Rotation>
  objectRotation(rotationAccessor: ObjAccessor$1<Rotation>): ChainableInstance;
  objectFacesSurface(): ObjAccessor$1<boolean>;
  objectFacesSurface(facesSurfaceAccessor: ObjAccessor$1<boolean>): ChainableInstance;
  objectThreeObject(): Object3D | string | ((d: object) => Object3D);
  objectThreeObject(object3DAccessor: Object3D | string | ((d: object) => Object3D)): ChainableInstance;

  // Custom layer
  customLayerData(): object[];
  customLayerData(data: object[]): ChainableInstance;
  customThreeObject(): Object3D | string | ((d: object) => Object3D);
  customThreeObject(object3DAccessor: Object3D | string | ((d: object) => Object3D)): ChainableInstance;
  customThreeObjectUpdate(): string | ((obj: Object3D, objData: object) => void);
  customThreeObjectUpdate(object3dAccessor: string | ((obj: Object3D, objData: object) => void)): ChainableInstance;

  // Utility
  getGlobeRadius(): number;
  getCoords(lat: number, lng: number, altitude?: number): { x: number, y: number, z: number };
  toGeoCoords(coords: { x: number, y: number, z: number }): { lat: number, lng: number, altitude: number };
  setPointOfView(pov: Vector3, globePos?: Vector3): void;

  // Render options
  rendererSize(): Vector2;
  rendererSize(size: Vector2): ChainableInstance;
  pauseAnimation(): ChainableInstance;
  resumeAnimation(): ChainableInstance;
  _destructor(): void;
}

interface ConfigOptions extends ConfigOptions$1 {
  rendererConfig?: WebGLRendererParameters
}

type Accessor<In, Out> = Out | string | ((obj: In) => Out);
type ObjAccessor<T> = Accessor<object, T>;

interface HexBin {
  points: object[],
  sumWeight: number,
  center: { lat: number, lng: number }
}

interface GeoCoords {
  lat: number;
  lng: number;
  altitude: number;
}

type PointerEventsFilterFn = (object: Object3D, data?: object) => boolean;

// don't surface these internal props from inner ThreeGlobe
type ExcludedInnerProps = 'setPointOfView' | 'pauseAnimation' | 'resumeAnimation';

interface GlobeGenericInstance<ChainableInstance>
  extends Omit<ThreeGlobeGeneric<ChainableInstance>, ExcludedInnerProps> {
  (element: HTMLElement): ChainableInstance;
  resetProps(): ChainableInstance;
  _destructor(): void;

  // Container layout
  width(): number;
  width(width: number): ChainableInstance;
  height(): number;
  height(height: number): ChainableInstance;
  backgroundColor(): string;
  backgroundColor(color: string): ChainableInstance;
  backgroundImageUrl(): string | null;
  backgroundImageUrl(url: string | null): ChainableInstance;

  // Labels
  pointLabel(): ObjAccessor<string>;
  pointLabel(textAccessor: ObjAccessor<string>): ChainableInstance;
  arcLabel(): ObjAccessor<string>;
  arcLabel(textAccessor: ObjAccessor<string>): ChainableInstance;
  polygonLabel(): ObjAccessor<string>;
  polygonLabel(textAccessor: ObjAccessor<string>): ChainableInstance;
  pathLabel(): ObjAccessor<string>;
  pathLabel(textAccessor: ObjAccessor<string>): ChainableInstance;
  hexLabel(): Accessor<HexBin, string>;
  hexLabel(textAccessor: Accessor<HexBin, string>): ChainableInstance;
  tileLabel(): ObjAccessor<string>;
  tileLabel(textAccessor: ObjAccessor<string>): ChainableInstance;
  labelLabel(): ObjAccessor<string>;
  labelLabel(textAccessor: ObjAccessor<string>): ChainableInstance;
  objectLabel(): ObjAccessor<string>;
  objectLabel(textAccessor: ObjAccessor<string>): ChainableInstance;
  customLayerLabel(): ObjAccessor<string>;
  customLayerLabel(textAccessor: ObjAccessor<string>): ChainableInstance;

  // Interaction events
  onGlobeClick(callback: (coords: { lat: number, lng: number }, event: MouseEvent) => void): ChainableInstance;
  onGlobeRightClick(callback: (coords: { lat: number, lng: number }, event: MouseEvent) => void): ChainableInstance;
  onPointClick(callback: (point: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onPointRightClick(callback: (point: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onPointHover(callback: (point: object | null, prevPoint: object | null) => void): ChainableInstance;
  onArcClick(callback: (arc: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onArcRightClick(callback: (arc: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onArcHover(callback: (arc: object | null, prevArc: object | null) => void): ChainableInstance;
  onPolygonClick(callback: (polygon: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onPolygonRightClick(callback: (polygon: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onPolygonHover(callback: (polygon: object | null, prevPolygon: object | null) => void): ChainableInstance;
  onPathClick(callback: (path: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onPathRightClick(callback: (path: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onPathHover(callback: (path: object | null, prevPath: object | null) => void): ChainableInstance;
  onHeatmapClick(callback: (heatmap: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onHeatmapRightClick(callback: (heatmap: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onHeatmapHover(callback: (heatmap: object | null, prevHeatmap: object | null) => void): ChainableInstance;
  onHexClick(callback: (hex: HexBin, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onHexRightClick(callback: (hex: HexBin, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onHexHover(callback: (hex: HexBin | null, prevHex: HexBin | null) => void): ChainableInstance;
  onHexPolygonClick(callback: (polygon: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onHexPolygonRightClick(callback: (polygon: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onHexPolygonHover(callback: (polygon: object | null, prevPolygon: object | null) => void): ChainableInstance;
  onTileClick(callback: (tile: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onTileRightClick(callback: (tile: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onTileHover(callback: (tile: object | null, prevTile: object | null) => void): ChainableInstance;
  onLabelClick(callback: (label: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onLabelRightClick(callback: (label: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onLabelHover(callback: (label: object | null, prevLabel: object | null) => void): ChainableInstance;
  onObjectClick(callback: (obj: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onObjectRightClick(callback: (obj: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onObjectHover(callback: (obj: object | null, prevObj: object | null) => void): ChainableInstance;
  onCustomLayerClick(callback: (obj: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onCustomLayerRightClick(callback: (obj: object, event: MouseEvent, coords: { lat: number, lng: number, altitude: number }) => void): ChainableInstance;
  onCustomLayerHover(callback: (obj: object | null, prevObj: object | null) => void): ChainableInstance;

  // Render control
  pointOfView(): GeoCoords;
  pointOfView(pov: { lat?: number, lng?: number, altitude?: number }, transitionMs?: number): ChainableInstance;
  pauseAnimation(): ChainableInstance;
  resumeAnimation(): ChainableInstance;
  enablePointerInteraction(): boolean;
  enablePointerInteraction(enable: boolean): ChainableInstance;
  pointerEventsFilter(): PointerEventsFilterFn;
  pointerEventsFilter(filterFn: PointerEventsFilterFn): ChainableInstance;
  lineHoverPrecision(): number;
  lineHoverPrecision(precision: number): ChainableInstance;
  onZoom(callback: (pov: GeoCoords) => void): ChainableInstance;
  lights(): Light[];
  lights(lights: Light[]): ChainableInstance;
  scene(): Scene;
  camera(): Camera;
  renderer(): WebGLRenderer;
  postProcessingComposer(): EffectComposer;
  controls(): OrbitControls;

  // Utility
  getScreenCoords(lat: number, lng: number, altitude?: number): { x: number, y: number };
  toGlobeCoords(x: number, y: number): { lat: number, lng: number} | null;
}

type GlobeInstance = GlobeGenericInstance<GlobeInstance>;

declare function Globe(configOptions?: ConfigOptions): GlobeInstance;

export { type ConfigOptions, type GlobeGenericInstance, type GlobeInstance, Globe as default };
