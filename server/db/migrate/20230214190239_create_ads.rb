class CreateAds < ActiveRecord::Migration[7.0]
  def change
    create_table :ads do |t|
      t.references :game, null: false, foreign_key: true
      t.string :name
      t.string :discord
      t.string :weekDays
      t.integer :yearsPlaying
      t.integer :hourStart
      t.integer :hourEnd
      t.boolean :useVoiceChannel

      t.timestamps
    end
  end
end
