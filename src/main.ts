import { addIcon, Plugin } from "obsidian";
import { WordleSettings, WordleSettingTab, DEFAULT_SETTINGS } from "./settings";
import { WordleView, WORDLE_VIEW_TYPE } from "./view";

/**
 * Wordle plugin.
 *
 * @author dbarenholz
 * @version 0.0.1
 */
export default class WordlePlugin extends Plugin {
  // The settings of the plugin.
  public settings: WordleSettings;

  /**
   * Code that runs (once) when plugin is loaded.
   */
  async onload(): Promise<void> {
    console.log("[Wordle]: loaded plugin.");

    // Add icon
    addIcon("la:file-word-solid", `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="la" data-icon="file-word-solid" role="img" viewBox="0 0 32 32"><path fill="currentColor" d="M6 3v26h20V3zm2 2h16v22H8zm10 7v6.5c0 .215-.285.5-.5.5c-.043 0 .02.047-.063-.063c-.082-.109-.207-.386-.28-.687C17.006 17.652 17 17 17 17v-2h-2v4.5c0 .215-.285.5-.5.5c-.215 0-.5-.285-.5-.5V13h-4v2h2v4.5c0 1.383 1.117 2.5 2.5 2.5c.984 0 1.688-.645 2.094-1.469c.3.188.52.469.906.469c1.383 0 2.5-1.117 2.5-2.5V14h2v-2z" /></svg>`)

    // Register the view
    this.registerView(WORDLE_VIEW_TYPE, (leaf) => new WordleView(leaf))

    // Load the settings
    await this.loadSettings();

    // Add settings tab
    this.addSettingTab(new WordleSettingTab(this.app, this));

    // Activate the view (once layout is ready)
    this.activateView();
  }

  /**
   * Code that runs (once) when the plugin is unloaded.
   */
  async onunload(): Promise<void> {
    // Clean up after oneselves.
    this.app.workspace.detachLeavesOfType(WORDLE_VIEW_TYPE);
    console.log("[Wordle]: unloaded plugin.");
  }

  /**
   * Loads the settings.
   */
  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  /**
   * Saves the settings.
   */
  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  /**
   * Taken from https://marcus.se.net/obsidian-plugin-docs/guides/custom-views
   * Activates the view and sets it (by default) in the sidebar on the right.
   */
  activateView(): void {
    this.app.workspace.onLayoutReady(async () => {
      // Detach possible dangling leaves
      this.app.workspace.detachLeavesOfType(WORDLE_VIEW_TYPE);

      // Add a new leaf
      await this.app.workspace.getRightLeaf(false).setViewState({
        type: WORDLE_VIEW_TYPE,
        active: true,
      });

      // Reveal the leaf
      this.app.workspace.revealLeaf(
        this.app.workspace.getLeavesOfType(WORDLE_VIEW_TYPE)[0]
      );
    })
  }

}
