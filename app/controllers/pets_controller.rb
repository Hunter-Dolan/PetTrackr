# frozen_string_literal: true

class PetsController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
    # Get all of the pets
    @pets = Pet.all
  end

  def new
    # Create a new pet object to use to build the form
    @pet = Pet.new
  end

  def create
    # Create a new pet object
    @pet = Pet.new(pet_params)
    @pet.set_location! # Set its location
    @pet.owner = current_user # Set its owner to the current user (aka creator)

    # If the pet saved correctly return them to the home screen
    if @pet.save
      redirect_to :root
      return
    end

    # If the pet did not save correctly, show them the error message
    flash[:error] = @pet.errors.full_messages
  end

  private

  # The internet is a big bad place, prevent mass assignment vulns by only allowing
  # certain params to be set
  def pet_params
    params.require(:pet).permit(:name, :emoji, :pet_type)
  end
end
