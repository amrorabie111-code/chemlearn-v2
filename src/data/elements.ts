import { ChemicalElement, Course, ElementCategory } from '../types';
import { ARABIC_ADDITIONAL_LESSON_LOCALIZATION, ARABIC_COURSE_QUIZ_LOCALIZATION } from './arabicCourseLocalization';

// Element image URLs from element photo.txt
const ELEMENT_IMAGES: Record<number, string> = {
  1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Hydrogen_discharge_tube.jpg/960px-Hydrogen_discharge_tube.jpg',
  2: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Helium_discharge_tube.jpg/960px-Helium_discharge_tube.jpg',
  3: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Lithiumcut_cropped.jpg/960px-Lithiumcut_cropped.jpg',
  4: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Be-140g.jpg',
  5: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Boron_R105.jpg/960px-Boron_R105.jpg',
  6: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Graphite-and-diamond-with-scale.jpg/960px-Graphite-and-diamond-with-scale.jpg',
  7: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Fluessiger_Stickstoff.jpg/960px-Fluessiger_Stickstoff.jpg',
  8: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Liquid_oxygen_in_a_beaker_%28cropped_and_retouched%29.jpg/960px-Liquid_oxygen_in_a_beaker_%28cropped_and_retouched%29.jpg',
  9: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Liquid_fluorine.jpg',
  10: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Neon_discharge_tube.jpg/960px-Neon_discharge_tube.jpg',
  11: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Na_%28Sodium%29.jpg/960px-Na_%28Sodium%29.jpg',
  12: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/CSIRO_ScienceImage_2893_Crystalised_magnesium.jpg/960px-CSIRO_ScienceImage_2893_Crystalised_magnesium.jpg',
  13: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Aluminium-4.jpg',
  14: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/SiliconCroda.jpg/960px-SiliconCroda.jpg',
  15: 'https://upload.wikimedia.org/wikipedia/commons/8/88/PhosphComby.jpg',
  16: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Sulfur_-_El_Desierto_mine%2C_San_Pablo_de_Napa%2C_Daniel_Campos_Province%2C_Potos%C3%AD%2C_Bolivia.jpg/960px-Sulfur_-_El_Desierto_mine%2C_San_Pablo_de_Napa%2C_Daniel_Campos_Province%2C_Potos%C3%AD%2C_Bolivia.jpg',
  17: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Chlorine_in_bottle.jpg',
  18: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Argon_discharge_tube.jpg/960px-Argon_discharge_tube.jpg',
  19: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Potassium-2.jpg',
  20: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Calcium_unter_Argon_Schutzgasatmosph%C3%A4re.jpg/960px-Calcium_unter_Argon_Schutzgasatmosph%C3%A4re.jpg',
  21: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Scandium_sublimed_dendritic_and_1cm3_cube.jpg/960px-Scandium_sublimed_dendritic_and_1cm3_cube.jpg',
  22: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Titan-crystal_bar.JPG/960px-Titan-crystal_bar.JPG',
  23: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vanadium_crystal_bar_and_1cm3_cube.jpg/960px-Vanadium_crystal_bar_and_1cm3_cube.jpg',
  24: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Chromium_crystals_and_1cm3_cube.jpg/960px-Chromium_crystals_and_1cm3_cube.jpg',
  25: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Manganese_electrolytic_and_1cm3_cube.jpg/960px-Manganese_electrolytic_and_1cm3_cube.jpg',
  26: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Iron_electrolytic_and_1cm3_cube.jpg/960px-Iron_electrolytic_and_1cm3_cube.jpg',
  27: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Kobalt_electrolytic_and_1cm3_cube.jpg/960px-Kobalt_electrolytic_and_1cm3_cube.jpg',
  28: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Nickel_electrolytic_and_1cm3_cube.jpg/960px-Nickel_electrolytic_and_1cm3_cube.jpg',
  29: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/NatCopper.jpg/960px-NatCopper.jpg',
  30: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Zinc_fragment_sublimed_and_1cm3_cube.jpg/960px-Zinc_fragment_sublimed_and_1cm3_cube.jpg',
  31: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Gallium_bar_cracked_open_to_show_crystal_structure_with_scale_1.png/960px-Gallium_bar_cracked_open_to_show_crystal_structure_with_scale_1.png',
  32: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Polycrystalline-germanium.jpg/960px-Polycrystalline-germanium.jpg',
  33: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Arsen_1a.jpg',
  34: 'https://upload.wikimedia.org/wikipedia/commons/4/47/SeBlackRed.jpg',
  35: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Bromine_vial_in_acrylic_cube.jpg/960px-Bromine_vial_in_acrylic_cube.jpg',
  36: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Krypton_discharge_tube.jpg/960px-Krypton_discharge_tube.jpg',
  37: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Rb5.JPG/960px-Rb5.JPG',
  38: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Strontium_destilled_crystals.jpg/960px-Strontium_destilled_crystals.jpg',
  39: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Yttrium_sublimed_dendritic_and_1cm3_cube.jpg/960px-Yttrium_sublimed_dendritic_and_1cm3_cube.jpg',
  40: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Zirconium_crystal_bar_and_1cm3_cube.jpg/960px-Zirconium_crystal_bar_and_1cm3_cube.jpg',
  41: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Niobium_crystals_and_1cm3_cube.jpg/960px-Niobium_crystals_and_1cm3_cube.jpg',
  42: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Molybdenum_crystaline_fragment_and_1cm3_cube.jpg/960px-Molybdenum_crystaline_fragment_and_1cm3_cube.jpg',
  43: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Technetium-sample-cropped.jpg/960px-Technetium-sample-cropped.jpg',
  44: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Ruthenium_a_half_bar.jpg/960px-Ruthenium_a_half_bar.jpg',
  45: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Rhodium_powder_pressed_melted.jpg/960px-Rhodium_powder_pressed_melted.jpg',
  46: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Palladium_%2846_Pd%29.jpg',
  47: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Silver_crystal.jpg/960px-Silver_crystal.jpg',
  48: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Cadmium-crystal_bar.jpg/960px-Cadmium-crystal_bar.jpg',
  49: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Indium_wire.jpg/960px-Indium_wire.jpg',
  50: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Sn-Alpha-Beta.jpg/960px-Sn-Alpha-Beta.jpg',
  51: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Antimony-4.jpg',
  52: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Tellurium2.jpg/960px-Tellurium2.jpg',
  53: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Sample_of_iodine.jpg/960px-Sample_of_iodine.jpg',
  54: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Xenon_discharge_tube.jpg/960px-Xenon_discharge_tube.jpg',
  55: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Cesium.jpg/960px-Cesium.jpg',
  56: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Barium_unter_Argon_Schutzgas_Atmosph%C3%A4re.jpg',
  57: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Lanthanum-2.jpg',
  58: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Cerium2.jpg',
  59: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Praseodymium.jpg',
  60: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Neodymium2.jpg',
  61: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Promethium.png',
  62: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Samarium-2.jpg',
  63: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Europium.jpg',
  64: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Gadolinium-4.jpg/960px-Gadolinium-4.jpg',
  65: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Terbium-2.jpg',
  66: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Dy_chips.jpg',
  67: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Holmium2.jpg/960px-Holmium2.jpg',
  68: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Erbium_%2868_Er%29.jpg/960px-Erbium_%2868_Er%29.jpg',
  69: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Thulium_sublimed_dendritic_and_1cm3_cube.jpg/960px-Thulium_sublimed_dendritic_and_1cm3_cube.jpg',
  70: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Ytterbium-3.jpg',
  71: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Lutetium_sublimed_dendritic_and_1cm3_cube.jpg',
  72: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Hf-crystal_bar.jpg/960px-Hf-crystal_bar.jpg',
  73: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Tantalum_single_crystal_and_1cm3_cube.jpg/960px-Tantalum_single_crystal_and_1cm3_cube.jpg',
  74: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Wolfram_evaporated_crystals_and_1cm3_cube.jpg/960px-Wolfram_evaporated_crystals_and_1cm3_cube.jpg',
  75: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Rhenium_single_crystal_bar_and_1cm3_cube.jpg/960px-Rhenium_single_crystal_bar_and_1cm3_cube.jpg',
  76: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Osmium_crystals.jpg/960px-Osmium_crystals.jpg',
  77: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Iridium_%2877_Ir%29_%28cropped%29.jpg',
  78: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Platinum_crystals.jpg/960px-Platinum_crystals.jpg',
  79: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Gold-crystals.jpg/960px-Gold-crystals.jpg',
  80: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Pouring_liquid_mercury_bionerd.jpg/960px-Pouring_liquid_mercury_bionerd.jpg',
  81: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Thallium_pieces_in_ampoule.jpg',
  82: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Lead_electrolytic_and_1cm3_cube.jpg/960px-Lead_electrolytic_and_1cm3_cube.jpg',
  83: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Bismuth_crystals_and_1cm3_cube.jpg/960px-Bismuth_crystals_and_1cm3_cube.jpg',
  84: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Polonium_on_brass_sheet.jpg/960px-Polonium_on_brass_sheet.jpg',
  85: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Glow_from_a_sample_of_astatine_%28cropped%29.jpg/960px-Glow_from_a_sample_of_astatine_%28cropped%29.jpg',
  86: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Radon_decay_in_a_cloud_chamber.jpg/960px-Radon_decay_in_a_cloud_chamber.jpg',
  87: '', // Francium - no stable image available
  88: 'https://th.bing.com/th/id/OIP.XCFsHkxynIv68S1QyqfwAAHaFj?w=245&h=184&c=7&r=0&o=7&dpr=1.2&pid=1.7&rm=3',
  89: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Actinium_sample_%2831481701837%29.png/960px-Actinium_sample_%2831481701837%29.png',
  90: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Thorium_sample_0.1g.jpg/960px-Thorium_sample_0.1g.jpg',
  91: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Protactinium_%28Element_-_91%29_2.jpg/960px-Protactinium_%28Element_-_91%29_2.jpg',
  92: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/HEUraniumC.jpg/960px-HEUraniumC.jpg',
  93: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Neptunium_%28Element_-_93%29_2.jpg/960px-Neptunium_%28Element_-_93%29_2.jpg',
  94: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Plutonium_ring.jpg/960px-Plutonium_ring.jpg',
  95: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Americium_microscope.jpg/960px-Americium_microscope.jpg',
  96: '', // Curium - no image available
  97: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Berkelium_metal.jpg',
  98: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Californium.jpg',
  99: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Einsteinium.jpg',
  100: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/QSicon_missing.svg/960px-QSicon_missing.svg.png',
  // Elements 101-118 are synthetic with no stable images
};

