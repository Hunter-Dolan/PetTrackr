

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_181_006_022_254) do
  create_table 'crono_jobs', force: :cascade do |t|
    t.string 'job_id', null: false
    t.text 'log', limit: 1_073_741_823
    t.datetime 'last_performed_at'
    t.boolean 'healthy'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['job_id'], name: 'index_crono_jobs_on_job_id', unique: true
  end

  create_table 'pets', force: :cascade do |t|
    t.string 'name'
    t.string 'emoji'
    t.float 'latitude'
    t.float 'longitude'
    t.string 'pet_type'
    t.integer 'owner_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['owner_id'], name: 'index_pets_on_owner_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'email', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'name'
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index ['reset_password_token'], name: 'index_users_on_reset_password_token', unique: true
  end
end