import { ItemView, WorkspaceLeaf } from "obsidian";

export const WORDLE_VIEW_TYPE = "wordle-view";

/**
 * A wordle view.
 * Shows an iframe with the Wordle site!
 *
 * @author dbarenholz
 * @version 0.0.2
 */
export class WordleView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType(): string {
    return WORDLE_VIEW_TYPE;
  }

  getDisplayText(): string {
    return "Wordle";
  }

  getIcon(): string {
    return "la:file-word-solid"
  }

  async onOpen(): Promise<void> {
    console.log("[Wordle]: Opening view.")

    // Grab a reference to the container; add ID so we can style it with css
    const container = this.containerEl.children[1]
    container.id = "wordle-container"
    container.empty()

    // Create a hidden iframe with correct source; add ID so we can style it with css
    const iframe = container.createEl("iframe")
    iframe.src = "https://www.nytimes.com/games/wordle/index.html"
    iframe.id = "wordle-iframe"
  }

  async onClose(): Promise<void> {
    console.log("[Wordle]: Closing view.")
  }
}