// Element data with proper categorization and shell configurations
export const ALL_ELEMENTS: Array<{
  number: number;
  symbol: string;
  name: string;
  atomicMass: string;
  electronConfiguration: string;
  shells: number[];
  state: 'Gas' | 'Liquid' | 'Solid' | 'Unknown';
  category: ElementCategory;
  meltingPoint: string | null;
  boilingPoint: string | null;
  density: string | null;
  discoveredBy: string;
  summary: string;
}> = [
  { number: 1, symbol: 'H', name: 'Hydrogen', atomicMass: '1.008', electronConfiguration: '1s1', shells: [1], state: 'Gas', category: 'nonmetal', meltingPoint: '-259.16', boilingPoint: '-252.87', density: '0.08988', discoveredBy: 'Henry Cavendish', summary: 'Lightest element, fuels stars, vital for water and life.' },
  { number: 2, symbol: 'He', name: 'Helium', atomicMass: '4.0026', electronConfiguration: '1s2', shells: [2], state: 'Gas', category: 'noble gas', meltingPoint: '-272.2', boilingPoint: '-268.93', density: '0.1786', discoveredBy: 'Pierre Janssen', summary: 'Second lightest, fills balloons, discovered in solar spectrum.' },
  { number: 3, symbol: 'Li', name: 'Lithium', atomicMass: '6.94', electronConfiguration: '[He] 2s1', shells: [2, 1], state: 'Solid', category: 'alkali metal', meltingPoint: '180.54', boilingPoint: '1342', density: '0.534', discoveredBy: 'Johan August Arfwedson', summary: 'Powers batteries, treats mood disorders, reactive alkali metal.' },
  { number: 4, symbol: 'Be', name: 'Beryllium', atomicMass: '9.0122', electronConfiguration: '[He] 2s2', shells: [2, 2], state: 'Solid', category: 'alkaline earth metal', meltingPoint: '1287', boilingPoint: '2469', density: '1.848', discoveredBy: 'Louis Nicolas Vauquelin', summary: 'Strong, lightweight, used in aerospace, toxic if inhaled.' },
  { number: 5, symbol: 'B', name: 'Boron', atomicMass: '10.81', electronConfiguration: '[He] 2s2 2p1', shells: [2, 3], state: 'Solid', category: 'metalloid', meltingPoint: '2077', boilingPoint: '4000', density: '2.34', discoveredBy: 'Joseph Louis Gay-Lussac', summary: 'Essential for plants, strengthens glass, found in detergents.' },
  { number: 6, symbol: 'C', name: 'Carbon', atomicMass: '12.011', electronConfiguration: '[He] 2s2 2p2', shells: [2, 4], state: 'Solid', category: 'nonmetal', meltingPoint: '3550', boilingPoint: '4827', density: '2.267', discoveredBy: 'Ancient', summary: 'Basis of life, diamonds, graphite, versatile bonding element.' },
  { number: 7, symbol: 'N', name: 'Nitrogen', atomicMass: '14.007', electronConfiguration: '[He] 2s2 2p3', shells: [2, 5], state: 'Gas', category: 'nonmetal', meltingPoint: '-210', boilingPoint: '-195.79', density: '1.2506', discoveredBy: 'Daniel Rutherford', summary: '78% of air, used in fertilizers, inert protective gas.' },
  { number: 8, symbol: 'O', name: 'Oxygen', atomicMass: '15.999', electronConfiguration: '[He] 2s2 2p4', shells: [2, 6], state: 'Gas', category: 'nonmetal', meltingPoint: '-218.79', boilingPoint: '-182.95', density: '1.429', discoveredBy: 'Joseph Priestley', summary: 'Essential for breathing, fuels combustion, forms ozone layer protection.' },
  { number: 9, symbol: 'F', name: 'Fluorine', atomicMass: '18.998', electronConfiguration: '[He] 2s2 2p5', shells: [2, 7], state: 'Gas', category: 'halogen', meltingPoint: '-219.67', boilingPoint: '-188.11', density: '1.696', discoveredBy: 'André-Marie Ampère', summary: 'Most reactive halogen, strengthens teeth, used in refrigerants.' },
  { number: 10, symbol: 'Ne', name: 'Neon', atomicMass: '20.180', electronConfiguration: '[He] 2s2 2p6', shells: [2, 8], state: 'Gas', category: 'noble gas', meltingPoint: '-248.59', boilingPoint: '-246.05', density: '0.9002', discoveredBy: 'Morris Travers', summary: 'Noble gas, glows in signs, inert, discovered in 1898.' },
  { number: 11, symbol: 'Na', name: 'Sodium', atomicMass: '22.990', electronConfiguration: '[Ne] 3s1', shells: [2, 8, 1], state: 'Solid', category: 'alkali metal', meltingPoint: '97.79', boilingPoint: '882.9', density: '0.971', discoveredBy: 'Humphry Davy', summary: 'Essential electrolyte, reacts violently with water, preserves food.' },
  { number: 12, symbol: 'Mg', name: 'Magnesium', atomicMass: '24.305', electronConfiguration: '[Ne] 3s2', shells: [2, 8, 2], state: 'Solid', category: 'alkaline earth metal', meltingPoint: '650', boilingPoint: '1090', density: '1.738', discoveredBy: 'Joseph Black', summary: 'Vital for muscles, burns bright, used in fireworks and alloys.' },
  { number: 13, symbol: 'Al', name: 'Aluminum', atomicMass: '26.982', electronConfiguration: '[Ne] 3s2 3p1', shells: [2, 8, 3], state: 'Solid', category: 'post-transition metal', meltingPoint: '660.32', boilingPoint: '2519', density: '2.70', discoveredBy: 'Hans Christian Ørsted', summary: 'Lightweight metal, resists corrosion, widely used in packaging.' },
  { number: 14, symbol: 'Si', name: 'Silicon', atomicMass: '28.085', electronConfiguration: '[Ne] 3s2 3p2', shells: [2, 8, 4], state: 'Solid', category: 'metalloid', meltingPoint: '1414', boilingPoint: '3265', density: '2.3290', discoveredBy: 'Jöns Jacob Berzelius', summary: 'Basis of electronics, abundant in sand, forms strong compounds.' },
  { number: 15, symbol: 'P', name: 'Phosphorus', atomicMass: '30.974', electronConfiguration: '[Ne] 3s2 3p3', shells: [2, 8, 5], state: 'Solid', category: 'nonmetal', meltingPoint: '44.15', boilingPoint: '280.5', density: '1.82', discoveredBy: 'Hennig Brand', summary: 'Key for DNA, glows in dark, used in fertilizers.' },
  { number: 16, symbol: 'S', name: 'Sulfur', atomicMass: '32.06', electronConfiguration: '[Ne] 3s2 3p4', shells: [2, 8, 6], state: 'Solid', category: 'nonmetal', meltingPoint: '115.21', boilingPoint: '444.60', density: '2.067', discoveredBy: 'Ancient', summary: 'Smelly element, strengthens rubber, found in volcanic emissions.' },
  { number: 17, symbol: 'Cl', name: 'Chlorine', atomicMass: '35.45', electronConfiguration: '[Ne] 3s2 3p5', shells: [2, 8, 7], state: 'Gas', category: 'halogen', meltingPoint: '-101.5', boilingPoint: '-34.04', density: '3.2', discoveredBy: 'Carl Wilhelm Scheele', summary: 'Disinfects water, toxic gas, forms table salt with sodium.' },
  { number: 18, symbol: 'Ar', name: 'Argon', atomicMass: '39.948', electronConfiguration: '[Ne] 3s2 3p6', shells: [2, 8, 8], state: 'Gas', category: 'noble gas', meltingPoint: '-189.34', boilingPoint: '-185.85', density: '1.784', discoveredBy: 'Lord Rayleigh', summary: 'Noble gas, inert, protects welding arcs, fills light bulbs.' },
  { number: 19, symbol: 'K', name: 'Potassium', atomicMass: '39.098', electronConfiguration: '[Ar] 4s1', shells: [2, 8, 8, 1], state: 'Solid', category: 'alkali metal', meltingPoint: '63.5', boilingPoint: '758.8', density: '0.862', discoveredBy: 'Humphry Davy', summary: 'Essential nutrient, highly reactive, found in bananas and soil.' },
  { number: 20, symbol: 'Ca', name: 'Calcium', atomicMass: '40.078', electronConfiguration: '[Ar] 4s2', shells: [2, 8, 8, 2], state: 'Solid', category: 'alkaline earth metal', meltingPoint: '842', boilingPoint: '1484', density: '1.55', discoveredBy: 'Humphry Davy', summary: 'Builds bones, shells, limestone, crucial for muscle contraction.' },
  { number: 21, symbol: 'Sc', name: 'Scandium', atomicMass: '44.956', electronConfiguration: '[Ar] 3d1 4s2', shells: [2, 8, 9, 2], state: 'Solid', category: 'transition metal', meltingPoint: '1541', boilingPoint: '2836', density: '2.985', discoveredBy: 'Lars Fredrik Nilson', summary: 'Strengthens aluminum alloys, rare, used in aerospace components.' },
  { number: 22, symbol: 'Ti', name: 'Titanium', atomicMass: '47.867', electronConfiguration: '[Ar] 3d2 4s2', shells: [2, 8, 10, 2], state: 'Solid', category: 'transition metal', meltingPoint: '1668', boilingPoint: '3287', density: '4.506', discoveredBy: 'William Gregor', summary: 'Strong, lightweight, resists corrosion, used in implants, aircraft.' },
  { number: 23, symbol: 'V', name: 'Vanadium', atomicMass: '50.942', electronConfiguration: '[Ar] 3d3 4s2', shells: [2, 8, 11, 2], state: 'Solid', category: 'transition metal', meltingPoint: '1910', boilingPoint: '3407', density: '6.11', discoveredBy: 'Andrés Manuel del Río', summary: 'Hardens steel, forms colorful compounds, used in catalysts.' },
  { number: 24, symbol: 'Cr', name: 'Chromium', atomicMass: '51.996', electronConfiguration: '[Ar] 3d5 4s1', shells: [2, 8, 13, 1], state: 'Solid', category: 'transition metal', meltingPoint: '1907', boilingPoint: '2671', density: '7.15', discoveredBy: 'Louis Nicolas Vauquelin', summary: 'Shiny metal, resists rust, gives emeralds their green color.' },
  { number: 25, symbol: 'Mn', name: 'Manganese', atomicMass: '54.938', electronConfiguration: '[Ar] 3d5 4s2', shells: [2, 8, 13, 2], state: 'Solid', category: 'transition metal', meltingPoint: '1246', boilingPoint: '2061', density: '7.21', discoveredBy: 'Carl Wilhelm Scheele', summary: 'Strengthens steel, vital nutrient, found in batteries and enzymes.' },
  { number: 26, symbol: 'Fe', name: 'Iron', atomicMass: '55.845', electronConfiguration: '[Ar] 3d6 4s2', shells: [2, 8, 14, 2], state: 'Solid', category: 'transition metal', meltingPoint: '1538', boilingPoint: '2862', density: '7.874', discoveredBy: 'Ancient', summary: 'Core of Earth, builds hemoglobin, rusts easily without protection.' },
  { number: 27, symbol: 'Co', name: 'Cobalt', atomicMass: '58.933', electronConfiguration: '[Ar] 3d7 4s2', shells: [2, 8, 15, 2], state: 'Solid', category: 'transition metal', meltingPoint: '1495', boilingPoint: '2927', density: '8.90', discoveredBy: 'Georg Brandt', summary: 'Used in magnets, batteries, pigments, essential for vitamin B12.' },
  { number: 28, symbol: 'Ni', name: 'Nickel', atomicMass: '58.693', electronConfiguration: '[Ar] 3d8 4s2', shells: [2, 8, 16, 2], state: 'Solid', category: 'transition metal', meltingPoint: '1455', boilingPoint: '2913', density: '8.908', discoveredBy: 'Axel Fredrik Cronstedt', summary: 'Corrosion-resistant, coins, stainless steel, used in rechargeable batteries.' },
  { number: 29, symbol: 'Cu', name: 'Copper', atomicMass: '63.546', electronConfiguration: '[Ar] 3d10 4s1', shells: [2, 8, 18, 1], state: 'Solid', category: 'transition metal', meltingPoint: '1084.6', boilingPoint: '2562', density: '8.96', discoveredBy: 'Ancient', summary: 'Conducts electricity, ancient metal, forms bronze with tin.' },
  { number: 30, symbol: 'Zn', name: 'Zinc', atomicMass: '65.38', electronConfiguration: '[Ar] 3d10 4s2', shells: [2, 8, 18, 2], state: 'Solid', category: 'transition metal', meltingPoint: '419.5', boilingPoint: '907', density: '7.14', discoveredBy: 'Indian metallurgists', summary: 'Essential nutrient, galvanizes steel, boosts immunity, found in sunscreen.' },
  { number: 31, symbol: 'Ga', name: 'Gallium', atomicMass: '69.723', electronConfiguration: '[Ar] 3d10 4s2 4p1', shells: [2, 8, 18, 3], state: 'Solid', category: 'post-transition metal', meltingPoint: '29.76', boilingPoint: '2204', density: '5.91', discoveredBy: 'Lecoq de Boisbaudran', summary: 'Melts in your hand, used in electronics, low melting point.' },
  { number: 32, symbol: 'Ge', name: 'Germanium', atomicMass: '72.63', electronConfiguration: '[Ar] 3d10 4s2 4p2', shells: [2, 8, 18, 4], state: 'Solid', category: 'metalloid', meltingPoint: '938.2', boilingPoint: '2833', density: '5.323', discoveredBy: 'Clemens Winkler', summary: 'Semiconductor, used in fiber optics, similar to silicon properties.' },
  { number: 33, symbol: 'As', name: 'Arsenic', atomicMass: '74.922', electronConfiguration: '[Ar] 3d10 4s2 4p3', shells: [2, 8, 18, 5], state: 'Solid', category: 'metalloid', meltingPoint: '817', boilingPoint: '614', density: '5.776', discoveredBy: 'Albertus Magnus', summary: 'Poisonous metalloid, used in semiconductors, ancient toxic element.' },
  { number: 34, symbol: 'Se', name: 'Selenium', atomicMass: '78.96', electronConfiguration: '[Ar] 3d10 4s2 4p4', shells: [2, 8, 18, 6], state: 'Solid', category: 'nonmetal', meltingPoint: '221', boilingPoint: '685', density: '4.81', discoveredBy: 'Jöns Jacob Berzelius', summary: 'Photocopiers use it, essential nutrient, toxic in large doses.' },
  { number: 35, symbol: 'Br', name: 'Bromine', atomicMass: '79.904', electronConfiguration: '[Ar] 3d10 4s2 4p5', shells: [2, 8, 18, 7], state: 'Liquid', category: 'halogen', meltingPoint: '-7.2', boilingPoint: '58.8', density: '3.1028', discoveredBy: 'Antoine Jérôme Balard', summary: 'Liquid at room temp, used in fire retardants, red-brown halogen.' },
  { number: 36, symbol: 'Kr', name: 'Krypton', atomicMass: '83.798', electronConfiguration: '[Ar] 3d10 4s2 4p6', shells: [2, 8, 18, 8], state: 'Gas', category: 'noble gas', meltingPoint: '-157.36', boilingPoint: '-153.22', density: '3.749', discoveredBy: 'William Ramsay', summary: 'Noble gas, used in high-performance light bulbs, inert element.' },
  { number: 37, symbol: 'Rb', name: 'Rubidium', atomicMass: '85.468', electronConfiguration: '[Kr] 5s1', shells: [2, 8, 18, 8, 1], state: 'Solid', category: 'alkali metal', meltingPoint: '39.31', boilingPoint: '688', density: '1.532', discoveredBy: 'Robert Bunsen', summary: 'Soft metal, used in atomic clocks, ignites spontaneously in air.' },
  { number: 38, symbol: 'Sr', name: 'Strontium', atomicMass: '87.62', electronConfiguration: '[Kr] 5s2', shells: [2, 8, 18, 8, 2], state: 'Solid', category: 'alkaline earth metal', meltingPoint: '777', boilingPoint: '1377', density: '2.64', discoveredBy: 'William Cruickshank', summary: 'Red flames in fireworks, strengthens bones, similar to calcium.' },
  { number: 39, symbol: 'Y', name: 'Yttrium', atomicMass: '88.906', electronConfiguration: '[Kr] 4d1 5s2', shells: [2, 8, 18, 9, 2], state: 'Solid', category: 'transition metal', meltingPoint: '1526', boilingPoint: '2930', density: '4.472', discoveredBy: 'Johan Gadolin', summary: 'Used in LEDs, strengthens alloys, discovered in Swedish quarry.' },
  { number: 40, symbol: 'Zr', name: 'Zirconium', atomicMass: '91.224', electronConfiguration: '[Kr] 4d2 5s2', shells: [2, 8, 18, 10, 2], state: 'Solid', category: 'transition metal', meltingPoint: '1855', boilingPoint: '4377', density: '6.52', discoveredBy: 'Martin Heinrich Klaproth', summary: 'Corrosion-resistant, used in nuclear reactors, found in gemstones.' },
  { number: 41, symbol: 'Nb', name: 'Niobium', atomicMass: '92.906', electronConfiguration: '[Kr] 4d4 5s1', shells: [2, 8, 18, 12, 1], state: 'Solid', category: 'transition metal', meltingPoint: '2477', boilingPoint: '4744', density: '8.57', discoveredBy: 'Charles Hatchett', summary: 'Strengthens steel, superconducting magnets, discovered in Connecticut mineral.' },
  { number: 42, symbol: 'Mo', name: 'Molybdenum', atomicMass: '95.95', electronConfiguration: '[Kr] 4d5 5s1', shells: [2, 8, 18, 13, 1], state: 'Solid', category: 'transition metal', meltingPoint: '2623', boilingPoint: '4639', density: '10.28', discoveredBy: 'Carl Wilhelm Scheele', summary: 'Essential nutrient, strengthens steel, used in lubricants and catalysts.' },
  { number: 43, symbol: 'Tc', name: 'Technetium', atomicMass: '98', electronConfiguration: '[Kr] 4d5 5s2', shells: [2, 8, 18, 13, 2], state: 'Solid', category: 'transition metal', meltingPoint: '2157', boilingPoint: '4265', density: '11.5', discoveredBy: 'Emilio Segrè', summary: 'First artificial element, used in medical imaging, radioactive.' },
  { number: 44, symbol: 'Ru', name: 'Ruthenium', atomicMass: '101.07', electronConfiguration: '[Kr] 4d7 5s1', shells: [2, 8, 18, 15, 1], state: 'Solid', category: 'transition metal', meltingPoint: '2334', boilingPoint: '4150', density: '12.45', discoveredBy: 'Karl Ernst Claus', summary: 'Hardens platinum, used in electronics, rare transition metal.' },
  { number: 45, symbol: 'Rh', name: 'Rhodium', atomicMass: '102.91', electronConfiguration: '[Kr] 4d8 5s1', shells: [2, 8, 18, 16, 1], state: 'Solid', category: 'transition metal', meltingPoint: '1964', boilingPoint: '3695', density: '12.41', discoveredBy: 'William Hyde Wollaston', summary: 'Shiny, rare, used in catalytic converters, highly valuable metal.' },
  { number: 46, symbol: 'Pd', name: 'Palladium', atomicMass: '106.42', electronConfiguration: '[Kr] 4d10', shells: [2, 8, 18, 18], state: 'Solid', category: 'transition metal', meltingPoint: '1554.9', boilingPoint: '2963', density: '12.02', discoveredBy: 'William Hyde Wollaston', summary: 'Used in jewelry, electronics, catalytic converters, absorbs hydrogen gas.' },
  { number: 47, symbol: 'Ag', name: 'Silver', atomicMass: '107.87', electronConfiguration: '[Kr] 4d10 5s1', shells: [2, 8, 18, 18, 1], state: 'Solid', category: 'transition metal', meltingPoint: '961.8', boilingPoint: '2162', density: '10.49', discoveredBy: 'Ancient', summary: 'Precious metal, conducts electricity, used in coins and photography.' },
  { number: 48, symbol: 'Cd', name: 'Cadmium', atomicMass: '112.41', electronConfiguration: '[Kr] 4d10 5s2', shells: [2, 8, 18, 18, 2], state: 'Solid', category: 'transition metal', meltingPoint: '321.07', boilingPoint: '767', density: '8.69', discoveredBy: 'Karl Samuel Leberecht Hermann', summary: 'Toxic metal, used in batteries, pigments, and nuclear rods.' },
  { number: 49, symbol: 'In', name: 'Indium', atomicMass: '114.82', electronConfiguration: '[Kr] 4d10 5s2 5p1', shells: [2, 8, 18, 18, 3], state: 'Solid', category: 'post-transition metal', meltingPoint: '156.6', boilingPoint: '2072', density: '7.31', discoveredBy: 'Ferdinand Reich', summary: 'Soft metal, used in touchscreens, discovered in Germany, 1863.' },
  { number: 50, symbol: 'Sn', name: 'Tin', atomicMass: '118.71', electronConfiguration: '[Kr] 4d10 5s2 5p2', shells: [2, 8, 18, 18, 4], state: 'Solid', category: 'post-transition metal', meltingPoint: '231.93', boilingPoint: '2602', density: '7.287', discoveredBy: 'Ancient', summary: 'Ancient metal, prevents corrosion, used in bronze and cans.' },
  { number: 51, symbol: 'Sb', name: 'Antimony', atomicMass: '121.76', electronConfiguration: '[Kr] 4d10 5s2 5p3', shells: [2, 8, 18, 18, 5], state: 'Solid', category: 'metalloid', meltingPoint: '630.63', boilingPoint: '1587', density: '6.697', discoveredBy: 'Ancient', summary: 'Used in flame retardants, alloys, cosmetics, toxic in excess.' },
  { number: 52, symbol: 'Te', name: 'Tellurium', atomicMass: '127.60', electronConfiguration: '[Kr] 4d10 5s2 5p4', shells: [2, 8, 18, 18, 6], state: 'Solid', category: 'metalloid', meltingPoint: '449.51', boilingPoint: '988', density: '6.24', discoveredBy: 'Franz-Joseph Müller von Reichenstein', summary: 'Rare metalloid, strengthens alloys, used in solar panels.' },
  { number: 53, symbol: 'I', name: 'Iodine', atomicMass: '126.90', electronConfiguration: '[Kr] 4d10 5s2 5p5', shells: [2, 8, 18, 18, 7], state: 'Solid', category: 'halogen', meltingPoint: '113.7', boilingPoint: '184.3', density: '4.933', discoveredBy: 'Bernard Courtois', summary: 'Essential nutrient, prevents goiter, used in disinfectants and medicine.' },
  { number: 54, symbol: 'Xe', name: 'Xenon', atomicMass: '131.29', electronConfiguration: '[Kr] 4d10 5s2 5p6', shells: [2, 8, 18, 18, 8], state: 'Gas', category: 'noble gas', meltingPoint: '-111.8', boilingPoint: '-108.0', density: '5.894', discoveredBy: 'William Ramsay', summary: 'Noble gas, used in headlights, anesthesia, discovered in 1898.' },
  { number: 55, symbol: 'Cs', name: 'Cesium', atomicMass: '132.91', electronConfiguration: '[Xe] 6s1', shells: [2, 8, 18, 18, 8, 1], state: 'Solid', category: 'alkali metal', meltingPoint: '28.5', boilingPoint: '671', density: '1.873', discoveredBy: 'Robert Bunsen', summary: 'Soft alkali metal, atomic clocks, reacts explosively with water.' },
  { number: 56, symbol: 'Ba', name: 'Barium', atomicMass: '137.33', electronConfiguration: '[Xe] 6s2', shells: [2, 8, 18, 18, 8, 2], state: 'Solid', category: 'alkaline earth metal', meltingPoint: '727', boilingPoint: '1845', density: '3.594', discoveredBy: 'Humphry Davy', summary: 'Used in medical imaging, fireworks, toxic in soluble compounds.' },
  // Lanthanides (57-71)
  { number: 57, symbol: 'La', name: 'Lanthanum', atomicMass: '138.91', electronConfiguration: '[Xe] 5d1 6s2', shells: [2, 8, 18, 18, 9, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '920', boilingPoint: '3464', density: '6.162', discoveredBy: 'Carl Gustaf Mosander', summary: 'Found in camera lenses, catalysts, first of lanthanides.' },
  { number: 58, symbol: 'Ce', name: 'Cerium', atomicMass: '140.12', electronConfiguration: '[Xe] 4f1 5d1 6s2', shells: [2, 8, 18, 19, 9, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '798', boilingPoint: '3443', density: '6.770', discoveredBy: 'Martin Heinrich Klaproth', summary: 'Abundant rare earth, used in polishing glass, catalytic converters.' },
  { number: 59, symbol: 'Pr', name: 'Praseodymium', atomicMass: '140.91', electronConfiguration: '[Xe] 4f3 6s2', shells: [2, 8, 18, 21, 8, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '931', boilingPoint: '3520', density: '6.77', discoveredBy: 'Carl Auer von Welsbach', summary: 'Rare earth, used in magnets, aircraft engines, green glass.' },
  { number: 60, symbol: 'Nd', name: 'Neodymium', atomicMass: '144.24', electronConfiguration: '[Xe] 4f4 6s2', shells: [2, 8, 18, 22, 8, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '1021', boilingPoint: '3074', density: '7.01', discoveredBy: 'Carl Auer von Welsbach', summary: 'Strong magnets, headphones, lasers, vital for renewable energy.' },
  { number: 61, symbol: 'Pm', name: 'Promethium', atomicMass: '145', electronConfiguration: '[Xe] 4f5 6s2', shells: [2, 8, 18, 23, 8, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '1100', boilingPoint: '3000', density: '7.26', discoveredBy: 'Jacob A. Marinsky', summary: 'Radioactive, rare, used in luminous paint, nuclear batteries.' },
  { number: 62, symbol: 'Sm', name: 'Samarium', atomicMass: '150.36', electronConfiguration: '[Xe] 4f6 6s2', shells: [2, 8, 18, 24, 8, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '1072', boilingPoint: '1794', density: '7.52', discoveredBy: 'Lecoq de Boisbaudran', summary: 'Used in magnets, cancer treatment, absorbs neutrons in reactors.' },
  { number: 63, symbol: 'Eu', name: 'Europium', atomicMass: '151.96', electronConfiguration: '[Xe] 4f7 6s2', shells: [2, 8, 18, 25, 8, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '822', boilingPoint: '1529', density: '5.264', discoveredBy: 'Eugène-Anatole Demarçay', summary: 'Creates red phosphors, used in TV screens, rare earth.' },
  { number: 64, symbol: 'Gd', name: 'Gadolinium', atomicMass: '157.25', electronConfiguration: '[Xe] 4f7 5d1 6s2', shells: [2, 8, 18, 25, 9, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '1313', boilingPoint: '3273', density: '7.90', discoveredBy: 'Jean Charles Galissard de Marignac', summary: 'MRI contrast agent, absorbs neutrons, used in electronics.' },
  { number: 65, symbol: 'Tb', name: 'Terbium', atomicMass: '158.93', electronConfiguration: '[Xe] 4f9 6s2', shells: [2, 8, 18, 27, 8, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '1356', boilingPoint: '3230', density: '8.23', discoveredBy: 'Carl Gustaf Mosander', summary: 'Used in green phosphors, magnets, stabilizes fuel cells.' },
  { number: 66, symbol: 'Dy', name: 'Dysprosium', atomicMass: '162.50', electronConfiguration: '[Xe] 4f10 6s2', shells: [2, 8, 18, 28, 8, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '1407', boilingPoint: '2567', density: '8.540', discoveredBy: 'Lecoq de Boisbaudran', summary: 'Strengthens magnets, used in lasers, absorbs neutrons effectively.' },
  { number: 67, symbol: 'Ho', name: 'Holmium', atomicMass: '164.93', electronConfiguration: '[Xe] 4f11 6s2', shells: [2, 8, 18, 29, 8, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '1461', boilingPoint: '2600', density: '8.79', discoveredBy: 'Per Teodor Cleve', summary: 'Strongest magnetic element, used in lasers, rare earth.' },
  { number: 68, symbol: 'Er', name: 'Erbium', atomicMass: '167.26', electronConfiguration: '[Xe] 4f12 6s2', shells: [2, 8, 18, 30, 8, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '1529', boilingPoint: '2868', density: '9.066', discoveredBy: 'Carl Gustaf Mosander', summary: 'Used in fiber optics, lasers, pink glass coloring.' },
  { number: 69, symbol: 'Tm', name: 'Thulium', atomicMass: '168.93', electronConfiguration: '[Xe] 4f13 6s2', shells: [2, 8, 18, 31, 8, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '1545', boilingPoint: '1950', density: '9.32', discoveredBy: 'Per Teodor Cleve', summary: 'Rarest stable lanthanide, used in portable X-ray devices.' },
  { number: 70, symbol: 'Yb', name: 'Ytterbium', atomicMass: '173.05', electronConfiguration: '[Xe] 4f14 6s2', shells: [2, 8, 18, 32, 8, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '824', boilingPoint: '1196', density: '6.90', discoveredBy: 'Jean Charles Galissard de Marignac', summary: 'Atomic clocks, fiber optics, named after Ytterby, Sweden.' },
  { number: 71, symbol: 'Lu', name: 'Lutetium', atomicMass: '174.97', electronConfiguration: '[Xe] 4f14 5d1 6s2', shells: [2, 8, 18, 32, 9, 2], state: 'Solid', category: 'lanthanide', meltingPoint: '1652', boilingPoint: '3402', density: '9.841', discoveredBy: 'Georges Urbain', summary: 'Densest and hardest lanthanide, used in catalysts, PET scans.' },
  { number: 72, symbol: 'Hf', name: 'Hafnium', atomicMass: '178.49', electronConfiguration: '[Xe] 4f14 5d2 6s2', shells: [2, 8, 18, 32, 10, 2], state: 'Solid', category: 'transition metal', meltingPoint: '2233', boilingPoint: '4603', density: '13.31', discoveredBy: 'Dirk Coster', summary: 'Used in nuclear control rods, transistor manufacturing, high melting point.' },
  { number: 73, symbol: 'Ta', name: 'Tantalum', atomicMass: '180.95', electronConfiguration: '[Xe] 4f14 5d3 6s2', shells: [2, 8, 18, 32, 11, 2], state: 'Solid', category: 'transition metal', meltingPoint: '3017', boilingPoint: '5458', density: '16.65', discoveredBy: 'Anders Gustaf Ekeberg', summary: 'High melting point, used in capacitors, surgical implants, corrosion-proof.' },
  { number: 74, symbol: 'W', name: 'Tungsten', atomicMass: '183.84', electronConfiguration: '[Xe] 4f14 5d4 6s2', shells: [2, 8, 18, 32, 12, 2], state: 'Solid', category: 'transition metal', meltingPoint: '3422', boilingPoint: '5555', density: '19.25', discoveredBy: 'Juan José Elhuyar', summary: 'Highest melting point, used in light bulbs, cutting tools, heavy alloys.' },
  { number: 75, symbol: 'Re', name: 'Rhenium', atomicMass: '186.21', electronConfiguration: '[Xe] 4f14 5d5 6s2', shells: [2, 8, 18, 32, 13, 2], state: 'Solid', category: 'transition metal', meltingPoint: '3186', boilingPoint: '5596', density: '21.02', discoveredBy: 'Masataka Ogawa', summary: 'One of rarest elements, jet engines, thermocouples, catalysts.' },
  { number: 76, symbol: 'Os', name: 'Osmium', atomicMass: '190.23', electronConfiguration: '[Xe] 4f14 5d6 6s2', shells: [2, 8, 18, 32, 14, 2], state: 'Solid', category: 'transition metal', meltingPoint: '3045', boilingPoint: '5027', density: '22.59', discoveredBy: 'Smithson Tennant', summary: 'Densest natural element, fountain pen tips, electrical contacts, toxic.' },
  { number: 77, symbol: 'Ir', name: 'Iridium', atomicMass: '192.22', electronConfiguration: '[Xe] 4f14 5d7 6s2', shells: [2, 8, 18, 32, 15, 2], state: 'Solid', category: 'transition metal', meltingPoint: '2446', boilingPoint: '4428', density: '22.56', discoveredBy: 'Smithson Tennant', summary: 'Corrosion-resistant, spark plugs, K-T boundary layer, rare metal.' },
  { number: 78, symbol: 'Pt', name: 'Platinum', atomicMass: '195.08', electronConfiguration: '[Xe] 4f14 5d9 6s1', shells: [2, 8, 18, 32, 17, 1], state: 'Solid', category: 'transition metal', meltingPoint: '1768.3', boilingPoint: '3825', density: '21.46', discoveredBy: 'Antonio de Ulloa', summary: 'Catalytic properties, jewelry, catalytic converters, chemotherapy drugs.' },
  { number: 79, symbol: 'Au', name: 'Gold', atomicMass: '196.97', electronConfiguration: '[Xe] 4f14 5d10 6s1', shells: [2, 8, 18, 32, 18, 1], state: 'Solid', category: 'transition metal', meltingPoint: '1064.18', boilingPoint: '2856', density: '19.3', discoveredBy: 'Ancient', summary: 'Malleable precious metal, excellent conductor, used in electronics, currency.' },
  { number: 80, symbol: 'Hg', name: 'Mercury', atomicMass: '200.59', electronConfiguration: '[Xe] 4f14 5d10 6s2', shells: [2, 8, 18, 32, 18, 2], state: 'Liquid', category: 'transition metal', meltingPoint: '-38.83', boilingPoint: '356.73', density: '13.534', discoveredBy: 'Ancient', summary: 'Liquid at room temperature, thermometers, dental amalgams, toxic heavy metal.' },
  { number: 81, symbol: 'Tl', name: 'Thallium', atomicMass: '204.38', electronConfiguration: '[Xe] 4f14 5d10 6s2 6p1', shells: [2, 8, 18, 32, 18, 3], state: 'Solid', category: 'post-transition metal', meltingPoint: '304', boilingPoint: '1473', density: '11.85', discoveredBy: 'William Crookes', summary: 'Toxic metal, rat poison, optical lenses, cardiovascular imaging.' },
  { number: 82, symbol: 'Pb', name: 'Lead', atomicMass: '207.2', electronConfiguration: '[Xe] 4f14 5d10 6s2 6p2', shells: [2, 8, 18, 32, 18, 4], state: 'Solid', category: 'post-transition metal', meltingPoint: '327.5', boilingPoint: '1749', density: '11.34', discoveredBy: 'Ancient', summary: 'Dense soft metal, radiation shielding, batteries, toxic cumulative poison.' },
  { number: 83, symbol: 'Bi', name: 'Bismuth', atomicMass: '208.98', electronConfiguration: '[Xe] 4f14 5d10 6s2 6p3', shells: [2, 8, 18, 32, 18, 5], state: 'Solid', category: 'post-transition metal', meltingPoint: '271.5', boilingPoint: '1564', density: '9.78', discoveredBy: 'Claude François Geoffroy', summary: 'Low toxicity metal, medicines, cosmetics, replacing lead in alloys.' },
  { number: 84, symbol: 'Po', name: 'Polonium', atomicMass: '209', electronConfiguration: '[Xe] 4f14 5d10 6s2 6p4', shells: [2, 8, 18, 32, 18, 6], state: 'Solid', category: 'post-transition metal', meltingPoint: '254', boilingPoint: '962', density: '9.196', discoveredBy: 'Pierre and Marie Curie', summary: 'Highly radioactive, rare element, discovered by Marie Curie, toxic.' },
  { number: 85, symbol: 'At', name: 'Astatine', atomicMass: '210', electronConfiguration: '[Xe] 4f14 5d10 6s2 6p5', shells: [2, 8, 18, 32, 18, 7], state: 'Solid', category: 'halogen', meltingPoint: '302', boilingPoint: '350', density: null, discoveredBy: 'Dale R. Corson', summary: 'Rarest naturally occurring element, radioactive halogen, cancer treatment research.' },
  { number: 86, symbol: 'Rn', name: 'Radon', atomicMass: '222', electronConfiguration: '[Xe] 4f14 5d10 6s2 6p6', shells: [2, 8, 18, 32, 18, 8], state: 'Gas', category: 'noble gas', meltingPoint: '-71', boilingPoint: '-61.7', density: '9.73', discoveredBy: 'Friedrich Ernst Dorn', summary: 'Radioactive noble gas, indoor air hazard, lung cancer risk, geology.' },
  { number: 87, symbol: 'Fr', name: 'Francium', atomicMass: '223', electronConfiguration: '[Rn] 7s1', shells: [2, 8, 18, 32, 18, 8, 1], state: 'Solid', category: 'alkali metal', meltingPoint: '27', boilingPoint: '677', density: null, discoveredBy: 'Marguerite Perey', summary: 'Rarest natural element, highly radioactive, alkali metal, no stable isotopes.' },
  { number: 88, symbol: 'Ra', name: 'Radium', atomicMass: '226', electronConfiguration: '[Rn] 7s2', shells: [2, 8, 18, 32, 18, 8, 2], state: 'Solid', category: 'alkaline earth metal', meltingPoint: '700', boilingPoint: '1737', density: '5.5', discoveredBy: 'Pierre and Marie Curie', summary: 'Radioactive alkaline earth, luminescent paint, bone cancer risk, Curie discovery.' },
  // Actinides (89-103)
  { number: 89, symbol: 'Ac', name: 'Actinium', atomicMass: '227', electronConfiguration: '[Rn] 6d1 7s2', shells: [2, 8, 18, 32, 18, 9, 2], state: 'Solid', category: 'actinide', meltingPoint: '1050', boilingPoint: '3198', density: '10.07', discoveredBy: 'Friedrich O. Giesel', summary: 'Highly radioactive, silvery metal, cancer treatment research, glows blue.' },
  { number: 90, symbol: 'Th', name: 'Thorium', atomicMass: '232.04', electronConfiguration: '[Rn] 6d2 7s2', shells: [2, 8, 18, 32, 18, 10, 2], state: 'Solid', category: 'actinide', meltingPoint: '1750', boilingPoint: '4788', density: '11.72', discoveredBy: 'Jöns Jacob Berzelius', summary: 'Radioactive metal, potential nuclear fuel, heat-resistant alloys, abundant.' },
  { number: 91, symbol: 'Pa', name: 'Protactinium', atomicMass: '231.04', electronConfiguration: '[Rn] 5f2 6d1 7s2', shells: [2, 8, 18, 32, 20, 9, 2], state: 'Solid', category: 'actinide', meltingPoint: '1572', boilingPoint: '4000', density: '15.37', discoveredBy: 'Kazimierz Fajans', summary: 'Rare, radioactive, discovered in 1917, used in research only.' },
  { number: 92, symbol: 'U', name: 'Uranium', atomicMass: '238.03', electronConfiguration: '[Rn] 5f3 6d1 7s2', shells: [2, 8, 18, 32, 21, 9, 2], state: 'Solid', category: 'actinide', meltingPoint: '1132.2', boilingPoint: '4131', density: '19.1', discoveredBy: 'Martin Heinrich Klaproth', summary: 'Nuclear fuel, radioactive, discovered 1789, powers reactors, weapons.' },
  { number: 93, symbol: 'Np', name: 'Neptunium', atomicMass: '237', electronConfiguration: '[Rn] 5f4 6d1 7s2', shells: [2, 8, 18, 32, 22, 9, 2], state: 'Solid', category: 'actinide', meltingPoint: '644', boilingPoint: '3902', density: '20.45', discoveredBy: 'Edwin McMillan', summary: 'Radioactive, first transuranium, used in neutron detectors, research.' },
  { number: 94, symbol: 'Pu', name: 'Plutonium', atomicMass: '244', electronConfiguration: '[Rn] 5f6 7s2', shells: [2, 8, 18, 32, 24, 8, 2], state: 'Solid', category: 'actinide', meltingPoint: '639.4', boilingPoint: '3228', density: '19.816', discoveredBy: 'Glenn T. Seaborg', summary: 'Nuclear fuel, weapons, radioactive, discovered 1940, highly toxic.' },
  { number: 95, symbol: 'Am', name: 'Americium', atomicMass: '243', electronConfiguration: '[Rn] 5f7 7s2', shells: [2, 8, 18, 32, 25, 8, 2], state: 'Solid', category: 'actinide', meltingPoint: '1176', boilingPoint: '2607', density: '13.69', discoveredBy: 'Glenn T. Seaborg', summary: 'Used in smoke detectors, radioactive, discovered 1944, synthetic.' },
  { number: 96, symbol: 'Cm', name: 'Curium', atomicMass: '247', electronConfiguration: '[Rn] 5f7 6d1 7s2', shells: [2, 8, 18, 32, 25, 9, 2], state: 'Solid', category: 'actinide', meltingPoint: '1340', boilingPoint: '3110', density: '13.51', discoveredBy: 'Glenn T. Seaborg', summary: 'Radioactive, named after Curies, used in space batteries.' },
  { number: 97, symbol: 'Bk', name: 'Berkelium', atomicMass: '247', electronConfiguration: '[Rn] 5f9 7s2', shells: [2, 8, 18, 32, 27, 8, 2], state: 'Solid', category: 'actinide', meltingPoint: '986', boilingPoint: null, density: '14.78', discoveredBy: 'Glenn T. Seaborg', summary: 'Synthetic, radioactive, discovered 1949, used in research only.' },
  { number: 98, symbol: 'Cf', name: 'Californium', atomicMass: '251', electronConfiguration: '[Rn] 5f10 7s2', shells: [2, 8, 18, 32, 28, 8, 2], state: 'Solid', category: 'actinide', meltingPoint: '900', boilingPoint: null, density: '15.1', discoveredBy: 'Glenn T. Seaborg', summary: 'Radioactive, neutron emitter, used in mining, discovered 1950.' },
  { number: 99, symbol: 'Es', name: 'Einsteinium', atomicMass: '252', electronConfiguration: '[Rn] 5f11 7s2', shells: [2, 8, 18, 32, 29, 8, 2], state: 'Solid', category: 'actinide', meltingPoint: '860', boilingPoint: null, density: null, discoveredBy: 'Albert Ghiorso', summary: 'Synthetic, radioactive, discovered 1952, named after Einstein.' },
  { number: 100, symbol: 'Fm', name: 'Fermium', atomicMass: '257', electronConfiguration: '[Rn] 5f12 7s2', shells: [2, 8, 18, 32, 30, 8, 2], state: 'Solid', category: 'actinide', meltingPoint: '1527', boilingPoint: null, density: null, discoveredBy: 'Albert Ghiorso', summary: 'Synthetic, radioactive, discovered in hydrogen bomb debris, 1952.' },
  { number: 101, symbol: 'Md', name: 'Mendelevium', atomicMass: '258', electronConfiguration: '[Rn] 5f13 7s2', shells: [2, 8, 18, 32, 31, 8, 2], state: 'Solid', category: 'actinide', meltingPoint: '827', boilingPoint: null, density: null, discoveredBy: 'Albert Ghiorso', summary: 'Synthetic, radioactive, named after Mendeleev, discovered 1955.' },
  { number: 102, symbol: 'No', name: 'Nobelium', atomicMass: '259', electronConfiguration: '[Rn] 5f14 7s2', shells: [2, 8, 18, 32, 32, 8, 2], state: 'Solid', category: 'actinide', meltingPoint: '827', boilingPoint: null, density: null, discoveredBy: 'Joint Institute for Nuclear Research', summary: 'Synthetic, radioactive, named after Nobel, discovered 1958.' },
  { number: 103, symbol: 'Lr', name: 'Lawrencium', atomicMass: '262', electronConfiguration: '[Rn] 5f14 7s2 7p1', shells: [2, 8, 18, 32, 32, 8, 3], state: 'Solid', category: 'actinide', meltingPoint: '1627', boilingPoint: null, density: null, discoveredBy: 'Albert Ghiorso', summary: 'Synthetic, radioactive, named after Lawrence, discovered 1961.' },
  // Superheavy elements (104-118)
  { number: 104, symbol: 'Rf', name: 'Rutherfordium', atomicMass: '267', electronConfiguration: '[Rn] 5f14 6d2 7s2', shells: [2, 8, 18, 32, 32, 10, 2], state: 'Solid', category: 'transition metal', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'Joint Institute for Nuclear Research', summary: 'Synthetic, radioactive, named after Rutherford, discovered 1969.' },
  { number: 105, symbol: 'Db', name: 'Dubnium', atomicMass: '268', electronConfiguration: '[Rn] 5f14 6d3 7s2', shells: [2, 8, 18, 32, 32, 11, 2], state: 'Solid', category: 'transition metal', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'Joint Institute for Nuclear Research', summary: 'Synthetic, radioactive, named after Dubna, discovered 1967.' },
  { number: 106, symbol: 'Sg', name: 'Seaborgium', atomicMass: '269', electronConfiguration: '[Rn] 5f14 6d4 7s2', shells: [2, 8, 18, 32, 32, 12, 2], state: 'Solid', category: 'transition metal', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'Lawrence Berkeley National Laboratory', summary: 'Synthetic, radioactive, named after Seaborg, discovered 1974.' },
  { number: 107, symbol: 'Bh', name: 'Bohrium', atomicMass: '270', electronConfiguration: '[Rn] 5f14 6d5 7s2', shells: [2, 8, 18, 32, 32, 13, 2], state: 'Solid', category: 'transition metal', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'Gesellschaft für Schwerionenforschung', summary: 'Synthetic, radioactive, named after Bohr, discovered 1981.' },
  { number: 108, symbol: 'Hs', name: 'Hassium', atomicMass: '269', electronConfiguration: '[Rn] 5f14 6d6 7s2', shells: [2, 8, 18, 32, 32, 14, 2], state: 'Solid', category: 'transition metal', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'Gesellschaft für Schwerionenforschung', summary: 'Synthetic, radioactive, named after Hesse, discovered 1984.' },
  { number: 109, symbol: 'Mt', name: 'Meitnerium', atomicMass: '278', electronConfiguration: '[Rn] 5f14 6d7 7s2', shells: [2, 8, 18, 32, 32, 15, 2], state: 'Solid', category: 'transition metal', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'Gesellschaft für Schwerionenforschung', summary: 'Synthetic, radioactive, named after Meitner, discovered 1982.' },
  { number: 110, symbol: 'Ds', name: 'Darmstadtium', atomicMass: '281', electronConfiguration: '[Rn] 5f14 6d8 7s2', shells: [2, 8, 18, 32, 32, 16, 2], state: 'Solid', category: 'transition metal', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'Gesellschaft für Schwerionenforschung', summary: 'Synthetic, radioactive, named after Darmstadt, discovered 1994.' },
  { number: 111, symbol: 'Rg', name: 'Roentgenium', atomicMass: '282', electronConfiguration: '[Rn] 5f14 6d9 7s2', shells: [2, 8, 18, 32, 32, 17, 2], state: 'Solid', category: 'transition metal', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'Gesellschaft für Schwerionenforschung', summary: 'Synthetic, radioactive, named after Röntgen, discovered 1994.' },
  { number: 112, symbol: 'Cn', name: 'Copernicium', atomicMass: '285', electronConfiguration: '[Rn] 5f14 6d10 7s2', shells: [2, 8, 18, 32, 32, 18, 2], state: 'Solid', category: 'transition metal', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'Gesellschaft für Schwerionenforschung', summary: 'Synthetic, radioactive, named after Copernicus, discovered 1996.' },
  { number: 113, symbol: 'Nh', name: 'Nihonium', atomicMass: '286', electronConfiguration: '[Rn] 5f14 6d10 7s2 7p1', shells: [2, 8, 18, 32, 32, 18, 3], state: 'Solid', category: 'post-transition metal', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'RIKEN', summary: 'Synthetic, radioactive, named after Japan, discovered 2003.' },
  { number: 114, symbol: 'Fl', name: 'Flerovium', atomicMass: '289', electronConfiguration: '[Rn] 5f14 6d10 7s2 7p2', shells: [2, 8, 18, 32, 32, 18, 4], state: 'Solid', category: 'post-transition metal', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'Joint Institute for Nuclear Research', summary: 'Synthetic, radioactive, named after Flerov Laboratory, discovered 1998.' },
  { number: 115, symbol: 'Mc', name: 'Moscovium', atomicMass: '290', electronConfiguration: '[Rn] 5f14 6d10 7s2 7p3', shells: [2, 8, 18, 32, 32, 18, 5], state: 'Solid', category: 'post-transition metal', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'Joint Institute for Nuclear Research', summary: 'Synthetic, radioactive, named after Moscow, discovered 2003.' },
  { number: 116, symbol: 'Lv', name: 'Livermorium', atomicMass: '293', electronConfiguration: '[Rn] 5f14 6d10 7s2 7p4', shells: [2, 8, 18, 32, 32, 18, 6], state: 'Solid', category: 'post-transition metal', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'Joint Institute for Nuclear Research', summary: 'Synthetic, radioactive, named after Livermore, discovered 2000.' },
  { number: 117, symbol: 'Ts', name: 'Tennessine', atomicMass: '294', electronConfiguration: '[Rn] 5f14 6d10 7s2 7p5', shells: [2, 8, 18, 32, 32, 18, 7], state: 'Solid', category: 'halogen', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'Joint Institute for Nuclear Research', summary: 'Synthetic, radioactive, named after Tennessee, discovered 2010.' },
  { number: 118, symbol: 'Og', name: 'Oganesson', atomicMass: '294', electronConfiguration: '[Rn] 5f14 6d10 7s2 7p6', shells: [2, 8, 18, 32, 32, 18, 8], state: 'Solid', category: 'noble gas', meltingPoint: null, boilingPoint: null, density: null, discoveredBy: 'Joint Institute for Nuclear Research', summary: 'Synthetic, radioactive, named after Oganessian, discovered 2002.' }
].map(el => ({
  ...el,
  imageUrl: ELEMENT_IMAGES[el.number] || ''
}));

// Keep for backwards compatibility
export const ELEMENTS = ALL_ELEMENTS.slice(0, 7);

export const COURSES: Course[] = [
  // Row 1
  {
    id: 'basic-chemistry',
    title: 'Basic Chemistry',
    lessons: 6,
    isFree: true,
    isLocked: false,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop',
    description: 'Understand atoms, elements, and reactions—the foundation of all chemistry starts here.'
  },
  {
    id: 'acids-bases',
    title: 'Acids & Bases',
    lessons: 6,
    isFree: true,
    isLocked: false,
    image: 'https://static.vecteezy.com/system/resources/thumbnails/041/419/237/small_2x/ai-generated-test-tubes-contain-vibrant-fluids-free-photo.jpg',
    description: 'Explore acids and bases in everyday life, from food to powerful chemical reactions.'
  },
  // Row 2
  {
    id: 'electrochemistry',
    title: 'Electrochemistry',
    lessons: 6,
    isFree: true,
    isLocked: false,
    image: 'https://www.openaccessgovernment.org/wp-content/uploads/2024/09/iStock-1488523826-1920x1080.jpg',
    description: 'Discover how chemical reactions produce electricity and power modern devices.'
  },
  {
    id: 'thermochemistry',
    title: 'Thermochemistry',
    lessons: 6,
    isFree: true,
    isLocked: false,
    image: 'https://tse2.mm.bing.net/th/id/OIP.Qp0HGN8RxlAo0vlJP17SCQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'Learn how energy changes during reactions and why heat is released or absorbed.'
  },
  // Row 3
  {
    id: 'organic-chemistry',
    title: 'Organic Chemistry',
    lessons: 8,
    isFree: true,
    isLocked: false,
    image: 'https://m.media-amazon.com/images/I/71-6PJ+NrgL.jpg',
    description: 'Study carbon compounds that form fuels, medicines, and the chemistry of life.'
  },
  {
    id: 'nuclear-chemistry',
    title: 'Nuclear Chemistry',
    lessons: 5,
    isFree: true,
    isLocked: false,
    image: 'https://cdn.planetdeadly.com/wp-content/uploads/pacific-nuclear-test.jpg',
    description: 'Explore nuclear reactions and their powerful uses in energy and medicine.'
  }
];

import { Lesson, QuizQuestion } from '../types';

// Comprehensive Course Quiz Questions (20 per course)
export const COURSE_QUIZZES: Record<string, QuizQuestion[]> = {
  'basic-chemistry': [
    { id: 'bc-1', question: 'What is the basic unit of matter?', options: ['Atom', 'Molecule', 'Element', 'Compound'], correctAnswer: 0 },
    { id: 'bc-2', question: 'Which subatomic particle has a negative charge?', options: ['Proton', 'Neutron', 'Electron', 'Photon'], correctAnswer: 2 },
    { id: 'bc-3', question: 'What determines the identity of an element?', options: ['Number of neutrons', 'Number of protons', 'Number of electrons', 'Atomic mass'], correctAnswer: 1 },
    { id: 'bc-4', question: 'Which state of matter has a definite shape and volume?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], correctAnswer: 0 },
    { id: 'bc-5', question: 'What is formed when two or more elements chemically combine?', options: ['Mixture', 'Solution', 'Compound', 'Colloid'], correctAnswer: 2 },
    { id: 'bc-6', question: 'What type of bond involves the sharing of electrons?', options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], correctAnswer: 1 },
    { id: 'bc-7', question: 'Which particle is found in the nucleus of an atom?', options: ['Electron', 'Neutron', 'Photon', 'Quark'], correctAnswer: 1 },
    { id: 'bc-8', question: 'What is the pH of pure water?', options: ['0', '7', '14', '10'], correctAnswer: 1 },
    { id: 'bc-9', question: 'What happens to the speed of molecules when temperature increases?', options: ['Decreases', 'Stays same', 'Increases', 'Stops'], correctAnswer: 2 },
    { id: 'bc-10', question: 'Which element is the most abundant in the universe?', options: ['Oxygen', 'Carbon', 'Hydrogen', 'Nitrogen'], correctAnswer: 2 },
    { id: 'bc-11', question: 'What is the chemical formula for water?', options: ['CO₂', 'H₂O', 'NaCl', 'O₂'], correctAnswer: 1 },
    { id: 'bc-12', question: 'What property measures how much matter is in an object?', options: ['Volume', 'Mass', 'Density', 'Weight'], correctAnswer: 1 },
    { id: 'bc-13', question: 'Which gas is essential for combustion?', options: ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Helium'], correctAnswer: 1 },
    { id: 'bc-14', question: 'What type of reaction releases heat?', options: ['Endothermic', 'Exothermic', 'Isothermal', 'Adiabatic'], correctAnswer: 1 },
    { id: 'bc-15', question: 'Which element has the symbol Au?', options: ['Silver', 'Gold', 'Aluminum', 'Argon'], correctAnswer: 1 },
    { id: 'bc-16', question: 'What is the center of an atom called?', options: ['Orbit', 'Shell', 'Nucleus', 'Core'], correctAnswer: 2 },
    { id: 'bc-17', question: 'How many electrons can the first shell hold?', options: ['2', '8', '18', '32'], correctAnswer: 0 },
    { id: 'bc-18', question: 'What is the freezing point of water in Celsius?', options: ['0°C', '100°C', '32°C', '-10°C'], correctAnswer: 0 },
    { id: 'bc-19', question: 'Which scientist proposed the atomic theory?', options: ['Newton', 'Dalton', 'Einstein', 'Galileo'], correctAnswer: 1 },
    { id: 'bc-20', question: 'What is a mixture where particles settle over time?', options: ['Solution', 'Suspension', 'Colloid', 'Emulsion'], correctAnswer: 1 }
  ],
  'acids-bases': [
    { id: 'ab-1', question: 'What is the pH range of acids?', options: ['0-7', '7-14', '7', '14'], correctAnswer: 0 },
    { id: 'ab-2', question: 'Which ion do bases produce in water?', options: ['H⁺', 'OH⁻', 'Na⁺', 'Cl⁻'], correctAnswer: 1 },
    { id: 'ab-3', question: 'What color does litmus turn in acid?', options: ['Blue', 'Red', 'Purple', 'Green'], correctAnswer: 1 },
    { id: 'ab-4', question: 'What is the pH of a strong base?', options: ['1', '7', '13', '5'], correctAnswer: 2 },
    { id: 'ab-5', question: 'Which acid is found in vinegar?', options: ['Citric acid', 'Acetic acid', 'Hydrochloric acid', 'Sulfuric acid'], correctAnswer: 1 },
    { id: 'ab-6', question: 'What happens when acid reacts with metal?', options: ['No reaction', 'Produces salt + water', 'Produces salt + hydrogen', 'Produces base'], correctAnswer: 2 },
    { id: 'ab-7', question: 'What is a substance that can act as both acid and base called?', options: ['Amphoteric', 'Neutral', 'Ionic', 'Covalent'], correctAnswer: 0 },
    { id: 'ab-8', question: 'Which base is used in drain cleaners?', options: ['NaOH', 'HCl', 'H₂SO₄', 'NaCl'], correctAnswer: 0 },
    { id: 'ab-9', question: 'What is produced when acid and base neutralize?', options: ['Acid', 'Base', 'Salt + Water', 'Gas'], correctAnswer: 2 },
    { id: 'ab-10', question: 'What does pH stand for?', options: ['Potential of Hydrogen', 'Power of Helium', 'Particle Heat', 'Proton Hydrogen'], correctAnswer: 0 },
    { id: 'ab-11', question: 'Which acid is found in stomach?', options: ['H₂SO₄', 'HNO₃', 'HCl', 'H₂CO₃'], correctAnswer: 2 },
    { id: 'ab-12', question: 'What color does phenolphthalein turn in base?', options: ['Colorless', 'Pink', 'Yellow', 'Blue'], correctAnswer: 1 },
    { id: 'ab-13', question: 'What is the pH of blood?', options: ['4', '7.4', '10', '14'], correctAnswer: 1 },
    { id: 'ab-14', question: 'Which acid is known as the king of chemicals?', options: ['HCl', 'HNO₃', 'H₂SO₄', 'H₂CO₃'], correctAnswer: 2 },
    { id: 'ab-15', question: 'What gas is released when acid reacts with carbonate?', options: ['Oxygen', 'Hydrogen', 'Carbon dioxide', 'Nitrogen'], correctAnswer: 2 },
    { id: 'ab-16', question: 'Which substance has pH 7?', options: ['Lemon juice', 'Water', 'Vinegar', 'Soap'], correctAnswer: 1 },
    { id: 'ab-17', question: 'What is a weak acid?', options: ['HCl', 'H₂SO₄', 'CH₃COOH', 'HNO₃'], correctAnswer: 2 },
    { id: 'ab-18', question: 'What property measures acid strength?', options: ['pH', 'Concentration', 'Ka value', 'Color'], correctAnswer: 2 },
    { id: 'ab-19', question: 'Which base is found in milk of magnesia?', options: ['NaOH', 'Mg(OH)₂', 'Ca(OH)₂', 'KOH'], correctAnswer: 1 },
    { id: 'ab-20', question: 'What happens to pH when acid is diluted?', options: ['Decreases', 'Increases towards 7', 'Stays same', 'Becomes 14'], correctAnswer: 1 }
  ],
  'electrochemistry': [
    { id: 'ec-1', question: 'What is the study of chemical reactions producing electricity?', options: ['Thermodynamics', 'Electrochemistry', 'Kinetics', 'Equilibrium'], correctAnswer: 1 },
    { id: 'ec-2', question: 'What is the electrode where oxidation occurs?', options: ['Cathode', 'Anode', 'Electrolyte', 'Salt bridge'], correctAnswer: 1 },
    { id: 'ec-3', question: 'What is the SI unit of electric charge?', options: ['Volt', 'Ampere', 'Coulomb', 'Watt'], correctAnswer: 2 },
    { id: 'ec-4', question: 'Which direction do electrons flow in a galvanic cell?', options: ['Anode to Cathode', 'Cathode to Anode', 'Both ways', 'No flow'], correctAnswer: 0 },
    { id: 'ec-5', question: 'What is a spontaneous electrochemical cell called?', options: ['Electrolytic', 'Galvanic', 'Fuel cell', 'Battery'], correctAnswer: 1 },
    { id: 'ec-6', question: 'What is the standard electrode potential of hydrogen?', options: ['+1.0 V', '0.0 V', '-1.0 V', '+2.0 V'], correctAnswer: 1 },
    { id: 'ec-7', question: 'What device converts chemical energy to electrical energy?', options: ['Motor', 'Generator', 'Battery', 'Transformer'], correctAnswer: 2 },
    { id: 'ec-8', question: 'What is the process of depositing metal using electricity?', options: ['Electrolysis', 'Electroplating', 'Electrorefining', 'Electrowinning'], correctAnswer: 1 },
    { id: 'ec-9', question: 'Which metal is commonly used as a sacrificial anode?', options: ['Copper', 'Zinc', 'Gold', 'Silver'], correctAnswer: 1 },
    { id: 'ec-10', question: 'What is corrosion of iron called?', options: ['Tarnishing', 'Rusting', 'Pitting', 'Galvanization'], correctAnswer: 1 },
    { id: 'ec-11', question: 'What is the purpose of a salt bridge?', options: ['Conduct electricity', 'Maintain charge neutrality', 'Store energy', 'Heat the cell'], correctAnswer: 1 },
    { id: 'ec-12', question: 'Which cell requires external energy to operate?', options: ['Galvanic', 'Fuel cell', 'Electrolytic', 'Solar'], correctAnswer: 2 },
    { id: 'ec-13', question: 'What is Faradays first law about?', options: ['Mass deposited', 'Current flow', 'Voltage', 'Resistance'], correctAnswer: 0 },
    { id: 'ec-14', question: 'What metal is extracted by Hall-Heroult process?', options: ['Iron', 'Copper', 'Aluminum', 'Zinc'], correctAnswer: 2 },
    { id: 'ec-15', question: 'What happens at cathode during electrolysis?', options: ['Oxidation', 'Reduction', 'Neutralization', 'Precipitation'], correctAnswer: 1 },
    { id: 'ec-16', question: 'Which is a secondary cell?', options: ['Dry cell', 'Lead-acid battery', 'Fuel cell', 'Solar cell'], correctAnswer: 1 },
    { id: 'ec-17', question: 'What is the EMF of a cell measured in?', options: ['Amperes', 'Volts', 'Watts', 'Ohms'], correctAnswer: 1 },
    { id: 'ec-18', question: 'What is used as electrolyte in dry cell?', options: ['Water', 'Ammonium chloride paste', 'Sulfuric acid', 'Sodium hydroxide'], correctAnswer: 1 },
    { id: 'ec-19', question: 'Which metal has highest standard reduction potential?', options: ['Sodium', 'Lithium', 'Fluorine', 'Potassium'], correctAnswer: 2 },
    { id: 'ec-20', question: 'What is the charge on an electron?', options: ['Positive', 'Negative', 'Neutral', 'Variable'], correctAnswer: 1 }
  ],
  'thermochemistry': [
    { id: 'tc-1', question: 'What is the study of heat in chemical reactions?', options: ['Thermodynamics', 'Thermochemistry', 'Kinetics', 'Equilibrium'], correctAnswer: 1 },
    { id: 'tc-2', question: 'Which reactions release heat?', options: ['Endothermic', 'Exothermic', 'Isothermal', 'Adiabatic'], correctAnswer: 1 },
    { id: 'tc-3', question: 'What is the SI unit of heat energy?', options: ['Watt', 'Joule', 'Calorie', 'Kelvin'], correctAnswer: 1 },
    { id: 'tc-4', question: 'What is enthalpy?', options: ['Heat content', 'Temperature', 'Pressure', 'Volume'], correctAnswer: 0 },
    { id: 'tc-5', question: 'When ΔH is negative, the reaction is?', options: ['Endothermic', 'Exothermic', 'Neutral', 'Reversible'], correctAnswer: 1 },
    { id: 'tc-6', question: 'What is heat capacity measured in?', options: ['J/°C', 'J', '°C', 'J/mol'], correctAnswer: 0 },
    { id: 'tc-7', question: 'What law states energy cannot be created or destroyed?', options: ['Hess Law', 'First Law of Thermodynamics', 'Charles Law', 'Boyles Law'], correctAnswer: 1 },
    { id: 'tc-8', question: 'What is the heat of reaction at constant pressure?', options: ['ΔE', 'ΔH', 'ΔS', 'ΔG'], correctAnswer: 1 },
    { id: 'tc-9', question: 'Which process absorbs heat from surroundings?', options: ['Burning', 'Melting ice', 'Condensation', 'Freezing'], correctAnswer: 1 },
    { id: 'tc-10', question: 'What is standard enthalpy of formation of elements?', options: ['100 kJ/mol', '0 kJ/mol', '-100 kJ/mol', 'Variable'], correctAnswer: 1 },
    { id: 'tc-11', question: 'What does Hess Law relate to?', options: ['Heat of reaction', 'Pressure', 'Volume', 'Temperature'], correctAnswer: 0 },
    { id: 'tc-12', question: 'What happens to temperature in endothermic reaction?', options: ['Increases', 'Decreases', 'Stays same', 'Becomes zero'], correctAnswer: 1 },
    { id: 'tc-13', question: 'What is calorimetry used to measure?', options: ['Mass', 'Heat changes', 'Volume', 'Pressure'], correctAnswer: 1 },
    { id: 'tc-14', question: 'Which has higher energy: products or reactants in exothermic?', options: ['Products', 'Reactants', 'Equal', 'Cannot say'], correctAnswer: 1 },
    { id: 'tc-15', question: 'What is bond energy?', options: ['Energy to break a bond', 'Bond length', 'Bond strength', 'All of these'], correctAnswer: 0 },
    { id: 'tc-16', question: 'What is the heat of combustion?', options: ['Heat released on burning', 'Heat absorbed', 'Heat stored', 'Heat transferred'], correctAnswer: 0 },
    { id: 'tc-17', question: 'Which state has highest enthalpy?', options: ['Solid', 'Liquid', 'Gas', 'All equal'], correctAnswer: 2 },
    { id: 'tc-18', question: 'What does specific heat capacity depend on?', options: ['Mass only', 'Substance nature', 'Temperature only', 'Pressure only'], correctAnswer: 1 },
    { id: 'tc-19', question: 'What is an adiabatic process?', options: ['No heat exchange', 'Constant temperature', 'Constant pressure', 'Constant volume'], correctAnswer: 0 },
    { id: 'tc-20', question: 'Which is an exothermic process?', options: ['Evaporation', 'Condensation', 'Sublimation', 'Melting'], correctAnswer: 1 }
  ],
  'organic-chemistry': [
    { id: 'oc-1', question: 'Which element is the backbone of organic compounds?', options: ['Oxygen', 'Carbon', 'Nitrogen', 'Hydrogen'], correctAnswer: 1 },
    { id: 'oc-2', question: 'What is the general formula of alkanes?', options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnHn'], correctAnswer: 1 },
    { id: 'oc-3', question: 'Which functional group is in alcohols?', options: ['-COOH', '-OH', '-CHO', '-NH2'], correctAnswer: 1 },
    { id: 'oc-4', question: 'What type of bond is in alkenes?', options: ['Single', 'Double', 'Triple', 'Ionic'], correctAnswer: 1 },
    { id: 'oc-5', question: 'Which is the simplest hydrocarbon?', options: ['Ethane', 'Methane', 'Propane', 'Butane'], correctAnswer: 1 },
    { id: 'oc-6', question: 'What is the functional group in aldehydes?', options: ['-OH', '-CHO', '-CO-', '-COOH'], correctAnswer: 1 },
    { id: 'oc-7', question: 'What type of reaction converts alkene to alkane?', options: ['Oxidation', 'Reduction', 'Addition', 'Substitution'], correctAnswer: 2 },
    { id: 'oc-8', question: 'Which test is used to detect unsaturation?', options: ['Bromine water test', 'Litmus test', 'Flame test', 'Tollens test'], correctAnswer: 0 },
    { id: 'oc-9', question: 'What is isomerism?', options: ['Same formula different structure', 'Different formula', 'Same structure', 'Different elements'], correctAnswer: 0 },
    { id: 'oc-10', question: 'Which acid is found in vinegar?', options: ['Citric', 'Acetic', 'Formic', 'Oxalic'], correctAnswer: 1 },
    { id: 'oc-11', question: 'What is the IUPAC name of CH3-CH3?', options: ['Methane', 'Ethane', 'Propane', 'Butane'], correctAnswer: 1 },
    { id: 'oc-12', question: 'Which hydrocarbon has triple bond?', options: ['Ethane', 'Ethene', 'Ethyne', 'Propane'], correctAnswer: 2 },
    { id: 'oc-13', question: 'What is combustion of hydrocarbons?', options: ['Reaction with oxygen', 'With nitrogen', 'With hydrogen', 'With chlorine'], correctAnswer: 0 },
    { id: 'oc-14', question: 'Which gas is used for welding?', options: ['Methane', 'Ethane', 'Acetylene', 'Propane'], correctAnswer: 2 },
    { id: 'oc-15', question: 'What is polymerization?', options: ['Breaking large molecules', 'Joining small molecules', 'Mixing polymers', 'Separating compounds'], correctAnswer: 1 },
    { id: 'oc-16', question: 'Which is a natural polymer?', options: ['Polyethylene', 'PVC', 'Protein', 'Nylon'], correctAnswer: 2 },
    { id: 'oc-17', question: 'What is the functional group in carboxylic acids?', options: ['-CHO', '-COOH', '-OH', '-CO-'], correctAnswer: 1 },
    { id: 'oc-18', question: 'Which compound is an ester?', options: ['CH3COOH', 'CH3COOCH3', 'CH3OH', 'CH3CHO'], correctAnswer: 1 },
    { id: 'oc-19', question: 'What does hydrogenation produce?', options: ['Alkenes from alkanes', 'Alkanes from alkenes', 'Alcohols', 'Acids'], correctAnswer: 1 },
    { id: 'oc-20', question: 'Which is not a hydrocarbon?', options: ['Methane', 'Benzene', 'Ethanol', 'Ethene'], correctAnswer: 2 }
  ],
  'nuclear-chemistry': [
    { id: 'nc-1', question: 'What is the center of an atom called?', options: ['Electron shell', 'Nucleus', 'Orbit', 'Valence'], correctAnswer: 1 },
    { id: 'nc-2', question: 'Which particle has no charge?', options: ['Proton', 'Electron', 'Neutron', 'Positron'], correctAnswer: 2 },
    { id: 'nc-3', question: 'What is radioactive decay?', options: ['Gaining electrons', 'Losing energy by emitting radiation', 'Chemical reaction', 'Physical change'], correctAnswer: 1 },
    { id: 'nc-4', question: 'Which radiation has the highest penetrating power?', options: ['Alpha', 'Beta', 'Gamma', 'X-ray'], correctAnswer: 2 },
    { id: 'nc-5', question: 'What is half-life?', options: ['Time for half to decay', 'Life of atom', 'Decay constant', 'Radiation intensity'], correctAnswer: 0 },
    { id: 'nc-6', question: 'What is nuclear fission?', options: ['Joining nuclei', 'Splitting heavy nucleus', 'Electron emission', 'Neutron capture'], correctAnswer: 1 },
    { id: 'nc-7', question: 'Where does nuclear fusion occur naturally?', options: ['Earth', 'Sun', 'Moon', 'Mars'], correctAnswer: 1 },
    { id: 'nc-8', question: 'What is the charge of alpha particle?', options: ['+2', '-2', '0', '+1'], correctAnswer: 0 },
    { id: 'nc-9', question: 'What can stop alpha particles?', options: ['Lead', 'Thick concrete', 'Paper or skin', 'Water'], correctAnswer: 2 },
    { id: 'nc-10', question: 'What is the mass number?', options: ['Protons only', 'Protons + neutrons', 'Electrons only', 'Neutrons only'], correctAnswer: 1 },
    { id: 'nc-11', question: 'What are isotopes?', options: ['Same protons different neutrons', 'Different elements', 'Same neutrons', 'Ions'], correctAnswer: 0 },
    { id: 'nc-12', question: 'What is carbon-14 used for?', options: ['Dating', 'Energy', 'Medicine', 'Industry'], correctAnswer: 0 },
    { id: 'nc-13', question: 'What happens in beta decay?', options: ['Proton to neutron', 'Neutron to proton', 'No change', 'Both change'], correctAnswer: 1 },
    { id: 'nc-14', question: 'What is a chain reaction?', options: ['Single fission', 'Self-sustaining fissions', 'Fusion process', 'Decay series'], correctAnswer: 1 },
    { id: 'nc-15', question: 'What is the main use of nuclear reactors?', options: ['Weapons only', 'Electricity generation', 'Research only', 'Medical only'], correctAnswer: 1 },
    { id: 'nc-16', question: 'What is uranium-235 used for?', options: ['Dating', 'Nuclear fuel', 'Medicine', 'Industry'], correctAnswer: 1 },
    { id: 'nc-17', question: 'What is the atomic number?', options: ['Number of protons', 'Number of neutrons', 'Mass number', 'Number of electrons'], correctAnswer: 0 },
    { id: 'nc-18', question: 'Which is a unit of radiation dose?', options: ['Watt', 'Sievert', 'Joule', 'Newton'], correctAnswer: 1 },
    { id: 'nc-19', question: 'What is background radiation?', options: ['Man-made only', 'Natural radiation', 'Medical only', 'Industrial only'], correctAnswer: 1 },
    { id: 'nc-20', question: 'What is the main risk of nuclear waste?', options: ['Heat only', 'Radioactivity', 'Volume', 'Weight'], correctAnswer: 1 }
  ]
};

export const LESSONS: Lesson[] = [
  {
    id: 'basic-chemistry-lesson-1',
    courseId: 'basic-chemistry',
    number: 1,
    title: 'What is Matter?',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'What is Matter?'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'Matter is anything that has mass and occupies space. It can be solid like iron, liquid like water, or gas like air. Everything we see around us in daily life is matter, even our own bodies.',
        highlights: ['mass', 'space'],
        imageUrl: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490?w=800&auto=format&fit=crop',
        imageAlt: 'Rock (solid), water (liquid), and steam (gas) representing states of matter'
      },
      {
        id: 'properties',
        type: 'paragraph',
        content: 'Matter has several properties that help us identify it, such as color, mass, volume, and density. Some of these properties can be observed easily like color, while others require measurement like mass.',
        highlights: ['mass', 'volume', 'density'],
        imageUrl: 'https://m.media-amazon.com/images/I/71z8F-odCAL.jpg',
        imageAlt: 'Graduated cylinder and measuring tools'
      },
      {
        id: 'states',
        type: 'paragraph-with-list',
        content: 'Matter exists in three main states:',
        items: [
          'Solid: fixed shape and volume',
          'Liquid: fixed volume but variable shape',
          'Gas: no fixed shape or volume'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop',
        imageAlt: 'Particle arrangement diagram showing solid, liquid, and gas structures'
      },
      {
        id: 'changes',
        type: 'paragraph',
        content: 'Matter can change in two ways: physical change where the substance remains the same, like melting ice, and chemical change where a new substance is formed, like burning paper.',
        highlights: ['physical change', 'chemical change'],
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
        imageAlt: 'Melting ice cube and burning paper showing physical and chemical changes'
      },
      {
        id: 'importance',
        type: 'paragraph',
        content: 'Studying matter helps us understand the world around us. It is used in medicine, industry, and technology. Without understanding matter, we cannot develop medicines or build modern devices.',
        highlights: ['medicine', 'industry', 'technology'],
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop',
        imageAlt: 'Chemistry laboratory with scientist working'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the definition of matter?',
        options: [
          'Anything that is invisible',
          'Anything that has mass and occupies space',
          'Only solid objects',
          'Only liquids and gases'
        ],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'Which of the following is NOT a state of matter?',
        options: [
          'Solid',
          'Liquid',
          'Energy',
          'Gas'
        ],
        correctAnswer: 2
      },
      {
        id: 'q3',
        question: 'Which example represents a chemical change?',
        options: [
          'Melting ice',
          'Boiling water',
          'Burning paper',
          'Cutting wood'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'basic-chemistry-lesson-2',
    courseId: 'basic-chemistry',
    number: 2,
    title: 'Atomic Structure',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Atomic Structure'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'An atom is the smallest unit of matter that retains the properties of an element. All matter in the universe is made of atoms, whether pure elements like gold or compounds like water.',
        imageUrl: 'https://facts.net/wp-content/uploads/2023/06/Structure-of-atom-with-nucleus-of-protons-and-neutrons-orbital-electrons.jpeg',
        imageAlt: 'Simple atom model with nucleus and orbiting electrons'
      },
      {
        id: 'particles',
        type: 'paragraph-with-list',
        content: 'Atoms are made of three main particles:',
        items: [
          'Proton: positively charged, located in the nucleus',
          'Neutron: neutral, located in the nucleus',
          'Electron: negatively charged, moves around the nucleus'
        ],
        imageUrl: 'https://as2.ftcdn.net/jpg/06/85/25/61/1000_F_685256111_6OrSCkTR0OaWa6sgz04QJ8Z5z1DQKHog.jpg',
        imageAlt: 'Diagram showing protons and neutrons in nucleus, electrons orbiting around'
      },
      {
        id: 'nucleus',
        type: 'paragraph',
        content: 'The nucleus is the central part of the atom and contains protons and neutrons. It is very small compared to the size of the atom but holds most of its mass.',
        highlights: ['nucleus', 'protons', 'neutrons', 'mass'],
        imageUrl: 'https://physicsworld.com/wp-content/uploads/2019/02/atomic-nucleus-1023726474-iStock_Altayb.jpg',
        imageAlt: 'Zoomed-in view of atomic nucleus with particles'
      },
      {
        id: 'electrons',
        type: 'paragraph',
        content: 'Electrons move in specific energy levels around the nucleus. Each level can hold a certain number of electrons.',
        highlights: ['energy levels', 'electrons'],
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
        imageAlt: 'Electron energy levels as circular shells around nucleus'
      },
      {
        id: 'numbers',
        type: 'paragraph-with-list',
        content: 'These numbers help identify elements.',
        items: [
          'Atomic number: number of protons',
          'Mass number: protons + neutrons'
        ],
        imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20231121220131/Structure-of-Carbon.png',
        imageAlt: 'Carbon atom diagram with labeled atomic number and mass number'
      },
      {
        id: 'importance',
        type: 'paragraph',
        content: 'Understanding atomic structure helps explain chemical reactions and how substances are formed.',
        highlights: ['chemical reactions'],
        imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&auto=format&fit=crop',
        imageAlt: 'Simple molecule or chemical reaction visualization'
      }
    ],
    quiz: [
      {
        id: 'l2-q1',
        question: 'What particles are found in the nucleus of an atom?',
        options: [
          'Electrons and protons',
          'Protons and neutrons',
          'Electrons and neutrons',
          'Only electrons'
        ],
        correctAnswer: 1
      },
      {
        id: 'l2-q2',
        question: 'What is the charge of an electron?',
        options: [
          'Positive',
          'Neutral',
          'Negative',
          'No charge'
        ],
        correctAnswer: 2
      },
      {
        id: 'l2-q3',
        question: 'What does the atomic number represent?',
        options: [
          'Number of neutrons',
          'Number of protons',
          'Number of electrons',
          'Protons plus neutrons'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'basic-chemistry-lesson-3',
    courseId: 'basic-chemistry',
    number: 3,
    title: 'Periodic Table',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Periodic Table'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'The periodic table is a way to organize chemical elements based on their properties. It helps scientists understand how elements behave and predict how they will react.',
        imageUrl: 'https://th.bing.com/th/id/R.37a7d088adf90de268e55a79a9b40d2e?rik=EyLH1A%2fGwjcESg&riu=http%3a%2f%2fesplora.org.mt%2fwp-content%2fuploads%2f2020%2f11%2fPeriodic-Table-Picture-1.jpg&ehk=LOUSEQbpdrVvf%2fT5WsbeaZO%2fo8javzTTrdSDTYT55O0%3d&risl=1&pid=ImgRaw&r=0',
        imageAlt: 'Full periodic table of elements'
      },
      {
        id: 'atomic-number',
        type: 'paragraph',
        content: 'Elements are arranged in the periodic table by their atomic number, which is the number of protons in the nucleus. As the atomic number increases, the position of the element changes.',
        highlights: ['atomic number', 'protons'],
        imageUrl: 'https://sciencenotes.org/wp-content/uploads/2020/10/atomic-and-mass-number-1024x683.jpg',
        imageAlt: 'Diagram showing increasing atomic number across a row'
      },
      {
        id: 'periods',
        type: 'paragraph',
        content: 'Horizontal rows in the periodic table are called periods. Each period represents a new energy level for electrons.',
        highlights: ['periods', 'energy level'],
        imageUrl: 'https://www.newtondesk.com/wp-content/uploads/2021/10/atom-nucleus-with-electron-shells-bohr-bury-energy-level.png',
        imageAlt: 'Highlighted row (period) in periodic table'
      },
      {
        id: 'groups',
        type: 'paragraph',
        content: 'Vertical columns are called groups. Elements in the same group have similar chemical properties.',
        highlights: ['groups', 'chemical properties'],
        imageUrl: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490?w=800&auto=format&fit=crop',
        imageAlt: 'Highlighted column (group) in periodic table'
      },
      {
        id: 'classification',
        type: 'paragraph-with-list',
        content: 'Elements are classified into three types:',
        items: [
          'Metals: good conductors of heat and electricity',
          'Nonmetals: poor conductors',
          'Metalloids: have mixed properties'
        ],
        imageUrl: 'https://www.meadmetals.com/hubfs/Mead-MetalsNonmetalsMetalloids_v13.jpg',
        imageAlt: 'Periodic table colored by metals, nonmetals, metalloids'
      },
      {
        id: 'importance',
        type: 'paragraph',
        content: 'The periodic table is a powerful tool that helps scientists and students understand relationships between elements and predict their behavior in chemical reactions.',
        highlights: ['chemical reactions'],
        imageUrl: 'https://www.thoughtco.com/thmb/id_f2lgphtT4_IE0EwKePYdyvHY=/6572x5250/filters:fill(auto,1)/simple-experiment-58b5b3325f9b586046bbfa7f.jpg',
        imageAlt: 'Student or scientist using periodic table'
      }
    ],
    quiz: [
      {
        id: 'l3-q1',
        question: 'What is the periodic table used for?',
        options: [
          'Measuring temperature',
          'Organizing elements',
          'Mixing chemicals',
          'Creating atoms'
        ],
        correctAnswer: 1
      },
      {
        id: 'l3-q2',
        question: 'What determines the position of an element in the periodic table?',
        options: [
          'Color',
          'Mass only',
          'Atomic number',
          'Size'
        ],
        correctAnswer: 2
      },
      {
        id: 'l3-q3',
        question: 'Elements in the same group have:',
        options: [
          'Different properties',
          'Similar properties',
          'Same color only',
          'Same size only'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'basic-chemistry-lesson-4',
    courseId: 'basic-chemistry',
    number: 4,
    title: 'Mole Concept',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Mole Concept'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'The mole is a unit used in chemistry to count very small particles such as atoms and molecules. Since counting them individually is impossible, scientists use the mole to simplify calculations.',
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
        imageAlt: 'Large number of particles'
      },
      {
        id: 'did-you-know-1',
        type: 'highlight-box',
        content: '1 mole of any substance contains the same number of particles.',
        icon: '💡',
        variant: 'purple'
      },
      {
        id: 'avogadro-intro',
        type: 'paragraph',
        content: 'One mole contains a fixed number of particles called Avogadro\'s number.',
        highlights: ['Avogadro\'s number'],
        imageUrl: 'https://www.nist.gov/sites/default/files/styles/1400_x_1400_limit/public/images/2018/10/23/mole_edit_2.jpg?itok=UUikYtia',
        imageAlt: 'Mole concept illustration from NIST'
      },
      {
        id: 'formula-avogadro',
        type: 'formula-block',
        content: '6.022 × 10²³',
        label: 'Avogadro\'s Number'
      },
      {
        id: 'law-avogadro',
        type: 'law-container',
        content: 'Avogadro\'s Law: Equal moles contain equal number of particles.',
        variant: 'blue'
      },
      {
        id: 'micro-macro',
        type: 'paragraph',
        content: 'The mole connects the microscopic world of atoms with measurable quantities like mass.',
        highlights: ['microscopic', 'mass'],
        imageUrl: 'https://media.istockphoto.com/vectors/the-mole-formula-triangle-isolated-on-white-relationship-between-vector-id1323445854?k=20&m=1323445854&s=170667a&w=0&h=Q6DiqCUzLJyJfiJb9NpRzDsN6PlShd806-RviK0yUH8=',
        imageAlt: 'Mole formula triangle'
      },
      {
        id: 'molar-mass',
        type: 'paragraph',
        content: 'Molar mass is the mass of one mole of a substance, measured in g/mol.',
        highlights: ['Molar mass', 'g/mol']
      },
      {
        id: 'ad-container-1',
        type: 'highlight-box',
        content: 'Advertisement Space',
        variant: 'blue',
        icon: '📢'
      },
      {
        id: 'formula-moles',
        type: 'formula-block',
        content: 'n = m / M',
        label: 'Moles Formula'
      },
      {
        id: 'ad-container-2',
        type: 'highlight-box',
        content: 'Advertisement Space',
        variant: 'purple',
        icon: '📢'
      },
      {
        id: 'did-you-know-2',
        type: 'highlight-box',
        content: '6.022 × 10²³ grains of sand would cover a huge area of Earth.',
        icon: '💡',
        variant: 'yellow'
      },
      {
        id: 'conclusion',
        type: 'paragraph',
        content: 'The mole is essential for calculating quantities in chemical reactions.',
        highlights: ['chemical reactions'],
        imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&auto=format&fit=crop',
        imageAlt: 'Chemical equation with numbers'
      }
    ],
    quiz: [
      {
        id: 'l4-q1',
        question: 'What is a mole in chemistry?',
        options: [
          'A type of atom',
          'A unit for counting particles',
          'A chemical reaction',
          'A measuring tool'
        ],
        correctAnswer: 1
      },
      {
        id: 'l4-q2',
        question: 'What is Avogadro\'s number?',
        options: [
          '100',
          '6.022 × 10²³',
          '10⁶',
          '1.602 × 10⁻¹⁹'
        ],
        correctAnswer: 1
      },
      {
        id: 'l4-q3',
        question: 'What does molar mass measure?',
        options: [
          'Volume',
          'Density',
          'Mass of one mole',
          'Number of electrons'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'basic-chemistry-lesson-5',
    courseId: 'basic-chemistry',
    number: 5,
    title: 'Chemical Reactions',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Chemical Reactions'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'A chemical reaction is a process where one or more substances change into new substances. These original substances are called reactants, and the new substances formed are called products. Chemical reactions are happening all around us every day, from cooking food to breathing.',
        highlights: ['reactants', 'products'],
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
        imageAlt: 'Simple chemical reaction example - burning or cooking'
      },
      {
        id: 'atom-rearrangement',
        type: 'paragraph',
        content: 'During a chemical reaction, atoms are rearranged to form new substances. However, atoms are not created or destroyed, they are only rearranged into different combinations.',
        highlights: ['atoms', 'rearranged'],
        imageUrl: 'https://assets.workybooks.com/INTERACTIVE/media/1755068638164-684616005-chemical-equation-1.webp',
        imageAlt: 'Diagram showing atoms rearranging into new molecules'
      },
      {
        id: 'formula-conservation',
        type: 'formula-block',
        content: 'Mass of reactants = Mass of products',
        label: 'Conservation of Mass'
      },
      {
        id: 'conservation-of-mass',
        type: 'law-container',
        content: 'Law of Conservation of Mass: Matter cannot be created or destroyed in a chemical reaction. The total mass of the reactants always equals the total mass of the products.',
        variant: 'blue'
      },
      {
        id: 'chemical-equations-ads',
        type: 'highlight-box',
        content: 'Advertisement Space',
        variant: 'yellow',
        icon: '📢'
      },
      {
        id: 'reaction-types-ads',
        type: 'highlight-box',
        content: 'Advertisement Space',
        variant: 'blue',
        icon: '📢'
      },
      {
        id: 'fireworks-fact',
        type: 'highlight-box',
        content: 'Fireworks are a result of chemical reactions that release energy as light and color!',
        icon: '🎆',
        variant: 'purple'
      },
      {
        id: 'video-tutorial',
        type: 'video',
        content: 'Watch this video tutorial explaining how to write chemical formulas correctly, including ionic compounds and balancing charges.',
        videoUrl: 'https://youtu.be/XJkJDMom_NU',
        videoThumbnail: 'https://img.youtube.com/vi/XJkJDMom_NU/hqdefault.jpg',
        videoTitle: 'How to Write Chemical Formulas'
      }
    ],
    quiz: [
      {
        id: 'l5-q1',
        question: 'What are reactants?',
        options: [
          'Final products',
          'Starting substances in a reaction',
          'Energy sources',
          'Tools used in lab'
        ],
        correctAnswer: 1
      },
      {
        id: 'l5-q2',
        question: 'What happens to atoms in a chemical reaction?',
        options: [
          'They disappear',
          'They are destroyed',
          'They rearrange',
          'They become energy'
        ],
        correctAnswer: 2
      },
      {
        id: 'l5-q3',
        question: 'What does the law of conservation of mass state?',
        options: [
          'Mass increases',
          'Mass decreases',
          'Mass is conserved',
          'Mass disappears'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'basic-chemistry-lesson-6',
    courseId: 'basic-chemistry',
    number: 6,
    title: 'Measurements and Units',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Measurements and Units'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'In chemistry, measurements are very important because they allow scientists to describe and compare substances accurately. Without proper measurements, experiments would not be reliable or repeatable.',
        highlights: ['measurements', 'accurate', 'reliable']
      },
      {
        id: 'intro-ads',
        type: 'highlight-box',
        content: 'Advertisement Space',
        variant: 'yellow',
        icon: '📢'
      },
      {
        id: 'si-system',
        type: 'paragraph',
        content: 'Scientists use standard units to measure different quantities. The most common system is the International System of Units (SI), which includes units for length, mass, volume, and temperature.',
        highlights: ['SI', 'International System of Units', 'length', 'mass', 'volume', 'temperature']
      },
      {
        id: 'common-units',
        type: 'paragraph',
        content: 'Common units in chemistry include grams (g) for mass, liters (L) for volume, and degrees Celsius (°C) for temperature. Using the correct unit is very important for accurate results.',
        highlights: ['grams', 'liters', 'Celsius']
      },
      {
        id: 'precision-accuracy',
        type: 'paragraph',
        content: 'Precision and accuracy are two important concepts in measurement. Accuracy means how close a measurement is to the true value, while precision means how consistent repeated measurements are.',
        highlights: ['accuracy', 'precision', 'true value', 'consistent']
      },
      {
        id: 'measurement-error',
        type: 'highlight-box',
        content: 'Even a small measurement error can completely change the result of an experiment!',
        icon: '⚠️',
        variant: 'yellow'
      },
      {
        id: 'lab-tools',
        type: 'paragraph',
        content: 'Scientists use special tools such as balances, thermometers, and graduated cylinders to measure different properties of substances.',
        highlights: ['balances', 'thermometers', 'graduated cylinders']
      },
      {
        id: 'lab-tools-ads',
        type: 'highlight-box',
        content: 'Advertisement Space',
        variant: 'blue',
        icon: '📢'
      },
      {
        id: 'conclusion',
        type: 'paragraph',
        content: 'Understanding measurements and units is essential for performing experiments, analyzing data, and communicating results clearly.',
        highlights: ['experiments', 'analyzing data', 'communicating results']
      }
    ],
    quiz: [
      {
        id: 'l6-q1',
        question: 'Why are measurements important in chemistry?',
        options: [
          'For decoration',
          'To make experiments accurate',
          'To change colors',
          'To create atoms'
        ],
        correctAnswer: 1
      },
      {
        id: 'l6-q2',
        question: 'What does SI stand for?',
        options: [
          'Scientific Index',
          'Standard Information',
          'International System of Units',
          'Simple Instructions'
        ],
        correctAnswer: 2
      },
      {
        id: 'l6-q3',
        question: 'What is the difference between accuracy and precision?',
        options: [
          'They are the same',
          'Accuracy is closeness, precision is consistency',
          'Precision is closeness, accuracy is consistency',
          'Both are unrelated'
        ],
        correctAnswer: 1
      }
    ]
  },
  // Acids & Bases - Lesson 1
  {
    id: 'acids-bases-lesson-1',
    courseId: 'acids-bases',
    number: 1,
    title: 'Introduction to Acids and Bases',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Introduction to Acids and Bases'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'Acids and bases are two important types of substances in chemistry. They are found in many everyday materials such as food, cleaning products, and even in our bodies. Understanding acids and bases helps us explain many chemical reactions around us.',
        highlights: ['acids', 'bases', 'everyday materials', 'food', 'cleaning products'],
        imageUrl: 'https://th.bing.com/th/id/R.939defee28b84c289d8e1c2b1122bdd7?rik=EdFEYDjxQor1hg&riu=http%3a%2f%2fhuman-anatomy-i.pressbooks.tru.ca%2fwp-content%2fuploads%2fsites%2f189%2f2024%2f05%2fBIOL1593_acidsandbases.png&ehk=IuWFEa1%2b68rG0hlkQpUnvOr3zobcU2luL5KuSH9TGU8%3d&risl=&pid=ImgRaw&r=0',
        imageAlt: 'Everyday acids and bases including lemon, vinegar, and soap'
      },
      {
        id: 'definitions',
        type: 'paragraph',
        content: 'An acid is a substance that releases hydrogen ions (H⁺) when dissolved in water. A base is a substance that releases hydroxide ions (OH⁻). These definitions help scientists classify substances.',
        highlights: ['acid', 'hydrogen ions', 'H⁺', 'base', 'hydroxide ions', 'OH⁻'],
        imageUrl: 'https://th.bing.com/th/id/R.939defee28b84c289d8e1c2b1122bdd7?rik=EdFEYDjxQor1hg&riu=http%3a%2f%2fhuman-anatomy-i.pressbooks.tru.ca%2fwp-content%2fuploads%2fsites%2f189%2f2024%2f05%2fBIOL1593_acidsandbases.png&ehk=IuWFEa1%2b68rG0hlkQpUnvOr3zobcU2luL5KuSH9TGU8%3d&risl=&pid=ImgRaw&r=0',
        imageAlt: 'Acid-base neutralization reaction diagram'
      },
      {
        id: 'law',
        type: 'law-container',
        content: 'Acid: releases H⁺ ions\nBase: releases OH⁻ ions',
        variant: 'purple',
        label: 'Key Definitions'
      },
      {
        id: 'neutralization',
        type: 'paragraph',
        content: 'Acids and bases have opposite properties. When they react together, they can cancel each other out in a process called neutralization.',
        highlights: ['opposite properties', 'neutralization'],
        imageUrl: 'https://static.vecteezy.com/system/resources/previews/021/967/745/non_2x/acid-base-neutralization-reaction-producing-a-salt-and-water-illustration-vector.jpg',
        imageAlt: 'Acid-base reaction demonstration'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Your stomach contains strong acid that helps digest food!',
        icon: '🍽️',
        variant: 'yellow'
      }
    ],
    quiz: [
      {
        id: 'ab-l1-q1',
        question: 'What does an acid release?',
        options: ['OH⁻', 'H⁺', 'Electrons', 'Neutrons'],
        correctAnswer: 1
      },
      {
        id: 'ab-l1-q2',
        question: 'What does a base release?',
        options: ['H⁺', 'CO₂', 'OH⁻', 'O₂'],
        correctAnswer: 2
      },
      {
        id: 'ab-l1-q3',
        question: 'Where can acids be found?',
        options: ['Only in labs', 'Only in space', 'In everyday materials', 'Nowhere'],
        correctAnswer: 2
      }
    ]
  },
  // Acids & Bases - Lesson 2
  {
    id: 'acids-bases-lesson-2',
    courseId: 'acids-bases',
    number: 2,
    title: 'Properties of Acids and Bases',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Properties of Acids and Bases'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'Acids and bases have different physical and chemical properties that allow us to identify them. These properties include taste, texture, and how they react with other substances.',
        highlights: ['physical', 'chemical properties', 'identify', 'taste', 'texture']
      },
      {
        id: 'acid-properties',
        type: 'paragraph',
        content: 'Acids usually taste sour, like lemon juice, and can react with metals to produce hydrogen gas. They can also change the color of indicators such as litmus paper.',
        highlights: ['sour', 'lemon juice', 'metals', 'hydrogen gas', 'litmus paper'],
        imageUrl: 'https://wallpapers.com/images/hd/fresh-lemon-fruit-m6q1ca82erua87c8.jpg',
        imageAlt: 'Lemon representing acidic properties'
      },
      {
        id: 'base-properties',
        type: 'paragraph',
        content: 'Bases often feel slippery, like soap, and taste bitter. They also change indicator colors differently from acids.',
        highlights: ['slippery', 'soap', 'bitter', 'indicator colors'],
        imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&auto=format&fit=crop',
        imageAlt: 'Soap representing basic properties'
      },
      {
        id: 'law',
        type: 'law-container',
        content: 'Acids → sour, reactive\nBases → bitter, slippery',
        variant: 'blue',
        label: 'Property Summary'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Litmus paper turns red in acids and blue in bases!',
        icon: '🧪',
        variant: 'yellow'
      },
      {
        id: 'ads-container',
        type: 'highlight-box',
        content: 'Advertisement Space',
        icon: '📢',
        variant: 'purple'
      }
    ],
    quiz: [
      {
        id: 'ab-l2-q1',
        question: 'What is a common property of acids?',
        options: ['Bitter taste', 'Sour taste', 'Slippery feel', 'Neutral pH'],
        correctAnswer: 1
      },
      {
        id: 'ab-l2-q2',
        question: 'How do bases feel?',
        options: ['Rough', 'Dry', 'Slippery', 'Sticky'],
        correctAnswer: 2
      },
      {
        id: 'ab-l2-q3',
        question: 'What happens to litmus paper in acid?',
        options: ['Turns blue', 'Turns red', 'No change', 'Disappears'],
        correctAnswer: 1
      }
    ]
  },
  // Acids & Bases - Lesson 3
  {
    id: 'acids-bases-lesson-3',
    courseId: 'acids-bases',
    number: 3,
    title: 'pH Scale',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'pH Scale'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'The pH scale is used to measure how acidic or basic a substance is. It ranges from 0 to 14, where lower values indicate acids and higher values indicate bases.',
        highlights: ['pH scale', 'acidic', 'basic', '0 to 14'],
        imageUrl: 'https://static.vecteezy.com/system/resources/previews/000/293/102/original/vector-the-science-ph-scale.jpg',
        imageAlt: 'Full pH scale from 0 to 14 showing acidic to basic range'
      },
      {
        id: 'neutral',
        type: 'paragraph',
        content: 'A pH of 7 is considered neutral. Pure water has a pH of 7, meaning it is neither acidic nor basic.',
        highlights: ['pH 7', 'neutral', 'pure water'],
        imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&auto=format&fit=crop',
        imageAlt: 'Pure water representing neutral pH'
      },
      {
        id: 'strong-acids-bases',
        type: 'paragraph',
        content: 'Strong acids have very low pH values (close to 0), while strong bases have very high pH values (close to 14).',
        highlights: ['strong acids', 'pH close to 0', 'strong bases', 'pH close to 14']
      },
      {
        id: 'ads-container',
        type: 'highlight-box',
        content: 'Advertisement Space',
        icon: '📢',
        variant: 'blue'
      },
      {
        id: 'law',
        type: 'law-container',
        content: 'pH < 7 → Acid\npH = 7 → Neutral\npH > 7 → Base',
        variant: 'purple',
        label: 'pH Scale Rules'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Battery acid has a pH close to 0, making it extremely strong!',
        icon: '⚡',
        variant: 'yellow'
      }
    ],
    quiz: [
      {
        id: 'ab-l3-q1',
        question: 'What does pH measure?',
        options: ['Temperature', 'Acidity/basicity', 'Mass', 'Speed'],
        correctAnswer: 1
      },
      {
        id: 'ab-l3-q2',
        question: 'What is the pH of neutral substances?',
        options: ['0', '7', '14', '10'],
        correctAnswer: 1
      },
      {
        id: 'ab-l3-q3',
        question: 'What pH range represents acids?',
        options: ['Above 7', 'Equal to 7', 'Below 7', 'Above 14'],
        correctAnswer: 2
      }
    ]
  },
  // Acids & Bases - Lesson 4
  {
    id: 'acids-bases-lesson-4',
    courseId: 'acids-bases',
    number: 4,
    title: 'Strong vs Weak Acids and Bases',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Strong vs Weak Acids and Bases'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'Not all acids and bases have the same strength. Some are strong, meaning they completely break apart into ions in water, while others are weak and only partially break apart. This difference affects how they react and how dangerous they can be.',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop',
        imageAlt: 'lab comparison strong vs weak solutions'
      },
      {
        id: 'strong-weak-acids',
        type: 'paragraph',
        content: 'A strong acid releases a large number of hydrogen ions (H⁺) in solution. Examples include hydrochloric acid. Weak acids release fewer hydrogen ions and react less strongly.',
        imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop',
        imageAlt: 'strong vs weak acid ionization'
      },
      {
        id: 'strong-weak-bases',
        type: 'paragraph',
        content: 'Strong bases release many hydroxide ions (OH⁻), while weak bases release fewer. This affects their ability to neutralize acids and their impact on substances.',
        imageUrl: 'https://images.unsplash.com/photo-1614935151651-0be5a1a6f7f1?w=800&auto=format&fit=crop',
        imageAlt: 'strong vs weak base ionization'
      },
      {
        id: 'law',
        type: 'law-container',
        content: 'Strong = complete ionization\nWeak = partial ionization',
        variant: 'purple',
        label: 'Ionization Rule'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Even weak acids can be dangerous if used in large amounts!',
        icon: '⚠️',
        variant: 'yellow'
      }
    ],
    quiz: [
      {
        id: 'ab-l4-q1',
        question: 'What defines a strong acid?',
        options: ['Color', 'Complete ionization', 'Smell', 'Temperature'],
        correctAnswer: 1
      },
      {
        id: 'ab-l4-q2',
        question: 'Weak acids:',
        options: ['Fully ionize', 'Do not react', 'Partially ionize', 'Are always safe'],
        correctAnswer: 2
      },
      {
        id: 'ab-l4-q3',
        question: 'What do strong bases release?',
        options: ['H⁺', 'Electrons', 'OH⁻', 'Neutrons'],
        correctAnswer: 2
      }
    ]
  },
  // Acids & Bases - Lesson 5
  {
    id: 'acids-bases-lesson-5',
    courseId: 'acids-bases',
    number: 5,
    title: 'Neutralization Reaction',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Neutralization Reaction'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'Neutralization is a chemical reaction between an acid and a base that produces salt and water. This process reduces the strength of both the acid and the base.',
        imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20230301160755/Neutralization-Reaction-(1).png',
        imageAlt: 'acid and base mixing'
      },
      {
        id: 'process',
        type: 'paragraph',
        content: 'In a neutralization reaction, hydrogen ions (H⁺) from the acid combine with hydroxide ions (OH⁻) from the base to form water (H₂O).',
        imageUrl: 'https://assets.workybooks.com/INTERACTIVE/media/1756473786827-87879725-Neutralization-2.webp',
        imageAlt: 'H+ + OH- forming water'
      },
      {
        id: 'law',
        type: 'law-container',
        content: 'Acid + Base → Salt + Water',
        variant: 'blue',
        label: 'Neutralization Equation'
      },
      {
        id: 'everyday-life',
        type: 'paragraph',
        content: 'Neutralization reactions are very important in everyday life. For example, antacid tablets neutralize stomach acid to relieve discomfort.',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop',
        imageAlt: 'antacid tablets'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Farmers use neutralization to reduce soil acidity!',
        icon: '🚜',
        variant: 'yellow'
      }
    ],
    quiz: [
      {
        id: 'ab-l5-q1',
        question: 'What is produced in neutralization?',
        options: ['Gas only', 'Salt and water', 'Acid only', 'Base only'],
        correctAnswer: 1
      },
      {
        id: 'ab-l5-q2',
        question: 'What forms water in this reaction?',
        options: ['H⁺ + H⁺', 'OH⁻ + OH⁻', 'H⁺ + OH⁻', 'O₂ + H₂'],
        correctAnswer: 2
      },
      {
        id: 'ab-l5-q3',
        question: 'What is a real-life example of neutralization?',
        options: ['Burning wood', 'Antacid use', 'Freezing water', 'Cutting metal'],
        correctAnswer: 1
      }
    ]
  },
  // Acids & Bases - Lesson 6
  {
    id: 'acids-bases-lesson-6',
    courseId: 'acids-bases',
    number: 6,
    title: 'Real-Life Applications of Acids and Bases',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Real-Life Applications of Acids and Bases'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'Acids and bases are used in many real-life applications. They are found in food, cleaning products, medicine, and industrial processes. Understanding them helps us use these substances safely.',
        imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&auto=format&fit=crop',
        imageAlt: 'household items (cleaners, food)'
      },
      {
        id: 'food-cleaning',
        type: 'paragraph',
        content: 'Acids are used in foods like vinegar and citrus fruits, while bases are used in cleaning products such as soap and baking soda.',
        imageUrl: 'https://wallpapers.com/images/hd/fresh-lemon-fruit-m6q1ca82erua87c8.jpg',
        imageAlt: 'vinegar and baking soda'
      },
      {
        id: 'industry',
        type: 'paragraph',
        content: 'In industry, acids and bases are used to manufacture chemicals, fertilizers, and materials. They are essential in many production processes.',
        imageUrl: 'https://c8.alamy.com/comp/BP5103/household-acids-BP5103.jpg',
        imageAlt: 'industrial chemical plant'
      },
      {
        id: 'medicine',
        type: 'paragraph',
        content: 'In medicine, acids and bases help treat conditions. For example, antacids are used to reduce excess stomach acid.',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop',
        imageAlt: 'medicine tablets'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Your blood has a very carefully controlled pH to keep your body working properly!',
        icon: '🩸',
        variant: 'purple'
      },
      {
        id: 'conclusion',
        type: 'paragraph',
        content: 'Learning about acids and bases helps us understand the world around us and use chemicals safely in daily life.',
        imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&auto=format&fit=crop',
        imageAlt: 'student in lab'
      }
    ],
    quiz: [
      {
        id: 'ab-l6-q1',
        question: 'Where are acids commonly found?',
        options: ['Only in labs', 'In food and nature', 'Only in space', 'Nowhere'],
        correctAnswer: 1
      },
      {
        id: 'ab-l6-q2',
        question: 'What are bases commonly used for?',
        options: ['Cooking only', 'Cleaning', 'Painting', 'Heating'],
        correctAnswer: 1
      },
      {
        id: 'ab-l6-q3',
        question: 'Why is pH important in the body?',
        options: ['For color', 'For taste', 'For proper function', 'For smell'],
        correctAnswer: 2
      }
    ]
  },
  // Electrochemistry - Lesson 1
  {
    id: 'electrochemistry-lesson-1',
    courseId: 'electrochemistry',
    number: 1,
    title: 'Introduction to Electrochemistry',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Introduction to Electrochemistry'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'Electrochemistry is the study of how chemical reactions and electricity are related. It explains how chemical energy can be converted into electrical energy and how electricity can cause chemical changes.',
        imageUrl: 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=800&auto=format&fit=crop',
        imageAlt: 'battery powering a device'
      },
      {
        id: 'ads-container-2',
        type: 'highlight-box',
        content: 'Advertisement Space',
        icon: '📢',
        variant: 'blue'
      },
      {
        id: 'ads-container',
        type: 'highlight-box',
        content: 'Advertisement Space',
        icon: '📢',
        variant: 'purple'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Every battery you use works based on electrochemical reactions!',
        icon: '🔋',
        variant: 'blue'
      },
      {
        id: 'conclusion',
        type: 'paragraph',
        content: 'Understanding electrochemistry helps scientists design better batteries and energy systems, which are essential for modern technology.',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop',
        imageAlt: 'modern electronics powered by batteries'
      }
    ],
    quiz: [
      {
        id: 'ec-l1-q1',
        question: 'What does electrochemistry study?',
        options: ['Only heat', 'Relationship between electricity and reactions', 'Light only', 'Sound waves'],
        correctAnswer: 1
      },
      {
        id: 'ec-l1-q2',
        question: 'What creates electric current in reactions?',
        options: ['Heat', 'Light', 'Electron movement', 'Water'],
        correctAnswer: 2
      },
      {
        id: 'ec-l1-q3',
        question: 'Where is electrochemistry used?',
        options: ['Only in space', 'In batteries and industry', 'Only in labs', 'Nowhere'],
        correctAnswer: 1
      }
    ]
  },
  // Electrochemistry - Lesson 2
  {
    id: 'electrochemistry-lesson-2',
    courseId: 'electrochemistry',
    number: 2,
    title: 'Oxidation and Reduction (Redox)',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Oxidation and Reduction (Redox)'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'Redox reactions are chemical reactions that involve the transfer of electrons. The word \'redox\' comes from reduction and oxidation, which always happen together in a reaction.',
        imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&auto=format&fit=crop',
        imageAlt: 'electron transfer between atoms'
      },
      {
        id: 'ox-red-definitions',
        type: 'paragraph',
        content: 'Oxidation is the process where a substance loses electrons, while reduction is the process where a substance gains electrons. These processes always occur at the same time.',
        imageUrl: 'https://rmit.pressbooks.pub/app/uploads/sites/67/2021/06/AdobeStock_463032367-2048x1506.jpeg',
        imageAlt: 'oxidation vs reduction illustration'
      },
      {
        id: 'law',
        type: 'law-container',
        content: 'Oxidation = loss of electrons\nReduction = gain of electrons',
        variant: 'purple',
        label: 'Redox Rule'
      },
      {
        id: 'rust-example',
        type: 'paragraph',
        content: 'For example, when iron rusts, it undergoes oxidation by losing electrons. At the same time, another substance gains those electrons.',
        imageUrl: 'https://images.saymedia-content.com/.image/t_share/MTc2NTc2NjE5MzUwMjcxNzA3/as-chemistry-group-2-and-7-elements.jpg',
        imageAlt: 'Group 2 and 7 elements illustration'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Rusting is a slow electrochemical reaction happening around you every day!',
        icon: '⚠️',
        variant: 'yellow'
      },
      {
        id: 'conclusion',
        type: 'paragraph',
        content: 'Understanding redox reactions is essential for studying batteries, corrosion, and many industrial processes.',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop',
        imageAlt: 'industrial electrochemical process'
      }
    ],
    quiz: [
      {
        id: 'ec-l2-q1',
        question: 'What does oxidation involve?',
        options: ['Gaining electrons', 'Losing electrons', 'No change', 'Gaining protons'],
        correctAnswer: 1
      },
      {
        id: 'ec-l2-q2',
        question: 'What does reduction involve?',
        options: ['Losing electrons', 'Gaining electrons', 'Losing atoms', 'Heat only'],
        correctAnswer: 1
      },
      {
        id: 'ec-l2-q3',
        question: 'Do oxidation and reduction happen separately?',
        options: ['Yes', 'No, they happen together', 'Only in labs', 'Only in gases'],
        correctAnswer: 1
      }
    ]
  },
  // Electrochemistry - Lesson 3
  {
    id: 'electrochemistry-lesson-3',
    courseId: 'electrochemistry',
    number: 3,
    title: 'Electrochemical Cells',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Electrochemical Cells'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'An electrochemical cell is a device that converts chemical energy into electrical energy. It works using redox reactions that produce a flow of electrons.',
        imageUrl: 'https://media.sciencephoto.com/image/c0277935/800wm/C0277935-Voltaic_Cell_and_Electrodes.jpg',
        imageAlt: 'Voltaic cell and electrodes diagram'
      },
      {
        id: 'electrodes',
        type: 'paragraph',
        content: 'Electrochemical cells have two main parts called electrodes. The anode is where oxidation occurs, and the cathode is where reduction occurs.',
        imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240103112106/cathode-and-anode.PNG',
        imageAlt: 'labeled anode and cathode'
      },
      {
        id: 'ads-container',
        type: 'highlight-box',
        content: 'Advertisement Space',
        icon: '📢',
        variant: 'purple'
      },
      {
        id: 'flow',
        type: 'paragraph',
        content: 'Electrons flow from the anode to the cathode through an external circuit, creating an electric current that can power devices.',
        imageUrl: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&auto=format&fit=crop',
        imageAlt: 'electron flow in circuit'
      },
      {
        id: 'battery-example',
        type: 'paragraph',
        content: 'A common example of an electrochemical cell is a battery, which provides energy for many electronic devices.',
        imageUrl: 'https://www.mobilefun.co.uk/blog/wp-content/uploads/2016/07/battery.jpg',
        imageAlt: 'batteries powering device'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Your phone battery works using electrochemical cells!',
        icon: '📱',
        variant: 'purple'
      }
    ],
    quiz: [
      {
        id: 'ec-l3-q1',
        question: 'What does an electrochemical cell produce?',
        options: ['Heat only', 'Light only', 'Electrical energy', 'Sound'],
        correctAnswer: 2
      },
      {
        id: 'ec-l3-q2',
        question: 'Where does oxidation occur?',
        options: ['Cathode', 'Anode', 'Wire', 'Battery case'],
        correctAnswer: 1
      },
      {
        id: 'ec-l3-q3',
        question: 'What flows to create electricity?',
        options: ['Protons', 'Neutrons', 'Electrons', 'Atoms'],
        correctAnswer: 2
      }
    ]
  },
  // Electrochemistry - Lesson 4
  {
    id: 'electrochemistry-lesson-4',
    courseId: 'electrochemistry',
    number: 4,
    title: 'Electrolysis',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Electrolysis'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'Electrolysis is the process of using electricity to drive a chemical reaction that would not happen on its own. It is the opposite of what happens in batteries, where chemical reactions produce electricity.',
        highlights: ['Electrolysis', 'electricity', 'chemical reaction', 'batteries'],
        imageUrl: 'https://labster-image-manager.s3.amazonaws.com/v2/ZAP/22adec49-699e-46fe-9fb3-8fbf684a243c/ZAP_ElectrolysisDefinition.en.x512.png',
        imageAlt: 'electrolysis setup with wires and solution'
      },
      {
        id: 'process',
        type: 'paragraph',
        content: 'In electrolysis, an external power source pushes electrons through a circuit, forcing chemical changes in a solution or molten substance. This allows compounds to break down into simpler substances.',
        highlights: ['external power source', 'electrons', 'chemical changes', 'break down'],
        imageUrl: 'https://img.freepik.com/premium-vector/electrolysis-process-vector-illustration-diagram_703157-3.jpg?w=996',
        imageAlt: 'electrolysis circuit with power supply'
      },
      {
        id: 'ads-container',
        type: 'highlight-box',
        content: 'Advertisement Space',
        icon: '📢',
        variant: 'purple'
      },
      {
        id: 'law',
        type: 'law-container',
        content: 'Anode = oxidation\nCathode = reduction',
        variant: 'blue',
        label: 'Electrode Rule'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Electrolysis is used to extract metals like aluminum from ores!',
        icon: '⚡',
        variant: 'purple'
      },
      {
        id: 'applications',
        type: 'paragraph',
        content: 'Electrolysis is widely used in industries such as metal purification, electroplating, and chemical production.',
        highlights: ['industries', 'metal purification', 'electroplating', 'chemical production'],
        imageUrl: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&auto=format&fit=crop',
        imageAlt: 'electroplating process'
      }
    ],
    quiz: [
      {
        id: 'ec-l4-q1',
        question: 'What is electrolysis?',
        options: ['Producing electricity', 'Using electricity to cause reactions', 'Heating substances', 'Freezing liquids'],
        correctAnswer: 1
      },
      {
        id: 'ec-l4-q2',
        question: 'What happens at the cathode?',
        options: ['Oxidation', 'Reduction', 'Heating', 'No reaction'],
        correctAnswer: 1
      },
      {
        id: 'ec-l4-q3',
        question: 'What is electrolysis used for?',
        options: ['Cooking', 'Extracting metals', 'Painting', 'Cooling'],
        correctAnswer: 1
      }
    ]
  },
  // Electrochemistry - Lesson 5
  {
    id: 'electrochemistry-lesson-5',
    courseId: 'electrochemistry',
    number: 5,
    title: 'Corrosion',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Corrosion'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'Corrosion is the gradual destruction of metals through chemical reactions with their environment. One of the most common examples is the rusting of iron.',
        highlights: ['Corrosion', 'destruction of metals', 'chemical reactions', 'rusting of iron'],
        imageUrl: 'https://library.88guru.com/wp-content/uploads/2022/12/Shutterstock_1421737898.webp',
        imageAlt: 'rusted metal'
      },
      {
        id: 'rusting',
        type: 'paragraph',
        content: 'Rusting occurs when iron reacts with oxygen and water, forming iron oxide. This is a slow electrochemical process that weakens the metal over time.',
        highlights: ['Rusting', 'oxygen', 'water', 'iron oxide', 'electrochemical process'],
        imageUrl: 'https://saylordotorg.github.io/text_general-chemistry-principles-patterns-and-applications-v1.0/section_23/28f7e127eabcc9de2916eefc451f6e03.jpg',
        imageAlt: 'rusting process with oxygen and water'
      },
      {
        id: 'impact',
        type: 'paragraph',
        content: 'Corrosion is a major problem in construction, transportation, and industry because it damages materials and structures.',
        highlights: ['construction', 'transportation', 'industry', 'damages materials'],
        imageUrl: 'https://absortech.com/wp-content/uploads/2022/08/absortech_corrosion-moisture-damage.jpg',
        imageAlt: 'damaged metal structure'
      },
      {
        id: 'law',
        type: 'law-container',
        content: 'Corrosion = oxidation of metal',
        variant: 'purple',
        label: 'Corrosion Definition'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Corrosion costs billions of dollars worldwide every year!',
        icon: '💰',
        variant: 'yellow'
      },
      {
        id: 'prevention',
        type: 'paragraph',
        content: 'Corrosion can be prevented using methods such as painting, coating, or using more resistant materials.',
        highlights: ['prevented', 'painting', 'coating', 'resistant materials'],
        imageUrl: 'https://static1.backyardbossimages.com/wordpress/wp-content/uploads/2023/12/person-s-hand-painting-a-metal-surface-with-rust-preventive-coating.jpg',
        imageAlt: 'painted metal or coated surface'
      }
    ],
    quiz: [
      {
        id: 'ec-l5-q1',
        question: 'What is corrosion?',
        options: ['Metal strengthening', 'Metal destruction', 'Cooling process', 'Heating process'],
        correctAnswer: 1
      },
      {
        id: 'ec-l5-q2',
        question: 'What causes rusting?',
        options: ['Oxygen and water', 'Heat only', 'Light only', 'Pressure'],
        correctAnswer: 0
      },
      {
        id: 'ec-l5-q3',
        question: 'How can corrosion be prevented?',
        options: ['Breaking metal', 'Painting or coating', 'Heating', 'Freezing'],
        correctAnswer: 1
      }
    ]
  },
  // Electrochemistry - Lesson 6
  {
    id: 'electrochemistry-lesson-6',
    courseId: 'electrochemistry',
    number: 6,
    title: 'Applications of Electrochemistry',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Applications of Electrochemistry'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'Electrochemistry has many important applications in everyday life and industry. It is used in batteries, metal production, and chemical manufacturing.',
        highlights: ['applications', 'everyday life', 'industry', 'batteries', 'metal production'],
        imageUrl: 'https://fablabbkk.com/wp-content/uploads/2023/03/hydrogen3-1536x865.png',
        imageAlt: 'hydrogen electrochemistry illustration'
      },
      {
        id: 'batteries',
        type: 'paragraph',
        content: 'Batteries are one of the most common applications of electrochemistry. They store chemical energy and convert it into electrical energy when needed.',
        highlights: ['Batteries', 'store chemical energy', 'electrical energy'],
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop',
        imageAlt: 'different types of batteries'
      },
      {
        id: 'electroplating',
        type: 'paragraph',
        content: 'Electroplating is another application where a thin layer of metal is deposited onto another surface using electricity. This is used to protect metals and improve appearance.',
        highlights: ['Electroplating', 'thin layer of metal', 'electricity', 'protect metals'],
        imageUrl: 'https://cdn1.byjus.com/wp-content/uploads/2018/07/Copper-electroplating1-700x406.png',
        imageAlt: 'electroplating process'
      },
      {
        id: 'environment',
        type: 'paragraph',
        content: 'Electrochemistry is also used in environmental protection, such as treating wastewater and reducing pollution.',
        highlights: ['environmental protection', 'wastewater', 'reducing pollution'],
        imageUrl: 'https://www.earthlink.co.in/wp-content/uploads/2024/05/aerial-view-modern-water-cleaning-facility-urban-wastewater-treatment-plant-purification-process-removing-undesirable-chemicals-suspended-solids-gases-from-contaminated-liquid-min-scaled.jpg',
        imageAlt: 'water treatment plant'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Electric cars rely heavily on advanced electrochemical batteries!',
        icon: '🚗',
        variant: 'blue'
      },
      {
        id: 'conclusion',
        type: 'paragraph',
        content: 'Understanding these applications helps us see how chemistry impacts technology and everyday life.',
        highlights: ['chemistry impacts', 'technology', 'everyday life'],
        imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&auto=format&fit=crop',
        imageAlt: 'modern technology devices'
      }
    ],
    quiz: [
      {
        id: 'ec-l6-q1',
        question: 'What do batteries do?',
        options: ['Create matter', 'Store and release energy', 'Destroy energy', 'Change color'],
        correctAnswer: 1
      },
      {
        id: 'ec-l6-q2',
        question: 'What is electroplating used for?',
        options: ['Heating', 'Coating metals', 'Cooling', 'Breaking metals'],
        correctAnswer: 1
      },
      {
        id: 'ec-l6-q3',
        question: 'Where is electrochemistry used?',
        options: ['Only in labs', 'In many industries', 'Nowhere', 'Only in space'],
        correctAnswer: 1
      }
    ]
  },
  // Thermochemistry - Lesson 1
  {
    id: 'thermochemistry-lesson-1',
    courseId: 'thermochemistry',
    number: 1,
    title: 'Introduction to Thermochemistry',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Introduction to Thermochemistry'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'Thermochemistry is the study of energy changes that occur during chemical reactions. Every reaction involves energy being absorbed or released, which affects temperature and the surroundings.',
        highlights: ['Thermochemistry', 'energy changes', 'chemical reactions', 'absorbed or released'],
        imageUrl: 'https://images.unsplash.com/photo-1515362652765-58b19fd4fe61?w=800&auto=format&fit=crop',
        imageAlt: 'reaction with heat flame or ice'
      },
      {
        id: 'heat-form',
        type: 'paragraph',
        content: 'Energy in chemical reactions is often in the form of heat. When reactions happen, they either transfer heat to the surroundings or absorb heat from them.',
        highlights: ['Energy', 'form of heat', 'transfer heat', 'absorb heat'],
        imageUrl: 'https://images.unsplash.com/photo-1544965838-54ef840fa415?w=800&auto=format&fit=crop',
        imageAlt: 'heat flow in reactions'
      },
      {
        id: 'law',
        type: 'law-container',
        content: 'Chemical reactions always involve energy change',
        variant: 'orange',
        label: 'Energy Rule'
      },
      {
        id: 'understanding',
        type: 'paragraph',
        content: 'Understanding thermochemistry helps us explain why reactions occur, how fast they happen, and how much energy they require.',
        highlights: ['thermochemistry', 'explain why reactions occur', 'how fast', 'how much energy'],
        imageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&auto=format&fit=crop',
        imageAlt: 'lab experiment measuring heat'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Even your body uses thermochemistry when converting food into energy!',
        icon: '🍎',
        variant: 'green'
      }
    ],
    quiz: [
      {
        id: 'tc-l1-q1',
        question: 'What does thermochemistry study?',
        options: ['Light only', 'Energy changes in reactions', 'Sound waves', 'Motion'],
        correctAnswer: 1
      },
      {
        id: 'tc-l1-q2',
        question: 'What form of energy is most common in reactions?',
        options: ['Sound', 'Heat', 'Light', 'Electricity'],
        correctAnswer: 1
      },
      {
        id: 'tc-l1-q3',
        question: 'Do all reactions involve energy change?',
        options: ['Yes', 'No', 'Only gases', 'Only liquids'],
        correctAnswer: 0
      }
    ]
  },
  // Thermochemistry - Lesson 2
  {
    id: 'thermochemistry-lesson-2',
    courseId: 'thermochemistry',
    number: 2,
    title: 'Exothermic and Endothermic Reactions',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Exothermic and Endothermic Reactions'
      },
      {
        id: 'intro',
        type: 'paragraph',
        content: 'Chemical reactions can be classified based on how they transfer energy. Some reactions release energy, while others absorb it from their surroundings.',
        highlights: ['classified', 'transfer energy', 'release energy', 'absorb energy'],
        imageUrl: 'https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=800&auto=format&fit=crop',
        imageAlt: 'fire vs ice'
      },
      {
        id: 'exothermic',
        type: 'paragraph',
        content: 'Exothermic reactions release heat into the surroundings, making the surroundings warmer. Examples include combustion and many everyday reactions.',
        highlights: ['Exothermic reactions', 'release heat', 'warmer', 'combustion'],
        imageUrl: 'https://images.unsplash.com/photo-1485872291404-8b80bb286645?w=800&auto=format&fit=crop',
        imageAlt: 'heat leaving system'
      },
      {
        id: 'endothermic',
        type: 'paragraph',
        content: 'Endothermic reactions absorb heat from the surroundings, making the surroundings cooler. These reactions require energy to continue.',
        highlights: ['Endothermic reactions', 'absorb heat', 'cooler', 'require energy'],
        imageUrl: 'https://images.unsplash.com/photo-1584269600488-3f5c769e4d36?w=800&auto=format&fit=crop',
        imageAlt: 'heat entering system'
      },
      {
        id: 'law',
        type: 'law-container',
        content: 'Exothermic → releases energy\nEndothermic → absorbs energy',
        variant: 'blue',
        label: 'Reaction Types'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Photosynthesis is an endothermic reaction powered by sunlight!',
        icon: '🌱',
        variant: 'green'
      },
      {
        id: 'understanding',
        type: 'paragraph',
        content: 'Understanding these types helps us predict temperature changes and energy flow in reactions.',
        highlights: ['predict temperature changes', 'energy flow'],
        imageUrl: 'https://images.unsplash.com/photo-1532634992-22f5e3ad037b?w=800&auto=format&fit=crop',
        imageAlt: 'temperature change experiment'
      }
    ],
    quiz: [
      {
        id: 'tc-l2-q1',
        question: 'What does an exothermic reaction do?',
        options: ['Absorbs heat', 'Releases heat', 'Freezes', 'Stops energy'],
        correctAnswer: 1
      },
      {
        id: 'tc-l2-q2',
        question: 'What happens in endothermic reactions?',
        options: ['Heat is released', 'Heat is absorbed', 'No energy', 'Energy disappears'],
        correctAnswer: 1
      },
      {
        id: 'tc-l2-q3',
        question: 'What example is endothermic?',
        options: ['Burning', 'Freezing', 'Photosynthesis', 'Rusting'],
        correctAnswer: 2
      }
    ]
  },
  // Thermochemistry - Lesson 3
  {
    id: 'thermochemistry-lesson-3',
    courseId: 'thermochemistry',
    number: 3,
    title: 'Energy Changes in Reactions',
    sections: [
      {
        id: 'title',
        type: 'title',
        content: 'Energy Changes in Reactions'
      },
      {
        id: 'bonds',
        type: 'paragraph',
        content: 'During chemical reactions, energy is either absorbed or released as bonds between atoms break and new bonds form. Breaking bonds requires energy, while forming bonds releases energy.',
        highlights: ['bonds', 'break', 'new bonds form', 'requires energy', 'releases energy'],
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop',
        imageAlt: 'bond breaking and forming'
      },
      {
        id: 'total-energy',
        type: 'paragraph',
        content: 'The total energy change in a reaction depends on the balance between energy used to break bonds and energy released when new bonds form.',
        highlights: ['total energy change', 'balance', 'energy used', 'energy released'],
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
        imageAlt: 'energy comparison'
      },
      {
        id: 'law',
        type: 'law-container',
        content: 'Breaking bonds → absorbs energy\nForming bonds → releases energy',
        variant: 'purple',
        label: 'Bond Energy Rule'
      },
      {
        id: 'comparison',
        type: 'paragraph',
        content: 'If more energy is released than absorbed, the reaction is exothermic. If more energy is absorbed, it is endothermic.',
        highlights: ['more energy released', 'exothermic', 'more energy absorbed', 'endothermic'],
        imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&auto=format&fit=crop',
        imageAlt: 'energy diagram exo vs endo'
      },
      {
        id: 'did-you-know',
        type: 'highlight-box',
        content: 'Chemical energy is stored inside bonds between atoms!',
        icon: '⚡',
        variant: 'yellow'
      },
      {
        id: 'industry',
        type: 'paragraph',
        content: 'Understanding energy changes helps scientists design efficient reactions and control energy use in industry.',
        highlights: ['design efficient reactions', 'control energy use', 'industry'],
        imageUrl: 'https://images.unsplash.com/photo-1565514020169-026b92b84bb6?w=800&auto=format&fit=crop',
        imageAlt: 'industrial chemical process'
      }
    ],
    quiz: [
      {
        id: 'tc-l3-q1',
        question: 'What requires energy?',
        options: ['Forming bonds', 'Breaking bonds', 'Cooling', 'Mixing'],
        correctAnswer: 1
      },
      {
        id: 'tc-l3-q2',
        question: 'What releases energy?',
        options: ['Breaking bonds', 'Forming bonds', 'Heating only', 'Nothing'],
        correctAnswer: 1
      },
      {
        id: 'tc-l3-q3',
        question: 'What determines total energy change?',
        options: ['Color', 'Bond energy balance', 'Size', 'Shape'],
        correctAnswer: 1
      }
    ]
  },
