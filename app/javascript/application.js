// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// Whenever render is called, we want to see if there is a rails _anchor query parameter,
// if so, we want to transform it into a proper hash and then try to scroll to it. Find
// the associated server side code in a custom "redirect_to" method.
addEventListener('turbo:load', transformAnchorParamToHash)

function transformAnchorParamToHash(event) {
  const url = new URL(location.href)

  const urlParams = new URLSearchParams(url.search)

  // _anchor is a special query parameter added by a custom rails redirect_to
  const anchorParam = urlParams.get('_anchor')

  // only continue if we found a rails anchor
  if (anchorParam) {
    urlParams.delete('_anchor')

    // update the hash to be the custom anchor
    url.hash = anchorParam

    // rewrite the history to remove the custom _anchor query parameter and include the hash
    history.replaceState({}, document.title, url.pathname + urlParams + url.hash)
  }

  // scroll to the anchor
  if (location.hash) {
    const anchorId = location.hash.replace('#', '')
    const element = document.getElementById(anchorId)
    if (element) {
      // for whatever reason we can't scroll to the element immediately, giving in a slight
      // delay corrects the issue
      setTimeout(function () {
        element.scrollIntoView()
      }, 100)
    } else {
      console.error(`scrollToAnchor: element was not found with id ${anchorId}`)
    }
  }
}