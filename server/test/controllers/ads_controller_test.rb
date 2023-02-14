require "test_helper"

class AdsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ad = ads(:one)
  end

  test "should get index" do
    get ads_url, as: :json
    assert_response :success
  end

  test "should create ad" do
    assert_difference("Ad.count") do
      post ads_url, params: { ad: { discord: @ad.discord, game_id: @ad.game_id, hourEnd: @ad.hourEnd, hourStart: @ad.hourStart, name: @ad.name, useVoiceChannel: @ad.useVoiceChannel, weekDays: @ad.weekDays, yearsPlaying: @ad.yearsPlaying } }, as: :json
    end

    assert_response :created
  end

  test "should show ad" do
    get ad_url(@ad), as: :json
    assert_response :success
  end

  test "should update ad" do
    patch ad_url(@ad), params: { ad: { discord: @ad.discord, game_id: @ad.game_id, hourEnd: @ad.hourEnd, hourStart: @ad.hourStart, name: @ad.name, useVoiceChannel: @ad.useVoiceChannel, weekDays: @ad.weekDays, yearsPlaying: @ad.yearsPlaying } }, as: :json
    assert_response :success
  end

  test "should destroy ad" do
    assert_difference("Ad.count", -1) do
      delete ad_url(@ad), as: :json
    end

    assert_response :no_content
  end
end
