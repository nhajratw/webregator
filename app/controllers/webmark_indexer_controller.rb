class WebmarkIndexerController < ApplicationController
  respond_to :json
  require 'nokogiri'
  require 'open-uri'
  def index
    @url_input = params[:wm_url]
    if @url_input == nil
      render :index
      response.set_header("indexer_check", "No url chosen")
      #example url
      @url_input = "http://google.com"
    end
    html_data = open(@url_input).read
    nokogiri_object = Nokogiri::HTML(html_data)
    site = URI.parse(@url_input)
    @host = site.scheme + '://' + site.host
    @h_objects = nokogiri_object.css('h1', 'h2', 'h3')
    @a_objects = nokogiri_object.css('a')
    @h_elements = Array.new
    @a_elements = Array.new

    @h_objects.each do |element|
      hash = Hash.new
      hash["content"] = element.text
      hash["element_type"] = element.name
    @h_elements << hash
    end

    @a_objects.css("a").each do |response_node|
        hash = Hash.new
        if ( response_node["href"] =~ %r[^(http|https)://])
          hash["a_link"] = response_node["href"]
        else
          hash["a_link"] = @host + response_node["href"]
        end
      @a_elements << hash
    end
  end

end
