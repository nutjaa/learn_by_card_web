// Copypasta from https://tabler.io/docs/ui/base/colors

export class ColorHelper {
  private static readonly lightThemeForegroundColors = [
    '#066FD1', // blue
    '#4299E1', // azure
    '#4263EB', // indigo
    '#AE3EC9', // purple
    '#D6336C', // pink
    '#D63939', // red
    '#F76707', // orange
    '#F59F00', // yellow
    '#74B816', // lime
    '#2FB344', // green
    '#0CA678', // teal
    '#17A2B8', // cyan
  ];

  private static readonly lightThemeBackgroundColors = [
    '#E9F0F9', // blue-lt
    '#ECF5FC', // azure-lt
    '#ECEFFD', // indigo-lt
    '#F7ECFA', // purple-lt
    '#FBEBF0', // pink-lt
    '#FBEBEB', // red-lt
    '#FEF0E6', // orange-lt
    '#FEF5E6', // yellow-lt
    '#F1F8E8', // lime-lt
    '#EAF7EC', // green-lt
    '#E7F6F2', // teal-lt
    '#E8F6F8', // cyan-lt
  ];

  private static readonly darkThemeForegroundColors = [
    '#206bc4', // blue
    '#4299e1', // azure
    '#4263eb', // indigo
    '#ae3ec9', // purple
    '#d6336c', // pink
    '#d63939', // red
    '#f76707', // orange
    '#f59f00', // yellow
    '#74b816', // lime
    '#2fb344', // green
    '#0ca678', // teal
    '#17a2b8', // cyan
  ];

  private static readonly darkThemeBackgroundColors = [
    '#192b42', // blue
    '#1c3044', // azure
    '#1c2a45', // indigo
    '#272742', // purple
    '#2b2639', // pink
    '#2b2634', // red
    '#2e2b2f', // orange
    '#2e302e', // yellow
    '#213330', // lime
    '#1a3235', // green
    '#17313a', // teal
    '#183140', // cyan
  ];

  static getRandomGroupColors(isDarkMode: boolean): [string, string] {
    const index = Math.floor(
      Math.random() * this.lightThemeBackgroundColors.length
    );

    if (isDarkMode) {
      const backgroundColor = this.darkThemeBackgroundColors[index];
      const titleColor = this.darkThemeForegroundColors[index];
      return [backgroundColor, titleColor];
    } else {
      const backgroundColor = this.lightThemeBackgroundColors[index];
      const titleColor = this.lightThemeForegroundColors[index];
      return [backgroundColor, titleColor];
    }
  }

  static getRandomCardBackgroundColor(): string {
    const randomIndex = Math.floor(
      Math.random() * this.lightThemeForegroundColors.length
    );
    return this.lightThemeForegroundColors[randomIndex];
  }

  static getRandomHexBackgroundColor(): string {
    const randomIndex = Math.floor(
      Math.random() * this.lightThemeForegroundColors.length
    );
    return this.lightThemeForegroundColors[randomIndex];
  }
}
