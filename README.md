# README

The purpose of this repository is to easily show the issue with Ruby on Rails and Turbo using a redirect with an 
anchor for a PATCH (non-GET?) request.

The expected behaviour in all cases is to arrive at `/anchor/index#target` and scroll to the element with `id="target"`.
What we see is that a get with turbo works (but the hash/fragment isn't updated in the URL), patch with turbo doesn't work
and get without turbo works (scrolls and updates the URL).

| method | turbo | expected | actual | scrolls? |
| -------|-------|----------|--------|----------|
| get    | yes   | /anchor/index#target | /anchor/index | yes |
| patch  | yes   | /anchor/index#target | /anchor/index | no |
| get    | no    | /anchor/index#target | /anchor/index#target | yes |


## Testing

* Open the project in vscode as a remote container and run `bundle exec rails s -b 0.0.0.0`
* Alternatively, in a local env run `bundle install` and `bundle exec rails s`

## Related discussions:

1. https://github.com/hotwired/turbo/issues/211
2. https://github.com/whatwg/fetch/issues/1167
3. https://turbo.hotwired.dev/handbook/drive
4. https://github.com/hotwired/turbo/issues/354