class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :title
      t.string :bannerUrl

      t.timestamps
    end
  end
end
