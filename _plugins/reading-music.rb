# frozen_string_literal: true

Jekyll::Hooks.register :site, :post_read do |site|
  # Keep the player directly below the content, above Chirpy's separate footer row.
  %w[home post].each do |name|
    site.layouts.fetch(name).content << "\n{% include reading-music.html %}"
  end
end
