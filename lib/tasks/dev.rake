require "open3"
require "unix_colors"

namespace :dev do
  # TODO: PASS SQL DUMP FILE AS ARGUMENT
  # download tmp/dump.sql cache
  desc "Reset DB and seed with Skateparks and Users"
  task reset_db: :environment do
    abort bold("Don't run this in prodlike environments") unless Rails.env.development?

    puts "Resetting db..."
    Rake::Task["db:drop"].invoke
    Rake::Task["db:create"].invoke
    Rake::Task["db:schema:load"].invoke
    Rake::Task["dev:seed_db"].invoke
    Rake::Task["db:migrate"].invoke
    Rake::Task["db:seed"].invoke
  end

  desc "Restore skateparks from prod (see `dev:restore_skateparks`) and seed Users"
  task seed_db: :environment do
    abort bold("Don't run this in prodlike environments") unless Rails.env.development?
    Rake::Task["dev:restore_skateparks"].invoke
    # User seed data depends on Skateparks
  end

  desc "Restore local Skateparks and Locations from a current dump of prod DB. (Requires heroku cli and access to WCS app)"
  task restore_skateparks: :environment do
    abort bold("Don't run this in prodlike environments") unless Rails.env.development?

    with_err_handling do
      dump_env = "production"
      puts bold("Restoring local Skatepark data from #{dump_env}...")

      puts "  Creating dump of #{dump_env} Skatepark data..."
      out, err, status = Open3.capture3("bin/dump_skateparks", dump_env)
      unless status.success?
        abort "\n#{bold(red(dump_env + ' dump shat the bed! Error:'))}\n  #{err || out}"
      end

      puts "  Wiping all Skatepark data from local db..."
      ActiveRecord::Base.connection.exec_query(
        # Deletes all rows from Skateparks, restarts Skateparks.id counter at 1, and
        # deletes all dependent data like Locations, Favorites, Visits, etc.
        "TRUNCATE skateparks RESTART IDENTITY CASCADE;"
      )

      puts "  Restoring local Skatepark data from #{dump_env} dump..."
      out, err, status = Open3.capture3(
        "bin/restore_skateparks",
        dump_env,
        Rails.env,
      )
      unless status.success?
        abort "\n#{bold(red('Local DB restore shat the bed! Error:'))}\n  #{err || out}"
      end

      puts "  Removing references to photos so AWS doesn't barn us..."
      Skatepark.update_all(
        hero_file_name: nil,
        hero_content_type: nil,
        hero_file_size: nil,
        hero_updated_at: nil,
        map_photo_file_name: nil,
        map_photo_content_type: nil,
        map_photo_file_size: nil,
        map_photo_updated_at: nil,
      )

      puts bold(green("That shit buttered"))
    end
  end

  def with_err_handling
    # TODO: When we wrap this in a transaction `bin/restore_db` hangs, possibly because
    # it's waiting for the other transaction coming from AR to finish.. Not sure how to
    # get around this. If the restore fails we won't be able to get the skatepark data back,
    # but I think that's ok bc if the dump succeeds the restore should too. Will look into
    # this more deeply when time permits.
    # Possibly related: https://stackoverflow.com/questions/40752363/postgres-locks-within-a-transaction
    yield
  rescue => e
    puts bold(red("\nBad stuff happened:\n")) + "  #{bold("#{e.class}: #{e.message}")}"
    puts red("  #{e.backtrace.first}")
  ensure
    Dir['tmp/*_skateparks.dump'].each do |f|
      File.unlink(f)
    end
  end
end
