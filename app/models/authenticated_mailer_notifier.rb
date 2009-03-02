class AuthenticatedMailerNotifier < ActionMailer::Base
  def signup_notification(authenticated_mailer)
    setup_email(authenticated_mailer)
    @subject    += 'Please activate your new account'
    @body[:url]  = "http://YOURSITE/account/activate/#{authenticated_mailer.activation_code}"
  end
  
  def activation(authenticated_mailer)
    setup_email(authenticated_mailer)
    @subject    += 'Your account has been activated!'
    @body[:url]  = "http://YOURSITE/"
  end
  
  protected
  def setup_email(authenticated_mailer)
    @recipients  = "#{authenticated_mailer.email}"
    @from        = "ADMINEMAIL"
    @subject     = "[YOURSITE] "
    @sent_on     = Time.now
    @body[:authenticated_mailer] = authenticated_mailer
  end
end
