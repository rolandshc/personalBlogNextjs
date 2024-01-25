interface SocialShareProps {
    shareUrl: string;
    title: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ shareUrl, title }) => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`;

    return (
        <div>
            Share:
            <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="social-share-buttons facebook">Facebook</a>
            <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer"className="social-share-buttons xcom">X.com</a>
            <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" className="social-share-buttons linkedin">LinkedIn</a>
        </div>
    );
};

export default SocialShare;
