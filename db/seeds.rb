

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create Base Users

hunter = User.create(name: 'Hunter Dolan', email: 'hunter@wearemocha.com', password: 'password!')
heidi = User.create(name: 'Heidi Hubbard', email: 'heidi@wearemocha.com', password: 'password!')
laurel = User.create(name: 'Laurel Hoppe', email: 'laurel@wearemocha.com', password: 'password!')
pablo = User.create(name: 'Pablo Merino', email: 'pablo@wearemocha.com', password: 'password!')

# Create Base Pets
poppy = Pet.create(name: 'Poppy', pet_type: 'cat', emoji: '😸', latitude: BASE_LATITUDE, longitude: BASE_LONGITUDE, owner: hunter)
wylie = Pet.create(name: 'Wylie', pet_type: 'dog', emoji: '🐕', latitude: BASE_LATITUDE + 0.005, longitude: BASE_LONGITUDE + 0.05, owner: hunter)

joey = Pet.create(name: 'Joey', pet_type: 'dog', emoji: '🐶', latitude: BASE_LATITUDE + 0.008, longitude: BASE_LONGITUDE - 0.02, owner: heidi)
Pet.create(name: 'Milton', pet_type: 'cat', emoji: '😹', latitude: BASE_LATITUDE + 0.006, longitude: BASE_LONGITUDE - 0.002, owner: heidi)

Pet.create(name: 'Jeffery', pet_type: 'cat', emoji: '😼', latitude: BASE_LATITUDE - 0.002, longitude: BASE_LONGITUDE - 0.08, owner: laurel)
Pet.create(name: 'Max', pet_type: 'cat', emoji: '😽', latitude: BASE_LATITUDE + 0.0062, longitude: BASE_LONGITUDE - 0.0023, owner: pablo)

Pet.create(name: 'Ari', pet_type: 'cat', emoji: '😻', latitude: BASE_LATITUDE + 0.00221, longitude: BASE_LONGITUDE - 0.00235, owner: laurel)
Pet.create(name: 'Meredith', pet_type: 'turtle', emoji: '🐢', latitude: BASE_LATITUDE + 0.0022, longitude: BASE_LONGITUDE - 0.0023, owner: laurel)
