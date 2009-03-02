class AuthenticatedMailerObserver < ActiveRecord::Observer
  def after_create(authenticated_mailer)
    AuthenticatedMailerNotifier.deliver_signup_notification(authenticated_mailer)
  end

  def after_save(authenticated_mailer)
    AuthenticatedMailerNotifier.deliver_activation(authenticated_mailer) if authenticated_mailer.recently_activated?
  end
end