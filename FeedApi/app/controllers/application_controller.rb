class ApplicationController < ActionController::Base
  protect_from_forgery

  private

  def current_user
    @current_user ||= User.find_by(session_token: session[:token])
  end

  def login(user)
    session[:token] = user.reset_session_token
    @current_user = user
  end

  def logout
    current_user.reset_session_token if current_user
    session[:token] = SecureRandom.urlsafe_base64(16)
  end

  def logged_in?
    !!current_user
  end
end
