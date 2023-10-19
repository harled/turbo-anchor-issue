# https://medium.com/firehydrant-io/developing-a-ruby-on-rails-app-with-docker-compose-d75b20334634

# Alpine
FROM ruby:3-alpine

RUN apk add --update --no-cache build-base dbus curl file gcompat glib git \
  imagemagick imagemagick-dev libc6-compat libgcc libintl libjpeg libpng-dev libsass-dev \
  sqlite sqlite-dev sqlite-libs nodejs npm openssh-client openssl-dev postgresql postgresql-dev sassc \
  tzdata yarn nano

# Install gems
RUN gem install bundler

# App location is /app
WORKDIR /app

# Copy the Gemfile
COPY Gemfile .
COPY Gemfile.lock .

# Install gems
RUN bundle install

# Expose Puma port
EXPOSE 3000

# Save timestamp of image building
RUN date -u > BUILD_TIME

# Run rails app
CMD ["bundle exec rails s -b 0.0.0.0"]
