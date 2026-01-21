export interface SEOComponentProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
}

const SEOComponent = (props: SEOComponentProps) => {
  const {
    title = "",
    description,
    ogTitle,
    ogDescription,
    ogImage,
    noindex,
  } = props;
  return (
    <>
      <title>{`${title}`}</title>
      {description && <meta name="description" content={description} />}
      {ogTitle && (
        <>
          <meta property="og:title" content={ogTitle} />
          <meta name="twitter:title" content={ogTitle} />
        </>
      )}
      {ogDescription && (
        <>
          <meta property="og:description" content={ogDescription} />
          <meta name="twitter:description" content={ogDescription} />
        </>
      )}
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta name="twitter:image" content={ogImage} />
        </>
      )}
      {noindex && (
        <>
          <meta name="robots" content="noindex,nofollow" />
        </>
      )}

      {noindex !== true && (
        <>
          <meta
            name="robots"
            content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          />
        </>
      )}
    </>
  );
};

export default SEOComponent;
