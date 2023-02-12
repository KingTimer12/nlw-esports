interface Props {
  uri: string,
  title: string,
  ads: number
}

function GameCard({uri, title, ads}: Props) {

  const adText = ads > 1 ? `${ads} anúncios` : `1 anúncio`

  return (
    <a href="" className="relative rounded-lg overflow-hidden">
      <img src={uri} alt="" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">
          {title}
        </strong>
        <span className="text-zinc-300 text-sm block">{adText}</span>
      </div>
    </a>
  );
}

export default GameCard;
