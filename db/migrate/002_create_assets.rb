class CreateAssets < ActiveRecord::Migration
  def self.up
    create_table :assets do |t|
      t.column :name, :string
      t.column :content_type, :string
      t.column :body, :binary
    end
  end

  def self.down
    drop_table :assets
  end
end
