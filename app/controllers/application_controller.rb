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
    if options.is_a?(String)
      uri = URI.parse(options)

      # check if there is a fragment present and the status code is :see_other
      if uri.fragment.present? && [:see_other, 303].include?(response_options[:status])
        params = uri.query.present? ? CGI.parse(uri.query) : {}
        params["_anchor"] = uri.fragment
        uri.query = URI.encode_www_form(params)
        uri.fragment = ""
      end
      options = uri.to_s
    end
    super
  end
end
