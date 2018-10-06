# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'The user', type: :feature, js: true do
  it 'is able to login and logout' do
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

    # Logout the user
    first('#logout_link').click

    # Verify it no longer has the greeting
    expect(page).not_to have_css('#greeting', text: "Hey, #{user.name.split(' ')[0]}")
  end

  it 'is able to register and update account' do
    visit '/'

    # Click the registration link
    first('#register_link').click

    # Fill out the registration form
    page.fill_in 'Email', with: 'random_user@test.com'
    page.fill_in 'Name', with: 'Random User'
    page.fill_in 'Password', with: 'password!'
    page.fill_in 'Password confirmation', with: 'password!'

    # Hit Sign up
    page.click_button 'Sign up'

    # Expect the greeting
    expect(page).to have_css('#greeting', text: 'Hey, Random')

    # Click the update account link
    first('#update_account_link').click

    # Fill the update account form
    page.fill_in 'Name', with: 'Random22 User'
    page.fill_in 'Current password', with: 'password!'
    page.click_button 'Update'

    # Verify the new greeting
    expect(page).to have_css('#greeting', text: 'Hey, Random22')
  end
end
