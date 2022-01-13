import { ItemView, WorkspaceLeaf } from "obsidian";

export const WORDLE_VIEW_TYPE = "wordle-view";

/**
 * A wordle view.
 * Shows an iframe with the Wordle site!
 *
 * @author dbarenholz
 * @version 0.0.1
 */
export class WordleView extends ItemView {
  // Constructor
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType(): string {
    return WORDLE_VIEW_TYPE;
  }

  getDisplayText(): string {
    return "Wordle";
  }

  async onOpen(): Promise<void> {
    console.log("[Wordle]: Opening view.")

    // Grab a reference to the container; add ID so we can style it with css
    const container = this.containerEl.children[1]
    container.id = "wordle-container"
    container.empty()

    // Create a hidden iframe with correct source; add ID so we can style it with css
    const iframe = container.createEl("iframe")
    iframe.src = "https://www.powerlanguage.co.uk/wordle/"
    iframe.id = "wordle-iframe"

    // Gives cross-origin error
    /*
    iframe.addEventListener("load", () => {
      console.log("[Wordle]: Wordle iframe loaded.")
      console.log(iframe.contentWindow)
      console.log(iframe.contentDocument)
    })
    */


    // Gives cross-origin error
    /*
    this.registerDomEvent(iframe, 'load', () => {
      console.log("[Wordle]: Wordle iframe loaded.")
      console.log(iframe.contentWindow)
      console.log(iframe.contentDocument)
    })
    */
  }

  async onClose(): Promise<void> {
    console.log("[Wordle]: Closing view.")
  }
}
