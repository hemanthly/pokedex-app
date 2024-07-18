import React from "react";
import Image from "next/image";
import Link from "next/link";

export const getGradientClass = (types: string[]) => {
  let fromColor = 'from-unknown';
  let toColor = 'to-unknown';

  if(types && types.length > 0) {
    switch (types[0]?.toLowerCase()) {
      case 'normal':
        fromColor = 'from-normal';
        break;
      case 'ice':
        fromColor = 'from-ice';
        break;
      case 'fighting':
        fromColor = 'from-fighting';
        break;
      case 'flying':
        fromColor = 'from-flying';
        break;
      case 'poison':
        fromColor = 'from-poison';
        break;
      case 'ground':
        fromColor = 'from-ground';
        break;
      case 'rock':
        fromColor = 'from-rock';
        break;
      case 'bug':
        fromColor = 'from-bug';
        break;
      case 'ghost':
        fromColor = 'from-ghost';
        break;
      case 'steel':
        fromColor = 'from-steel';
        break;
      case 'fire':
        fromColor = 'from-fire';
        break;
      case 'water':
        fromColor = 'from-water';
        break;
      case 'grass':
        fromColor = 'from-grass';
        break;
      case 'electric':
        fromColor = 'from-electric';
        break;
      case 'psychic':
        fromColor = 'from-psychic';
        break;
      case 'dragon':
        fromColor = 'from-dragon';
        break;
      case 'dark':
        fromColor = 'from-dark';
        break;
      case 'fairy':
        fromColor = 'from-fairy';
        break;
      default:
        fromColor = 'from-unknown';
        break;
    }


    switch (types[1]?.toLowerCase() || types[0]?.toLowerCase()) {
      case 'normal':
        toColor = 'to-normal';
        break;
      case 'ice':
        toColor = 'to-ice';
        break;
      case 'fighting':
        toColor = 'to-fighting';
        break;
      case 'flying':
        toColor = 'to-flying';
        break;
      case 'poison':
        toColor = 'to-poison';
        break;
      case 'ground':
        toColor = 'to-ground';
        break;
      case 'rock':
        toColor = 'to-rock';
        break;
      case 'bug':
        toColor = 'to-bug';
        break;
      case 'ghost':
        toColor = 'to-ghost';
        break;
      case 'steel':
        toColor = 'to-steel';
        break;
      case 'fire':
        toColor = 'to-fire';
        break;
      case 'water':
        toColor = 'to-water';
        break;
      case 'grass':
        toColor = 'to-grass';
        break;
      case 'electric':
        toColor = 'to-electric';
        break;
      case 'psychic':
        toColor = 'to-psychic';
        break;
      case 'dragon':
        toColor = 'to-dragon';
        break;
      case 'dark':
        toColor = 'to-dark';
        break;
      case 'fairy':
        toColor = 'to-fairy';
        break;
      default:
        toColor = 'to-unknown';
        break;
    }
  }

  return `bg-gradient-to-b ${fromColor} ${toColor}`;
};

const capitalizeFirstLetter = (string: string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

type PokemonCardProps = {
  id: number;
  name: string;
  imgUrl: string;
  types: string[];
};

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, imgUrl, types }) => {
  const gradientClass = getGradientClass(types);

  return (
    <li
      className={`border-black border border-dashed w-full h-full px-5 py-3 flex flex-col justify-center items-center rounded cursor-pointer ${gradientClass}`}
      role="listitem"
      aria-labelledby={`pokemon-${id}-name`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          document.getElementById(`link-${id}`)?.click();
        }
      }}
      id={`pokemon-${id}`}
    >
      <Link href={`/pokemon-detail/${name}/${id}`} id={`link-${id}`} tabIndex={-1}>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center items-center w-full">
            <Image
              src={imgUrl}
              width={100}
              height={100}
              alt={`Pokemon ${name} (${id})`}
              loading="lazy"
              style={{ objectFit: "contain" }}
              className="rounded h-28 w-28 hover:scale-110 duration-300"
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-4">
            <h2 id={`pokemon-${id}-name`} className="text-lg font-bold text-center h-12 flex items-center">
              {capitalizeFirstLetter(name)}
            </h2>
            <p>{id.toString().padStart(3, "0")}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default PokemonCard;
