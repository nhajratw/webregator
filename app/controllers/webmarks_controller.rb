class WebmarksController < ApplicationController
  before_action :set_webmark, only: [:show, :edit, :update, :destroy]

  # GET /webmarks
  # GET /webmarks.json
  def index
    @webmarks = Webmark.order(id: :desc)
  end

  # GET /webmarks/1
  # GET /webmarks/1.json
  def show
  end

  # GET /webmarks/new
  def new
    @webmark = Webmark.new
  end

  # GET /webmarks/1/edit
  def edit
  end

  # POST /webmarks
  # POST /webmarks.json
  def create
    @webmark = Webmark.new(webmark_params)

    respond_to do |format|
      if @webmark.save
        format.html { redirect_to @webmark, notice: 'Webmark was successfully created.' }
        format.json { render :show, status: :created, location: @webmark }
      else
        format.html { render :new }
        format.json { render json: @webmark.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /webmarks/1
  # PATCH/PUT /webmarks/1.json
  def update
    respond_to do |format|
      if @webmark.update(webmark_params)
        format.html { redirect_to @webmark, notice: 'Webmark was successfully updated.' }
        format.json { render :show, status: :ok, location: @webmark }
      else
        format.html { render :edit }
        format.json { render json: @webmark.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /webmarks/1
  # DELETE /webmarks/1.json
  def destroy
    @webmark.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_webmark
      @webmark = Webmark.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def webmark_params
      params.require(:webmark).permit(:url, :content)
    end
end
