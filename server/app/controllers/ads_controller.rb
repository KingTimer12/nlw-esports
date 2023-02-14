class AdsController < ApplicationController

  # GET /ads
  def index
    @game = Game.find(params[:game_id])
    @ads = @game.ads.all

    render json: @ads
  end

  # GET /ads/1
  def show
    @game = Game.find(params[:game_id])
    @ad = @game.ads.find(params[:id])

    render json: @ad
  end

  # GET /ads/1/discord
  def discord
    @ad = Ad.find(params[:ad_id])
    render json: @ad.discord
  end

  # POST /ads
  def create
    @game = Game.find(params[:game_id])

    @ad = @game.ads.new(ad_params)

    if @ad.save
      render json: @ad, status: :created
    else
      render json: @ad.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /ads/1
  def update
    @game = Game.find(params[:game_id])
    @ad = @game.ads.find(params[:id])

    if @ad.update(ad_params)
      render json: @ad
    else
      render json: @ad.errors, status: :unprocessable_entity
    end
  end

  # DELETE /ads/1
  def destroy
    @game = Game.find(params[:game_id])
    @ad = @game.ads.find(params[:id])

    @ad.destroy
  end

  private

    # Only allow a list of trusted parameters through.
    def ad_params
      params.require(:ad).permit(:name, :discord, :weekDays, :yearsPlaying, :hourStart, :hourEnd, :useVoiceChannel)
    end
end
