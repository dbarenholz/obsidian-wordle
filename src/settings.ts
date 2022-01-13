import WordlePlugin from "./main";
import { App, PluginSettingTab, Setting } from "obsidian";

/**
 * Wordle plugin settings.
 *
 * @version 0.0.1
 * @author dbarenholz
 */
export interface WordleSettings {
  // Whether or not to print debug prints.
  debug: boolean;
}

/**
 * The defaults.
 *
 * @version 0.0.1
 * @author dbarenholz
 */
export const DEFAULT_SETTINGS: WordleSettings = {
  debug: false,
};

/**
 * The settings tab itself.
 *
 * @version 0.0.1
 * @author dbarenholz
 */
export class WordleSettingTab extends PluginSettingTab {
  // The plugin itself
  private plugin: WordlePlugin;

  // Constructor: Creates a settingtab for this plugin.
  constructor(app: App, plugin: WordlePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  /**
   * The method called to display the settingtab.
   */
  display(): void {
    // Retrieve the container element
    let { containerEl } = this;
    containerEl.empty();

    // Write the title of the settings page.
    containerEl.createEl("h2", { text: "Wordle" });

    // Add debug setting
    new Setting(containerEl)
      .setName("Debug")
      .setDesc("Turn on for debug prints in console.")
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.debug);
        toggle.onChange(async (debug) => {
          this.plugin.settings.debug = debug;
          console.log(`[Wordle]: Set debug to ${debug}`);
          await this.plugin.saveSettings();
        });
      });
  }
}