// Thermochemistry - Lesson 4
{
  id: 'thermochemistry-lesson-4',
  courseId: 'thermochemistry',
  number: 4,
  title: 'Activation Energy',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Activation Energy'
    },
    {
      id: 'intro',
      type: 'paragraph',
      content: 'Activation energy is the minimum amount of energy required to start a chemical reaction. Even reactions that release energy need an initial push to begin.'
    },
    {
      id: 'bullet-points',
      type: 'paragraph-with-list',
      content: 'Key points about activation energy:',
      items: [
        'Every reaction needs initial energy to start',
        'This energy is used to break initial bonds',
        'Without activation energy, reactions will not occur',
        'Higher activation energy → slower reaction'
      ]
    },
    {
      id: 'law',
      type: 'law-container',
      content: 'Higher activation energy = slower reaction rate',
      variant: 'orange',
      label: 'Activation Energy Rule'
    },
    {
      id: 'bullet-points-2',
      type: 'paragraph-with-list',
      content: 'How activation energy works:',
      items: [
        'Activation energy acts like a barrier',
        'Only particles with enough energy can react',
        'Temperature increase → more particles can overcome the barrier'
      ]
    },
    {
      id: 'note',
      type: 'highlight-box',
      content: 'Even explosive reactions need a spark to start (activation energy).',
      variant: 'blue',
      icon: '📝'
    },
    {
      id: 'diagram',
      type: 'paragraph',
      content: 'The energy barrier graph shows how energy changes during a reaction, with the peak representing the activation energy required to start the process.',
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
      imageAlt: 'energy barrier graph'
    }
  ],
  quiz: [
    {
      id: 'tc-l4-q1',
      question: 'What is activation energy?',
      options: ['Total energy', 'Minimum energy to start reaction', 'Heat released', 'Cooling energy'],
      correctAnswer: 1
    },
    {
      id: 'tc-l4-q2',
      question: 'What happens if activation energy is high?',
      options: ['Faster reaction', 'Slower reaction', 'No change', 'Explosion'],
      correctAnswer: 1
    },
    {
      id: 'tc-l4-q3',
      question: 'What helps particles overcome activation energy?',
      options: ['Color', 'Temperature', 'Size', 'Shape'],
      correctAnswer: 1
    }
  ]
},
// Thermochemistry - Lesson 5
{
  id: 'thermochemistry-lesson-5',
  courseId: 'thermochemistry',
  number: 5,
  title: 'Catalysts',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Catalysts'
    },
    {
      id: 'intro',
      type: 'paragraph',
      content: 'A catalyst is a substance that increases the rate of a chemical reaction without being used up in the reaction.'
    },
    {
      id: 'bullet-points',
      type: 'paragraph-with-list',
      content: 'Properties of catalysts:',
      items: [
        'Catalysts lower activation energy',
        'They make reactions faster',
        'They are not consumed',
        'They can be reused'
      ]
    },
    {
      id: 'law',
      type: 'law-container',
      content: 'Catalyst → lowers activation energy → faster reaction',
      variant: 'yellow',
      label: 'Catalyst Effect'
    },
    {
      id: 'bullet-points-2',
      type: 'paragraph-with-list',
      content: 'How catalysts work:',
      items: [
        'Catalysts provide an alternative reaction path',
        'More particles can react successfully',
        'Used in industry and biology'
      ]
    },
    {
      id: 'note',
      type: 'highlight-box',
      content: 'Enzymes in your body are natural catalysts that speed up biological reactions.',
      variant: 'purple',
      icon: '📝'
    },
    {
      id: 'diagram',
      type: 'paragraph',
      content: 'The energy diagram comparing reactions with and without a catalyst clearly shows how the activation energy barrier is lowered when a catalyst is present.',
      imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&auto=format&fit=crop',
      imageAlt: 'energy diagram with and without catalyst'
    }
  ],
  quiz: [
    {
      id: 'tc-l5-q1',
      question: 'What does a catalyst do?',
      options: ['Slows reaction', 'Speeds up reaction', 'Stops reaction', 'Destroys reaction'],
      correctAnswer: 1
    },
    {
      id: 'tc-l5-q2',
      question: 'What happens to a catalyst after reaction?',
      options: ['Disappears', 'Used up', 'Remains unchanged', 'Becomes energy'],
      correctAnswer: 2
    },
    {
      id: 'tc-l5-q3',
      question: 'What do catalysts affect?',
      options: ['Color', 'Activation energy', 'Mass', 'Shape'],
      correctAnswer: 1
    }
  ]
},
// Thermochemistry - Lesson 6
{
  id: 'thermochemistry-lesson-6',
  courseId: 'thermochemistry',
  number: 6,
  title: 'Applications of Thermochemistry',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Applications of Thermochemistry'
    },
    {
      id: 'intro',
      type: 'paragraph',
      content: 'Thermochemistry plays a major role in everyday life and industrial processes by controlling energy changes in reactions.'
    },
    {
      id: 'bullet-points',
      type: 'paragraph-with-list',
      content: 'Common applications:',
      items: [
        'Fuel burning releases energy (exothermic)',
        'Cooking involves heat absorption and release',
        'Batteries involve energy transformations',
        'Industrial reactions require energy control'
      ]
    },
    {
      id: 'bullet-points-2',
      type: 'paragraph-with-list',
      content: 'Industrial uses:',
      items: [
        'Exothermic reactions used for heating',
        'Endothermic reactions used for cooling',
        'Energy efficiency is important in industry'
      ]
    },
    {
      id: 'law',
      type: 'law-container',
      content: 'Energy is always conserved in chemical reactions',
      variant: 'blue',
      label: 'Conservation of Energy'
    },
    {
      id: 'note',
      type: 'highlight-box',
      content: 'Cold packs used in sports injuries work using endothermic reactions.',
      variant: 'blue',
      icon: '📝'
    },
    {
      id: 'bullet-points-3',
      type: 'paragraph-with-list',
      content: 'Benefits of understanding thermochemistry:',
      items: [
        'Thermochemistry helps design better fuels',
        'Helps reduce energy waste',
        'Important in environmental protection'
      ]
    },
    {
      id: 'photo',
      type: 'paragraph',
      content: 'Cold packs are a practical example of endothermic reactions in everyday life.',
      imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&auto=format&fit=crop',
      imageAlt: 'cold pack or fuel usage'
    }
  ],
  quiz: [
    {
      id: 'tc-l6-q1',
      question: 'Where is thermochemistry used?',
      options: ['Only labs', 'Everyday life and industry', 'Nowhere', 'Only space'],
      correctAnswer: 1
    },
    {
      id: 'tc-l6-q2',
      question: 'What type of reaction releases heat?',
      options: ['Endothermic', 'Exothermic', 'Neutral', 'Slow'],
      correctAnswer: 1
    },
    {
      id: 'tc-l6-q3',
      question: 'What do cold packs use?',
      options: ['Exothermic', 'Endothermic', 'Nuclear', 'Electric'],
      correctAnswer: 1
    }
  ]
},
// Organic Chemistry - Lesson 1
{
  id: 'organic-chemistry-lesson-1',
  courseId: 'organic-chemistry',
  number: 1,
  title: 'Introduction to Organic Chemistry',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Introduction to Organic Chemistry'
    },
    {
      id: 'intro',
      type: 'paragraph',
      content: 'Organic chemistry is the study of carbon-containing compounds. These compounds form the basis of life and are found in everything from food to fuels and medicines.',
      imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop',
      imageAlt: 'everyday organic materials like food, fuel, and plastic'
    },
    {
      id: 'bullet-points',
      type: 'paragraph-with-list',
      content: 'Key facts about carbon:',
      items: [
        'Carbon is the key element in organic chemistry',
        'It can form 4 bonds',
        'It creates chains and rings',
        'This leads to millions of different compounds'
      ]
    },
    {
      id: 'daily-life',
      type: 'paragraph',
      content: 'Organic compounds are found everywhere in daily life, including carbohydrates, proteins, fats, plastics, and fuels.',
      imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop',
      imageAlt: 'examples of organic compounds in everyday items'
    },
    {
      id: 'law',
      type: 'law-container',
      content: 'Carbon forms stable covalent bonds and complex structures',
      variant: 'yellow',
      label: 'Carbon Rule'
    },
    {
      id: 'functional-group-intro',
      type: 'paragraph',
      content: 'One of the most important ideas in organic chemistry is the functional group. A functional group is a specific group of atoms that determines the properties and reactions of a compound.',
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
      imageAlt: 'different functional groups structures'
    },
    {
      id: 'functional-points',
      type: 'paragraph-with-list',
      content: 'Understanding functional groups:',
      items: [
        'Functional group determines behavior',
        'Same group → similar properties',
        'Different group → different reactions'
      ]
    },
    {
      id: 'did-you-know',
      type: 'highlight-box',
      content: 'There are millions of organic compounds because carbon can bond in many ways!',
      variant: 'purple',
      icon: '💡'
    },
    {
      id: 'next-lessons',
      type: 'paragraph',
      content: 'In the next lessons, we will study different types of organic compounds in a structured and easy way. Each lesson will follow this clear pattern: Definition → General Formula → Functional Group → Examples → Properties → Uses → Reactions → Structure → Notes.'
    }
  ],
  quiz: [
    {
      id: 'oc-l1-q1',
      question: 'What element is central to organic chemistry?',
      options: ['Oxygen', 'Carbon', 'Hydrogen', 'Nitrogen'],
      correctAnswer: 1
    },
    {
      id: 'oc-l1-q2',
      question: 'How many bonds can carbon form?',
      options: ['1', '2', '3', '4'],
      correctAnswer: 3
    },
    {
      id: 'oc-l1-q3',
      question: 'What determines the properties of organic compounds?',
      options: ['Size', 'Color', 'Functional group', 'Temperature'],
      correctAnswer: 2
    }
  ]
},
// Organic Chemistry - Lesson 2
{
  id: 'organic-chemistry-lesson-2',
  courseId: 'organic-chemistry',
  number: 2,
  title: 'Hydrocarbons',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Hydrocarbons'
    },
    {
      id: 'definition',
      type: 'paragraph',
      content: 'Hydrocarbons are organic compounds made only of carbon (C) and hydrogen (H). They are the simplest type of organic compounds and form the basis of many other compounds.'
    },
    {
      id: 'general-formulas',
      type: 'law-container',
      content: 'Alkanes: CₙH₂ₙ₊₂\nAlkenes: CₙH₂ₙ\nAlkynes: CₙH₂ₙ₋₂',
      variant: 'blue',
      label: 'General Formulas'
    },
    {
      id: 'functional-group',
      type: 'paragraph-with-list',
      content: 'Functional groups in hydrocarbons:',
      items: [
        'Alkanes: single bonds (C–C)',
        'Alkenes: double bond (C=C)',
        'Alkynes: triple bond (C≡C)'
      ]
    },
    {
      id: 'examples',
      type: 'paragraph-with-list',
      content: 'Common examples of hydrocarbons:',
      items: [
        'Methane (CH₄)',
        'Ethane (C₂H₆)',
        'Ethene (C₂H₄)',
        'Ethyne (C₂H₂)'
      ],
      imageUrl: 'https://as1.ftcdn.net/v2/jpg/05/31/49/80/1000_F_531498025_4Dgn8KkvrQko2mBRexxiPZJqRLqq2HvU.jpg',
      imageAlt: 'simple hydrocarbon structures'
    },
    {
      id: 'properties',
      type: 'paragraph-with-list',
      content: 'Physical and chemical properties:',
      items: [
        'Non-polar compounds',
        'Do not dissolve in water',
        'Low boiling points (generally)',
        'Flammable'
      ]
    },
    {
      id: 'uses',
      type: 'paragraph-with-list',
      content: 'Common uses of hydrocarbons:',
      items: [
        'Fuels (gasoline, natural gas)',
        'Plastics production',
        'Industrial chemicals'
      ]
    },
    {
      id: 'reactions',
      type: 'paragraph-with-list',
      content: 'Types of reactions:',
      items: [
        'Combustion (burning)',
        'Addition reactions (alkenes & alkynes)',
        'Substitution reactions (alkanes)'
      ]
    },
    {
      id: 'structure',
      type: 'paragraph',
      content: 'Hydrocarbons can form straight chains, branched chains, or rings. The type of bonding determines their shape and reactivity.',
      imageUrl: 'https://th.bing.com/th/id/R.c4ebe47e8be188e45ccda0141d732b1d?rik=er%2fMiIUyExkwPQ&riu=http%3a%2f%2fslidetodoc.com%2fpresentation_image%2f411a08516c10e84a2287c18a3b432467%2fimage-18.jpg&ehk=cIqxS1aCimRGC36F4tJMyauEDYBEh%2bpYVPyndwDjMaw%3d&risl=&pid=ImgRaw&r=0',
      imageAlt: 'chain vs ring hydrocarbons'
    },
    {
      id: 'notes',
      type: 'highlight-box',
      content: 'Alkanes are less reactive than alkenes and alkynes due to single bonds.',
      variant: 'purple',
      icon: '📝'
    }
  ],
  quiz: [
    {
      id: 'oc-l2-q1',
      question: 'What elements are in hydrocarbons?',
      options: ['Carbon and oxygen', 'Carbon and hydrogen', 'Hydrogen and nitrogen', 'Oxygen and nitrogen'],
      correctAnswer: 1
    },
    {
      id: 'oc-l2-q2',
      question: 'What type of bond is in alkenes?',
      options: ['Single', 'Double', 'Triple', 'Ionic'],
      correctAnswer: 1
    },
    {
      id: 'oc-l2-q3',
      question: 'What are hydrocarbons commonly used for?',
      options: ['Water purification', 'Fuels', 'Cooling', 'Lighting only'],
      correctAnswer: 1
    }
  ]
},
// Organic Chemistry - Lesson 3
{
  id: 'organic-chemistry-lesson-3',
  courseId: 'organic-chemistry',
  number: 3,
  title: 'Alcohols',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Alcohols'
    },
    {
      id: 'definition',
      type: 'paragraph',
      content: 'Alcohols are organic compounds that contain a hydroxyl group (–OH) attached to a carbon atom. They are one of the most important families of organic compounds.'
    },
    {
      id: 'general-formula',
      type: 'law-container',
      content: 'CₙH₂ₙ₊₁OH',
      variant: 'blue',
      label: 'General Formula'
    },
    {
      id: 'functional-group',
      type: 'paragraph-with-list',
      content: 'Functional group characteristics:',
      items: [
        'Functional group: –OH (hydroxyl group)',
        'Determines properties of alcohols',
        'Attached to carbon chain'
      ]
    },
    {
      id: 'examples',
      type: 'paragraph-with-list',
      content: 'Common examples of alcohols:',
      items: [
        'Methanol (CH₃OH)',
        'Ethanol (C₂H₅OH)',
        'Propanol (C₃H₇OH)'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop',
      imageAlt: 'alcohol molecular structures'
    },
    {
      id: 'properties',
      type: 'paragraph-with-list',
      content: 'Physical and chemical properties:',
      items: [
        'Polar molecules',
        'Can dissolve in water (especially small alcohols)',
        'Higher boiling points than hydrocarbons',
        'Can form hydrogen bonds'
      ]
    },
    {
      id: 'uses',
      type: 'paragraph-with-list',
      content: 'Common uses of alcohols:',
      items: [
        'Fuels (ethanol)',
        'Disinfectants',
        'Solvents',
        'Used in beverages (ethanol)'
      ]
    },
    {
      id: 'reactions',
      type: 'paragraph-with-list',
      content: 'Types of reactions:',
      items: [
        'Combustion (burning)',
        'Oxidation (can form aldehydes or acids)',
        'Dehydration (forms alkenes)'
      ]
    },
    {
      id: 'structure',
      type: 'paragraph',
      content: 'The position of the –OH group affects the type of alcohol (primary, secondary, or tertiary), which influences its reactivity.',
      imageUrl: 'https://cdn.masterorganicchemistry.com/wp-content/uploads/2019/12/1-primary-alcohol-secondary-alcohol-tertiary-alcohol-what-does-it-mean-examples-number-of-carbons-attached-to-c-oh-carbon.gif',
      imageAlt: 'primary secondary tertiary alcohols'
    },
    {
      id: 'notes',
      type: 'highlight-box',
      content: 'Alcohols are more reactive than hydrocarbons due to the presence of the –OH group.',
      variant: 'purple',
      icon: '📝'
    }
  ],
  quiz: [
    {
      id: 'oc-l3-q1',
      question: 'What is the functional group in alcohols?',
      options: ['–COOH', '–OH', '–NH₂', '–CH₃'],
      correctAnswer: 1
    },
    {
      id: 'oc-l3-q2',
      question: 'Which alcohol is used in beverages?',
      options: ['Methanol', 'Ethanol', 'Propanol', 'Butanol'],
      correctAnswer: 1
    },
    {
      id: 'oc-l3-q3',
      question: 'Why do alcohols have higher boiling points?',
      options: ['Strong bonds', 'Hydrogen bonding', 'Color', 'Size only'],
      correctAnswer: 1
    }
  ]
},
// Organic Chemistry - Lesson 4
{
  id: 'organic-chemistry-lesson-4',
  courseId: 'organic-chemistry',
  number: 4,
  title: 'Aldehydes and Ketones',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Aldehydes and Ketones'
    },
    {
      id: 'definition',
      type: 'paragraph',
      content: 'Aldehydes and ketones are organic compounds that contain a carbonyl group (C=O). The difference between them depends on the position of this group in the molecule.'
    },
    {
      id: 'general-formula',
      type: 'law-container',
      content: 'Aldehydes: R–CHO\nKetones: R–CO–R\'',
      variant: 'blue',
      label: 'General Formulas'
    },
    {
      id: 'functional-group',
      type: 'paragraph-with-list',
      content: 'Functional group characteristics:',
      items: [
        'Functional group: Carbonyl (C=O)',
        'Aldehydes: carbonyl at end of chain',
        'Ketones: carbonyl in middle of chain'
      ]
    },
    {
      id: 'examples',
      type: 'paragraph-with-list',
      content: 'Common examples:',
      items: [
        'Methanal (formaldehyde)',
        'Ethanal (acetaldehyde)',
        'Propanone (acetone)'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&auto=format&fit=crop',
      imageAlt: 'carbonyl group structures'
    },
    {
      id: 'properties',
      type: 'paragraph-with-list',
      content: 'Physical and chemical properties:',
      items: [
        'Polar compounds',
        'Have higher boiling points than hydrocarbons',
        'Lower boiling points than alcohols',
        'Can dissolve in water (small molecules)'
      ]
    },
    {
      id: 'uses',
      type: 'paragraph-with-list',
      content: 'Common uses:',
      items: [
        'Used in solvents (acetone)',
        'Used in preservatives (formaldehyde)',
        'Used in chemical manufacturing'
      ]
    },
    {
      id: 'reactions',
      type: 'paragraph-with-list',
      content: 'Types of reactions:',
      items: [
        'Aldehydes can be oxidized to acids',
        'Ketones are harder to oxidize',
        'Both can undergo addition reactions'
      ]
    },
    {
      id: 'structure',
      type: 'paragraph',
      content: 'The position of the carbonyl group determines whether the compound is an aldehyde or a ketone, which affects its chemical behavior.',
      imageUrl: 'https://image1.slideserve.com/1935146/slide4-l.jpg',
      imageAlt: 'aldehyde vs ketone structure'
    },
    {
      id: 'notes',
      type: 'highlight-box',
      content: 'Aldehydes are generally more reactive than ketones.',
      variant: 'purple',
      icon: '📝'
    }
  ],
  quiz: [
    {
      id: 'oc-l4-q1',
      question: 'What is the functional group in aldehydes and ketones?',
      options: ['–OH', 'C=O', '–COOH', '–NH₂'],
      correctAnswer: 1
    },
    {
      id: 'oc-l4-q2',
      question: 'Where is the carbonyl group in aldehydes?',
      options: ['Middle', 'End', 'Outside', 'Random'],
      correctAnswer: 1
    },
    {
      id: 'oc-l4-q3',
      question: 'Which is more reactive?',
      options: ['Ketones', 'Aldehydes', 'Both equal', 'None'],
      correctAnswer: 1
    }
  ]
},
// Organic Chemistry - Lesson 5
{
  id: 'organic-chemistry-lesson-5',
  courseId: 'organic-chemistry',
  number: 5,
  title: 'Carboxylic Acids and Esters',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Carboxylic Acids and Esters'
    },
    {
      id: 'definition',
      type: 'paragraph',
      content: 'Carboxylic acids are organic compounds that contain the carboxyl group (–COOH). Esters are compounds formed when carboxylic acids react with alcohols.'
    },
    {
      id: 'general-formula',
      type: 'law-container',
      content: 'Carboxylic acids: R–COOH\nEsters: R–COO–R\'',
      variant: 'blue',
      label: 'General Formulas'
    },
    {
      id: 'functional-group',
      type: 'paragraph-with-list',
      content: 'Functional groups:',
      items: [
        'Carboxylic acids: –COOH',
        'Esters: –COO–',
        'These groups determine properties and reactions'
      ]
    },
    {
      id: 'examples',
      type: 'paragraph-with-list',
      content: 'Common examples:',
      items: [
        'Ethanoic acid (acetic acid)',
        'Methanoic acid',
        'Ethyl ethanoate (ester)'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop',
      imageAlt: 'carboxyl group and ester structures'
    },
    {
      id: 'properties',
      type: 'paragraph-with-list',
      content: 'Physical and chemical properties:',
      items: [
        'Carboxylic acids are acidic',
        'Have high boiling points',
        'Can form hydrogen bonds',
        'Esters have pleasant smells',
        'Esters are less polar'
      ]
    },
    {
      id: 'uses',
      type: 'paragraph-with-list',
      content: 'Common uses:',
      items: [
        'Acids used in food (vinegar)',
        'Esters used in perfumes',
        'Used in food flavoring',
        'Industrial applications'
      ]
    },
    {
      id: 'reactions',
      type: 'paragraph-with-list',
      content: 'Types of reactions:',
      items: [
        'Carboxylic acids react with bases (neutralization)',
        'React with alcohols to form esters',
        'Esterification reaction'
      ]
    },
    {
      id: 'structure',
      type: 'paragraph',
      content: 'The presence of the –COOH group makes acids polar and reactive, while esters have a different structure that affects their smell and properties.',
      imageUrl: 'https://cdn1.byjus.com/wp-content/uploads/2018/07/Ester-Structure-Uses-1-700x338.png',
      imageAlt: 'acid vs ester structure'
    },
    {
      id: 'notes',
      type: 'highlight-box',
      content: 'Esters are responsible for many natural fruity smells.',
      variant: 'purple',
      icon: '📝'
    }
  ],
  quiz: [
    {
      id: 'oc-l5-q1',
      question: 'What is the functional group of carboxylic acids?',
      options: ['–OH', '–COOH', '–CHO', '–NH₂'],
      correctAnswer: 1
    },
    {
      id: 'oc-l5-q2',
      question: 'What are esters known for?',
      options: ['Strong acids', 'Pleasant smells', 'High reactivity', 'Color'],
      correctAnswer: 1
    },
    {
      id: 'oc-l5-q3',
      question: 'What forms esters?',
      options: ['Acid + base', 'Acid + alcohol', 'Base + alcohol', 'Gas + liquid'],
      correctAnswer: 1
    }
  ]
},
// Organic Chemistry - Lesson 6
{
  id: 'organic-chemistry-lesson-6',
  courseId: 'organic-chemistry',
  number: 6,
  title: 'Polymers and Real-Life Applications',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Polymers and Real-Life Applications'
    },
    {
      id: 'definition',
      type: 'paragraph',
      content: 'Polymers are large molecules made by joining many small repeating units called monomers. They are found in both natural and synthetic materials.'
    },
    {
      id: 'general-idea',
      type: 'law-container',
      content: 'Monomer + Monomer + Monomer → Polymer',
      variant: 'blue',
      label: 'General Idea'
    },
    {
      id: 'functional-idea',
      type: 'paragraph-with-list',
      content: 'Functional characteristics:',
      items: [
        'Built from repeating units',
        'Can form long chains',
        'Structure affects properties',
        'Found in many materials'
      ]
    },
    {
      id: 'examples',
      type: 'paragraph-with-list',
      content: 'Common examples:',
      items: [
        'Plastics (polyethylene)',
        'Proteins',
        'DNA',
        'Rubber'
      ],
      imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20230302185738/examples-of-polymers-768.jpg',
      imageAlt: 'plastic materials and natural polymers'
    },
    {
      id: 'properties',
      type: 'paragraph-with-list',
      content: 'Physical and chemical properties:',
      items: [
        'Can be flexible or rigid',
        'Usually lightweight',
        'Can be strong and durable',
        'Resistant to chemicals'
      ]
    },
    {
      id: 'uses',
      type: 'paragraph-with-list',
      content: 'Common uses:',
      items: [
        'Plastic products',
        'Medical materials',
        'Packaging',
        'Clothing (synthetic fibers)'
      ]
    },
    {
      id: 'reactions',
      type: 'paragraph-with-list',
      content: 'Types of reactions:',
      items: [
        'Polymerization (joining monomers)',
        'Addition polymerization',
        'Condensation polymerization'
      ]
    },
    {
      id: 'structure',
      type: 'paragraph',
      content: 'The structure of polymers depends on how monomers are connected. This determines strength, flexibility, and usage.',
      imageUrl: 'https://compositeskn.org/KPC/images/5/56/PolymerConfigurationsIllustration-qrH57xmQAuB5.png',
      imageAlt: 'polymer chain structure'
    },
    {
      id: 'notes',
      type: 'highlight-box',
      content: 'Small changes in structure can create completely different materials.',
      variant: 'purple',
      icon: '📝'
    },
    {
      id: 'video-fats',
      type: 'video',
      content: '🎥 Watch: Types of Fats\n\nThis video explains different types of fats, which are important organic compounds found in food and the human body.',
      videoUrl: 'https://youtu.be/K3fOsRsPGYs',
      videoThumbnail: 'https://img.youtube.com/vi/K3fOsRsPGYs/hqdefault.jpg',
      videoTitle: 'Types of Fats'
    }
  ],
  quiz: [
    {
      id: 'oc-l6-q1',
      question: 'What is a polymer?',
      options: ['Single atom', 'Large molecule made of repeating units', 'Gas only', 'Metal'],
      correctAnswer: 1
    },
    {
      id: 'oc-l6-q2',
      question: 'What are monomers?',
      options: ['Large molecules', 'Repeating small units', 'Metals', 'Gases'],
      correctAnswer: 1
    },
    {
      id: 'oc-l6-q3',
      question: 'What determines polymer properties?',
      options: ['Color', 'Structure', 'Size only', 'Temperature'],
      correctAnswer: 1
    }
  ]
},
// Nuclear Chemistry - Lesson 1
{
  id: 'nuclear-chemistry-lesson-1',
  courseId: 'nuclear-chemistry',
  number: 1,
  title: 'Structure of the Atom',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Structure of the Atom'
    },
    {
      id: 'intro',
      type: 'paragraph',
      content: 'The atom is the smallest unit of matter that retains the properties of an element. It is made up of smaller particles called subatomic particles.'
    },
    {
      id: 'particles',
      type: 'paragraph-with-list',
      content: 'Subatomic particles:',
      items: [
        'Proton → positive charge (+)',
        'Neutron → no charge (0)',
        'Electron → negative charge (−)'
      ]
    },
    {
      id: 'structure',
      type: 'paragraph-with-list',
      content: 'Structure of the atom:',
      items: [
        'Protons and neutrons are in the nucleus',
        'Electrons move around the nucleus',
        'Most of the atom is empty space'
      ]
    },
    {
      id: 'atomic-number',
      type: 'law-container',
      content: 'Atomic number = number of protons',
      variant: 'blue',
      label: 'Atomic Number'
    },
    {
      id: 'key-points',
      type: 'paragraph-with-list',
      content: 'Key points:',
      items: [
        'Number of protons determines the element',
        'Electrons = protons (in neutral atoms)',
        'Neutrons affect mass'
      ]
    },
    {
      id: 'notes',
      type: 'highlight-box',
      content: 'The nucleus is very small but contains most of the mass of the atom.',
      variant: 'purple',
      icon: '📝'
    },
    {
      id: 'diagram',
      type: 'paragraph',
      content: 'Diagram showing atom structure:',
      imageUrl: 'https://cdn.kastatic.org/ka-perseus-images/5e0b2e7e7e7e7e7e7e7e7e7e7e7e7e7.png',
      imageAlt: 'atom structure with labeled particles'
    }
  ],
  quiz: [
    {
      id: 'nc-l1-q1',
      question: 'What charge does a proton have?',
      options: ['Negative', 'Positive', 'Neutral', 'Unknown'],
      correctAnswer: 1
    },
    {
      id: 'nc-l1-q2',
      question: 'Where are electrons found?',
      options: ['Nucleus', 'Outside nucleus', 'Inside neutrons', 'Inside protons'],
      correctAnswer: 1
    },
    {
      id: 'nc-l1-q3',
      question: 'What determines the element?',
      options: ['Neutrons', 'Electrons', 'Protons', 'Energy'],
      correctAnswer: 2
    }
  ]
},
// Nuclear Chemistry - Lesson 2
{
  id: 'nuclear-chemistry-lesson-2',
  courseId: 'nuclear-chemistry',
  number: 2,
  title: 'Isotopes and Atomic Mass',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Isotopes and Atomic Mass'
    },
    {
      id: 'definition',
      type: 'paragraph',
      content: 'Isotopes are atoms of the same element that have the same number of protons but different numbers of neutrons.'
    },
    {
      id: 'characteristics',
      type: 'paragraph-with-list',
      content: 'Characteristics of isotopes:',
      items: [
        'Same element → same protons',
        'Different neutrons → different mass',
        'Chemical properties remain similar'
      ]
    },
    {
      id: 'mass-number',
      type: 'law-container',
      content: 'Mass number = protons + neutrons',
      variant: 'blue',
      label: 'Mass Number'
    },
    {
      id: 'properties',
      type: 'paragraph-with-list',
      content: 'Properties of isotopes:',
      items: [
        'Isotopes can be stable or unstable',
        'Unstable isotopes are radioactive',
        'Atomic mass is an average of isotopes'
      ]
    },
    {
      id: 'notes',
      type: 'highlight-box',
      content: 'Carbon-12 and Carbon-14 are common examples of isotopes.',
      variant: 'purple',
      icon: '📝'
    },
    {
      id: 'diagram',
      type: 'paragraph',
      content: 'Isotopes comparison diagram:',
      imageUrl: 'https://cdn.kastatic.org/ka-perseus-images/isotopes-comparison.png',
      imageAlt: 'isotopes comparison'
    }
  ],
  quiz: [
    {
      id: 'nc-l2-q1',
      question: 'What are isotopes?',
      options: ['Different elements', 'Same element, different neutrons', 'Same atoms', 'Molecules'],
      correctAnswer: 1
    },
    {
      id: 'nc-l2-q2',
      question: 'What changes in isotopes?',
      options: ['Protons', 'Electrons', 'Neutrons', 'Charge'],
      correctAnswer: 2
    },
    {
      id: 'nc-l2-q3',
      question: 'What is mass number?',
      options: ['Protons only', 'Neutrons only', 'Protons + neutrons', 'Electrons'],
      correctAnswer: 2
    }
  ]
},
// Nuclear Chemistry - Lesson 3
{
  id: 'nuclear-chemistry-lesson-3',
  courseId: 'nuclear-chemistry',
  number: 3,
  title: 'Alpha, Beta, and Gamma Radiation',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Alpha, Beta, and Gamma Radiation'
    },
    {
      id: 'intro',
      type: 'paragraph',
      content: 'Radioactive elements emit radiation as they decay. There are three main types of radiation: alpha, beta, and gamma.'
    },
    {
      id: 'types',
      type: 'paragraph-with-list',
      content: 'Types of radiation:',
      items: [
        'Alpha (α): heavy, low penetration',
        'Beta (β): medium mass, medium penetration',
        'Gamma (γ): no mass, very high penetration'
      ]
    },
    {
      id: 'penetration',
      type: 'paragraph-with-list',
      content: 'What stops each type:',
      items: [
        'Alpha stopped by paper',
        'Beta stopped by aluminum',
        'Gamma needs thick lead or concrete'
      ]
    },
    {
      id: 'penetration-law',
      type: 'law-container',
      content: 'Penetration power: Gamma > Beta > Alpha',
      variant: 'yellow',
      label: 'Penetration Order'
    },
    {
      id: 'danger',
      type: 'paragraph-with-list',
      content: 'Danger levels:',
      items: [
        'Alpha is most dangerous inside the body',
        'Gamma is most dangerous outside the body',
        'Radiation can damage cells'
      ]
    },
    {
      id: 'notes',
      type: 'highlight-box',
      content: 'Gamma rays have no mass but carry high energy.',
      variant: 'purple',
      icon: '📝'
    },
    {
      id: 'diagram',
      type: 'paragraph',
      content: 'Radiation penetration comparison:',
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/056/572/343/large_2x/various-types-of-radiation-and-their-levels-of-penetration-in-different-contexts-vector.jpg',
      imageAlt: 'radiation penetration comparison'
    }
  ],
  quiz: [
    {
      id: 'nc-l3-q1',
      question: 'Which radiation has the highest penetration?',
      options: ['Alpha', 'Beta', 'Gamma', 'None'],
      correctAnswer: 2
    },
    {
      id: 'nc-l3-q2',
      question: 'What stops alpha radiation?',
      options: ['Lead', 'Paper', 'Water', 'Steel'],
      correctAnswer: 1
    },
    {
      id: 'nc-l3-q3',
      question: 'Which is most dangerous outside the body?',
      options: ['Alpha', 'Beta', 'Gamma', 'None'],
      correctAnswer: 2
    }
  ]
},
// Nuclear Chemistry - Lesson 4
{
  id: 'nuclear-chemistry-lesson-4',
  courseId: 'nuclear-chemistry',
  number: 4,
  title: 'Radiation Penetration and Shielding',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Radiation Penetration and Shielding'
    },
    {
      id: 'intro',
      type: 'paragraph',
      content: 'Different types of radiation have different abilities to penetrate materials. Understanding this helps us protect against harmful radiation.'
    },
    {
      id: 'penetration-levels',
      type: 'paragraph-with-list',
      content: 'Penetration levels:',
      items: [
        'Alpha (α): very low penetration',
        'Beta (β): medium penetration',
        'Gamma (γ): very high penetration'
      ]
    },
    {
      id: 'shielding',
      type: 'paragraph-with-list',
      content: 'Shielding materials:',
      items: [
        'Alpha stopped by paper or skin',
        'Beta stopped by aluminum',
        'Gamma requires lead or thick concrete'
      ]
    },
    {
      id: 'penetration-law',
      type: 'law-container',
      content: 'Penetration strength: Gamma > Beta > Alpha',
      variant: 'yellow',
      label: 'Penetration Order'
    },
    {
      id: 'key-points',
      type: 'paragraph-with-list',
      content: 'Key points:',
      items: [
        'Higher penetration = more shielding needed',
        'Gamma rays can pass through the body',
        'Protection is important in nuclear environments'
      ]
    },
    {
      id: 'notes',
      type: 'highlight-box',
      content: 'Even though alpha is weak outside, it is very dangerous inside the body.',
      variant: 'purple',
      icon: '📝'
    },
    {
      id: 'diagram',
      type: 'paragraph',
      content: 'Shielding materials for radiation:',
      imageUrl: 'https://allfrequencyjammer.com/wp-content/uploads/2024/05/Emf-shielding-fabric-image-2.jpg',
      imageAlt: 'shielding materials for radiation'
    }
  ],
  quiz: [
    {
      id: 'nc-l4-q1',
      question: 'Which radiation needs the most shielding?',
      options: ['Alpha', 'Beta', 'Gamma', 'None'],
      correctAnswer: 2
    },
    {
      id: 'nc-l4-q2',
      question: 'What can stop beta radiation?',
      options: ['Paper', 'Aluminum', 'Lead only', 'Water'],
      correctAnswer: 1
    },
    {
      id: 'nc-l4-q3',
      question: 'What stops gamma radiation?',
      options: ['Paper', 'Plastic', 'Lead or concrete', 'Glass'],
      correctAnswer: 2
    }
  ]
},
// Nuclear Chemistry - Lesson 5
{
  id: 'nuclear-chemistry-lesson-5',
  courseId: 'nuclear-chemistry',
  number: 5,
  title: 'Nuclear Reactions (Fission & Fusion)',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Nuclear Reactions (Fission & Fusion)'
    },
    {
      id: 'intro',
      type: 'paragraph',
      content: 'Nuclear reactions involve changes in the nucleus of an atom. These reactions release a huge amount of energy compared to chemical reactions.'
    },
    {
      id: 'reaction-types',
      type: 'paragraph-with-list',
      content: 'Types of nuclear reactions:',
      items: [
        'Fission: splitting a heavy nucleus',
        'Fusion: combining light nuclei',
        'Both release large energy'
      ]
    },
    {
      id: 'applications',
      type: 'paragraph-with-list',
      content: 'Where they occur:',
      items: [
        'Fission used in nuclear reactors',
        'Fusion occurs in the sun',
        'Fusion produces more energy than fission'
      ]
    },
    {
      id: 'mass-energy-law',
      type: 'law-container',
      content: 'Mass → Energy (E = mc²)',
      variant: 'blue',
      label: 'Mass-Energy Equivalence'
    },
    {
      id: 'key-points',
      type: 'paragraph-with-list',
      content: 'Key points:',
      items: [
        'Small mass loss releases huge energy',
        'Chain reactions can occur',
        'Must be controlled carefully'
      ]
    },
    {
      id: 'notes',
      type: 'highlight-box',
      content: 'Nuclear energy is much stronger than chemical energy.',
      variant: 'purple',
      icon: '📝'
    },
    {
      id: 'diagram',
      type: 'paragraph',
      content: 'Fission vs fusion diagram:',
      imageUrl: 'https://blogs.ethz.ch/energy/files/2025/04/image1.png',
      imageAlt: 'fission vs fusion diagram'
    }
  ],
  quiz: [
    {
      id: 'nc-l5-q1',
      question: 'What is fission?',
      options: ['Joining atoms', 'Splitting nucleus', 'Cooling process', 'Heating only'],
      correctAnswer: 1
    },
    {
      id: 'nc-l5-q2',
      question: 'Where does fusion occur naturally?',
      options: ['Earth', 'Ocean', 'Sun', 'Air'],
      correctAnswer: 2
    },
    {
      id: 'nc-l5-q3',
      question: 'What happens in nuclear reactions?',
      options: ['No energy', 'Small energy', 'Huge energy release', 'Only light'],
      correctAnswer: 2
    }
  ]
},
// Nuclear Chemistry - Lesson 6
{
  id: 'nuclear-chemistry-lesson-6',
  courseId: 'nuclear-chemistry',
  number: 6,
  title: 'Applications and Risks of Nuclear Chemistry',
  sections: [
    {
      id: 'title',
      type: 'title',
      content: 'Applications and Risks of Nuclear Chemistry'
    },
    {
      id: 'intro',
      type: 'paragraph',
      content: 'Nuclear chemistry has many important applications, but it also comes with risks that must be carefully managed.'
    },
    {
      id: 'applications',
      type: 'paragraph-with-list',
      content: 'Applications:',
      items: [
        'Used in electricity generation',
        'Used in medical treatments',
        'Used in scientific research',
        'Used in industry'
      ]
    },
    {
      id: 'risks',
      type: 'paragraph-with-list',
      content: 'Risks:',
      items: [
        'Radiation can damage cells',
        'Can cause serious health problems',
        'Requires strict safety measures'
      ]
    },
    {
      id: 'energy-risk-law',
      type: 'law-container',
      content: 'High energy = high risk if not controlled',
      variant: 'yellow',
      label: 'Energy-Risk Relationship'
    },
    {
      id: 'safety',
      type: 'paragraph-with-list',
      content: 'Safety considerations:',
      items: [
        'Nuclear waste must be managed',
        'Accidents can be dangerous',
        'Safety systems are essential'
      ]
    },
    {
      id: 'notes',
      type: 'highlight-box',
      content: 'Nuclear energy is powerful but must be used responsibly.',
      variant: 'purple',
      icon: '📝'
    },
    {
      id: 'photo',
      type: 'paragraph',
      content: 'Nuclear power plant:',
      imageUrl: 'https://nuvisionengineering.com/wp-content/uploads/2019/01/Nuclear-Power-Plant-at-night-ratio-2.jpg',
      imageAlt: 'nuclear power plant'
    }
  ],
  quiz: [
    {
      id: 'nc-l6-q1',
      question: 'What is nuclear energy used for?',
      options: ['Only labs', 'Electricity and medicine', 'Only space', 'Nothing'],
      correctAnswer: 1
    },
    {
      id: 'nc-l6-q2',
      question: 'What is a major risk of radiation?',
      options: ['Cooling', 'Cell damage', 'Color change', 'Noise'],
      correctAnswer: 1
    },
    {
      id: 'nc-l6-q3',
      question: 'What must be controlled carefully?',
      options: ['Water', 'Heat', 'Nuclear reactions', 'Air'],
      correctAnswer: 2
    }
  ]
}
];

