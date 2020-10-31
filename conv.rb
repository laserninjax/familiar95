Dir["./src/assets/icons/*.ico"].each do |file|
  system("convert '#{file}' '#{file.split('.png').first.gsub(/\.ico/, '').gsub(/[\(\)\%]/, '').downcase.gsub(/[\s, \-]/, '_')}.png'")
end
