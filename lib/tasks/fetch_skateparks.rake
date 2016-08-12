require 'aws'

namespace :skateparks do
  desc 'Fetch fresh skateparks.json and upload to s3'
  task fetch_skateparks: :environment do
    skateparks = Skatepark.includes(:location).all.as_json(
        only: [:id, :name],
        include: { location:
          { only: [:city, :state] }
        })

    file_name = "skateparks.json"
    local_file_path = "/tmp/skateparks.json"

    File.open(local_file_path, 'w') do |file|
      file.write(skateparks.to_json)
    end

    puts "Starting skateparks upload to S3..."

    s3 = AWS::S3.new(
        access_key_id: ENV['AWS_ACCESS_KEY_ID'],
        secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
      )

    bucket = s3.buckets[ENV['S3_BUCKET']]
    path = "skateparks_json/skateparks.json"

    begin
      object = bucket.objects[path]
      object.write(file: local_file_path)
    rescue StandardError => e
      raise e
    end
    puts "Saved skateparks to S3"
  end
end