const ARABIC_COURSE_LOCALIZATION = {
  'basic-chemistry': {
    title: 'الكيمياء الأساسية',
    description: 'افهم الذرات والعناصر والتفاعلات، فهنا يبدأ أساس علم الكيمياء كله.'
  },
  'acids-bases': {
    title: 'الأحماض والقواعد',
    description: 'استكشف الأحماض والقواعد في الحياة اليومية، من الطعام إلى التفاعلات الكيميائية القوية.'
  },
  'electrochemistry': {
    title: 'الكهروكيمياء',
    description: 'اكتشف كيف تنتج التفاعلات الكيميائية الكهرباء وتغذي الأجهزة الحديثة.'
  },
  'thermochemistry': {
    title: 'الكيمياء الحرارية',
    description: 'تعلّم كيف تتغير الطاقة أثناء التفاعلات ولماذا تنطلق الحرارة أو تُمتص.'
  },
  'organic-chemistry': {
    title: 'الكيمياء العضوية',
    description: 'ادرس مركبات الكربون التي تكوّن الوقود والأدوية وكيمياء الحياة.'
  },
  'nuclear-chemistry': {
    title: 'الكيمياء النووية',
    description: 'استكشف التفاعلات النووية واستخداماتها القوية في الطاقة والطب.'
  }
} as const;

