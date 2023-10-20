class AnchorController < ApplicationController
  def index
  end

  def redirect
    redirect_to anchor_index_path(anchor: "comment_100"), status: :see_other
  end
end
