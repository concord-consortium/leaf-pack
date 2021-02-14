import t from "./translation/translate";

export enum HabitatCategoryType {
  sketch = "sketch",
  streamHabitats = "streamHabitats",
  banks = "banks",
  inStream = "inStream",
  algae = "algae",
  other = "other",
}

export enum HabitatFeatureType {
  pools = "pools",
  riffles = "riffles",
  runs = "runs",
  manyTrees = "manyTrees",
  someTrees = "someTrees",
  noTrees = "noTrees",
  grassOnly = "grassOnly",
  pavement = "pavement",
  leaves = "leaves",
  cobbles = "cobbles",
  woodyDebris = "woodyDebris",
  plantRoots = "plantRoots",
  lightCover = "lightCover",
  thickCover = "thickCover",
  thickCoverClumps = "thickCoverClumps",
  fish = "fish",
  beavers = "beavers",
  trash = "trash",
  pipes = "pipes",
}

export interface HabitatFeature {
  type: HabitatFeatureType,
  label: string
}

export const habitatFeatures: HabitatFeature[] = [
  {type: HabitatFeatureType.pools, label: t("HABITAT.POOLS")},
  {type: HabitatFeatureType.riffles, label: t("HABITAT.RIFFLES")},
  {type: HabitatFeatureType.runs, label: t("HABITAT.RUNS")},
  {type: HabitatFeatureType.manyTrees, label: t("HABITAT.MANYTREES")},
  {type: HabitatFeatureType.someTrees, label: t("HABITAT.SOMETREES")},
  {type: HabitatFeatureType.noTrees, label: t("HABITAT.NOTREES")},
  {type: HabitatFeatureType.grassOnly, label: t("HABITAT.GRASSONLY")},
  {type: HabitatFeatureType.pavement, label: t("HABITAT.PAVEMENT")},
  {type: HabitatFeatureType.leaves, label: t("HABITAT.LEAVES")},
  {type: HabitatFeatureType.cobbles, label: t("HABITAT.COBBLES")},
  {type: HabitatFeatureType.woodyDebris, label: t("HABITAT.WOODYDEBRIS")},
  {type: HabitatFeatureType.plantRoots, label: t("HABITAT.PLANTROOTS")},
  {type: HabitatFeatureType.lightCover, label: t("HABITAT.LIGHTCOVER")},
  {type: HabitatFeatureType.thickCover, label: t("HABITAT.THICKCOVER")},
  {type: HabitatFeatureType.thickCoverClumps, label: t("HABITAT.THICKCOVERCLUMPS")},
  {type: HabitatFeatureType.fish, label: t("HABITAT.FISH")},
  {type: HabitatFeatureType.beavers, label: t("HABITAT.BEAVERS")},
  {type: HabitatFeatureType.trash, label: t("HABITAT.TRASH")},
  {type: HabitatFeatureType.pipes, label: t("HABITAT.PIPES")},
];

export interface HabitatCategory {
  type: HabitatCategoryType;
  title: string;
  features?: HabitatFeatureType[];
}

export const habitatCategories = [
  { type: HabitatCategoryType.sketch, title: t("HABITAT.SKETCH")},
  { type: HabitatCategoryType.streamHabitats, title: t("HABITAT.STREAMHABITATS"), features: [HabitatFeatureType.pools, HabitatFeatureType.riffles, HabitatFeatureType.runs] },
  { type: HabitatCategoryType.banks, title: t("HABITAT.BANKS"), features: [HabitatFeatureType.manyTrees, HabitatFeatureType.someTrees, HabitatFeatureType.noTrees, HabitatFeatureType.grassOnly, HabitatFeatureType.pavement] },
  { type: HabitatCategoryType.inStream, title: t("HABITAT.INSTREAM"), features: [HabitatFeatureType.leaves, HabitatFeatureType.cobbles, HabitatFeatureType.woodyDebris, HabitatFeatureType.plantRoots] },
  { type: HabitatCategoryType.algae, title: t("HABITAT.ALGAE"), features: [HabitatFeatureType.lightCover, HabitatFeatureType.thickCover, HabitatFeatureType.thickCoverClumps] },
  { type: HabitatCategoryType.other, title: t("HABITAT.OTHER"), features: [HabitatFeatureType.fish, HabitatFeatureType.beavers, HabitatFeatureType.trash, HabitatFeatureType.pipes] },
];
