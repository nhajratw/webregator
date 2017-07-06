require 'test_helper'

class WebmarkIndexerControllerTest < ActionDispatch::IntegrationTest
  test "should get indexer" do
    get indexer_url
    assert_response :success
  end

end
