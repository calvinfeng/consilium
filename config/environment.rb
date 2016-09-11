# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

ENV["REDISTOGO_URL"] = "redis://h:pb56s1fjj1147takjkahe3r4n38@ec2-184-73-182-113.compute-1.amazonaws.com:12229"
