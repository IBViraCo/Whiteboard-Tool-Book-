const check_env =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const base_url = check_env
  ? 'http://localhost:3000/'
  : 'https://virabook.ir/whiteboard/' //Todo:must modify server address

export const PENT_TOOLBAR_TYPES = {
  main: 'main',
  color: 'color',
  size: 'size',
  tool: 'tool',
}

export const APP_CONFIG = {
  acceptFileType: 'application/pdf, image/jpeg, image/jpg, image/png',
  maxBookZoom: 2.5,
  background: [
    'background-0.jpg',
    'background-1.jpg',
    'background-2.jpg',
    'background-3.jpg',
    'none',
  ],
}

export const APP_MESSAGES = {
  invalidFile:
    'لطفا فایل مدنظر خود را بصورت یک فایل pdf و یا چند jpg یا png وارد کنید',
}

export const PEN_STATICS = {
  colors: {
    black: '#040404',
    blue: '#0000ff',
    red: '#ff0000',
    green: '#008000',
    yellow: '#ffff00',
    white: '#ffffff',
  },
  highlightColors: {
    black: '#04040480',
    blue: '#0000ff80',
    red: '#ff000080',
    green: '#00800080',
    yellow: '#ffff0080',
    white: '#ffffff78',
  },
  sizes: {
    1: '1',
    2: '2',
    3: '3',
  },
  tools: {
    pen: 'pen',
    highlight: 'highlight',
    eraser: 'eraser',
    text: 'text',
  },
  repairCurosrPosition: {
    pen: '5 27',
    highlight: '5 27',
    eraser: '5 20',
  },
}

export const TurnJsConfigs = {
  // Elevation
  acceleration: true,
  duration: 400,
  // Enable gradients
  gradients: true,
  // Auto center this flipbook
  autoCenter: true,
  display: 'single',
  inclination: 40,
  direction: 'rtl',
}

export const WEBCAM_SIZES = {
  small: 'small',
  half: 'half',
  full: 'full',
  disabled: 'disabled',
}

export const cursorIcons = {
  auto: 'auto',
  pointer: 'pointer',
  point: 'point',
}

export const pointCursorColor = '#ad0e0e'

export const THEME_NAMES = {
  whiteboard: '#fff',
  greenBoard: '#1d291d',
  blackBoard: '#2f2f2f',
}
