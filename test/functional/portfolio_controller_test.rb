require File.dirname(__FILE__) + '/../test_helper'
require 'portfolio_controller'

# Re-raise errors caught by the controller.
class PortfolioController; def rescue_action(e) raise e end; end

class PortfolioControllerTest < Test::Unit::TestCase
  def setup
    @controller = PortfolioController.new
    @request    = ActionController::TestRequest.new
    @response   = ActionController::TestResponse.new
  end

  # Replace this with your real tests.
  def test_truth
    assert true
  end
end
