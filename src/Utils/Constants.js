 // Profile image
       export  const profileImage =
          "https://avatars.githubusercontent.com/u/199439169?s=400&u=17762c75d18ef1daaa06bb0f6dac4b0bd47c3a96&v=4";
    export const Netflix_Logo ="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAVvRDRqBcLS7fk0Qpns6gQSS3VdMMYtpN_ba4Nzu63yuVrE7JHt-MdKCNAQnJ8SrsPBqivurwF6ugwnAa54jBGNohFD6CNLHDjwQUnPO_cKrHSqgmLOAw0zUe2dRClJd4cchXguY1Bjj.svg"

    export const defaultProfile =
    "/Images/netflix-profile.jpg"; 
export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

// console.log("TMDB TOKEN:", import.meta.env.VITE_TMDB_TOKEN);

export const IMG_CDN="https://image.tmdb.org/t/p/w500";

export const Bg_Netflix_url =
  "https://assets.nflxext.com/ffe/siteui/vlv3/42f3cd9f-c9a8-4cae-8c03-3e7aa13e0154/web/IN-en-20260727-TRIFECTA-perspective_83c6fd6c-bc2e-4518-80be-359a85c542a2_small.jpg";



  export const SUPPORTED_LANGUAGES =[{indentifier :"en" , name :"english" } ,
    {indentifier :"hindi" , name :"Hindi" } , {indentifier :"spanish" , name :"Spanish" } 
  ]
                  

export const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;

