require 'test_helper'

class WebmarksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @webmark = webmarks(:one)
  end

  test "should get index" do
    get webmarks_url
    assert_response :success
  end

  test "should get new" do
    get new_webmark_url
    assert_response :success
  end

  test "should create webmark" do
    assert_difference('Webmark.count') do
      post webmarks_url, params: { webmark: { content: @webmark.content, url: @webmark.url } }
    end

    assert_redirected_to webmark_url(Webmark.last)
  end

  test "should show webmark" do
    get webmark_url(@webmark)
    assert_response :success
  end

  test "should get edit" do
    get edit_webmark_url(@webmark)
    assert_response :success
  end

  test "should update webmark" do
    patch webmark_url(@webmark), params: { webmark: { content: @webmark.content, url: @webmark.url } }
    assert_redirected_to webmark_url(@webmark)
  end

  test "should destroy webmark" do
    assert_difference('Webmark.count', -1) do
      delete webmark_url(@webmark)
    end

    assert_redirected_to webmarks_url
  end
end