const ARABIC_BASIC_CHEMISTRY_LESSONS = {
  'basic-chemistry-lesson-1': {
    title: 'ما هي المادة؟',
    sections: {
      title: { content: 'ما هي المادة؟' },
      intro: {
        content: 'المادة هي كل شيء له كتلة ويشغل حيزًا من الفراغ. قد تكون صلبة مثل الحديد، أو سائلة مثل الماء، أو غازية مثل الهواء. كل ما نراه حولنا في حياتنا اليومية هو مادة، حتى أجسامنا.',
        highlights: ['كتلة', 'حيز']
      },
      properties: {
        content: 'للمادة عدة خواص تساعدنا على التعرف عليها، مثل اللون والكتلة والحجم والكثافة. بعض هذه الخواص يمكن ملاحظتها بسهولة مثل اللون، بينما يحتاج بعضها الآخر إلى قياس مثل الكتلة.',
        highlights: ['الكتلة', 'الحجم', 'الكثافة']
      },
      states: {
        content: 'توجد المادة في ثلاث حالات رئيسية:',
        items: [
          'الصلب: له شكل وحجم ثابتان',
          'السائل: له حجم ثابت لكن شكله متغير',
          'الغاز: ليس له شكل أو حجم ثابت'
        ]
      },
      changes: {
        content: 'يمكن أن تتغير المادة بطريقتين: تغير فيزيائي تبقى فيه المادة نفسها، مثل ذوبان الجليد، وتغير كيميائي تتكون فيه مادة جديدة، مثل احتراق الورق.',
        highlights: ['التغير الفيزيائي', 'التغير الكيميائي']
      },
      importance: {
        content: 'دراسة المادة تساعدنا على فهم العالم من حولنا. فهي تدخل في الطب والصناعة والتكنولوجيا. ومن دون فهم المادة لا يمكننا تطوير الأدوية أو بناء الأجهزة الحديثة.',
        highlights: ['الطب', 'الصناعة', 'التكنولوجيا']
      }
    },
    quiz: {
      q1: {
        question: 'ما تعريف المادة؟',
        options: ['أي شيء غير مرئي', 'أي شيء له كتلة ويشغل حيزًا', 'الأجسام الصلبة فقط', 'السوائل والغازات فقط']
      },
      q2: {
        question: 'أي مما يلي ليس حالة من حالات المادة؟',
        options: ['صلب', 'سائل', 'طاقة', 'غاز']
      },
      q3: {
        question: 'أي مثال يمثل تغيرًا كيميائيًا؟',
        options: ['ذوبان الجليد', 'غليان الماء', 'احتراق الورق', 'قطع الخشب']
      }
    }
  },
  'basic-chemistry-lesson-2': {
    title: 'التركيب الذري',
    sections: {
      title: { content: 'التركيب الذري' },
      intro: {
        content: 'الذرة هي أصغر وحدة من المادة تحتفظ بخصائص العنصر. وكل المادة في الكون مكوّنة من ذرات، سواء كانت عناصر نقية مثل الذهب أو مركبات مثل الماء.'
      },
      particles: {
        content: 'تتكون الذرات من ثلاث جسيمات رئيسية:',
        items: [
          'البروتون: شحنته موجبة ويوجد في النواة',
          'النيوترون: متعادل ويوجد في النواة',
          'الإلكترون: شحنته سالبة ويدور حول النواة'
        ]
      },
      nucleus: {
        content: 'النواة هي الجزء المركزي من الذرة وتحتوي على البروتونات والنيوترونات. وهي صغيرة جدًا مقارنة بحجم الذرة، لكنها تحمل معظم كتلتها.',
        highlights: ['النواة', 'البروتونات', 'النيوترونات', 'الكتلة']
      },
      electrons: {
        content: 'تتحرك الإلكترونات في مستويات طاقة محددة حول النواة. وكل مستوى يستطيع أن يحمل عددًا معينًا من الإلكترونات.',
        highlights: ['مستويات الطاقة', 'الإلكترونات']
      },
      numbers: {
        content: 'تساعدنا هذه الأعداد على التعرف على العناصر.',
        items: [
          'العدد الذري: عدد البروتونات',
          'العدد الكتلي: البروتونات + النيوترونات'
        ]
      },
      importance: {
        content: 'يساعدنا فهم التركيب الذري على تفسير التفاعلات الكيميائية وكيفية تكوّن المواد.',
        highlights: ['التفاعلات الكيميائية']
      }
    },
    quiz: {
      'l2-q1': {
        question: 'ما الجسيمات الموجودة في نواة الذرة؟',
        options: ['الإلكترونات والبروتونات', 'البروتونات والنيوترونات', 'الإلكترونات والنيوترونات', 'الإلكترونات فقط']
      },
      'l2-q2': {
        question: 'ما شحنة الإلكترون؟',
        options: ['موجبة', 'متعادل', 'سالبة', 'بلا شحنة']
      },
      'l2-q3': {
        question: 'ماذا يمثل العدد الذري؟',
        options: ['عدد النيوترونات', 'عدد البروتونات', 'عدد الإلكترونات', 'البروتونات + النيوترونات']
      }
    }
  },
  'basic-chemistry-lesson-3': {
    title: 'الجدول الدوري',
    sections: {
      title: { content: 'الجدول الدوري' },
      intro: {
        content: 'الجدول الدوري هو طريقة لتنظيم العناصر الكيميائية وفقًا لخصائصها. وهو يساعد العلماء على فهم سلوك العناصر والتنبؤ بكيفية تفاعلها.'
      },
      'atomic-number': {
        content: 'تُرتب العناصر في الجدول الدوري حسب عددها الذري، وهو عدد البروتونات في النواة. ومع ازدياد العدد الذري يتغير موضع العنصر.',
        highlights: ['العدد الذري', 'البروتونات']
      },
      periods: {
        content: 'الصفوف الأفقية في الجدول الدوري تُسمى دورات. وتمثل كل دورة مستوى طاقة جديدًا للإلكترونات.',
        highlights: ['الدورات', 'مستوى الطاقة']
      },
      groups: {
        content: 'الأعمدة الرأسية تُسمى مجموعات. والعناصر في المجموعة نفسها لها خواص كيميائية متشابهة.',
        highlights: ['المجموعات', 'الخواص الكيميائية']
      },
      classification: {
        content: 'تُصنف العناصر إلى ثلاثة أنواع:',
        items: [
          'الفلزات: موصلات جيدة للحرارة والكهرباء',
          'اللافلزات: موصلات ضعيفة',
          'أشباه الفلزات: لها خواص مختلطة'
        ]
      },
      importance: {
        content: 'الجدول الدوري أداة قوية تساعد العلماء والطلاب على فهم العلاقات بين العناصر والتنبؤ بسلوكها في التفاعلات الكيميائية.',
        highlights: ['التفاعلات الكيميائية']
      }
    },
    quiz: {
      'l3-q1': {
        question: 'فيما يُستخدم الجدول الدوري؟',
        options: ['لقياس درجة الحرارة', 'لتنظيم العناصر', 'لخلط المواد الكيميائية', 'لإنشاء الذرات']
      },
      'l3-q2': {
        question: 'ما الذي يحدد موضع العنصر في الجدول الدوري؟',
        options: ['اللون', 'الكتلة فقط', 'العدد الذري', 'الحجم']
      },
      'l3-q3': {
        question: 'العناصر في المجموعة نفسها لها:',
        options: ['خواص مختلفة', 'خواص متشابهة', 'اللون نفسه فقط', 'الحجم نفسه فقط']
      }
    }
  },
  'basic-chemistry-lesson-4': {
    title: 'مفهوم المول',
    sections: {
      title: { content: 'مفهوم المول' },
      intro: {
        content: 'المول وحدة تُستخدم في الكيمياء لعدّ الجسيمات الصغيرة جدًا مثل الذرات والجزيئات. وبما أن عدّها فرديًا أمر مستحيل، يستخدم العلماء المول لتسهيل الحسابات.'
      },
      'did-you-know-1': {
        content: 'يحتوي 1 مول من أي مادة على العدد نفسه من الجسيمات.'
      },
      'avogadro-intro': {
        content: 'يحتوي المول الواحد على عدد ثابت من الجسيمات يسمى عدد أفوجادرو.',
        highlights: ['عدد أفوجادرو']
      },
      'formula-avogadro': {
        label: 'عدد أفوجادرو'
      },
      'law-avogadro': {
        content: 'قانون أفوجادرو: المولات المتساوية تحتوي على أعداد متساوية من الجسيمات.'
      },
      'micro-macro': {
        content: 'يربط المول بين العالم المجهري للذرات والكميات القابلة للقياس مثل الكتلة.',
        highlights: ['المجهري', 'الكتلة']
      },
      'molar-mass': {
        content: 'الكتلة المولية هي كتلة مول واحد من المادة، وتقاس بوحدة g/mol.',
        highlights: ['الكتلة المولية', 'g/mol']
      },
      'ad-container-1': {
        content: 'مساحة إعلانية'
      },
      'formula-moles': {
        label: 'قانون المولات'
      },
      'ad-container-2': {
        content: 'مساحة إعلانية'
      },
      'did-you-know-2': {
        content: 'لو وُجد 6.022 × 10²³ حبة رمل فإنها ستغطي مساحة هائلة من سطح الأرض.'
      },
      conclusion: {
        content: 'المول مهم جدًا لحساب الكميات في التفاعلات الكيميائية.',
        highlights: ['التفاعلات الكيميائية']
      }
    },
    quiz: {
      'l4-q1': {
        question: 'ما هو المول في الكيمياء؟',
        options: ['نوع من الذرات', 'وحدة لعدّ الجسيمات', 'تفاعل كيميائي', 'أداة قياس']
      },
      'l4-q2': {
        question: 'ما هو عدد أفوجادرو؟',
        options: ['100', '6.022 × 10²³', '10⁶', '1.602 × 10⁻¹⁹']
      },
      'l4-q3': {
        question: 'ماذا تقيس الكتلة المولية؟',
        options: ['الحجم', 'الكثافة', 'كتلة مول واحد', 'عدد الإلكترونات']
      }
    }
  },
  'basic-chemistry-lesson-5': {
    title: 'التفاعلات الكيميائية',
    sections: {
      title: { content: 'التفاعلات الكيميائية' },
      intro: {
        content: 'التفاعل الكيميائي هو عملية تتحول فيها مادة أو أكثر إلى مواد جديدة. وتسمى المواد الأصلية بالمتفاعلات، بينما تسمى المواد الجديدة الناتجة بالنواتج. والتفاعلات الكيميائية تحدث حولنا كل يوم، من طهي الطعام إلى التنفس.',
        highlights: ['المتفاعلات', 'النواتج']
      },
      'atom-rearrangement': {
        content: 'أثناء التفاعل الكيميائي تُعاد ترتيب الذرات لتكوين مواد جديدة. ومع ذلك فإن الذرات لا تُخلق ولا تُفنى، بل يُعاد ترتيبها فقط في تراكيب مختلفة.',
        highlights: ['الذرات', 'إعادة الترتيب']
      },
      'formula-conservation': {
        content: 'كتلة المتفاعلات = كتلة النواتج',
        label: 'حفظ الكتلة'
      },
      'conservation-of-mass': {
        content: 'قانون حفظ الكتلة: لا يمكن خلق المادة أو إفناؤها في التفاعل الكيميائي. ومجموع كتل المتفاعلات يساوي دائمًا مجموع كتل النواتج.'
      },
      'chemical-equations-ads': {
        content: 'مساحة إعلانية'
      },
      'reaction-types-ads': {
        content: 'مساحة إعلانية'
      },
      'fireworks-fact': {
        content: 'الألعاب النارية ناتجة عن تفاعلات كيميائية تطلق الطاقة على شكل ضوء وألوان!'
      },
      'video-tutorial': {
        content: 'شاهد هذا الفيديو التعليمي الذي يشرح كيفية كتابة الصيغ الكيميائية بشكل صحيح، بما في ذلك المركبات الأيونية وموازنة الشحنات.',
        videoTitle: 'كيفية كتابة الصيغ الكيميائية'
      }
    },
    quiz: {
      'l5-q1': {
        question: 'ما هي المتفاعلات؟',
        options: ['النواتج النهائية', 'المواد التي تبدأ بها التفاعلات', 'مصادر الطاقة', 'أدوات تُستخدم في المختبر']
      },
      'l5-q2': {
        question: 'ماذا يحدث للذرات في التفاعل الكيميائي؟',
        options: ['تختفي', 'تتدمر', 'يُعاد ترتيبها', 'تتحول إلى طاقة']
      },
      'l5-q3': {
        question: 'ماذا ينص قانون حفظ الكتلة؟',
        options: ['الكتلة تزداد', 'الكتلة تنقص', 'الكتلة محفوظة', 'الكتلة تختفي']
      }
    }
  },
  'basic-chemistry-lesson-6': {
    title: 'القياسات والوحدات',
    sections: {
      title: { content: 'القياسات والوحدات' },
      intro: {
        content: 'في الكيمياء تُعد القياسات مهمة جدًا لأنها تسمح للعلماء بوصف المواد ومقارنتها بدقة. ومن دون قياسات صحيحة لن تكون التجارب موثوقة أو قابلة للتكرار.',
        highlights: ['القياسات', 'الدقة', 'الموثوقية']
      },
      'intro-ads': {
        content: 'مساحة إعلانية'
      },
      'si-system': {
        content: 'يستخدم العلماء وحدات معيارية لقياس الكميات المختلفة. وأكثر الأنظمة شيوعًا هو النظام الدولي للوحدات (SI)، ويشمل وحدات للطول والكتلة والحجم ودرجة الحرارة.',
        highlights: ['SI', 'النظام الدولي للوحدات', 'الطول', 'الكتلة', 'الحجم', 'درجة الحرارة']
      },
      'common-units': {
        content: 'من الوحدات الشائعة في الكيمياء: الغرام (g) للكتلة، واللتر (L) للحجم، والدرجة المئوية (°C) لدرجة الحرارة. واستخدام الوحدة الصحيحة مهم جدًا للحصول على نتائج دقيقة.',
        highlights: ['الغرام', 'اللتر', 'الدرجة المئوية']
      },
      'precision-accuracy': {
        content: 'الدقة والضبط مفهومان مهمان في القياس. فالدقة تعني مدى قرب القياس من القيمة الحقيقية، بينما يعني الضبط مدى تقارب القياسات المتكررة من بعضها.',
        highlights: ['الدقة', 'الضبط', 'القيمة الحقيقية', 'التقارب']
      },
      'measurement-error': {
        content: 'حتى خطأ صغير في القياس قد يغيّر نتيجة التجربة بالكامل!'
      },
      'lab-tools': {
        content: 'يستخدم العلماء أدوات خاصة مثل الموازين ومقاييس الحرارة والأسطوانات المدرجة لقياس خواص مختلفة للمواد.',
        highlights: ['الموازين', 'مقاييس الحرارة', 'الأسطوانات المدرجة']
      },
      'lab-tools-ads': {
        content: 'مساحة إعلانية'
      },
      conclusion: {
        content: 'فهم القياسات والوحدات ضروري لإجراء التجارب وتحليل البيانات وتوصيل النتائج بوضوح.',
        highlights: ['التجارب', 'تحليل البيانات', 'توصيل النتائج']
      }
    },
    quiz: {
      'l6-q1': {
        question: 'لماذا تُعد القياسات مهمة في الكيمياء؟',
        options: ['للزينة', 'لجعل التجارب دقيقة', 'لتغيير الألوان', 'لإنشاء الذرات']
      },
      'l6-q2': {
        question: 'ماذا يعني الاختصار SI؟',
        options: ['الفهرس العلمي', 'المعلومات القياسية', 'النظام الدولي للوحدات', 'تعليمات بسيطة']
      },
      'l6-q3': {
        question: 'ما الفرق بين الدقة والضبط؟',
        options: ['هما الشيء نفسه', 'الدقة قرب من القيمة الحقيقية، والضبط هو الاتساق', 'الضبط قرب من القيمة الحقيقية، والدقة هي الاتساق', 'كلاهما غير مرتبط بالآخر']
      }
    }
  }
} as const;

