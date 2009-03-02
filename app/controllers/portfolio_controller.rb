class PortfolioController < ApplicationController  
  before_filter :login_required
  
  def index
    if anonymous?
      document_name = "anonymous portfolio"
    else
      document_name = "portfolio"
    end
    @document = Asset.find_by_name document_name
    send_data @document.body, :type => @document.content_type, :display => "inline"
  end
end