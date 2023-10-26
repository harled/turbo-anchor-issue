class AnchorController < ApplicationController
  def index
  end

  def mark_as_read
    redirect_to anchor_discussion_path(anchor: "comment_100"), status: :see_other
  end

  def discussion
  end
end
