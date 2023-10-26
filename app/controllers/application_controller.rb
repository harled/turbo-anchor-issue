class ApplicationController < ActionController::Base
  # Custom redirect_to logic to try and transparently support anchors with redirects so that Turbo
  # works as expected. The general approach is to leverage a query parameter to proxy the anchor value 
  # (as the anchor/fragment is lost when using Turbo and the browser fetch follow code). 
  #
  # This code looks for an anchor (#comment_100), if it finds one it will add a new query parameter of 
  # "_anchor=comment_100" and then remove the anchor value.
  #
  # The resulting URL is then passed through to the redirect_to call
  def redirect_to(options = {}, response_options = {})

    # https://edgeapi.rubyonrails.org/classes/ActionController/Redirecting.html
    # update rails upgrade guide
    if options.is_a?(String) && 
      ["GET", "PATCH", "POST"].include?(request.method) && 
      [:see_other, 303].include?(response_options[:status])

      # parse the uri, where options is the string of the url
      uri = URI.parse(options)

      # check if there is a fragment present and the status code is :see_other
      if uri.fragment.present?
        params = uri.query.present? ? CGI.parse(uri.query) : {}

        # set a new query parameter of _anchor, with the anchor value
        params["_anchor"] = uri.fragment

        # re-encode the query parameters
        uri.query = URI.encode_www_form(params)

        # clear the fragment
        uri.fragment = ""
      end
      options = uri.to_s
    end

    # call the regular redirect_to method
    super
  end
end
