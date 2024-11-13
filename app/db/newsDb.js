import poster1 from "@/public/assets/newsAssets/missionP.webp";
import bg1 from "@/public/assets/newsAssets/missionB.webp";
import poster2 from "@/public/assets/newsAssets/americaP.webp";
import bg2 from "@/public/assets/newsAssets/americaB.jpg";
import poster3 from "@/public/assets/newsAssets/mufasaP.jpeg";
import bg3 from "@/public/assets/newsAssets/mufasaB.webp";
import poster4 from "@/public/assets/newsAssets/thunderboltsP.jpg";
import bg4 from "@/public/assets/newsAssets/thunderboltsB.webp";

const newsDb = [
  {
    id: 0,
    newsTitle: "Mission: Impossible - The Final Reckoning",
    newsPoster: poster1,
    newsBackground: bg1,
    newsDesc: "watch the first t easer",
  },
  {
    id: 1,
    newsTitle: "captain america: brave new world",
    newsPoster: poster2,
    newsBackground: bg2,
    newsDesc: "watch the new trailer from D23 brazil",
  },
  {
    id: 2,
    newsTitle: "mufasa: the lion king",
    newsPoster: poster3,
    newsBackground: bg3,
    newsDesc: "watch the prequel trailer",
  },
  {
    id: 3,
    newsTitle: "Thunderbolts",
    newsPoster: poster4,
    newsBackground: bg4,
    newsDesc: "D23 Special look teaser",
  },
];

export default newsDb;
