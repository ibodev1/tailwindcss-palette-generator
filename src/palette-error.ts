class PaletteError extends Error {
  constructor(message: string) {
    const errorMessage = `[PaletteError] ${message}`;
    super(errorMessage);
    this.name = 'PaletteError';
  }
}

export default PaletteError;
