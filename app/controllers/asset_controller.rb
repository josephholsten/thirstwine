class AssetController < ApplicationController
  before_filter :login_required, :only => "show"
  before_filter :admin_required, :except => "show"
  layout 'admin'
  
  def index
    list
    render :action => 'list'
  end

  # GETs should be safe (see http://www.w3.org/2001/tag/doc/whenToUseGet.html)
  verify :method => :post, :only => [ :destroy, :create, :update ],
         :redirect_to => { :action => :list }

  def list
    @asset_pages, @assets = paginate :assets, :per_page => 10
  end

  def show
    document_name = params[:title]
    if anonymous?
      if document_name == 'portfolio'
        document_name = 'anonymous portfolio'
      else
        document_name = nil
      end
    end
    
    @document = Asset.find_by_name document_name
    if @document
      send_data @document.body, :type => @document.content_type, :display => "inline"
    else
      redirect_to home_url
    end
  end

  def new
    @asset = Asset.new
  end

  def create
    @asset = Asset.new()
    @asset.uploaded_file = @params['asset']
    @asset.save
    if @asset.save
      flash[:notice] = 'Asset was successfully created.'
      redirect_to :action => 'list'
    else
      render :action => 'new'
    end
  end

  def edit
    @asset = Asset.find_by_name params[:title]
  end

  def update
    @asset = Asset.find_by_name params[:title]
    if @asset.update_attributes(params[:asset])
      flash[:notice] = 'Asset was successfully updated.'
      redirect_to :action => 'show', :id => @asset
    else
      render :action => 'edit'
    end
  end

  def destroy
    Asset.find_by_name(params[:title]).destroy
    redirect_to :action => 'list'
  end
end
