# frozen_string_literal: true

# Returns a json array of the pets objects

json.array! @pets, :id, :name, :latitude, :longitude, :owner_id, :emoji, :pet_type
