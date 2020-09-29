
provider "heroku" {}

variable "heroku_app_name" {
  description = "Name of the Heroku app that will be the instance of Quick Feedback"
}

resource "heroku_app" "quick_feedback" {
  name   = var.heroku_app_name
  region = "us"
  stack  = "container"

  config_vars = {
    # Migrations are not on the roadmap yet.
    FORCE_SYNC = true
    TWITTER_KEEP_TWEET_AMOUNT = 1500
  }
}

resource "heroku_addon" "database" {
  app  = heroku_app.quick_feedback.name
  plan = "heroku-postgresql:hobby-dev"
}

resource "heroku_addon" "cache" {
  app  = heroku_app.quick_feedback.name
  plan = "heroku-redis:hobby-dev"
}

resource "heroku_addon" "logs" {
  app  = heroku_app.quick_feedback.name
  plan = "papertrail:choklad"
}

output "app" {
  value = heroku_app.quick_feedback
}
