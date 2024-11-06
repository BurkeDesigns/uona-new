// to account for internal links, external links, and empty data.
export const mapLink = (link?: {
  slug?: {current: string; hardLoad?: boolean};
  url?: string;
}): string => {
  let url = link?.slug ? `/${link.slug.current}` : `${link?.url || ''}`;
  if (link?.slug?.hardLoad) {
    url = url + '?hl=1'; // TODO more robust query param injection
  }
  return url;
};