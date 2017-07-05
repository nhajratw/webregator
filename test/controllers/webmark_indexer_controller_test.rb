require 'test_helper'

class WebmarkIndexerControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get webmark_indexer_index_url
    assert_response :success
  end

end
