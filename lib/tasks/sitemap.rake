# sitemap.rake
require 'aws-sdk'

namespace :sitemap do
  desc 'Upload the sitemap files to S3'
  task upload_to_s3: :environment do
    puts 'Starting sitemap upload to S3...'

    s3 = Aws::S3::Client.new(access_key_id: ENV['AWS_ACCESS_KEY_ID'],
                             secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'])
    resource = Aws::S3::Resource.new(client: s3)

    bucket = resource.bucket(ENV['S3_BUCKET'])

    Dir.entries(File.join(Rails.root, 'tmp', 'sitemaps')).each do |file_name|
      next if ['.', '..', '.DS_Store'].include? file_name

      path = "sitemaps/#{file_name}"
      file = File.join(Rails.root, 'tmp', 'sitemaps', file_name)

      begin
        object = bucket.object(path)
        object.upload_file(file)
      rescue StandardError => e
        raise e
      end
      puts "Saved #{file_name} to S3"
    end
  end

  desc 'Create the sitemap and upload it to S3'
  task create_and_upload: :environment do
    Rake::Task['sitemap:create'].invoke

    Rake::Task['sitemap:upload_to_s3'].invoke
  end
end
