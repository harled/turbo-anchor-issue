# README

The purpose of this repository is to easily show the issue with Ruby on Rails and Turbo using a redirect with an 
anchor for a PATCH (non-GET?) request.

The expected behaviour in all cases is to arrive at `/anchor/index#target` and scroll to the element with `id="target"`.
What we see is that a get with turbo works (but the hash/fragment isn't updated in the URL), patch with turbo doesn't work
and get without turbo works (scrolls and updates the URL).

| method | turbo | expected | actual | scrolls? |
| get    | yes   | /anchor/index#target | /anchor/index | yes |
| patch  | yes   | /anchor/index#target | /anchor/index | no |
| get    | no    | /anchor/index#target | /anchor/index#target | yes |


Related discussions:

1. https://github.com/hotwired/turbo/issues/211