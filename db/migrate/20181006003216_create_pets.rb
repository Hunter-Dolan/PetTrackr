# frozen_string_literal: true

class CreatePets < ActiveRecord::Migration[5.2]
  def change
    create_table :pets do |t|
      t.string :name
      t.string :emoji
      t.float :latitude
      t.float :longitude
      t.string :pet_type

      t.belongs_to :owner, class_name: 'User'

      t.timestamps
    end
  end
end
