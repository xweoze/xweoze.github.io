# frozen_string_literal: true

Jekyll::Hooks.register :site, :post_read do |site|
  # Use Chirpy's below-content area while keeping its pagination and post navigation.
  %w[home post].each do |name|
    layout = site.layouts.fetch(name)
    layout.data['tail_includes'] = ['reading-music'] | Array(layout.data['tail_includes'])
  end
end
