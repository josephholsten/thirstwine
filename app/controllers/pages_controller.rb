class PagesController < ApplicationController
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
    @page_pages, @pages = paginate :pages, :per_page => 10
  end

  def show
    @page = Page.find_by_name(params[:title]) || Page.new  
    render :layout => 'application'
  end

  def new
    @page = Page.new
  end

  def create
    @page = Page.new(params[:page])
    if @page.save
      flash[:notice] = 'Page was successfully created.'
      redirect_to :action => 'list'
    else
      render :action => 'new'
    end
  end

  def edit
    @page = Page.find_by_name(params[:title])
  end

  def update
    @page = Page.find_by_name(params[:title])
    if @page.update_attributes(params[:page])
      flash[:notice] = 'Page was successfully updated.'
      redirect_to page_url(:action => 'show', :title => @page.name)
    else
      render :action => 'edit'
    end
  end

  def destroy
    Page.find_by_name(params[:title]).destroy
    redirect_to :action => 'list'
  end
end
