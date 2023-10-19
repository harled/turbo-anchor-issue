class AnchorController < ApplicationController
  def index
  end

  def redirect
    redirect_to anchor_index_path(anchor: "target"), status: :see_other
  end
end