const ARABIC_LESSON_LOCALIZATION = {
  ...ARABIC_BASIC_CHEMISTRY_LESSONS,
  ...ARABIC_ADDITIONAL_LESSON_LOCALIZATION
} as const;

export const getLocalizedCourse = (course: Course, language: 'en' | 'ar'): Course => {
  if (language !== 'ar') return course;
  const localized = ARABIC_COURSE_LOCALIZATION[course.id as keyof typeof ARABIC_COURSE_LOCALIZATION];
  return localized
    ? { ...course, title: localized.title, description: localized.description }
    : course;
};

export const getLocalizedLesson = (lesson: Lesson, language: 'en' | 'ar'): Lesson => {
  if (language !== 'ar') return lesson;

  const localizedLesson =
    ARABIC_LESSON_LOCALIZATION[
      lesson.id as keyof typeof ARABIC_LESSON_LOCALIZATION
    ];

  if (!localizedLesson) return lesson;

  return {
    ...lesson,
    title: localizedLesson.title,
    sections: lesson.sections.map((section) => {
      const localizedSection = localizedLesson.sections[
        section.id as keyof typeof localizedLesson.sections
      ];
      return localizedSection ? { ...section, ...localizedSection } : section;
    }),
    quiz: lesson.quiz?.map((question) => {
      const localizedQuestion = localizedLesson.quiz?.[
        question.id as keyof NonNullable<typeof localizedLesson.quiz>
      ];
      return localizedQuestion ? { ...question, ...localizedQuestion } : question;
    })
  };
};

export const getLocalizedQuiz = (courseId: string, language: 'en' | 'ar'): QuizQuestion[] => {
  const originalQuiz = COURSE_QUIZZES[courseId];
  if (language !== 'ar' || !originalQuiz) return originalQuiz;

  const localizedQuizData = ARABIC_COURSE_QUIZ_LOCALIZATION[courseId as keyof typeof ARABIC_COURSE_QUIZ_LOCALIZATION];
  if (!localizedQuizData) return originalQuiz;

  return originalQuiz.map((question) => {
    const localizedQuestion = localizedQuizData[question.id as keyof typeof localizedQuizData];
    return localizedQuestion ? { ...question, ...localizedQuestion } : question;
  });
};
