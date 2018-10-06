# frozen_string_literal: true

# config/cronotab.rb
require 'rake'

Rails.app_class.load_tasks

Crono.perform(UpdatePetLocation).every 5.seconds
