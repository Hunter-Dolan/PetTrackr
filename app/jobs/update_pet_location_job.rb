

class UpdatePetLocation < ActiveJob::Base
  def perform
    # Update the location of each pet
    Pet.update_locations!
  end
end
