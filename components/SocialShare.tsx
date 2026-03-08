import React from "react";

interface SocialShareProps {
  shareUrl: string;
  title: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ shareUrl, title }) => {
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 dark:text-gray-400">Share:</span>
      <div className="flex gap-1.5">
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-buttons"
          aria-label="Share on Facebook"
        >
          Facebook
        </a>
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-buttons"
          aria-label="Share on X"
        >
          X.com
        </a>
        <a
          href={linkedInShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-buttons"
          aria-label="Share on LinkedIn"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default SocialShare;
