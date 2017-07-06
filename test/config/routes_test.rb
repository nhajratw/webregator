require 'test_helper'

class RoutesTest < ActionDispatch::IntegrationTest
  test "should get root from user dashboard" do
    assert_generates "/", :controller => "user_dashboard", :action => "index"
  end

end
