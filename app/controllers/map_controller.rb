# frozen_string_literal: true

class MapController < ApplicationController
  def show
    # Get all the pets from the database
    @pets = Pet.all

    # We will render this using full screen,
    # so there is no application frame
    @full_screen = true
  end
end
