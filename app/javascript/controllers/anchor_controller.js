import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const urlParams = new URLSearchParams(window.location.search)

    // _anchor is a special query parameter added by a custom rails redirect_to
    const anchor = urlParams.get('_anchor')
    urlParams.delete("_anchor")

    // update the hash to be the custom anchor
    location.hash = anchor

    // rewrite the history to remove the custom _anchor query parameter and include the hash
    history.replaceState({}, document.title, window.location.pathname + urlParams + location.hash)
  }
}
