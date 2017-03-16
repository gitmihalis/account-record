class CreateRecords < ActiveRecord::Migration[5.0]
  def change
    create_table :records do |t|
      t.date :date
      t.float :amount
      t.string :title

      t.timestamps
    end
  end
end
