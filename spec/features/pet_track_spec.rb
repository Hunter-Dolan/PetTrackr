# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'A pet', type: :feature, js: true do
  it 'can be created and tracked' do
    visit '/'

    # Go to the login page
    first('#login_link').click

    # Get the first user
    user = User.find(1)

    # Login
    page.fill_in 'Email', with: user.email
    page.fill_in 'Password', with: 'password!'

    page.click_button 'Log in'

    # Expect the returned page to have the correct name
    expect(page).to have_css('#greeting', text: "Hey, #{user.name.split(' ')[0]}")

    # Click the add pet link
    first('#add_pet_link').click

    # Fill in the new information for the pet
    page.fill_in 'Name', with: 'Marty'
    page.fill_in 'Emoji', with: 'A' # Unfortunately this test browser doesn't support emojis
    page.select 'Bunny', from: 'Type'

    # Hit the track button
    page.click_button 'Track!'

    # Get Marty from the database
    marty = Pet.find_by 'name = ?', 'Marty'

    # Ensure marty is on the sidebar
    expect(page).to have_css("#pet_list_pet#{marty.id} span", text: marty.emoji + ' ' + marty.name)

    # Ensure marty is on the map
    expect(page).to have_css('.mapboxgl-marker span', text: marty.emoji)
  end
end
