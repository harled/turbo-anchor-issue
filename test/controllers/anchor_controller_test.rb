require "test_helper"

class AnchorControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get anchor_index_url
    assert_response :success
  end

  test "should get redirect" do
    get anchor_redirect_url
    assert_response :success
  end
end
