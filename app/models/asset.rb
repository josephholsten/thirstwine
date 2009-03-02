require "base64"

class Asset < ActiveRecord::Base
  def uploaded_file=(incoming_file)
     self.name = incoming_file['name']
     self.file = incoming_file['file']
   end
   
   def file=(incoming_file)
     self.content_type = incoming_file.content_type
     self.body = incoming_file.read
   end
   
   # Encode and decode binary data with Base64
   def body=(data)
     write_attribute("body", Base64.encode64(data))
   end
   def body
     Base64.decode64(read_attribute_before_type_cast('body'))
   end
end
