require 'rails_helper'

RSpec.describe "The user has a siebar", type: :feature, js: true do
  it "has pet with id in the sidebar" do
    visit "/"
  
    # Get the first pet
    pet1 = Pet.find(1)
    
    # Check the sidebar
    expect(page).to have_css('#pet_list_pet1 span', text: pet1.emoji + " " + pet1.name)

    # Check the map
    expect(page).to have_css(".mapboxgl-marker span", text: pet1.emoji)
  end

  it "is possible to filter pets" do
    visit "/"
    dogs = Pet.where("pet_type = ?", "dog")

    # ensure dogs are there on the start
    dogs.each do |dog|
      # Check the sidebar
      expect(page).to have_css("#pet_list_pet#{dog.id} span", text: dog.emoji + " " + dog.name)

      # Check the map
      expect(page).to have_css(".mapboxgl-marker span", text: dog.emoji)
    end

    # hide the dogs
    first("#dog_filter_button").click

    # ensure the dogs are no longer there
    dogs.each do |dog|
      # Check the sidebar
      expect(page).not_to have_css("#pet_list_pet#{dog.id} span", text: dog.emoji + " " + dog.name)

      # Check the map
      expect(page).not_to have_css(".mapboxgl-marker span", text: dog.emoji)
    end

    # re-enable the dogs filter
    first("#dog_filter_button").click

    # ensure dogs are now there
    dogs.each do |dog|
      # Check the sidebar
      expect(page).to have_css("#pet_list_pet#{dog.id} span", text: dog.emoji + " " + dog.name)

      # Check the map
      expect(page).to have_css(".mapboxgl-marker span", text: dog.emoji)
    end
  end
end