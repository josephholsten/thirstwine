class AccountController < ApplicationController
  # Be sure to include AuthenticationSystem in Application Controller instead
  # include AuthenticatedSystem
  # If you want "remember me" functionality, add this before_filter to Application Controller
  before_filter :login_from_cookie

  def login
    return unless request.post?
    if params[:anonymous]
      self.current_user = User.anonymous
    else
      self.current_user = User.authenticate(params[:email], params[:password])
    end

    if logged_in?
      if params[:remember_me] == "1"
        self.current_user.remember_me
        cookies[:auth_token] = { :value => self.current_user.remember_token , :expires => self.current_user.remember_token_expires_at }
      end
      
      flash[:notice] = "Logged in successfully"
      if admin?
        redirect_to :controller => 'asset'
      else
        redirect_back_or_default(:controller => '/portfolio', :action => 'index')
      end
    end
  end

  def signup
    @user = User.new(params[:user])
    return unless request.post?
    @user.save!
    self.current_user = @user
    redirect_back_or_default(:controller => '/', :action => 'index')
    flash[:notice] = "Thanks for signing up!"
  rescue ActiveRecord::RecordInvalid
    render :action => 'signup'
  end
  
  def logout
    self.current_user.forget_me if logged_in?
    cookies.delete :auth_token
    reset_session
    flash[:notice] = "You have been logged out."
    redirect_back_or_default(:controller => '/', :action => 'index')
  end
  
  def forgot_password
    return unless request.post?
    if @user = User.find_by_email(params[:email])
      @user.forgot_password
      @user.save
      redirect_back_or_default(:controller => '/', :action => 'index')
      flash[:notice] = "A password reset link has been sent to your email address" 
    else
      flash[:notice] = "Could not find a user with that email address" 
    end
  end

  def reset_password
    @user = User.find_by_password_reset_code(params[:id])
    raise if @user.nil?
    return if @user unless params[:password]
      if (params[:password] == params[:password_confirmation])
        self.current_user = @user #for the next two lines to work
        current_user.password_confirmation = params[:password_confirmation]
        current_user.password = params[:password]
        @user.reset_password
        flash[:notice] = current_user.save ? "Password reset" : "Password not reset" 
      else
        flash[:notice] = "Password mismatch" 
      end  
      redirect_back_or_default(:controller => '/', :action => 'index') 
  rescue
    logger.error "Invalid Reset Code entered" 
    flash[:notice] = "Sorry - That is an invalid password reset code. Please check your code and try again. (Perhaps your email client inserted a carriage return?" 
    redirect_back_or_default(:controller => '/', :action => 'index')
  end
end
