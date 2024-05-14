export const getAllWikipadia = async () => {
  const MaxWiki = 2;

  return Promise.all(
    [...Array(MaxWiki)].map(async (_, index) => {
        const wikipedia = await fetch("https://ja.wikipedia.org/w/api.php?origin=*&format=json&list=backlinks&bllimit=50&bltitle=MARVEL", {
            method: 'GET',
        }).then((responcee) => {
            return responcee.json();
        });

        return wikipedia;
    })
  )
}