namespace :skateparks do
  desc 'Fetch fresh skateparks.json and save the bitch'

  task fetch_skateparks: :environment do
    skateparks = Skatepark.includes(:location).all.as_json(
        only: [:id, :name],
        include: { location:
          { only: [:city, :state] }
        })
    fname = "app/support/skateparks.json"
    somefile = File.open(fname, "w")
    somefile.puts skateparks.to_json
    somefile.close
  end
end

