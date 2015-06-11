json.extract!(
  pokemon,
  :id,
  :attack,
  :defense,
  :image_url,
  :moves,
  :name,
  :poke_type
)

if display_toys
  json.toys pokemon.toys, partial: 'toys/toy', as: :toy
end
