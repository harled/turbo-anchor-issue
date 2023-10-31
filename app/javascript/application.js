// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// Whenever render is called, we want to see if there is a rails _anchor query parameter,
// if so, we want to transform it into a proper hash and then try to scroll to it. Find
// the associated server side code in a custom "redirect_to" method.
addEventListener('turbo:load', transformAnchorParamToHash)

function transformAnchorParamToHash (event) {
  const url = new URL(location.href)
  const urlParams = new URLSearchParams(url.search)

  // _anchor is a special query parameter added by a custom rails redirect_to
  const anchorParam = urlParams.get('_anchor')

  // only continue if we found a rails anchor
  if (anchorParam) {
    urlParams.delete('_anchor')

    // update the hash to be the custom anchor
    url.hash = anchorParam

    // create a new URL with the new parameters
    let searchString = ''
    if (urlParams.size > 0) {
      searchString = '?' + urlParams.toString()
    }

    // the new relative path
    const newPath = url.pathname + searchString + url.hash

    // rewrite the history to remove the custom _anchor query parameter and include the hash
    history.replaceState({}, document.title, newPath)
  }

  // scroll to the anchor
  if (location.hash) {
    const anchorId = location.hash.replace('#', '')
    const element = document.getElementById(anchorId)
    if (element) {
      const stickyHeaderHeight = calculcateStickyHeaderHeight()
      const elementTop = element.getBoundingClientRect().top
      const elementTopWithHeaderOffset = elementTop + window.scrollY - stickyHeaderHeight

      // for whatever reason we can't scroll to the element immediately, giving in a slight
      // delay corrects the issue
      setTimeout(function () {
        window.scrollTo({ top: elementTopWithHeaderOffset, behavior: 'smooth' })
      }, 100)
    } else {
      console.error(`scrollToAnchor: element was not found with id ${anchorId}`)
    }
  }
}

// take into account any possible sticky elements (which are assumed to be headers) and sum up their
// heights to use as an offset
function calculcateStickyHeaderHeight () {
  let stickyHeaderHeight = 0
  const allElements = document.querySelectorAll('*')

  const stickyElements = [].filter.call(allElements, el => getComputedStyle(el).position === 'sticky')
  stickyElements.forEach(el => { stickyHeaderHeight += el.getBoundingClientRect().height })

  return stickyHeaderHeight
}