import { Plugin } from "obsidian";
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

    // Register the view
    this.registerView(WORDLE_VIEW_TYPE, (leaf) => new WordleView(leaf))

    // Load the settings
    await this.loadSettings();

    // Add settings tab
    this.addSettingTab(new WordleSettingTab(this.app, this));

    // Activate the view
    await this.activateView();
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
  async activateView(): Promise<void> {
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
  }

}
