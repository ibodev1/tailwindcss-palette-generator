class PaletteError extends Error {
  constructor(message: string) {
    const errorMessage = `[PlaletteError] ${message}`;
    super(errorMessage);
    this.name = 'PaletteError';
  }
}

export default PaletteError;
