class AssetController < ApplicationController
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
    @asset = Asset.find(params[:id])
    send_data @asset.body, :type => @asset.content_type
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
    @asset = Asset.find(params[:id])
  end

  def update
    @asset = Asset.find(params[:id])
    if @asset.update_attributes(params[:asset])
      flash[:notice] = 'Asset was successfully updated.'
      redirect_to :action => 'show', :id => @asset
    else
      render :action => 'edit'
    end
  end

  def destroy
    Asset.find(params[:id]).destroy
    redirect_to :action => 'list'
  end
end
