# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

environment = Sprockets::Environment.new
environment.append_path 'vendor/assets/bower_components'

run Rails.application
