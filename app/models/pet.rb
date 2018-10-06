# frozen_string_literal: true

class Pet < ApplicationRecord
  default_scope -> { order(:id) }

  belongs_to :owner, class_name: 'User'

  # Maximum distance a pet can go (in GPS coordinates)
  # in a single update cycle
  MAX_UPDATE_DISTANCE = 0.0005

  # Types of pets possible to track
  PET_TYPES = %w[cat dog turtle bunny].freeze

  validates :name, presence: true
  validates :emoji, presence: true, length: { is: 1 }
  validates :pet_type, presence: true

  # Set location gives a pet their initial location
  def set_location!
    self.latitude = BASE_LATITUDE
    self.longitude = BASE_LONGITUDE

    self.latitude += rand(-MAX_UPDATE_DISTANCE * 10.0..MAX_UPDATE_DISTANCE * 10.0)
    self.longitude += rand(-MAX_UPDATE_DISTANCE * 10.0..MAX_UPDATE_DISTANCE * 10.0)
  end

  # Update location changes the location after it is set
  def update_location!
    # Pulling in location data, just kidding, we'll randomize it
    self.latitude += rand(-MAX_UPDATE_DISTANCE..MAX_UPDATE_DISTANCE)
    self.longitude += rand(-MAX_UPDATE_DISTANCE..MAX_UPDATE_DISTANCE)

    save
  end

  # Update the location for each and every pet
  def self.update_locations!
    Pet.all.each(&:update_location!)
  end
end
